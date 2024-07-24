const fs = require('fs');
const pdf = require('pdf-parse');

// Function to save text to a file
function saveTextToFile(filename, text) {
  fs.writeFileSync(filename, text, 'utf8');
}

// Main function to process PDF
async function processPDF(filePath) {
  // Load the PDF document
  const dataBuffer = fs.readFileSync(filePath);
  const data = await pdf(dataBuffer);

  // Extract text from each page and save to separate files
  const numberOfPages = data.numpages;
  for (let i = 0; i < numberOfPages; i++) {
    const pageText = data.text.split(/\f/)[i];
    const filename = `./output-text/page-${i + 1}.txt`;
    saveTextToFile(filename, pageText);
    console.log(`Saved text from page ${i + 1} to ${filename}`);
  }
}

// Replace 'your-file.pdf' with the path to your PDF file
processPDF('/Users/apple/Downloads/2404.15153v1.pdf');
