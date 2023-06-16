import { Events } from "discord.js";
import { container } from "tsyringe";

import { Client } from "./Client";

import { clientSymbol } from "../utils/Constants";

export class Event {
  /**
   * The client.
   * @type {Client}
   * @readonly
   */
  readonly client: Client;

  /**
   * Event identifier.
   * @type {string}
   * @readonly
   */
  readonly id: string;

  /**
   * Event to trigger.
   * @type {Events}
   * @readonly
   */
  readonly event: Events;

  /**
   * Creates a new event.
   *
   * @param client - The client.
   * @param id - The event identifier.
   * @param event - The event to trigger.
   */
  constructor(id: string, event: Events) {
    this.client = container.resolve<Client>(clientSymbol);

    this.id = id;

    this.event = event;
  }

  /**
   * Runs the event.
   *
   * @param args - The arguments.
   */
  async run(...args: any[]): Promise<void> {
    throw new Error(`Event ${this.id} doesn't provide a run method.`);
  }
}
