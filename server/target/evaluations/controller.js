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
const entity_2 = require("../students/entity");
const entity_3 = require("../teachers/entity");
let StudentController = class StudentController {
    async addStudent(evaluation) {
        const teacher = await entity_3.default.findOneById(evaluation.teacher_id.teacher_id);
        const student = await entity_2.Student.findOneById(evaluation.student_id.student_id);
        if (!teacher)
            throw new routing_controllers_1.NotFoundError(`Teacher with id ${evaluation.teacher_id.teacher_id} does not exist!`);
        if (!student)
            throw new routing_controllers_1.NotFoundError(`Student with id ${evaluation.student_id.student_id} does not exist!`);
        evaluation.teacher = teacher;
        evaluation.student = student;
        const entity = await entity_1.Evaluation.create(evaluation);
        return entity.save();
    }
    getStudents() {
        return entity_2.Student.find();
    }
    getEvaluation(id) {
        return entity_1.Evaluation.findOneById(id);
    }
};
__decorate([
    routing_controllers_1.Post('/evaluations'),
    __param(0, routing_controllers_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [entity_1.Evaluation]),
    __metadata("design:returntype", Promise)
], StudentController.prototype, "addStudent", null);
__decorate([
    routing_controllers_1.Authorized(),
    routing_controllers_1.Get('/evaluation'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], StudentController.prototype, "getStudents", null);
__decorate([
    routing_controllers_1.Authorized(),
    routing_controllers_1.Get('/evaluation/:id([0-9]+)'),
    __param(0, routing_controllers_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], StudentController.prototype, "getEvaluation", null);
StudentController = __decorate([
    routing_controllers_1.JsonController()
], StudentController);
exports.default = StudentController;
//# sourceMappingURL=controller.js.map