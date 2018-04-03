import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne } from 'typeorm'
import { BaseEntity } from 'typeorm/repository/BaseEntity'
import { IsString, IsBoolean } from 'class-validator'
import { Batch } from '../batches/entity'
import { Evaluation } from '../evaluations/entity'

@Entity()
export class Student extends BaseEntity {

  @PrimaryGeneratedColumn()
  id?: number

  @IsString()
  @Column('text', {nullable:false})
  first_name: string

  @IsString()
  @Column('text', {nullable:false})
  last_name: string

  @IsString()
  @Column('text', {nullable:false})
  profile_pic: string

  @ManyToOne(_ => Batch, batch => batch.students)
  batch: Batch

  @OneToMany(_ => Evaluation, evaluation => evaluation.student, {eager: true})
  evaluations: Evaluation[]

}
