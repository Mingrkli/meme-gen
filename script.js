const imgFileInput = document.querySelector('#imageFileInput');
const fontSizeNumber = document.querySelector('#fontSizeNumber');
const topTextInput = document.querySelector('#topTextInput');
const bottomTextInput = document.querySelector('#bottomTextInput');
const canvas = document.querySelector('#meme');
const textColor = document.querySelector('#text-color input');
const outlineColor = document.querySelector('#outline-color input');

let image;

/* Event Listeners
=============================================================================================== */
imgFileInput.addEventListener('change', () => {
    // Data URL means your image file represented in text in a from of an URL
    // When ever the user picks a file in the input field, theres a file property and were grabbing the first item in that list which is the users chosen img
    const imgDataUrl = URL.createObjectURL(imgFileInput.files[0])

    image = new Image(); // creates a new <img>
    image.src = imgDataUrl; // Img the user has selected

    // when you change the img.src, it would be loaded right away so you can use an load event listener
    image.addEventListener('load', () => {
        updateMemeCanvas(canvas, image, topTextInput.value, bottomTextInput.value)
    }, { once: true } ) // Run it only once
})

// The following changes the text on the img in real time
fontSizeNumber.addEventListener('input', () => {
    if (fontSizeNumber.value < 0 || fontSizeNumber.value === '') {
        fontSizeNumber.value = 0;
    }

    updateMemeCanvas(canvas, image,  topTextInput.value, bottomTextInput.value)
})

topTextInput.addEventListener('input', () => {
    updateMemeCanvas(canvas, image,  topTextInput.value, bottomTextInput.value)
})

bottomTextInput.addEventListener('input', () => {
    updateMemeCanvas(canvas, image,  topTextInput.value, bottomTextInput.value)
})

textColor.addEventListener('input', () => {
    updateMemeCanvas(canvas, image,  topTextInput.value, bottomTextInput.value)
})

outlineColor.addEventListener('input', () => {
    updateMemeCanvas(canvas, image,  topTextInput.value, bottomTextInput.value)
})



/* Functions
=============================================================================================== */
function updateMemeCanvas(canvas, img, topText, bottomText) {
    const context = canvas.getContext('2d')
    const width = img.width;
    const height = img.height;
    const fontSize = fontSizeNumber.value;
    const yOffset = height / 25;

    // Update canvas background
    canvas.width = width;
    canvas.height = height;
    context.drawImage(img, 0, 0)

    // Prepare text
    context.strokeStyle = outlineColor.value;
    context.lineWidth = Math.floor(fontSize / 5);
    context.fillStyle = textColor.value;
    context.textAlign = 'center';
    context.lineJoin = 'round'; // Makes the text round instead of random spikes
    context.font = `${fontSize}px sans-serif`;

    // Add top text
    context.textBaseline = 'top'; // Without this, the text starts at the center
    // Positioning
    context.strokeText(topText, width / 2, yOffset);
    context.fillText(topText, width / 2, yOffset);

    // Add bottom text
    context.textBaseline = 'bottom'; // Without this, the text starts at the center
    // Positioning
    context.strokeText(bottomText, width / 2, height - yOffset);
    context.fillText(bottomText, width / 2, height - yOffset);
}