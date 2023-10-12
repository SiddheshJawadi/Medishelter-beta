import React, {useRef} from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import './css/PrescriptionPreview.css';


const PrescriptionPreview = ({ prescriptionData }) => {
  const pdfRef = useRef();
  const generatePDF = () => {
    // const element = document.getElementById('pdf-content');
    // const capturedHtml = element.innerHTML;
    // const doc = new jsPDF({
    //   orientation: 'portrait',
    //   unit: 'mm',
    //   format: 'a4',
    //   marginLeft: 10,
    //   marginRight: 10,
    //   marginTop: 10,
    //   marginBottom: 10,
    // });

    // doc.html(capturedHtml, {
    //   callback: function (doc) {
    //     doc.save('document.pdf');
    //   },
    // });
    const input = pdfRef.current;
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL('img/png');
      const pdf = new jsPDF('p', 'mm', 'a4', true);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const imgWidth = canvas.width;
      const imgHeight = canvas.height;
      const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
      const imgX = (pdfWidth - imgWidth * ratio);
      const imgY = 60;
      pdf.setFontSize(30);
      pdf.addImage(imgData, 'PNG', imgX, imgY, imgWidth * ratio, imgHeight * ratio);
      pdf.save('prescription.pdf'); 
    });
  };
  if (!prescriptionData) {
    return null;
  }

  return (
    <div className="prescription-preview">
      <div id="pdf-content" ref = {pdfRef}>
        <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '20px' }}>
          <thead id='scrollhere'>
            <tr>
              <th style={{ background: '#010047', color: '#fff', padding: '10px', fontWeight: 'bold', fontSize: '25px' }} className="patient-header">
                Patient Name
              </th>
              <th style={{ background: '#010047', color: '#fff', padding: '10px', fontWeight: 'bold', fontSize: '25px' }} className="patient-header">
                Email
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{ padding: '10px', borderBottom: '1px solid #ddd', textAlign: 'center', fontSize: '25px' }}>{prescriptionData.patientName}</td>
              <td style={{ padding: '10px', borderBottom: '1px solid #ddd', textAlign: 'center', fontSize: '25px' }}>{prescriptionData.email}</td>
            </tr>
          </tbody>
        </table>

        <h3 style={{ color: '#010047', paddingLeft: '15px', fontSize: '25px', paddingBottom: '15px' }}>Medicines:</h3>
        <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '20px' }}>
          <thead>
            <tr>
              <th style={{ background: '#010047', color: '#fff', padding: '10px', fontWeight: 'bold', textAlign: 'center', fontSize: '25px', width: '33%' }} className="medicine-header">
                Medicine Name
              </th>
              <th style={{ background: '#010047', color: '#fff', padding: '10px', fontWeight: 'bold', textAlign: 'center', fontSize: '25px', width: '33%'  }} className="medicine-header">
                Quantity
              </th>
              <th style={{ background: '#010047', color: '#fff', padding: '10px', fontWeight: 'bold', textAlign: 'center', fontSize: '25px', width: '33%'  }} className="medicine-header">
                Usage
              </th>
            </tr>
          </thead>
          <tbody>
            {prescriptionData.medicines.map((medicine, index) => (
              <tr key={index} style={{ padding: '10px', borderBottom: '1px solid #ddd', background: index % 2 === 0 ? '#f2f2f2' : 'transparent' }}>
                <td style={{ textAlign: 'center', fontSize: '25px', padding: '10px'}}>{medicine.medicineName}</td>
                <td style={{ textAlign: 'center', fontSize: '25px'}}>{medicine.quantity}</td>
                <td style={{ textAlign: 'center', fontSize: '25px'}}>{medicine.usage}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <h3 style={{ color: '#010047', fontSize: '25px', paddingLeft: '15px' }}>Remarks:</h3>
        <p style={{ padding: '15px', fontSize: '25px' }}>{prescriptionData.remarks}</p>
      </div>

      <button onClick={generatePDF} style={{ backgroundColor: '#010047', color: '#fff', padding: '10px', fontSize: '20px' }}>
        Generate PDF
      </button>
    </div>
  );
};

export default PrescriptionPreview;