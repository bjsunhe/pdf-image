const fs = require('fs');
const path = require('path');
const util = require('util');

// Convert the readFile function to a promise-based function
const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);

async function convertImageToBase64(imagePath) {
  try {
    const filePath = path.resolve(imagePath);
    const imageBuffer = await readFile(filePath);
    const base64Image = imageBuffer.toString('base64');
    return base64Image;
  } catch (error) {
    console.error('Error reading the image file:', error);
    throw error;
  }
}

async function createHtmlWithImage(base64Image) {
  const htmlContent = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Base64 Image</title>
    </head>
    <body>
      <h1>Base64 Encoded Image</h1>
      <img src="data:image/jpeg;base64,${base64Image}" alt="Base64 Image">
    </body>
    </html>
  `;

  try {
    await writeFile('image.html', htmlContent);
    console.log('HTML file created successfully!');
  } catch (error) {
    console.error('Error writing the HTML file:', error);
  }
}

// Usage example
(async () => {
  try {
    const imagePath = 'output/2404.15153v1-3.png-03.png'; // Replace with your image path
    const base64Image = await convertImageToBase64(imagePath);
    await createHtmlWithImage(base64Image);
  } catch (error) {
    console.error('Error:', error);
  }
})();
