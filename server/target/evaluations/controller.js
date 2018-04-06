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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0)
            t[p[i]] = s[p[i]];
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
const routing_controllers_1 = require("routing-controllers");
const entity_1 = require("./entity");
const entity_2 = require("../students/entity");
const entity_3 = require("../batches/entity");
const entity_4 = require("../teachers/entity");
const lib_1 = require("../logic/lib");
let StudentController = class StudentController {
    async addStudent(evaluation, student_id, teacher_id) {
        const teacher = await entity_4.default.findOneById(teacher_id.teacher_id);
        const student = await entity_2.Student.findOneById(student_id.student_id);
        if (!teacher)
            throw new routing_controllers_1.NotFoundError(`Teacher with id ${teacher_id.teacher_id} does not exist!`);
        if (!student)
            throw new routing_controllers_1.NotFoundError(`Student with id ${student_id.student_id} does not exist!`);
        evaluation.teacher = teacher;
        evaluation.student = student;
        if (evaluation.date === undefined)
            evaluation.date = new Date().toJSON().slice(0, 10);
        const entity = await entity_1.Evaluation.create(evaluation);
        await entity.save();
        return student;
    }
    async updateEvaluation(evaluationId, currentTeacher, update) {
        const evaluation = await entity_1.Evaluation.findOneById(evaluationId);
        if (!evaluation)
            throw new routing_controllers_1.NotFoundError('Evaluation does not exist!');
        if (evaluation.teacher.id !== currentTeacher.id)
            throw new routing_controllers_1.UnauthorizedError('You are not allowed to edit other teachers evaluation');
        const new_evaluation = await entity_1.Evaluation.merge(evaluation, update).save();
        const { teacher } = new_evaluation, evaluationData = __rest(new_evaluation, ["teacher"]);
        return evaluationData;
    }
    async getEvaluations() {
        const evaluations = await entity_1.Evaluation.find();
        return evaluations.map(evaluation => {
            const { teacher } = evaluation, evaluationData = __rest(evaluation, ["teacher"]);
            return evaluationData;
        });
    }
    async getEvaluation(id) {
        const evaluation = await entity_1.Evaluation.findOneById(id);
        const { teacher } = evaluation, evaluationData = __rest(evaluation, ["teacher"]);
        return evaluationData;
    }
    async getRandom(batchId) {
        const batch = await entity_3.Batch.findOneById(batchId);
        return lib_1.returnRandomStudentId(batch.students);
    }
    async getNext(batchId) {
        return { next: 'student3' };
    }
};
__decorate([
    routing_controllers_1.Authorized(),
    routing_controllers_1.Post('/evaluations'),
    __param(0, routing_controllers_1.Body()),
    __param(1, routing_controllers_1.Body('student_id')),
    __param(2, routing_controllers_1.Body('teacher_id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [entity_1.Evaluation, Object, Object]),
    __metadata("design:returntype", Promise)
], StudentController.prototype, "addStudent", null);
__decorate([
    routing_controllers_1.Authorized(),
    routing_controllers_1.Patch('/evaluations/:id([0-9]+)'),
    __param(0, routing_controllers_1.Param('id')),
    __param(1, routing_controllers_1.CurrentUser()),
    __param(2, routing_controllers_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, entity_4.default, Object]),
    __metadata("design:returntype", Promise)
], StudentController.prototype, "updateEvaluation", null);
__decorate([
    routing_controllers_1.Authorized(),
    routing_controllers_1.Get('/evaluations'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], StudentController.prototype, "getEvaluations", null);
__decorate([
    routing_controllers_1.Authorized(),
    routing_controllers_1.Get('/evaluations/:id([0-9]+)'),
    __param(0, routing_controllers_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], StudentController.prototype, "getEvaluation", null);
__decorate([
    routing_controllers_1.Authorized(),
    routing_controllers_1.Get('/batches/:id([0-9]+)/random'),
    __param(0, routing_controllers_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], StudentController.prototype, "getRandom", null);
__decorate([
    routing_controllers_1.Get('/evaluations/next'),
    __param(0, routing_controllers_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], StudentController.prototype, "getNext", null);
StudentController = __decorate([
    routing_controllers_1.JsonController()
], StudentController);
exports.default = StudentController;
//# sourceMappingURL=controller.js.map