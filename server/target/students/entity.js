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
const BaseEntity_1 = require("typeorm/repository/BaseEntity");
const class_validator_1 = require("class-validator");
const entity_1 = require("../batches/entity");
const entity_2 = require("../evaluations/entity");
let Student = class Student extends BaseEntity_1.BaseEntity {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], Student.prototype, "id", void 0);
__decorate([
    class_validator_1.IsString(),
    typeorm_1.Column('text', { nullable: false }),
    __metadata("design:type", String)
], Student.prototype, "first_name", void 0);
__decorate([
    class_validator_1.IsString(),
    typeorm_1.Column('text', { nullable: false }),
    __metadata("design:type", String)
], Student.prototype, "last_name", void 0);
__decorate([
    class_validator_1.IsString(),
    typeorm_1.Column('text', { nullable: false }),
    __metadata("design:type", String)
], Student.prototype, "profile_pic", void 0);
__decorate([
    typeorm_1.ManyToOne(_ => entity_1.Batch, batch => batch.students),
    __metadata("design:type", entity_1.Batch)
], Student.prototype, "batch", void 0);
__decorate([
    typeorm_1.OneToMany(_ => entity_2.Evaluation, evaluation => evaluation.student, { eager: true }),
    __metadata("design:type", Array)
], Student.prototype, "evaluations", void 0);
Student = __decorate([
    typeorm_1.Entity()
], Student);
exports.Student = Student;
//# sourceMappingURL=entity.js.map