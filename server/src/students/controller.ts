import { JsonController, Post, Body, Authorized, Get, Param, NotFoundError, Delete, HttpCode, Patch } from 'routing-controllers'
import { IsString } from 'class-validator'
import { Student } from './entity'
import { Batch } from '../batches/entity'

@JsonController()
export default class StudentController {

  // @Authorized()
  @Post('/students')
    async addStudent(
      @Body() student: Student,
      @Body('batch_id') batch_id
    ) {
      console.log(batch_id.batch_id)
      const batch = await Batch.findOneById(batch_id.batch_id)
      if (!batch) throw new NotFoundError(`Batch with id ${student.batch_id.batch_id} does not exist!`)
      student.batch = batch
      const entity =  await Student.create(student)
      return entity.save()
    }

  @Authorized()
  @Get('/students')
  async getStudents() {
    const students = await Student.find()
    students.map(student =>{
      student.evaluations = student.evaluations.map(evaluation => {
        const {teacher, ...evaluationData} = evaluation
        return evaluationData
      })
    })
    return students
  }

  // @Authorized() /TODO: activate Authorized again!
  @Get('/students/:id([0-9]+)')
  async getStudent(
    @Param('id') id: number
  ) {
    const student = await Student.findOneById(id)
    student.evaluations = student.evaluations.map(evaluation => {
      const {teacher, ...evaluationData} = evaluation
       return evaluationData
    })
    return student
  }

  @Authorized()
  @Patch('/students/:id([0-9]+)')
  async updateStudent(
    @Param('id') studentId: number,
    @Body() update: Partial<Student>
  ) {
    const student = await Student.findOneById(studentId)
    if (!student) throw new NotFoundError('Student does not exist!')
    const new_student = await Student.merge(student, update).save()
    new_student.evaluations = new_student.evaluations.map(evaluation => {
      const {teacher, ...evaluationData} = evaluation
       return evaluationData
    })
    return new_student
  }

  @Authorized()
  @Delete('/students/:id([0-9]+)')
  @HttpCode(201)
  async deleteStudent(
    @Param('id') id: number
  ) {
    const student = await Student.findOneById(id)
    if (!student) throw new NotFoundError(`Student does not exist!`)
    await student.remove()

    return {
      message: "You succesfully deleted the student"
    }
  }
}
