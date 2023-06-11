import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity()
export class Guild {
    @PrimaryColumn()
    id: string

    @Column('json',
    {
        nullable: false,
        default: {
            alerts: {
                enabled: false,
                channel: null,
                role: null
            }
        } 
    })
    settings: {
        alerts: {
            enabled: boolean,
            channel: string,
            role: string
        }
    }
}