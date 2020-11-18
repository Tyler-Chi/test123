// Let's just use numbers to designate colors.
const grid = [
    [1, 1, 1, 1, 3],
    [1, 1, 2, 1, 3],
    [1, 4, 2, 3, 1]
];

/**
 * 
 * @param {Array{Array}} inputGrid 
 */
function findBiggestIslandSize(inputGrid) {

    let maxIslandSize = 0;

    const visitedNodes = {};

    function populateVisitedNodes (x, y) {
        // Turn x and y into some string format
        let newKey = x + '&' + y;
        visitedNodes[newKey] = true;
    };

    function isNodeVisited (x, y) {
        // Helper function, to check if a node is visited nodes
        let possibleKey = x + '&' + y;
        return visitedNodes[possibleKey];
    }

    for (let y = 0; y < inputGrid.length ; y++ ) {
        for (let x = 0 ; x < inputGrid.length ; x++) {
            if (isNodeVisited(x, y)) {
                continue;
            }
            // By this time, we know that the node is unvisited.

            let currentValue = inputGrid[y, x];
            let islandSize = dfs(x, y, currentValue);

            // We put to put something here later 
            maxIslandSize = islandSize > maxIslandSize ? islandSize : maxIslandSize;
        }
    }

    /**
     * 
     * @param {Integer} x
     * @param {Integer} y 
     */
    function dfs(x, y, currentValue) {
        let currentIslandSize = 1;
        let neighborCoordinates = getNeighborCoordinates(x, y);

        // [0,0]
        // getNeighborCoordinates => [ [0,1], [0,1]   ]

        populateVisitedNodes(x, y);

        neighborCoordinates.forEach(neighborCoordinates => {
            dfsHelper(neighborCoordinates[0], neighborCoordinates[1]);
        });

        function dfsHelper(x, y) {
            populateVisitedNodes(x, y);
            if (inputGrid[y][x] === currentValue) {
                currentIslandSize += 1;
                // Here, we would want to somehow mark that this node has been checked

                const nextCoordinates = getNeighborCoordinates(x, y);

                // Here, we need to make sure that we're not going to visited islands again.

                nextCoordinates.forEach((nextCoordinate) => {
                    let nextX = nextCoordinate[0];
                    let nextY = nextCoordinate[1];
                    if (isNodeVisited(nextX, nextY)) {
                        return;
                    }
                    dfsHelper(nextCoordinate[0], nextCoordinate[1]);
                });

            } else {
                // breakout step
                return;
            }
        }
        return currentIslandSize;
    }


    /**
     * @param {Integer} x
     * @param {Integer} y
     * 
     * @return {List} valid coordinates. For example, if we pass in 0,0
     *                we would want : [[0, 1], [1, 0]]
     * 
     *                if we were to pass in [1, 1]
     *                then we would want: [[0,1 ], [1, 0], [2, 1], [2,1]]
     * 
     *                constraints are that the coordinates cannot be outside of the boundaries
     */
    function getNeighborCoordinates(x, y) {

        const output = [];
        const inputGridWidth = inputGrid[0].length;
        const inputGridHeight = inputGrid.length;

        const possibleXValues = [];
        const possibleYValues = [];
        if (x + 1 <= inputGridWidth) {
            possibleXValues.push(x+1);
        }
        if (x - 1 >= 0) {
            possibleXValues.push(x - 1);
        }
        if ( y + 1 <= inputGridHeight) {
            possibleYValues.push(y + 1)
        }
        if (y - 1 >= 0) {
            possibleYValues.push(y - 1);
        }

        // So at this point, possibleXValues would be something liek [ ]
        // possibleYValues would be something like [1, 3]
        possibleXValues.forEach((x) => {
            possibleYValues.forEach((y) => {
                output.push([x, y]);
            })
        });
        return output;
    }


    return maxIslandSize;
}

let test = findBiggestIslandSize(grid);
console.log("test: ", test);

