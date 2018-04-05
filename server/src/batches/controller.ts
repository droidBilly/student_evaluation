import { JsonController, Post, Body, BadRequestError, Authorized, Get, Param } from 'routing-controllers'
import { IsString } from 'class-validator'
import { Batch } from './entity'
import {returnLastFlagColor, returnBatchPercentages} from '../logic/lib'

@JsonController()
export default class BatchController {

  // @Authorized() /TODO: activate Authorized again!
  @Post('/batches')
    async createBatch(
      @Body() batch: Batch
    ) {
      const entity = Batch.create(batch)
      return entity.save()
    }

  // @Authorized() //TODO: activate Authorized again!
  @Get('/batches')
  async getBatches() {
    const batches = await Batch.find()
    batches.sort(function(a, b){return a.id! - b.id!})
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

  // @Authorized() //TODO: activate Authorized again!
  @Get('/batches/:id([0-9]+)')
  async getBatch(
    @Param('id') id: number
  ) {
    const batch = await Batch.findOneById(id)
    returnBatchPercentages(batch!)
    returnLastFlagColor(batch!.students)
    return batch
  }
}
