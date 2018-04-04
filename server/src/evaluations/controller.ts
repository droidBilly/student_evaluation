import { JsonController, Post, Body, Authorized, Get, Param, NotFoundError } from 'routing-controllers'
import { Evaluation } from './entity'
import { Student } from '../students/entity'
import Teacher from '../teachers/entity'

@JsonController()
export default class StudentController {

  // @Authorized()
  @Post('/evaluations')
  async addStudent(
    @Body() evaluation: Evaluation
  ) {
    const teacher = await Teacher.findOneById(evaluation.teacher_id.teacher_id)
    const student = await Student.findOneById(evaluation.student_id.student_id)
    if (!teacher) throw new NotFoundError(`Teacher with id ${evaluation.teacher_id.teacher_id} does not exist!`)
    if (!student) throw new NotFoundError(`Student with id ${evaluation.student_id.student_id} does not exist!`)
    evaluation.teacher = teacher
    evaluation.student = student
    const entity =  await Evaluation.create(evaluation)
    return entity.save()
  }

  @Authorized()
  @Get('/evaluation')
  getStudents() {
    return Student.find()
  }

  @Authorized()
  @Get('/evaluation/:id([0-9]+)')
  getEvaluation(
    @Param('id') id: number
  ) {
    return Evaluation.findOneById(id)
  }
}
