import React, { useState } from 'react';
import jsPDF from 'jspdf';
import './css/PrescriptionPreview.css';

const PrescriptionPreview = ({ prescriptionData }) => {
  const generatePDF = () => {
    // Capture the HTML content from the 'pdf-content' div
    const element = document.getElementById('pdf-content');
    const capturedHtml = element.innerHTML;
    const doc = new jsPDF({
      orientation: 'portrait', // 'portrait' or 'landscape'
      unit: 'mm', // unit of measurement
      format: 'a4', // page size
      marginLeft: 10,
      marginRight: 10,
      marginTop: 10,
      marginBottom: 10,
    });


    // Add captured HTML content to the PDF
    doc.html(capturedHtml, {
      callback: function (doc) {
        // Save the PDF as a file with a given name
        doc.save('document.pdf');
      },
    });
  };

  if (!prescriptionData) {
    return null;
  }

  return (
    <div className="prescription-preview">
      <div id="pdf-content">
        <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '20px' }}>
          <thead>
            <tr>
              <th className="patient-header">Patient Name</th>
              <th className="patient-header">Email</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{prescriptionData.patientName}</td>
              <td>{prescriptionData.email}</td>
            </tr>
          </tbody>
        </table>

        <h3>Medicines:</h3>
        <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '20px' }}>
          <thead>
            <tr>
              <th className="medicine-header">Medicine Name</th>
              <th className="medicine-header">Quantity</th>
              <th className="medicine-header">Usage</th>
            </tr>
          </thead>
          <tbody>
            {prescriptionData.medicines.map((medicine, index) => (
              <tr key={index}>
                <td>{medicine.medicineName}</td>
                <td>{medicine.quantity}</td>
                <td>{medicine.usage}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <h3>Remarks:</h3>
        <p>{prescriptionData.remarks}</p>
      </div>

      <button onClick={generatePDF}>Confirm and Send PDF</button>
    </div>
  );
};

export default PrescriptionPreview;
