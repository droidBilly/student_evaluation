"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function returnBatchPercentages(batch) {
    let grey = 0;
    let red = 0;
    let yellow = 0;
    let green = 0;
    batch.students.map(student => {
        const last_evaluation = student.evaluations.slice(-1)[0];
        if (last_evaluation === undefined)
            grey += 1;
        else {
            switch (last_evaluation.flag) {
                case 'red':
                    red += 1;
                    break;
                case 'yellow':
                    yellow += 1;
                    break;
                case 'green':
                    green += 1;
                    break;
                default:
                    return null;
            }
        }
    });
    console.log(grey, red, yellow, green);
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
        if (student.evaluations.slice(-1)[0] === undefined)
            student.evaluations = 'grey';
        else
            student.evaluations = student.evaluations.slice(-1)[0].flag;
    });
}
exports.returnLastFlagColor = returnLastFlagColor;
function returnFlagWithLikelihood() {
    let flags = ['red', 'yellow', 'green'];
    let likelihood = [0.53, 0.28, 0.19];
    let random_num = Math.random() * (1 - 0);
    let weight_sum = 0;
    for (var i = 0; i < flags.length; i++) {
        weight_sum += likelihood[i];
        weight_sum = +weight_sum.toFixed(2);
        if (random_num <= weight_sum) {
            return flags[i];
        }
    }
}
exports.returnFlagWithLikelihood = returnFlagWithLikelihood;
//# sourceMappingURL=lib.js.map