const fs = require('fs');
const pdf = require('pdf-parse');

const pdfPath = '/Users/apple/Downloads/2404.15153v1.pdf';

// Function to extract text from a single page
const extractPageText = async (data, pageIndex) => {
    const pageData = await pdf(data);
    console.log('pagedata',pageData)
    const page = pageData.formImage.Pages[pageIndex];
    console.log('page',page)
    const pageText = page.Texts.map(text => decodeURIComponent(text.R[0].T)).join(' ');
    return pageText;
};

fs.readFile(pdfPath, async (err, data) => {
    if (err) {
        console.error('Error reading the PDF file:', err);
        return;
    }

    try {
        const pdfData = await pdf(data);
        const numPages = pdfData.numpages;
        console.log(numPages)
        for (let i = 0; i < numPages; i++) {
            const text = await extractPageText(data, i+1);
            const fileName = `page-${i + 1}.txt`;
            fs.writeFileSync(fileName, text, (err) => {
                if (err) {
                    console.error(`Error writing to file ${fileName}:`, err);
                } else {
                    console.log(`Text for page ${i + 1} saved to ${fileName}`);
                }
            });
        }
    } catch (error) {
        console.error('Error extracting text from PDF:', error);
    }
});
