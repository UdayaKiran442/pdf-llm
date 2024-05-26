const pdf = require('pdf-parse')

exports.extractTextFromPdf = async (pdfPath) => {
    const data = await pdf(pdfPath)
    return data.text
}