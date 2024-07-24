const fs = require('fs');
const path = require('path');
const { execFile } = require('child_process');

async function convertPDFToImages(pdfPath) {
    const outputDir = path.join(__dirname, 'output');
    if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir);
    }

    const outputPrefix = path.join(outputDir, path.basename(pdfPath, path.extname(pdfPath)));
    const popplerPath = '/usr/local/bin/pdftocairo'; // Adjust this path if necessary

    try {
        // First, get the number of pages in the PDF
        const pdfInfoPath = '/usr/local/bin/pdfinfo'; // Adjust this path if necessary
        const numPages = await new Promise((resolve, reject) => {
            execFile(pdfInfoPath, [pdfPath], (error, stdout, stderr) => {
                if (error) {
                    reject(`Error getting PDF info: ${stderr}`);
                } else {
                    const match = stdout.match(/Pages:\s+(\d+)/);
                    if (match) {
                        resolve(parseInt(match[1], 10));
                    } else {
                        reject('Could not determine the number of pages in the PDF');
                    }
                }
            });
        });

        for (let i = 1; i <= numPages; i++) {
            const outputFilePath = `${outputPrefix}-${i}.png`;
            const args = ['-png', '-r', '300', pdfPath, outputFilePath, '-f', `${i}`, '-l', `${i}`];
            await new Promise((resolve, reject) => {
                execFile(popplerPath, args, (error, stdout, stderr) => {
                    if (error) {
                        reject(`Error: ${stderr}`);
                    } else {
                        resolve(stdout);
                    }
                });
            });
            console.log(`Converted page ${i} to image successfully.`);
        }
    } catch (error) {
        console.error('Error converting PDF to images:', error);
    }
}

const pdfPath = '/Users/apple/Downloads/2404.15153v1.pdf'; // Replace with the path to your PDF file
convertPDFToImages(pdfPath);
