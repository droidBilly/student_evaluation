export function returnBatchPercentages(batch) {
  let grey = 0; let red = 0; let yellow = 0; let green = 0;
  batch.students.map(student => {
    const last_evaluation = student.evaluations.slice(-1)[0]
    if (last_evaluation === undefined) grey +=1
    else {
      switch(last_evaluation.flag) {
        case 'red':
          red += 1
          break
        case 'yellow':
          yellow += 1
          break
        case 'green':
          green += 1
          break
        default:
          return null
      }
    }
  })
  console.log(grey,red,yellow,green)
  let sum=batch.students.length
  return batch.status_bar = {
    grey: grey/sum*100,
    red: red/sum*100,
    yellow: yellow/sum*100,
    green: green/sum*100
  }
}

export function returnLastFlagColor(students) {
  return students.map(student => {
    if(student.evaluations.slice(-1)[0] === undefined)
      student.evaluations = 'grey'
    else
      student.evaluations = student.evaluations.slice(-1)[0].flag
  })
}
