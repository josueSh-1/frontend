import React, { useState, useEffect } from 'react'
import { 
  CCard, 
  CCardBody, 
  CRow, 
  CCol, 
  CFormInput, 
  CButton 
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilUser, cilHome, cilDollar } from '@coreui/icons'
import api from '../../api/axiosToken'
import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'

const Dashboard = () => {
  const [users, setUsers] = useState([])
  const [residents, setResidents] = useState([])
  const [donationAmount, setDonationAmount] = useState(0)
  const [donationDetails, setDonationDetails] = useState([])
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')

  useEffect(() => {
    // Cargar datos iniciales
    api.get('/users')
      .then(response => setUsers(response.data))
      .catch(err => console.error('Error users: ', err))
      
    api.get('/residents')
      .then(response => setResidents(response.data))
      .catch(err => console.error('Error residents: ', err))
      
    api.get('/donation')
      .then(response => {
        if (Array.isArray(response.data)) {
          const total = response.data.reduce((acc, item) => acc + (Number(item.amount) || 0), 0)
          setDonationAmount(total)
        } else {
          setDonationAmount(0)
        }
      })
      .catch(err => console.error('Error donation: ', err))
      
    // Cargar detalles de donaciones
    api.get('/donation/detailed')
      .then(response => setDonationDetails(response.data))
      .catch(err => console.error('Error donation details: ', err))
  }, [])

  const handleDownloadPDF = () => {
    const filtered = donationDetails.filter(item => {
      const date = new Date(item.donation_date)
      return (!startDate || date >= new Date(startDate)) &&
             (!endDate || date <= new Date(endDate))
    })

    // Agrupar por usuario
    const grouped = {}
    filtered.forEach(donation => {
      const key = donation.email
      if (!grouped[key]) {
        grouped[key] = {
          first_name: donation.first_name, 
          last_name: donation.last_name,   
          email: donation.email,
          total: 0
        }
      }
      grouped[key].total += Number(donation.amount)
    })

    const tableData = Object.values(grouped).map((user, index) => [
      index + 1,
      user.first_name + ' ' + user.last_name,
      user.email,
      `$${user.total.toFixed(2)}`
    ])

    const doc = new jsPDF()
    const pageWidth = doc.internal.pageSize.getWidth()

    doc.setFontSize(16)
    const title = 'Fundación Geriátrica Padre Lizardo'
    const titleWidth = doc.getTextWidth(title)
    doc.text(title, (pageWidth - titleWidth) / 2, 20)

    doc.setFontSize(12)
    const subtitle = `Adquisiciones del periodo: ${startDate || 'inicio'} - ${endDate || 'hoy'}`
    const subtitleWidth = doc.getTextWidth(subtitle)
    doc.text(subtitle, (pageWidth - subtitleWidth) / 2, 30)

    autoTable(doc, {
      head: [['#', 'Nombre', 'Correo', 'Monto Total']],
      body: tableData,
      startY: 40,
      styles: { fontSize: 10 }
    })

    doc.save(`donaciones_${startDate}_${endDate}.pdf`)
  }

  return (
    <CRow className="mt-5 justify-content-center">
      <CCol xs={12} md={11} lg={10} xl={9} xxl={8}>
        <CCard className="shadow-lg border-0 p-2" style={{ minHeight: '320px' }}>
          <CCardBody>
            <h2 className="mb-4" style={{ fontWeight: 700 }}>Panel General</h2>
            <CRow>
              <CCol xs={12} md={4} lg={3} className="d-flex flex-column gap-4">
                <div className="d-flex align-items-center p-3 rounded bg-light">
                  <div className="me-3 d-flex align-items-center justify-content-center" style={{ background: '#e3f2fd', borderRadius: '50%', width: 56, height: 56 }}>
                    <CIcon icon={cilUser} size="xxl" style={{ color: '#1976d2' }} />
                  </div>
                  <div>
                    <div className="text-body-secondary small">Total de Usuarios</div>
                    <div style={{ fontSize: '2.2rem', fontWeight: 600 }}>{users.length}</div>
                  </div>
                </div>
                <div className="d-flex align-items-center p-3 rounded bg-light">
                  <div className="me-3 d-flex align-items-center justify-content-center" style={{ background: '#fff3e0', borderRadius: '50%', width: 56, height: 56 }}>
                    <CIcon icon={cilHome} size="xxl" style={{ color: '#ff9800' }} />
                  </div>
                  <div>
                    <div className="text-body-secondary small">Total de Residentes</div>
                    <div style={{ fontSize: '2.2rem', fontWeight: 600 }}>{residents.length}</div>
                  </div>
                </div>
                <div className="d-flex align-items-center p-3 rounded bg-light">
                  <div className="me-3 d-flex align-items-center justify-content-center" style={{ background: '#e8f5e9', borderRadius: '50%', width: 56, height: 56 }}>
                    <CIcon icon={cilDollar} size="xxl" style={{ color: '#43a047' }} />
                  </div>
                  <div>
                    <div className="text-body-secondary small">Total de Contribuciones</div>
                    <div style={{ fontSize: '1.2rem', fontWeight: 400 }}>
                      ${donationAmount ? donationAmount.toLocaleString('es-MX', { minimumFractionDigits: 2 }) : '0.00'}
                    </div>
                  </div>
                </div>
              </CCol>
              <CCol xs={12} md={8} lg={9}>
                <CCard className="mb-4">
                  <CCardBody>
                    <h5 className="mb-3" style={{ fontWeight: 600 }}>Reporte de Contribuciones al Geriátrico</h5>
                    <CRow className="align-items-end g-3">
                      <CCol xs={12} sm={4}>
                        <CFormInput
                          type="date"
                          label="Fecha de inicio"
                          value={startDate}
                          onChange={e => setStartDate(e.target.value)}
                        />
                      </CCol>
                      <CCol xs={12} sm={4}>
                        <CFormInput
                          type="date"
                          label="Fecha de fin"
                          value={endDate}
                          onChange={e => setEndDate(e.target.value)}
                        />
                      </CCol>
                      <CCol xs={12} sm={4} className="d-flex">
                        <CButton 
                          onClick={handleDownloadPDF} 
                          color="success"
                          className="w-100"
                        >
                          Generar Reporte PDF
                        </CButton>
                      </CCol>
                    </CRow>
                  </CCardBody>
                </CCard>
              </CCol>
            </CRow>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default Dashboard