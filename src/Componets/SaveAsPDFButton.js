import { forwardRef } from 'react';
import React, { useRef } from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import './SaveAsPDFButton.css';

const SaveAsPDFButton = forwardRef((props, ref) => {
  const saveAsPDF = async () => {
    // Add a class to the element before capturing it
    ref.current.classList.add('print-mode');

    const canvas = await html2canvas(ref.current, {
      // Set additional margin (adjust as needed)
      y: -20,
    });

    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF({
      orientation: 'portrait',
      format: 'a4',
    });

    // Calculate new canvas dimensions with top margin
    const imgProps = pdf.getImageProperties(imgData);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

    // Add image to PDF
    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);

    // Save the PDF
    pdf.save('TimeChart.pdf');

    // Remove the class after capturing the element
    ref.current.classList.remove('print-mode');
  };

  return (
    <div>
      <button className="PDFButton" onClick={saveAsPDF}>
        Download as PDF
      </button>
      <div ref={ref} className="pdfContent">
        {/* Your content goes here */}
      </div>
    </div>
  );
});

export default SaveAsPDFButton;
