const unitLength = 20;
const boxColor = 150;
const strokeColor = 50;
let columns; /* To be determined by window width*/
let rows; /* To be determined by window height */
let currentBoard;
let nextBoard;
let abc = 999;
//let nNum=0;
const heightOutput = document.querySelector('#height');
const widthOutput = document.querySelector('#width');




function reportWindowSize() {
    heightOutput.textContent = window.innerHeight;
    widthOutput.textContent = window.innerWidth;
    resizeCanvas(widthOutput.textContent, heightOutput.textContent);
}

window.onresize = reportWindowSize;

// 對應就係你個頁面啱啱load 果陣
function setup() {

    const frame = parseInt(document.getElementById("frameValue").value);
    console.log("frame value" + frame);
    frameRate(frame);
    // frameRate(frame);
    // frameRate(10);
    /* Set the canvas to be under the element #canvas*/
    // const canvas1 = createCanvas(200,200);
    // canvas1.parent(document.querySelector('#canvas1'));
    const canvas = createCanvas(windowWidth, windowHeight - 100);
    canvas.parent(document.querySelector('#canvas'));

    /*Calculate the number of columns and rows */
    columns = floor(width / unitLength);
    rows = floor(height / unitLength);
    console.log("columns is" + columns + "rows is " + rows);
    /*Making both currentBoard and nextBoard 2-dimensional matrix that has (columns * rows) boxes. */
    currentBoard = new Array(columns);
    nextBoard = new Array(columns);

    for (let i = 0; i < columns; i++) {
        currentBoard[i] = new Array(rows)
        nextBoard[i] = new Array(rows);
    }

    // Now both currentBoard and nextBoard are array of array of undefined values.
    init();  // Set the initial values of the currentBoard and nextBoard
}



// 每一個frame 都會行嘅function
// game loop
function draw() {
    const fValue = document.querySelector('#fValue');
    fValue.textContent = document.getElementById("frameValue").value;


    background(255);
    generate();
    for (let i = 0; i < columns; i++) {
        for (let j = 0; j < rows; j++) {
            if (currentBoard[i][j] == 1) {
                fill('red');
            } else {
                fill(255);
            }
            stroke(strokeColor);
            rect(i * unitLength, j * unitLength, unitLength, unitLength);
        }
    }  // draw logic here
}


function generate() {
    //Loop over every single box on the board
    for (let x = 0; x < columns; x++) {
        for (let y = 0; y < rows; y++) {
            // Count all living members in the Moore neighborhood(8 boxes surrounding)
            let neighbors = 0;
            for (let i of [-1, 0, 1]) {
                for (let j of [-1, 0, 1]) {
                    if (i === j && j === 0) {
                        continue;
                    }
                    // The modulo operator is crucial for wrapping on the edge
                    neighbors += currentBoard[(x + i + columns) % columns][(y + j + rows) % rows];
                    //   console.log("for x"+ x + "for y" + y + neighbors);
                }
            }

            //Rules of Life
            if (currentBoard[x][y] == 1 && neighbors < 2) {
                // Die of Loneliness
                nextBoard[x][y] = 0;
            } else if (currentBoard[x][y] == 1 && neighbors > 3) {
                // Die of Overpopulation
                nextBoard[x][y] = 0;
            } else if (currentBoard[x][y] == 0 && neighbors == 3) {
                // New life due to Reproduction
                nextBoard[x][y] = 1;
            } else {
                // Stasis
                nextBoard[x][y] = currentBoard[x][y];
            }

            // if (currentBoard[x][y] == 0 && currentBoard[x][y-1] == 1){
            //     nextBoard[x][y] = 1;

            // }else {
            //         // Stasis
            //         nextBoard[x][y] = currentBoard[x][y];
            //     }
        }
    }

    // Swap the nextBoard to be the current Board
    [currentBoard, nextBoard] = [nextBoard, currentBoard];
}



/**
 * When mouse is dragged
 */
function mouseDragged() {
    /**
     * If the mouse coordinate is outside the board
     */
    if (mouseX > unitLength * columns || mouseY > unitLength * rows) {
        return;
    }
    const x = Math.floor(mouseX / unitLength);
    const y = Math.floor(mouseY / unitLength);
    console.log("outsidemouseX:" + x + "outsidemouseY:" + y);
    currentBoard[x][y] = 1;
    fill(boxColor);
    stroke(strokeColor);
    rect(x * unitLength, y * unitLength, unitLength, unitLength);

}

/**
 * When mouse is pressed
//  */
// function mousePressed() {
//     noLoop();
//     mouseDragged();
// }

// /**
//  * When mouse is released
//  */
// function mouseReleased() {
//     loop();
// }


document.querySelector('#reset-game').addEventListener('click', function (event) {
    console.log("To click already!");
    setup();
});

let pause = 0;
document.querySelector('#pause').addEventListener('click', function (event) {

    if (pause % 2 == 0) {
        noLoop();
    }
    else {
        loop();
    }
    pause++;
    console.log("pause = " + pause);
});


function init() {
    for (let i = 0; i < columns; i++) {
        for (let j = 0; j < rows; j++) {
            currentBoard[i][j] = 0;
            nextBoard[i][j] = 0;
        }
    }
    console.log("init already!");
}










const s = (sketch) => { //name : s better be game
    const unitLength = 20;
    const boxColor = 150;
    const strokeColor = 50;
    let columns; /* To be determined by window width*/
    let rows; /* To be determined by window height */
    let currentBoard;
    let nextBoard;


    sketch.setup = () => {
        sketch.sketchframe = parseInt(document.getElementById("sketch-frameValue").value);
        console.log("sketch frame value" + sketch.sketchframe);

        // const sketchframe = parseInt(document.getElementById("sketch-frameValue").value) ; 
        // console.log("sketch frame value" + sketch.sketchframe);
        sketch.frameRate(sketch.sketchframe);
        // sketch.frameRate(0.8);
        sketch.createCanvas(windowWidth / 3, windowHeight - 100);
        sketch.floor(width / unitLength);
        sketch.floor(height / unitLength);
        sketch.columns = floor(width / unitLength);
        sketch.rows = floor(height / unitLength);
        console.log("sketch columns is" + sketch.columns + "rows is " + sketch.rows);
        sketch.currentBoard = new Array(sketch.columns);
        sketch.nextBoard = new Array(sketch.columns);

        for (let i = 0; i < sketch.columns; i++) {
            sketch.currentBoard[i] = new Array(sketch.rows)
            sketch.nextBoard[i] = new Array(sketch.rows);
        }

        sketch.init();
        // console.log("columns is" + columns + "rows is " + rows);
        /*Making both currentBoard and nextBoard 2-dimensional matrix that has (columns * rows) boxes. */
        // currentBoardTest = new Array(columns);
        // nextBoardTest = new Array(columns);

        // for(let i = 0; i< columns ; i++){
        //     currentBoard[i] = new Array(rows)
        //     nextBoard[i] = new Array(rows);
        // }

        // Now both currentBoard and nextBoard are array of array of undefined values.
        //   
    };

    sketch.init = () => {
        for (let i = 0; i < sketch.columns; i++) {
            for (let j = 0; j < sketch.rows; j++) {
                sketch.currentBoard[i][j] = 0;
                sketch.nextBoard[i][j] = 0;
            }
        }
        console.log("init sketch.columns is" + sketch.columns);

    };



    sketch.draw = () => {
        sketch.sketchfValue = document.querySelector('#sketch-fValue');
        sketch.sketchfValue.textContent = document.getElementById("sketch-frameValue").value;
        //sketch.background(255);

        sketch.background(255);
        sketch.generate();
        for (let i = 0; i < sketch.columns; i++) {
            for (let j = 0; j < sketch.rows; j++) {
                if (sketch.currentBoard[i][j] == 1) {
                    sketch.fill('red');
                } else {
                    sketch.fill(255);
                }
                sketch.stroke(strokeColor);
                sketch.rect(i * unitLength, j * unitLength, unitLength, unitLength);
            }
        }  // draw logic here

        // generate();
        // for (let i = 0; i < columns; i++) {
        //     for (let j = 0; j < rows; j++) {
        //         if (currentBoard[i][j] == 1){
        //             fill('red');  
        //         }else{
        //             fill(255);
        //         } 
        //         stroke(strokeColor);
        //         rect(i * unitLength, j * unitLength, unitLength, unitLength);
        //     }
        // }  // draw logic here
    };

    sketch.mouseDragged = () => {
        /**
         * If the mouse coordinate is outside the board
         */
        if (sketch.mouseX > unitLength * sketch.columns || sketch.mouseY > unitLength * sketch.rows) {
            return;
        }
        const x = Math.floor(sketch.mouseX / unitLength);
        const y = Math.floor(sketch.mouseY / unitLength);
        console.log("mouseX:" + x + "mouseY:" + y);
        sketch.currentBoard[x][y] = 1;
        console.log("sketch.currentBoard[x][y]:" + abc);
        sketch.fill(boxColor);
        sketch.stroke(strokeColor);
        sketch.rect(x * unitLength, y * unitLength, unitLength, unitLength);
    }

    sketch.generate = () => {
        //Loop over every single box on the board
        for (let x = 0; x < sketch.columns; x++) {
            for (let y = 0; y < sketch.rows; y++) {
                // Count all living members in the Moore neighborhood(8 boxes surrounding)
                sketch.neighbors = 0;
                for (let i of [-1, 0, 1]) {
                    for (let j of [-1, 0, 1]) {
                        if (i === j && j === 0) {
                            continue;
                        }
                        // The modulo operator is crucial for wrapping on the edge
                        sketch.neighbors += sketch.currentBoard[(x + i + sketch.columns) % sketch.columns][(y + j + sketch.rows) % sketch.rows];
                        // console.log("for x"+ x + "for y" + y + sketch.neighbors)
                    }
                }

                //Rules of Life
                if (sketch.currentBoard[x][y] == 1 && sketch.neighbors < 2) {
                    // Die of Loneliness
                    sketch.nextBoard[x][y] = 0;
                } else if (sketch.currentBoard[x][y] == 1 && sketch.neighbors > 3) {
                    // Die of Overpopulation
                    sketch.nextBoard[x][y] = 0;
                } else if (sketch.currentBoard[x][y] == 0 && sketch.neighbors == 3) {
                    // New life due to Reproduction
                    sketch.nextBoard[x][y] = 1;
                } else {
                    // Stasis
                    sketch.nextBoard[x][y] = sketch.currentBoard[x][y];
                }

                // if (sketch.currentBoard[x][y] == 0 && sketch.currentBoard[x][y-1] == 1){
                //     sketch.nextBoard[x][y] = 1;

                // }else {
                //         // Stasis
                //         sketch.nextBoard[x][y] = sketch.currentBoard[x][y];
                //     }
            }
        }

        // Swap the nextBoard to be the current Board
        [sketch.currentBoard, sketch.nextBoard] = [sketch.nextBoard, sketch.currentBoard];
    }

    document.querySelector('#sketch-reset-game').addEventListener('click', function (event) {
        console.log("sketch To click already!");
        sketch.setup();
    });


    let p = 0;
    document.querySelector('#sketch-pause').addEventListener('click', function (event) {

        if (p % 2 == 0) {
            sketch.noLoop();
        }
        else {
            sketch.loop();
        }
        p++;
        console.log("sketch pause = " + p);
    });



    //  const heightOutput = document.querySelector('#height');
    //  const widthOutput = document.querySelector('#width');

    // sketch.reportWindowSize=()=> {
    //     sketch.heightOutput.textContent = sketch.window.innerHeight;
    //     sketch.widthOutput.textContent = sketch.window.innerWidth;
    //     sketch.resizeCanvas(widthOutput.textContent, heightOutput.textContent);
    //   }

    // window.onresize = sketch.reportWindowSize; 
};

//   let myp5 = new p5(s);

let myp5 = new p5(s, document.getElementById('p5sketch'));
let myp5_2 = new p5(s, document.getElementById('p5sketch2'));
let vincentp5 = new p5(s, document.getElementById('vincentSketch'));
//  let vincentp5_1 = new p5(s, document.getElementById('vincentSketch_1'));
document.querySelector('#vincentp5-reset-game').addEventListener('click', function (event) {
    console.log("sketch To click already!");
    vincentp5.setup();
});

let vincentP5pause = 0;
document.querySelector('#vincentp5-pause').addEventListener('click', function (event) {

    if (vincentP5pause % 2 == 0) {
        vincentp5.noLoop();
    }
    else {
        vincentp5.loop();
    }
    vincentP5pause++;
    console.log("pause = " + vincentP5pause);
});