import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class Guild {
  
  @PrimaryColumn()
  id: string;

  @Column('json', {
    nullable: false,
    default: {
      events: {
        channel: null,
        boss: {
          enabled: false,
          role: null,
          schedule: false,
        },
        helltide: {
          enabled: false,
          role: null,
          schedule: false,
        },
        legion: {
          enabled: false,
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
        role: string;
        schedule: boolean;
      };
      helltide: {
        enabled: boolean;
        role: string;
        schedule: boolean;
      };
      legion: {
        enabled: boolean;
        role: string;
        schedule: boolean;
      };
    };
  };
}