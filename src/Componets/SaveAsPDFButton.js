import { forwardRef } from 'react';
import React, { useRef } from "react";
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import "./SaveAsPDFButton.css";

const SaveAsPDFButton = forwardRef((props, ref) => {
    const saveAsPDF = async () => {
        const canvas = await html2canvas(ref.current);
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF({
          orientation: 'landscape',
        });
        const imgProps= pdf.getImageProperties(imgData);
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
        pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
        pdf.save('TimeChart.pdf');
    };

    return (
      <div>
        <button class="PDFButton" onClick={saveAsPDF}>Download as PDF</button>
        <div ref={ref} className="pdfContent">
        </div>
      </div>
    )
  })
export default SaveAsPDFButton;
