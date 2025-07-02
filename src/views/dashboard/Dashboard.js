import React, { useState, useEffect } from 'react'
import { CCard, CCardBody, CRow, CCol } from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilUser, cilHome } from '@coreui/icons'
import api from '../../api/axiosToken'

const Dashboard = () => {
  const [users, setUsers] = useState([])
  const [residents, setResidents] = useState([])

  useEffect(() => {
    api.get('/users')
      .then(response => setUsers(response.data))
      .catch(err => console.error('Error users: ', err))
    api.get('/residents')
      .then(response => setResidents(response.data))
      .catch(err => console.error('Error residents: ', err))
  }, [])

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
              </CCol>
              <CCol xs={12} md={8} lg={9} className="d-flex align-items-center justify-content-center">
                {/* Aquí puedes agregar más widgets, gráficas o información en el futuro */}
                <div className="w-100 text-center text-body-secondary" style={{ fontStyle: 'italic' }}>
                  Bienvenido al panel general. Aquí podrás ver estadísticas y datos importantes.<br />
                  <span style={{ fontSize: '1.1rem' }}>Agrega más información o widgets aquí según lo necesites.</span>
                </div>
              </CCol>
            </CRow>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default Dashboard
