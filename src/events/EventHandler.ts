import fs from "node:fs/promises";
import path, { join, resolve } from "node:path";

import { Collection, Events } from "discord.js";
import { container } from "tsyringe";

import { Client } from "../structures/Client";
import { Event } from "../structures/Event";

import { clientSymbol } from "../utils/Constants";
import { readdirSync } from "node:fs";

export class EventHandler {
  /**
   * The client.
   * @readonly
   */
  private readonly client: Client;
  /**
   * The event handlers.
   * @readonly
   */
  public readonly handlers: Collection<Events, Event>;

  constructor() {
    this.client = container.resolve<Client>(clientSymbol);

    this.handlers = new Collection<Events, Event>();
  }

  /**
   * Initializes the event handlers.
   */
  public async init(): Promise<void> {
    let files = readdirSync(join(resolve(), "events"));

    files = files.filter((file) => file.endsWith(".js") && /handler/i.test(file));

    for (const file of files) {
      const handler = new (await import(join(resolve(), "events", file))).default() as Event;
      this.handlers.set(handler.event, handler);
    }

    this.client.logger.info(`Loaded ${this.handlers.size} event handlers`);
  }

  /**
   * Runs an event.
   *
   * @param id - The event identifier.
   * @param args - The arguments.
   */
  public async run(event: Events, ...args: any[]): Promise<void> {
    const handler = this.handlers.get(event);

    if (!handler) throw new Error(`Event handler ${event} doesn't exist`);

    await handler.run(...args);
  }
}
