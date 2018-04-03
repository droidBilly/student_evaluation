import { BaseEntity, PrimaryGeneratedColumn, Column, ManyToOne, Entity } from 'typeorm'
import { IsString, IsNumber } from 'class-validator'
import { Student } from '../students/entity'
import Teacher from '../teachers/entity'

type Flag = 'red' | 'yellow' | 'green'

@Entity()
export class Evaluation extends BaseEntity {

  @PrimaryGeneratedColumn()
  id?: number

  @IsString()
  @Column('text', { nullable: true})
  flag: Flag

  @IsString()
  @Column('text', { nullable: true})
  remark: string

  @Column('text', { nullable: true})
  date: Date

  @ManyToOne(_ => Teacher, teacher => teacher.evaluations)
  teacher: Teacher

  @ManyToOne(_ => Student, student => student.evaluations)
  student: Student
}
