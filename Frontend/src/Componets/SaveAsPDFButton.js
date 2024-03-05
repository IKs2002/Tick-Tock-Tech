import { forwardRef } from 'react';
import React from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import './SaveAsPDFButton.css';

const SaveAsPDFButton = forwardRef((props, ref) => {
  const saveAsPDF = async () => {
    const { start, end, name} = props;
    
    // Create a loading overlay
    const overlay = document.createElement('div');

    // ... (unchanged code for the loading overlay)

    overlay.style.position = 'fixed';

    overlay.style.top = 0;

    overlay.style.left = 0;

    overlay.style.width = '100%';

    overlay.style.height = '100%';

    overlay.style.backgroundColor = 'rgba(255, 255, 255)';

    overlay.style.display = 'flex';

    overlay.style.justifyContent = 'center';

    overlay.style.alignItems = 'center';

    overlay.innerHTML = '<div class="loader"></div>'; // Add your own loading spinner here
  
    // Append the overlay to the body
    document.body.appendChild(overlay);
    // Add a class to the element before capturing it
    ref.current.classList.add('print-mode');
  
    const canvas = await html2canvas(ref.current, {
 // Set the left margin
      y: -20,
    });
  
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF({
      orientation: 'portrait',
      format: 'a4',
    });
  
    const imgProps = pdf.getImageProperties(imgData);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
  
    // Adjust the left and right margins in the addImage method
    const leftMargin = 10; // Adjust as needed
    const rightMargin = 10; // Adjust as needed
    pdf.addImage(imgData, 'PNG', leftMargin, 0, pdfWidth - leftMargin - rightMargin, pdfHeight);
  
    pdf.save(name+ " " + start +' through ' + end);
  
    ref.current.classList.remove('print-mode');
  
    // Remove the overlay after the PDF has been saved
    document.body.removeChild(overlay);
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
