const express = require('express');
const pdf = require('html-pdf-node');
const fs = require('fs');

const app = express();
const port = 3000;

app.set('view engine', 'ejs');

app.get('/', (req, res) => 
{
    res.render('home');
});

app.get('/convert-pdf', async (req, res) => {
    try
    {
        const htmlFilePath = 'views/leaving.html';
        const htmlContent = fs.readFileSync(htmlFilePath, 'utf-8');
        const options = { format: 'A4' };
        const pdfBuffer = await pdf.generatePdf({ content: htmlContent }, options);
        res.contentType('application/pdf');
        res.send(pdfBuffer);
    }
    catch (error) 
    {
        console.error('Error generating PDF:', error);
        res.status(500).send('Internal Server Error');
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});