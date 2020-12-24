function getToken (x, y) {
    try {
        return board[x][y];
    } catch (e) {
        return null;
    }
}

// This name is garbage lol
function getNewPointFromPointAndVector(originX, originY, vector, directionSign, multiple) {
    const Vx = vector[0];
    const Vy = vector[1];

    const finalX = originX + directionSign * multiple * Vx;
    const finalY = originY + directionSign * multiple * Vy;
    return [finalX, finalY];
}

// originalTokenPosition should be an array, like [x,y].
function calculateWin (originalTokenPosition) {
    const [ originX, originY ] = originalTokenPosition;

    // If you want to change the win condition directions, you could pass in a variable that modifies this array, so the code
    // only checks some directions.
    const vectors = [
        [1,1], // downleft to upright
        [1,0], // horizontal
        [1,-1], // upleft to downright
        [0,1], // vertical
    ];

    const output = {};
    const originalToken = getToken(originX, originY);

    vectors.forEach(vector => {
        // This could be a list too.
        const contiguousPoints = new Set([originalTokenPosition]);
        // Output can be different formats. Might be even better not to have the key in the output, if that line
        // doesn't have more than 1?
        output[JSON.stringify(vector)] = contiguousPoints;

        // Need to go in positive and negative direction of the vector
        [-1, 1].forEach(directionSign => {
            // 3 can be changed to whatever the win condition length is. (x - 1, because you have original token anyways)
            for (let multiple = 1; multiple <= 3 ; multiple++) {
                const [nextX, nextY] = getNewPointFromPointAndVector(originX, originY, vector, directionSign, multiple);
                const nextToken = getToken(nextX, nextY);
                // This implies that the tokens are primitives! Won't work with objects.
                if (nextToken == originalToken) {
                    contiguousPoints.add([nextX, nextY])
                } else {
                    break;
                }
            }
        });
    });
    return output;
}

const x = 'x';


const board = [
    [x, x, x, x, x, x,],
    [x, x],
    [x, 0 , x],
    [0, x, 0, x],
    [x],
    [x],
    [x]
];

const out = calculateWin([0,0]);
console.log(out);

board = [
    [1,2,3],
    [4,5,6]
]

board.forEach(column, cIndex => {
    column.forEach(rowItem, rIndex => {
        
    })
})