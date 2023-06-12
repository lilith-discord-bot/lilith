import { Embed } from './Embed';

import { Context } from '../../core/Interaction';

// TODO refactor
export class EventEmbed extends Embed {
  constructor(
    alerts: {
      name: string;
      value: string;
    }[],
    ctx: Context,
  ) {
    super();

    this.data.title = 'Sanctuary Events';

    this.data.description = `Tracking the current events in the Sanctuary. Keep in mind that the events can be delayed or the service can be down.`

    this.data.url = `${process.env.ARMORY_URL}/events`;

    this.data.fields = alerts
  }
}
