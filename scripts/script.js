function changeColor(event) {
    const element = event.target;
    const currentBgColor = element.style['background-color'];
    
    if (currentBgColor === '') {
        element.style['background-color'] = 'rgba(0, 0, 0, .1)';
    } else {
        // Get the current alpha channel velue
        const regex = /\.\d/
        const colorIntensityValues = currentBgColor.match(regex);
        // To exclude the event in which the color is rgb(0, 0, 0)
        const currentColorIntensity = (colorIntensityValues === null) ? 9
                : Number(colorIntensityValues[0][1]);

        // Change current background to a more intense black color
        element.style['background-color'] =
                (currentColorIntensity === 9) ? 'rgb(0, 0, 0)'
                : `rgba(0, 0, 0, .${currentColorIntensity + 1}`;
    }
}

function resizeSketch() {
    do {
        pixelsInRow = prompt('How many blocks per side do you want?' +
                '\n(more than 0 and no more than 100)');

        // Person cancells the prompt
        if (pixelsInRow === null) break;
    } while (pixelsInRow.match(/^([1-9][0-9]?|100)$/) === null)

    // We don't need to do anything if person cancells the prompt
    if (pixelsInRow !== null) {
        removeSketchGrid();
        createSketchGrid();
    }
}

function clearSketch() {
    document.querySelectorAll('.sketch-pixel').forEach(pixel => {
        pixel.style['background-color'] = '';
    });
}

function removeSketchGrid() {
    document.querySelectorAll('.sketch-pixel').forEach(pixel => {
        pixel.parentNode.removeChild(pixel);
    });
}

function createSketchGrid() {
    const sketchContainerArea = sketchContainer.clientHeight ** 2;
    const pixelsNumber = pixelsInRow ** 2;

    const pixelArea = sketchContainerArea / pixelsNumber;
    const pixelSide = Math.sqrt(pixelArea);

    for (let i = 0; i < pixelsNumber; i++) {
        const sketchPixel = document.createElement('div');

        sketchPixel.style.width = `${pixelSide}px`;
        sketchPixel.style.height = `${pixelSide}px`;
        sketchPixel.classList.add('sketch-pixel');
        sketchPixel.addEventListener('pointerenter', changeColor);

        sketchContainer.appendChild(sketchPixel);
    }
}

const sketchContainer = document.querySelector('.sketch-container');
const clearButton = document.querySelector('.clear-button');
const resizeButton = document.querySelector('.resize-button');
let pixelsInRow = 16;

clearButton.addEventListener('click', clearSketch);
resizeButton.addEventListener('click', resizeSketch);

createSketchGrid();