import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity('core_event_store')
export class EventStoreOrmEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('uuid')
  aggregate_id: string;

  @Column()
  aggregate_type: string;

  @Column()
  event_type: string;

  @Column('jsonb')
  event_data: any;

  @Column()
  version: number;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;
} 