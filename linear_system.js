/*
Example System:
0x + 2y + 3z = 4
1x + 0y + 3z = 0
1x + 0y + 0z = 4

Returns invalid if system has infinite solutions, or has no solution
*/
let mySystem = [
  [0,2,3,4],
  [1,0,3,0],
  [1,0,0,4]
]

function solveSystem(system){
  /*Format the system based on how many zeroes it has at the beginning, not always necessary, only if a system has zeroes
  Eg.
  0x + 0y + z = 5
  0x + y + 0z = 6
  x + y + 0z = 7

  Becomes:
  x + y + 0z = 7
  0x + y + 0z = 6
  0x + 0y + z = 5
  */
  for(var row=0; row<system.length-1; row++){
    if(system[row][row]==0){
      for(var swaps=0; swaps<system.length; swaps++){
        if(system[swaps][row]!=0){
          [system[swaps], system[row]] = [system[row], system[swaps]]
        }
      }
    }
  }
  
  //Use gaussian elimination to make a triangle of zeroes
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
