


/*
rotatePointAroundAngleA(Vertical Angle of Line, x coordinate, y coordinate, Horizontal Angle of Line)
Using 90 as the horizontal angle of the line will not work as tan(90) is infinity.
To compensate what I would do is add a tiny number to the angle like 0.00001,
this will instead take tan(90.00001) instead, and let me use the same function.
*/

function rotatePointAroundAngleA(pitch,x,z,a){
  //Create a perpendicular line to the horizontal angle, that also passes through point (x,y)
  let slopePoints = Math.tan(a+90);
  let slopeLine = Math.tan(a);

  let yIntercept = -(slopePoints*x) + z;
  let xIntersection = yIntercept/(slopeLine-slopePoints);
  let zIntersection = xIntersection * slopeLine;
  //Calculate distance from the intersection of the two lines, and point (x,y)
  let xDist = x - xIntersection;
  let zDist = z - zIntersection;
  let dist = (xDist**2 + zDist**2)**0.5

  //Calculate the Y of the new point
  let y = dist * Math.sin(pitch);
  //Scale the points
  let h = dist * Math.cos(pitch);

  let newX = (h/dist) * xDist + xIntersection;
  let newZ = (h/dist) * zDist + zIntersection;

  return [newX, y, newZ];
}
