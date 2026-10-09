const fs = require('fs');
const PDFParser = require("pdf2json");

if (process.argv.length < 3) {
    console.error('Usage: node parse_pdf.js <pdf_path>');
    process.exit(1);
}

const pdfPath = process.argv[2];

try {
    const pdfParser = new PDFParser(this, 1);

    pdfParser.on("pdfParser_dataError", errData => {
        console.error(errData.parserError);
        process.exit(1);
    });

    pdfParser.on("pdfParser_dataReady", pdfData => {
        let rawText = pdfParser.getRawTextContent();
        try {
            rawText = decodeURIComponent(rawText);
        } catch (e) { }
        
        const cleanText = rawText.replace(/----------------Page \(\d+\) Break----------------/g, '\n').trim();
        console.log(cleanText);
    });

    pdfParser.loadPDF(pdfPath);
} catch (e) {
    console.error(e);
    process.exit(1);
}
