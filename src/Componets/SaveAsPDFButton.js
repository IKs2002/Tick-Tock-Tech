import { forwardRef } from 'react';
import React, { useRef } from "react";
import jsPDF from 'jspdf'; // Import jsPDF library for generating PDF documents
import html2canvas from 'html2canvas'; // Import html2canvas for converting HTML to Canvas
import "./SaveAsPDFButton.css"; // Importing CSS styles for the button

// SaveAsPDFButton component definition using forwardRef to receive a ref from its parent
const SaveAsPDFButton = forwardRef((props, ref) => {
    // Function to handle saving the referenced component as a PDF
    const saveAsPDF = async () => {
        const canvas = await html2canvas(ref.current); // Converts the ref's current element to a canvas
        const imgData = canvas.toDataURL('image/png'); // Converts the canvas to a PNG data URL
        const pdf = new jsPDF({
          orientation: 'landscape', // Sets the PDF orientation to landscape
        });
        const imgProps= pdf.getImageProperties(imgData); // Gets image properties to maintain aspect ratio
        const pdfWidth = pdf.internal.pageSize.getWidth(); // Gets the PDF's width
        const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width; // Calculates the height to maintain aspect ratio
        pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight); // Adds the image to the PDF
        pdf.save('TimeChart.pdf'); // Saves the PDF with a predefined name
    };

    // Render function for the SaveAsPDFButton component
    return (
      <div>
        {/* Button that triggers the saveAsPDF function when clicked */}
        <button class="PDFButton" onClick={saveAsPDF}>Download as PDF</button>
        {/* Invisible div that serves as a reference point for the html2canvas conversion */}
        <div ref={ref} className="pdfContent">
        </div>
      </div>
    )
})

export default SaveAsPDFButton; // Exports the component for use in other parts of the application
