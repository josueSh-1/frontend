import React from 'react'
import { Link } from 'react-router-dom'
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser } from '@coreui/icons'
import afueras from '../../../assets/images/afueras.jpg'

const Login = () => {
  return (
    <div className="min-vh-100 d-flex flex-row align-items-center"
    style={{
      backgroundImage: `url(${afueras})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    }}>
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={8}>
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <CForm>
                    <h1>Login</h1>
                    <p className="text-body-secondary">Sign In to your account</p>
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon={cilUser} />
                      </CInputGroupText>
                      <CFormInput type="Email" placeholder="Email" autoComplete="Email" />
                    </CInputGroup>
                    <CInputGroup className="mb-4">
                      <CInputGroupText>
                        <CIcon icon={cilLockLocked} />
                      </CInputGroupText>
                      <CFormInput
                        type="password"
                        placeholder="Password"
                        autoComplete="current-password"
                      />
                    </CInputGroup>
                    <CRow>
                      <CCol xs={6}>
                        <CButton color="primary" className="px-5">
                          Login
                        </CButton>
                      </CCol>
                      <CCol xs={6} className="text-right" >
                        <CButton color="link" className="pl-5">
                          Forgot password?
                        </CButton>
                      </CCol>
                    </CRow>
                    <div className='text-center mt-4'>
                          <p className='mb-0'>Do you not have an account?</p>
                        <Link to="/register">
                        <CButton color="link" className="px-0">
                        Register Now!
                         </CButton>
                        </Link>
                        </div>
                  </CForm>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Login