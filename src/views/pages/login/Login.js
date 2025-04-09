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
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilEnvelopeLetter, cilLockLocked, cilUser, cilX } from '@coreui/icons'
import afueras from '../../../assets/images/afueras.jpg'

const Login = () => {
  const navigate = useNavigate()
  //Manejo por pasos
  const [step,setStep]= useState(0)

  const forgotPassword= () =>{
   setStep(1) //1 muestra formulario de olvido
  } 

  const login= () =>{
    setStep(0) //0 muestra formulario de login
  }

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
                  {step == 0 ?(
                     <CForm>
                     <div className='d-flex justify-content-end'>
                       <CIcon icon={cilX} size='lg' onClick={() =>navigate('/')} style={{cursor: 'pointer'}}></CIcon>
                     </div>
                     <h1>Login</h1>
                     <p className="text-body-secondary">Sign In to your account</p>
                     <CInputGroup className="mb-3">
                       <CInputGroupText>
                         <CIcon icon={cilUser} />
                       </CInputGroupText>
                       <CFormInput type="email" placeholder="Email" autoComplete="email" />
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
                         <CButton color="primary" type="submit" className="px-5">
                           Login
                         </CButton>
                       </CCol>
                       <CCol xs={6} className='text-end'>
                         <CButton color="link" onClick={forgotPassword}>
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
                    ) : (
                      //Formulario de olvido
                      <CForm>
                        <div className='d-flex justify-content-end'>
                         <CIcon icon={cilX} size='lg' onClick={() =>navigate('/')} style={{cursor: 'pointer'}}></CIcon>
                        </div>
                        <h2>Reset Password</h2>
                        <p>Enter your Email account to receibe a reset link</p>
                        <CInputGroup className='mb-4'>
                          <CInputGroupText>
                            <CIcon icon={cilEnvelopeLetter}/>
                          </CInputGroupText>
                          <CFormInput type='email' placeholder='Email' autoComplete='email'/>
                        </CInputGroup>
                        <div className='d-flex justify-content-center'>
                          <CButton color='primary' type='submit' className='px-5'>Reset Link</CButton>
                        </div>
                        <div className='text-center mt-4'>
                          <p className='mb-0'>You remember you password?</p>
                          <CButton color='link' onClick={login}>
                            Log in Here!
                          </CButton>
                        </div>
                      </CForm>
                    )
                  }
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