import { JsonController, Post, Param, Get, Body, Authorized, CurrentUser } from 'routing-controllers'
import Teacher from './entity';

@JsonController()
export default class TeacherController {

  //@Authorized //TODO: activate
  @Post('/teachers')
  async addTeacher(
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
  @Get('/teacher')
  getTeachers(
    @CurrentUser() teacher: Teacher,
  ) {
    return teacher
  }

  @Authorized()
  @Get('/teachers')
  allTeachers() {
    return Teacher.find()
  }
}
