import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne } from 'typeorm'
import { BaseEntity } from 'typeorm/repository/BaseEntity'
import { IsString, IsBoolean } from 'class-validator'
import { Student } from '../students/entity';

@Entity()
export class Batch extends BaseEntity {

  @PrimaryGeneratedColumn()
  id?: number;

  @IsString()
  @Column('text', { nullable: false })
  name: string

  @Column('text', { nullable: false })
  start_date: Date

  @Column('text', { nullable: false })
  end_date: Date

  @OneToMany(_ => Student, student => student.batch, {eager: true})
  students: Student[]

}
