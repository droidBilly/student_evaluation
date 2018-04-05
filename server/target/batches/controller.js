"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
const routing_controllers_1 = require("routing-controllers");
const entity_1 = require("./entity");
let BatchController = class BatchController {
    async createBatch(batch) {
        const entity = entity_1.Batch.create(batch);
        return entity.save();
    }
    async getBatches() {
        const batches = await entity_1.Batch.find();
        batches.sort(function (a, b) { return a.id - b.id; });
        const batchesArray = batches.map(batch => {
            return {
                start_date: batch.start_date,
                end_date: batch.end_date,
                id: batch.id,
                name: batch.name,
                students: batch.students.length
            };
        });
        return batchesArray;
    }
    getBatch(id) {
        return entity_1.Batch.findOneById(id);
    }
};
__decorate([
    routing_controllers_1.Authorized(),
    routing_controllers_1.Post('/batches'),
    __param(0, routing_controllers_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [entity_1.Batch]),
    __metadata("design:returntype", Promise)
], BatchController.prototype, "createBatch", null);
__decorate([
    routing_controllers_1.Get('/batches'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], BatchController.prototype, "getBatches", null);
__decorate([
    routing_controllers_1.Get('/batches/:id([0-9]+)'),
    __param(0, routing_controllers_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], BatchController.prototype, "getBatch", null);
BatchController = __decorate([
    routing_controllers_1.JsonController()
], BatchController);
exports.default = BatchController;
//# sourceMappingURL=controller.js.map