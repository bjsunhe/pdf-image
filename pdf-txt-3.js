const PDFParser = require("pdf2json");
const fs = require("fs");
const path = require("path");

const pdfFilePath = "/Users/apple/Downloads/2404.15153v1.pdf"; // Replace with your PDF file path
const outputDir = "output-text"; // Replace with your desired output directory

// Create output directory if it doesn't exist
if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir);
}

const pdfParser = new PDFParser();

pdfParser.on("pdfParser_dataError", errData => console.error(errData.parserError));
pdfParser.on("pdfParser_dataReady", pdfData => {
    console.log(pdfData)
    pdfData.Pages.forEach((page, index) => {
        let pageText = "";
        page.Texts.forEach(text => {
            text.R.forEach(t => {
                pageText += decodeURIComponent(t.T) + " ";
            });
        });

        const textFilePath = path.join(outputDir, `page_${index + 1}.txt`);
        fs.writeFileSync(textFilePath, pageText.trim(), "utf8");
        console.log(`Page ${index + 1} text saved to ${textFilePath}`);
    });
});

pdfParser.loadPDF(pdfFilePath);
