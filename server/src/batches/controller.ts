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

  // @Authorized()
  @Get('/batches')
  async getBatches() {
    const batches = await Batch.find()
    batches.sort(function(a, b){return a.id - b.id})
    const batchesArray = batches.map(batch => {
      return {
        start_date: batch.start_date,
        end_date: batch.end_date,
        id: batch.id,
        name: batch.name,
        students: batch.students.length
      }
    })
    return batchesArray
  }

  // @Authorized()
  @Get('/batches/:id([0-9]+)')
  getBatch(
    @Param('id') id: number
  ) {
    return Batch.findOneById(id)
  }
}
