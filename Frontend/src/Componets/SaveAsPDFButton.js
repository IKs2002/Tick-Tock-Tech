import { forwardRef } from 'react';
import React from 'react';
import jsPDF from 'jspdf'; // Import jsPDF library for PDF generation
import html2canvas from 'html2canvas'; // Import html2canvas library for capturing HTML as image
import './SaveAsPDFButton.css'; // Import styles specific to the SaveAsPDFButton

// Define the SaveAsPDFButton component using forwardRef to pass a ref to it from its parent component
const SaveAsPDFButton = forwardRef((props, ref) => {
  // Function to capture the referenced HTML and save it as a PDF
  const saveAsPDF = async () => {
    const { start, end, name} = props; // Destructure the props to get start, end, and name
    
    // Create a loading overlay element to indicate processing
    const overlay = document.createElement('div');
    overlay.style.position = 'fixed';
    overlay.style.top = 0;
    overlay.style.left = 0;
    overlay.style.width = '100%';
    overlay.style.height = '100%';
    overlay.style.backgroundColor = 'rgba(255, 255, 255, 0.8)'; // Semi-transparent white
    overlay.style.display = 'flex';
    overlay.style.justifyContent = 'center';
    overlay.style.alignItems = 'center';
    overlay.innerHTML = '<div class="loader"></div>'; // Insert a loader spinner HTML

    // Append the overlay to the body to show it
    document.body.appendChild(overlay);

    // Add a 'print-mode' class to the element to be captured, adjusting its style for printing
    ref.current.classList.add('print-mode');
  
    // Capture the element referenced by `ref` using html2canvas
    const canvas = await html2canvas(ref.current, {
      y: -30 // Vertical offset to adjust the snapshot position
    });
  
    const imgData = canvas.toDataURL('image/png'); // Convert the canvas to a PNG data URL
    const pdf = new jsPDF({
      orientation: 'landscape', // Set PDF to landscape mode
      format: 'a4' // Set the format to A4
    });
  
    const imgProps = pdf.getImageProperties(imgData); // Get image dimensions
    const pdfWidth = pdf.internal.pageSize.getWidth(); // Get PDF page width
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width; // Calculate PDF page height based on image aspect ratio
  
    // Add the image to the PDF, adjusting for margins
    const leftMargin = 10; // Left margin in mm
    const rightMargin = 10; // Right margin in mm
    pdf.addImage(imgData, 'PNG', leftMargin, 0, pdfWidth - leftMargin - rightMargin, pdfHeight);
  
    // Save the PDF with a filename based on the `name`, `start`, and `end` props
    pdf.save(`${name} ${start} through ${end}`);
  
    // Remove the 'print-mode' class and the overlay after saving the PDF
    ref.current.classList.remove('print-mode');
    document.body.removeChild(overlay);
  };
  

  return (
    <div>
      {/* Button to trigger PDF download */}
      <button className="PDFButton" onClick={saveAsPDF}>
        Download as PDF
      </button>
      {/* Hidden div to hold the content that will be converted into PDF, referenced by `ref` */}
      <div ref={ref} className="pdfContent">
        {/* Content that needs to be captured for PDF goes here */}
      </div>
    </div>
  );
});

export default SaveAsPDFButton; // Export the component for use elsewhere
