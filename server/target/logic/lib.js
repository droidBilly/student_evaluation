"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function returnBatchPercentages(batch) {
    let grey = 0;
    let red = 0;
    let yellow = 0;
    let green = 0;
    batch.students.map(student => {
        const last_evaluation = student.evaluations[student.evaluations.length - 1];
        if (last_evaluation === undefined)
            grey += 1;
        else {
            switch (last_evaluation.flag) {
                case 'red':
                    red += 1;
                case 'yellow':
                    yellow += 1;
                case 'green':
                    green += 1;
            }
        }
    });
    let sum = batch.students.length;
    return batch.status_bar = {
        grey: grey / sum * 100,
        red: red / sum * 100,
        yellow: yellow / sum * 100,
        green: green / sum * 100
    };
}
exports.returnBatchPercentages = returnBatchPercentages;
function returnLastFlagColor(students) {
    return students.map(student => {
        if (student.evaluations[student.evaluations.length - 1] === undefined)
            student.evaluations = 'grey';
        else
            student.evaluations = student.evaluations[student.evaluations.length - 1].flag;
    });
}
exports.returnLastFlagColor = returnLastFlagColor;
//# sourceMappingURL=lib.js.map