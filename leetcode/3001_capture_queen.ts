type Point = [number, number];

function minMovesToCaptureTheQueen(a: number, b: number, c: number, d: number, e: number, f: number): number {
  let n = 8;
  let rook: Point = [a, b];
  let bishop: Point = [c, d];
  let queen: Point = [e, f];
  // Situation 1: Rook can capture the queen
  if (rook[0] === queen[0]) {
    if (bishop[0] === queen[0]) {
      // Bishop at the same column
      let up = Math.max(rook[1], queen[1]);
      let down = Math.min(rook[1], queen[1]);
      if (bishop[1] > up || bishop[1] < down) {
        // Bishop is not blocking
        return 1;
      } else {
        // Bishop is blocking, move bishop away
        return 2;
      }
    }
    return 1;
  }
  if (rook[1] === queen[1]) {
    if (bishop[1] === queen[1]) {
      // Bishop at the same row
      let left = Math.min(rook[0], queen[0]);
      let right = Math.max(rook[0], queen[0]);
      if (bishop[0] > right || bishop[0] < left) {
        // Bishop is not blocking
        return 1;
      } else {
        // Bishop is blocking, move bishop away
        return 2;
      }
    }
    return 1;
  }
  // Situation 2: Bishop can capture the queen
  function isSameDiagonal(p1: Point, p2: Point): boolean {
    return Math.abs(p1[0] - p2[0]) === Math.abs(p1[1] - p2[1]);
  }

  if (isSameDiagonal(bishop, queen)) {
    let left = Math.min(bishop[0], queen[0]);
    let right = Math.max(bishop[0], queen[0]);
    if (isSameDiagonal(rook, queen) && isSameDiagonal(rook, bishop)) {
      // Rook is at the same diagonal
      if (rook[0] > right || rook[0] < left) {
        // Rook is not blocking
        return 1;
      } else {
        // Rook is blocking, move rook away
        return 2;
      }
    }
    return 1;
  }
  // Situation 3: Rook and Bishop can't capture the queen directly
  return 2;
};