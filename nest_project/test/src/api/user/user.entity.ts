import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { MatchHistoryDto } from './user.dto';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  public id!: number;

  @Column({ type: 'varchar', length: 120 , unique: true })
  public name: string;

  @Column({ type: 'varchar', length: 120, unique: true })
  public email: string;

  @Column({ type: 'varchar', length: 120 })
  public password: string;

  @Column({ type: 'boolean', default: false })
  public isLogged: boolean;

  @Column({ type: 'int', default: 0 })
  public numberOfVictories: number;

  @Column({ type: 'int', default: 0 })
  public numberOfDefeats: number;

  @Column({ type: 'int', default: 0 })
  public VictoriesInARow: number;

  @Column({ type: 'json', array: false, default: () => "'[]'" })
  public matchHistory: Array<MatchHistoryDto>;

  /* TIMESTAMPS */
  @CreateDateColumn({ type: 'timestamp' })
  public createdAt!: Date;
  @UpdateDateColumn({ type: 'timestamp' })
  public updatedAt!: Date;
}
