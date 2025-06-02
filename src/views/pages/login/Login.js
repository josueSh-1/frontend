import React, {useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'
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
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilEnvelopeLetter, cilLockLocked, cilUser, cilX } from '@coreui/icons'
import '../../../scss/style.scss'
import afueras from '../../../assets/images/afueras.jpg'

const Login = () => {
  const navigate = useNavigate()
  const[forgot,setForgot]=useState(false)
  const[linkForgot,setLinkForgot]=useState(false)

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
                     <CForm >
                     <h1>Login</h1>
                     <p className="text-body-secondary">Sign In to your account</p>
                     <CInputGroup className="mb-3">
                       <CInputGroupText>
                         <CIcon icon={cilUser} />
                       </CInputGroupText>
                       <CFormInput type="email" placeholder="Email" autoComplete="email" required/>
                     </CInputGroup>
                     <CInputGroup className="mb-4">
                       <CInputGroupText>
                         <CIcon icon={cilLockLocked} />
                       </CInputGroupText>
                       <CFormInput
                         type="password"
                         placeholder="Password"
                         autoComplete="current-password"
                         required
                       />
                     </CInputGroup>
                     <CRow>
                       <CCol xs={6}>
                         <CButton color="primary" type="submit" className="px-5">
                           Login
                         </CButton>
                       </CCol>
                       <CCol xs={6} className='text-end'>
                         <CButton color="link" onClick={() => setForgot(true)}>
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
      <CModal
        visible={forgot}
        onClose={() => setForgot(false)}
        aria-labelledby="Modal_Password">
        <CModalHeader>
          <CModalTitle id="Modal_Password">Forgot Password</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <p>Please enter your email to reset your password.</p>
          <CInputGroup>
            <CInputGroupText>
              <CIcon icon={cilUser}/>
            </CInputGroupText>
            <CFormInput type='email' placeholder='Email' autoComplete='email'/>
          </CInputGroup>
        </CModalBody>
        <CModalFooter>
          <CButton
            color="primary"
            onClick={() => {
              setForgot(false)
              setLinkForgot(true)
            }}
          >
            Send Link
          </CButton>
        </CModalFooter>
      </CModal>
      <CModal
        visible={linkForgot}
        onClick={() => {
          setForgot(true)
          setLinkForgot(false)
        }}
      >
        <CModalHeader>
          <CModalTitle>Your Reset Link Password was sending to you!</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <p>Please check your email to access the link.</p>
        </CModalBody>
        <CModalFooter>
          <CButton
            color="primary"
            onClick={() => {
              setForgot(true)
              setLinkForgot(false)
            }}
          >
            Close
          </CButton>
        </CModalFooter>
      </CModal>
    </div>
  )
}

export default Login