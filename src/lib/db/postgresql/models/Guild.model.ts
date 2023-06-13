import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class Guild {

  @PrimaryColumn()
  id: string;

  @Column('json', {
    nullable: false,
    default: {
      events: {
        boss: {
          enabled: false,
          channel: null,
          role: null,
          schedule: false,
        },
        helltide: {
          enabled: false,
          channel: null,
          role: null,
          schedule: false,
        },
        legion: {
          enabled: false,
          channel: null,

          role: null,
          schedule: false,
        },
      },
    },
  })
  settings: {
    events: {
      channel: null,
      boss: {
        enabled: boolean;
        channel: string;
        role: string;
        schedule: boolean;
      };
      helltide: {
        enabled: boolean;
        channel: string;
        role: string;
        schedule: boolean;
      };
      legion: {
        enabled: boolean;
        channel: string;
        role: string;
        schedule: boolean;
      };
    };
  };
}