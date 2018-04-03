import { JsonController, Post, Body, BadRequestError, Authorized, Get } from 'routing-controllers'
import { IsString } from 'class-validator'
import {Batch} from './entity'

@JsonController()
export default class BatchController {

  @Authorized()
  @Post('/batches')
    async signup(
      @Body() batch: Batch
    ) {
      const entity = Batch.create(batch)
      return entity.save()
    }

  @Authorized()
  @Get('/batches')
  getBatches() {
    return Batch.find()
  }
}
