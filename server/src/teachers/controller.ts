import { JsonController, Post, Param, Get, Body, Authorized, CurrentUser } from 'routing-controllers'
import Teacher from './entity';

@JsonController()
export default class TeacherController {


  @Post('/teachers')
  async signup(
    @CurrentUser() teacher: Teacher,
    @Body() new_teacher: Teacher
  ) {
    if (teacher.role === 'SUPER_ADMIN') {
      const {password, ...rest} = new_teacher
      const entity = Teacher.create(rest)
      await entity.setPassword(password)
      return entity.save()
    }
    else {
      return {
        message: 'You are not allowed to add teachers'
      }
    }
  }

  @Authorized()
  @Get('/teachers/:id([0-9]+)')
  getTeachers(
    @Param('id') id: number
  ) {
    return Teacher.findOneById(id)
  }

  @Authorized()
  @Get('/teachers')
  allTeachers() {
    return Teacher.find()
  }
}
