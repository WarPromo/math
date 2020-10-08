
//[t, x, y]
//I originally made this script to cheat in games, and simulate player like movements where x and y are pitch and yaw

let movements = [
  [0, 1, 3],
  [1, 5, 2],
  [3, 2, 4]
];

let genPoints = generatePoints(movements);

let xmovement = solveSystem(generateSystem(genPoints[0]));
let ymovement = solveSystem(generateSystem(genPoints[1]));

console.log(eqToString(xmovement));
console.log(eqToString(ymovement));

function generateSystems(movements){
  let systems = [];
  for(var a=0; a+3<=movements.length; a++){
    let points = [];
    for(var b=a; b-a<3; b++) points.push([movements[b][0], movements[b][1]])
    systems.push(solveSystem(generateSystem(points)));
  }
  return systems;
}


function eqToString(equation){
  let string = "";
  for(var a=0; a<equation.length; a++) string += `+${equation[a]}*x**${a}`;
  return string;
}
/*
function derivative(equation){
  let derivative = [];
  for(var a=1; a<equation.length; a++) derivative.push(equation[a]*a)
  return derivative;
}
*/
function generatePoints(positions){
  let ticksvsx = [];
  let ticksvsy = [];

  for(var a=0; a<positions.length; a++){
    ticksvsx.push([positions[a][0], positions[a][1]])
    ticksvsy.push([positions[a][0], positions[a][2]]);
  }

  return [ticksvsx, ticksvsy];
}

function generateSystem(points){
  let system = [];
  for(var a=0; a<points.length; a++){
    let equation = [];
    for(var b=0; b<points.length; b++){
      equation.push(points[a][0]**b);
    }
    equation.push(points[a][1])
    system.push(equation);
  }
  return system;
}

function solveSystem(system){
  for(var row=0; row<system.length-1; row++){
    if(system[row][row]==0){
      for(var swaps=0; swaps<system.length; swaps++){
        if(system[swaps][row]!=0){
          let match = system[swaps].slice();
          system[swaps]=system[row]
          system[row]=match;
        }
      }
    }
  }

  for(var row=0; row<system.length-1; row++){
    for(var equation=row+1; equation<system.length; equation++){
      let multiplier = -system[equation][row]/system[row][row]
      for(var number=0; number<system[equation].length; number++){
        system[equation][number] += system[row][number] * multiplier;
      }
    }
  }

  let answers = [];
  for(var generate=0; generate<system.length; generate++) answers.push(0);

  for(var row=system.length-1; row>=0; row--){
    answers[row] = system[row][system[row].length-1]/system[row][row];
    for(var equation=row-1; equation>=0; equation--){
      system[equation][system[equation].length-1] -= answers[row]*(system[equation][row])
    }
  }

  return answers;
}
