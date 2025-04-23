import React, { useState } from 'react';
import {
  CCard,
  CCardBody,
  CCardHeader,
  CForm,
  CFormInput,
  CFormLabel,
  CButton,
  CAlert
} from '@coreui/react';
import '../../../scss/style.scss'

const DonationForm = () => {
  const [amount, setAmount] = useState('');
  const [name, setName] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setAmount('');
    setName('');
  };

  return (
    <div className="donation-wrapper">
      <CCard className="donation-card">
        <CCardHeader className="donation-header">Make a Contribution</CCardHeader>
        <CCardBody>
          {submitted && <CAlert color="success">Thanks for your donation!</CAlert>}
          <CForm onSubmit={handleSubmit}>
            <div className="donation-field">
              <CFormLabel>Amount (USD)</CFormLabel>
              <CFormInput
                type="number"
                placeholder="Donation Amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                required
              />
            </div>
            <div className="donation-field">
              <CFormLabel>your Name (optional)</CFormLabel>
              <CFormInput
                type="text"
                placeholder="Donor Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <CButton type="submit" color="primary" className="donation-button">
              Donar
            </CButton>
          </CForm>
        </CCardBody>
      </CCard>
    </div>
  );
};

export default DonationForm;