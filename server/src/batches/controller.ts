import { JsonController, Post, Body, BadRequestError, Authorized, Get, Param, Patch, NotFoundError } from 'routing-controllers'
import { IsString } from 'class-validator'
import { Batch } from './entity'
import {returnLastFlagColor, returnBatchPercentages} from '../logic/lib'

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
  @Patch('/batches/:id([0-9]+)')
  async updateBatch(
    @Param('id') batchId: number,
    @Body() update: Partial<Batch>
  ) {
    const batch = await Batch.findOneById(batchId)
    if (!batch) throw new NotFoundError('Batch does not exist!')
    const updated_batch = await Batch.merge(batch, update).save()

    returnBatchPercentages(updated_batch)
    returnLastFlagColor(updated_batch.students)
    return updated_batch
  }

  @Authorized()
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

  @Authorized()
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
