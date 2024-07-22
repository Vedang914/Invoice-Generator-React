import React from 'react';
import html2pdf from 'html2pdf.js';
import './Invoice.css';

const Invoice = ({
  sellerDetails,
  placeOfSupply,
  billingDetails,
  shippingDetails,
  placeOfDelivery,
  orderDetails,
  invoiceDetails,
  reverseCharge,
  items,
  signatureImage,
  logo
}) => {

  const generatePDF = () => {
    const element = document.getElementById('invoice');
    html2pdf().from(element).save('invoice.pdf');
  };

  const calculateAmount = (unitPrice, quantity, discount) => {
    return (unitPrice * quantity) - discount;
  };

  const calculateTax = (netAmount, taxRate, placeOfSupply, placeOfDelivery) => {
    const taxType = placeOfSupply === placeOfDelivery ? 'CGST/SGST' : 'IGST';
    const taxAmount = netAmount * (taxRate / 100);
    return { taxType, taxAmount };
  };

  const totalAmount = items.reduce((acc, item) => {
    const netAmount = calculateAmount(item.unitPrice, item.quantity, item.discount);
    const { taxAmount } = calculateTax(netAmount, item.taxRate, placeOfSupply, placeOfDelivery);
    return acc + netAmount + taxAmount;
  }, 0);

  return (
    <div className="invoice-wrapper">
      <div className="invoice-actions">
        <button onClick={generatePDF} className="generate-pdf-button">Generate PDF</button>
      </div>
      <div id="invoice" className="invoice-container">
        <div className="header">
          <img src={logo} alt="Company Logo" className="logo" />
          <h1>Tax Invoice/Bill of Supply/Cash Memo</h1>
          <p>(Original for Recipient)</p>
        </div>
        <div className="details">
          <div className="seller-details">
            <h2>Sold By:</h2>
            <p>{sellerDetails.name}</p>
            <p>{sellerDetails.address}</p>
            <p>{sellerDetails.city}, {sellerDetails.state}, {sellerDetails.pincode}</p>
            <p>PAN No: {sellerDetails.panNo}</p>
            <p>GST Registration No: {sellerDetails.gstNo}</p>
          </div>
          <div className="billing-details">
            <h2>Billing Address:</h2>
            <p>{billingDetails.name}</p>
            <p>{billingDetails.address}</p>
            <p>{billingDetails.city}, {billingDetails.state}, {billingDetails.pincode}</p>
            <p>State/UT Code: {billingDetails.stateCode}</p>
          </div>
          <div className="shipping-details">
            <h2>Shipping Address:</h2>
            <p>{shippingDetails.name}</p>
            <p>{shippingDetails.address}</p>
            <p>{shippingDetails.city}, {shippingDetails.state}, {shippingDetails.pincode}</p>
            <p>State/UT Code: {shippingDetails.stateCode}</p>
          </div>
        </div>
        <div className="order-invoice-details">
          <p>Place of supply: {placeOfSupply}</p>
          <p>Place of delivery: {placeOfDelivery}</p>
          <p>Order Number: {orderDetails.orderNo}</p>
          <p>Order Date: {orderDetails.orderDate}</p>
          <p>Invoice Number: {invoiceDetails.invoiceNo}</p>
          <p>Invoice Date: {invoiceDetails.invoiceDate}</p>
          <p>Reverse Charge: {reverseCharge ? 'Yes' : 'No'}</p>
        </div>
        <table>
          <thead>
            <tr>
              <th>Sl. No</th>
              <th>Description</th>
              <th>Unit Price</th>
              <th>Qty</th>
              <th>Net Amount</th>
              <th>Tax Rate</th>
              <th>Tax Type</th>
              <th>Tax Amount</th>
              <th>Total Amount</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, index) => {
              const netAmount = calculateAmount(item.unitPrice, item.quantity, item.discount);
              const { taxType, taxAmount } = calculateTax(netAmount, item.taxRate, placeOfSupply, placeOfDelivery);
              return (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{item.description}</td>
                  <td>{item.unitPrice}</td>
                  <td>{item.quantity}</td>
                  <td>{netAmount}</td>
                  <td>{item.taxRate}%</td>
                  <td>{taxType}</td>
                  <td>{taxAmount}</td>
                  <td>{netAmount + taxAmount}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <div className="total-row">
          <p>Total: {totalAmount}</p>
          <p>Amount in Words: {convertNumberToWords(totalAmount)}</p>
        </div>
        <div className="signature">
          <img src={signatureImage} alt="Signature" className="signature-image" />
          <p>For {sellerDetails.name}</p>
          <p>Authorized Signatory</p>
        </div>
      </div>
    </div>
  );
};

const convertNumberToWords = (num) => {
    if (num === 0) return 'Zero';
  
    const belowTwenty = ['Zero', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen'];
    const tens = ['Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];
    const aboveHundred = ['Hundred', 'Thousand', 'Million', 'Billion'];
  
    const numberToWords = (num) => {
      if (num < 20) return belowTwenty[num];
      if (num < 100) return tens[Math.floor(num / 10) - 2] + (num % 10 !== 0 ? ' ' + belowTwenty[num % 10] : '');
      if (num < 1000) return belowTwenty[Math.floor(num / 100)] + ' Hundred' + (num % 100 !== 0 ? ' ' + numberToWords(num % 100) : '');
  
      for (let i = 0; i < aboveHundred.length; i++) {
        const unit = Math.pow(1000, i + 1);
        if (num < unit) {
          return numberToWords(Math.floor(num / (unit / 1000))) + ' ' + aboveHundred[i] + (num % (unit / 1000) !== 0 ? ' ' + numberToWords(num % (unit / 1000)) : '');
        }
      }
    };
  
    const integerPart = Math.floor(num);
    const decimalPart = Math.round((num - integerPart) * 100);
  
    let result = numberToWords(integerPart);
    if (decimalPart > 0) result += ' and ' + numberToWords(decimalPart) + ' Cents';
  
    return result + ' only';
  };

export default Invoice;
