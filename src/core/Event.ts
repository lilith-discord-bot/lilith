import { Events } from 'discord.js';
import { Client } from './Client';

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
  constructor(client: Client, id: string, event: Events) {
    /**
     * The client.
     * @type {Client}
     */
    this.client = client;

    /**
     * Event identifier.
     */
    this.id = id;

    /**
     * Event to trigger.
     */
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
