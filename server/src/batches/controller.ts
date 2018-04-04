import { JsonController, Post, Body, BadRequestError, Authorized, Get, Param } from 'routing-controllers'
import { IsString } from 'class-validator'
import { Batch } from './entity'

@JsonController()
export default class BatchController {

  @Authorized()
  @Post('/batches')
    async createBatch(
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

  @Authorized()
  @Get('/batches/:id([0-9]+)')
  getBatch(
    @Param('id') id: number
  ) {
    return Batch.findOneById(id)
  }
}
