const fs = require('fs');

// Suppress noisy pdf.js warnings
const originalConsoleWarn = console.warn;
const originalConsoleLog = console.log;
const originalConsoleError = console.error;
console.warn = function() {};
console.log = function() {};
console.error = function() {}; // Also suppress pdf.js core errors

const PDFParser = require("pdf2json");

if (process.argv.length < 3) {
    originalConsoleError('Usage: node parse_pdf.js <pdf_path>');
    process.exit(1);
}

const pdfPath = process.argv[2];

try {
    const pdfParser = new PDFParser(this, 1);

    pdfParser.on("pdfParser_dataError", errData => {
        originalConsoleError(errData.parserError);
        process.exit(1);
    });

    pdfParser.on("pdfParser_dataReady", pdfData => {
        let rawText = pdfParser.getRawTextContent();
        try {
            rawText = decodeURIComponent(rawText);
        } catch (e) { }
        
        // Clean up text
        let cleanText = rawText.replace(/----------------Page \(\d+\) Break----------------/g, '\n');
        
        // pdf2json often leaves massive gaps between columns. Let's normalize spaces.
        // Replace 3+ spaces with a single space
        cleanText = cleanText.replace(/ {3,}/g, ' ');
        // Replace multiple newlines with a single newline
        cleanText = cleanText.replace(/\r\n/g, '\n').replace(/\n{2,}/g, '\n');
        
        originalConsoleLog(cleanText.trim());
    });

    pdfParser.loadPDF(pdfPath);
} catch (e) {
    originalConsoleError(e);
    process.exit(1);
}
