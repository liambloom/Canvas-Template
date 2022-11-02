const studentCanvas = document.getElementById("my-canvas");
const studentCtx = studentCanvas.getContext("2d");
const bgCanvas = document.getElementById("background");
const bgCtx = bgCanvas.getContext("2d");
const bgSquareSide = 7;

for (let property of ["width", "height"]) {
    const studentCanvasProperty = Object.getOwnPropertyDescriptor(Object.getPrototypeOf(studentCanvas), property);
    Object.defineProperty(studentCanvas, property, {
        get: studentCanvasProperty.get,
        set(value) {
            studentCanvasProperty.set.call(studentCanvas, value);
            bgCanvas[property] = value;
            drawBg();
        }
    });
}

function drawBg() {
    for (let y = 0; y < bgCanvas.clientHeight / bgSquareSide; y++) {
        for (let x = 0; x < bgCanvas.clientWidth / bgSquareSide; x++) {
            bgCtx.fillStyle = ((x + y) % 2 === 0) ? "#d0d0d0" : "#eeeeee";
            bgCtx.fillRect(x * bgSquareSide, y * bgSquareSide, bgSquareSide, bgSquareSide);
            //console.log(cv.globalAlpha);
            bgCtx.globalAlpha = 1;
        }
    }
}

drawBg();