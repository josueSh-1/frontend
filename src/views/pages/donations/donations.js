import React, { useState } from 'react';
import api from '../../../api/axiosToken';
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
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      // Obtener el usuario actual
      const user = JSON.parse(localStorage.getItem('user'));
      const fk_id_user = user.id_user || user.id;
      if (!fk_id_user) {
        setError('No se pudo identificar el usuario.');
        return;
      }
      // Prueba 1: solo fecha (YYYY-MM-DD)
      const donation = {
        amount: Number(amount),
        donation_date: new Date().toISOString().slice(0, 10),
        fk_id_user: Number(fk_id_user)
      };
      await api.post('/donation', donation);
      setSubmitted(true);
      setAmount('');
      setName('');
    } catch (err) {
      setError('Error al guardar la donación.');
    }
  };

  return (
    <div className="donation-wrapper">
      <CCard className="donation-card">
        <CCardHeader className="donation-header">Make a Contribution</CCardHeader>
        <CCardBody>
          {submitted && <CAlert color="success">Thanks for your donation!</CAlert>}
          {error && <CAlert color="danger">{error}</CAlert>}
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