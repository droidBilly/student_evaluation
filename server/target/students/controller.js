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
const entity_2 = require("../batches/entity");
let StudentController = class StudentController {
    async addStudent(student) {
        const batch = await entity_2.Batch.findOneById(student.batch_id.batch_id);
        if (!batch)
            throw new routing_controllers_1.NotFoundError(`Batch with id ${student.batch_id.batch_id} does not exist!`);
        student.batch = batch;
        const entity = await entity_1.Student.create(student);
        return entity.save();
    }
    async getStudents() {
        const students = await entity_1.Student.find();
        students.map(student => {
            student.evaluations = student.evaluations.map(evaluation => {
                const { teacher } = evaluation, evaluationData = __rest(evaluation, ["teacher"]);
                return evaluationData;
            });
        });
        return students;
    }
    async getStudent(id) {
        const student = await entity_1.Student.findOneById(id);
        student.evaluations = student.evaluations.map(evaluation => {
            const { teacher } = evaluation, evaluationData = __rest(evaluation, ["teacher"]);
            return evaluationData;
        });
        return student;
    }
    async updateStudent(studentId, update) {
        const student = await entity_1.Student.findOneById(studentId);
        if (!student)
            throw new routing_controllers_1.NotFoundError('Student does not exist!');
        const new_student = await entity_1.Student.merge(student, update).save();
        new_student.evaluations = new_student.evaluations.map(evaluation => {
            const { teacher } = evaluation, evaluationData = __rest(evaluation, ["teacher"]);
            return evaluationData;
        });
        return new_student;
    }
    async deleteStudent(id) {
        const student = await entity_1.Student.findOneById(id);
        if (!student)
            throw new routing_controllers_1.NotFoundError(`Student does not exist!`);
        await student.remove();
        return {
            message: "You succesfully deleted the student"
        };
    }
};
__decorate([
    routing_controllers_1.Post('/students'),
    __param(0, routing_controllers_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [entity_1.Student]),
    __metadata("design:returntype", Promise)
], StudentController.prototype, "addStudent", null);
__decorate([
    routing_controllers_1.Get('/students'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], StudentController.prototype, "getStudents", null);
__decorate([
    routing_controllers_1.Get('/students/:id([0-9]+)'),
    __param(0, routing_controllers_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], StudentController.prototype, "getStudent", null);
__decorate([
    routing_controllers_1.Patch('/students/:id([0-9]+)'),
    __param(0, routing_controllers_1.Param('id')),
    __param(1, routing_controllers_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, entity_1.Student]),
    __metadata("design:returntype", Promise)
], StudentController.prototype, "updateStudent", null);
__decorate([
    routing_controllers_1.Authorized(),
    routing_controllers_1.Delete('/students/:id([0-9]+)'),
    routing_controllers_1.HttpCode(201),
    __param(0, routing_controllers_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], StudentController.prototype, "deleteStudent", null);
StudentController = __decorate([
    routing_controllers_1.JsonController()
], StudentController);
exports.default = StudentController;
//# sourceMappingURL=controller.js.map