import { JsonController, Post, Body, Authorized, Get, Param, NotFoundError, CurrentUser, Patch, UnauthorizedError } from 'routing-controllers'
import { Evaluation } from './entity'
import { Student } from '../students/entity'
import Teacher from '../teachers/entity'

@JsonController()
export default class StudentController {

  @Authorized()
  @Post('/evaluations')
  async addStudent(
    @Body() evaluation: Evaluation
    @Body('student_id') student_id
    @Body('teacher_id') teacher_id
  ) {
    const teacher = await Teacher.findOneById(teacher_id.teacher_id)
    const student = await Student.findOneById(student_id.student_id)
    if (!teacher) throw new NotFoundError(`Teacher with id ${teacher_id.teacher_id} does not exist!`)
    if (!student) throw new NotFoundError(`Student with id ${student_id.student_id} does not exist!`)
    evaluation.teacher = teacher
    evaluation.student = student
    if (evaluation.date === undefined) evaluation.date = new Date().toJSON().slice(0,10)
    const entity =  await Evaluation.create(evaluation)
    await entity.save()
    return student;
  }

  @Authorized()
  @Patch('/evaluations/:id([0-9]+)')
  async updateEvaluation(
    @Param('id') evaluationId: number,
    @CurrentUser() currentTeacher: Teacher,
    @Body() update: Partial<Evaluation>
  ) {
    const evaluation = await Evaluation.findOneById(evaluationId)
    if (!evaluation) throw new NotFoundError('Evaluation does not exist!')
    if (evaluation.teacher.id !== currentTeacher.id) throw new UnauthorizedError('You are not allowed to edit other teachers evaluation')
    await Evaluation.merge(evaluation, update).save()
    const {teacher, ...evaluationData} = evaluation
    return evaluationData
  }

  @Authorized()
  @Get('/evaluations')
  async getEvaluations() {
    const evaluations = await Evaluation.find()
    return evaluations.map(evaluation => {
      const {teacher, ...evaluationData} = evaluation
      return evaluationData
    })

  }

  @Authorized()
  @Get('/evaluations/:id([0-9]+)')
  async getEvaluation(
    @Param('id') id: number
  ) {
    const evaluation = await Evaluation.findOneById(id)
    const {teacher, ...evaluationData} = evaluation
    return evaluationData
  }
}
