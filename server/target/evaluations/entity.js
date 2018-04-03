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
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const class_validator_1 = require("class-validator");
const entity_1 = require("../students/entity");
const entity_2 = require("../teachers/entity");
let Evaluation = class Evaluation extends typeorm_1.BaseEntity {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], Evaluation.prototype, "id", void 0);
__decorate([
    class_validator_1.IsString(),
    typeorm_1.Column('text', { nullable: true }),
    __metadata("design:type", String)
], Evaluation.prototype, "flag", void 0);
__decorate([
    class_validator_1.IsString(),
    typeorm_1.Column('text', { nullable: true }),
    __metadata("design:type", String)
], Evaluation.prototype, "remark", void 0);
__decorate([
    typeorm_1.Column('text', { nullable: true }),
    __metadata("design:type", Date)
], Evaluation.prototype, "date", void 0);
__decorate([
    typeorm_1.ManyToOne(_ => entity_2.default, teacher => teacher.evaluations),
    __metadata("design:type", entity_2.default)
], Evaluation.prototype, "teacher", void 0);
__decorate([
    typeorm_1.ManyToOne(_ => entity_1.Student, student => student.evaluations),
    __metadata("design:type", entity_1.Student)
], Evaluation.prototype, "student", void 0);
Evaluation = __decorate([
    typeorm_1.Entity()
], Evaluation);
exports.Evaluation = Evaluation;
//# sourceMappingURL=entity.js.map