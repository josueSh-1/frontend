import React, {useState} from 'react'
import { useNavigate, Link } from 'react-router-dom'
import {
  CButton,
  CCard,
  CCardBody,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser, cilX, cilCalendar } from '@coreui/icons'
import afueras from '../../../assets/images/afueras.jpg'


const Register = () => {
  const navigate = useNavigate();

    //Estados de contraseña vacios
  const [password, setPassword]= useState('')
  const [confirmPassword, setConfirmPassword]= useState('')
  const [passwordMatch, setPasswordMatch]=useState(true)
  
    //Confirmacion de texto en confirm

const confirmPasswords= (e) =>{
  e.preventDefault()
  if(password!==confirmPassword){
    alert('The Password doesnt match')
    setPasswordMatch(false)
    return
  }else{
    setPasswordMatch(true)
  }
}
  return (
    <div className="min-vh-100 d-flex flex-row align-items-center" 
          style={{
          backgroundImage: `url(${afueras})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',}}>
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={9} lg={7} xl={6}>
            <CCard className="mx-4">
              <CCardBody className="p-4">
                <CForm onSubmit={confirmPasswords}>
                  <div className='d-flex justify-content-end'>
                   <CIcon icon={cilX} size='lg' onClick={() =>navigate('/')} style={{cursor: 'pointer'}}></CIcon>
                  </div>
                  <h1>Register</h1>
                  <p className="text-body-secondary">Create your account</p>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>@</CInputGroupText>
                    <CFormInput type="email" placeholder="Email" autoComplete="email" />
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilUser} />
                    </CInputGroupText>
                    <CFormInput type="text" placeholder="First Name"/>
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilUser} />
                    </CInputGroupText>
                    <CFormInput type="text" placeholder="Last Name"/>
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilCalendar}/>
                    </CInputGroupText>
                  <CFormInput type="date"/>
                  <p className='small text-muted'>Enter your birth date</p>
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilLockLocked} />
                    </CInputGroupText>
                    <CFormInput
                      type="password"
                      placeholder="Password"
                      autoComplete="new-password"
                      value={password}
                      onChange={(e)=> setPassword(e.target.value)}
                    />
                  </CInputGroup>
                  <CInputGroup className="mb-4">
                    <CInputGroupText>
                      <CIcon icon={cilLockLocked} />
                    </CInputGroupText>
                    <CFormInput
                      type="password"
                      placeholder="Repeat password"
                      autoComplete="new-password"
                      value={confirmPassword}
                      onChange={(e)=>setConfirmPassword(e.target.value)}
                    />
                  </CInputGroup>
                  <div className="d-grid">
                    <CButton color="primary" type="submit">Create Account</CButton>
                  </div>
                  <div className='text-center mt-4'>
                    <p className='mb-0'>You already have an account?</p>
                    <Link to="/login">
                        <CButton color="link" className="px-0">
                        Log in here!
                       </CButton>
                    </Link>
                  </div>
                </CForm>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Register
