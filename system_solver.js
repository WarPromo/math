
let mySystem = [
  [1,2,3,4],
  [1,2,3,4],
  [1,2,3]
]

function solveSystem(system){

  //Use gaussian elimination to make the triangle
  for(var row=0; row<system.length-1; row++){
    for(var equation=row+1; equation<system.length; equation++){
      let multiplier = -system[equation][row]/system[row][row]
      for(var number=0; number<system[equation].length; number++){
        system[equation][number] += system[row][number] * multiplier;
      }
    }
  }

  //Present the answers
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

console.log(solveSystem(mySystem));
