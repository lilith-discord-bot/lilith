import fs from 'node:fs/promises';
import path from 'node:path';

import { Collection, Events } from 'discord.js';

import { Client } from '../core/Client';
import { Event } from '../core/Event';

export default class EventHandler {
  /**
   * The client.
   * @type {Client}
   * @readonly
   */
  public readonly client: Client;

  /**
   * The event handlers.
   * @type {Collection<string, Event>}
   * @readonly
   */
  public readonly handlers: Collection<Events, Event>;

  /**
   * Creates a new event handler.
   *
   * @param client - The client.
   */
  constructor(client: Client) {
    
    this.client = client;

    this.handlers = new Collection<Events, Event>();
  }

  /**
   * Initializes the event handlers.
   */
  public async init(): Promise<void> {

    const dir = path.join(__dirname, '..', 'events');

    let files = await fs.readdir(dir);

    files = files.filter(
      (file) => file.endsWith('.js') && !file.toLowerCase().includes('handler'),
    );

    this.handlers.clear();

    for (const file of files) {
      const handler = new (await import(path.join(dir, file))).default(
        this.client,
      ) as Event;

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
