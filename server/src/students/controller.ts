import { JsonController, Post, Body, Authorized, Get, Param, NotFoundError, Delete, HttpCode } from 'routing-controllers'
import { IsString } from 'class-validator'
import { Student } from './entity'
import { Batch } from '../batches/entity'

@JsonController()
export default class StudentController {

  // @Authorized()
  @Post('/students')
    async addStudent(
      @Body() student: Student
    ) {
      const batch = await Batch.findOneById(student.batch_id.batch_id)
      if (!batch) throw new NotFoundError(`Batch with id ${student.batch_id.batch_id} does not exist!`)
      student.batch = batch
      const entity =  await Student.create(student)
      return entity.save()
    }

  // @Authorized()
  @Get('/students')
  getStudents() {
    return Student.find()
  }

  // @Authorized()
  @Get('/students/:id([0-9]+)')
  getStudent(
    @Param('id') id: number
  ) {
    return Student.findOneById(id)
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
