import { JsonController, Post, Body, Authorized, Get, Param, NotFoundError } from 'routing-controllers'
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

  @Authorized()
  @Get('/students')
  getStudents() {
    return Student.find()
  }

  @Authorized()
  @Get('/students/:id([0-9]+)')
  getStudent(
    @Param('id') id: number
  ) {
    return Student.findOneById(id)
  }
}
