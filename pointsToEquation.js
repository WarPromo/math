function findLine(p1,p2){
  let slope = (p2[1]-p1[1])/(p2[0]-p1[0]);
  let yIntercept = -slope * p1[0] + p1[1];
  return [slope, yIntercept];
}

function returnAbs(x1, x2, equation){
  let range1 = `(((x - (${x1})) + abs(x - (${x1})))÷ (2x - (${2 * x1})))`
  let range2 = `(((-x + (${x2})) + abs(-x + (${x2})))÷ (-2x + (${2 * x2})))`
  let finalString = `((${range1} * ${range2}) * (${equation[0]}x + ${equation[1]}))`
  return finalString;
}

function generateFullEquation(pairs){
  let string = "";
  for(var i=0; i<pairs.length; i++){

    string+=`+${returnAbs(pairs[i][0][0], pairs[i][1][0], findLine(pairs[i][0], pairs[i][1]))}`;
  }
  return string;
}

let points = [
  [-9,0],
  [-8.23, 0.38],
  [-8, 0.69],
  [-7.97, 1.65],
  [-7.77, 1.88],
  [-7.38, 2.12],
  [-7, 2.25],
  [-6.66, 2.25],
  [-6.56, 2.56],
  [-6.3, 2.94],
  [-6, 3.17],
  [-5.54, 3.36],
  [-5.11, 3.37],
  [-4.54, 3.315],
  [-1.42, 3.0],
  [-0.85, 3.17],
  [-0.37, 3.39],
  [0,4]
]
let pointsArr = [];
for(var i=1; i<points.length; i++) pointsArr.push([points[i-1],points[i]])
console.log(generateFullEquation(pointsArr));
