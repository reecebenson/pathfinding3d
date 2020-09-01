import {
  sizeOfCube,
  topLeftCoorOfPlane_x,
  topLeftCoorOfPlane_y,
  noOfCols,
  noOfRows,
} from "./config";

const shortestPathBfs = (startNode, stopNode) => {
  let start = convertCoorToNo(startNode);
  let stop = convertCoorToNo(stopNode);

  const previous = new Map();
  const visited = new Set();
  const queue = [];
  const dr = [0, -1, 0, 1];
  const dc = [-1, 0, 1, 0];

  queue.push({ node: start, dist: 0 });
  visited.add(start);

  while (queue.length > 0) {
    const { node, dist } = queue.shift();

    if (node === stop) {
      return { shortestDistande: dist, previous };
    }

    let nodeCoor = convertNosToCoor(node);
    for (let i = 0; i < 4; ++i) {
      let index_r = nodeCoor[0] + dr[i];
      let index_c = nodeCoor[1] + dc[i];
      let neighbour = [index_r, index_c];

      console.log(neighbour);
      if (
        index_r < 0 ||
        index_r > noOfRows ||
        index_c < 0 ||
        index_c > noOfCols
      )
        continue;

      let neighbour1 = convertCoorToNo(neighbour);
      console.log(`neightbour: ${neighbour1}`);
      console.log("===");

      if (!visited.has(neighbour1)) {
        previous.set(neighbour1, node);
        queue.push({ node: neighbour1, dist: dist + 1 });
        visited.add(neighbour1);
      }
    }
    console.log("++++++");
  }
  return { shortestDistance: -1, previous };
};

const convertRegularCoorToPlaneCoor = (regularCoor) => {
  let regularCoor_row = regularCoor[0];
  let regularCoor_col = regularCoor[1];

  let planeCoor_col =
    regularCoor_col * Math.ceil(sizeOfCube) - Math.abs(topLeftCoorOfPlane_x);

  let planeCoor_row =
    Math.abs(topLeftCoorOfPlane_y) - Math.ceil(sizeOfCube) * regularCoor_row;

  return [planeCoor_row, planeCoor_col];
};

const convertPlaneCoorToRegularCoor = (planeCoor) => {
  let planeCoor_row = planeCoor[0];
  let planeCoor_col = planeCoor[1];

  let regularCoor_col =
    (planeCoor_col + Math.abs(topLeftCoorOfPlane_x)) / Math.ceil(sizeOfCube);

  let regularCoor_row =
    (Math.abs(topLeftCoorOfPlane_y) - planeCoor_row) / Math.ceil(sizeOfCube);

  return [regularCoor_row, regularCoor_col];
};

const convertCoorToNo = (coor) => coor[0] * noOfCols + coor[1];

const convertNosToCoor = (A) => [Math.floor(A / noOfCols), A % noOfCols];

export {
  shortestPathBfs,
  convertRegularCoorToPlaneCoor,
  convertPlaneCoorToRegularCoor,
  convertCoorToNo,
  convertNosToCoor,
};
