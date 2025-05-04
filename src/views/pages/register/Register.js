import React, {use, useState} from 'react'
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
import '../../../scss/style.scss'
import classNames from 'classnames'

const Register = () => {
  const navigate = useNavigate();

    //Estados de contraseña 
  const [confirmPassword, setConfirmPassword]= useState('')
  const [passwordMatch, setPasswordMatch]=useState(true)
  const [newUser, setNewUser]=useState({
    first_name: '',
    last_name: '',
    email:'',
    phone:'',
    birth_date:'',
    password: '',
  })
  

    //Validacion de contraseñas iguales

const handleCreateAction= async(e) =>{
  e.preventDefault()

  if(newUser.password!==confirmPassword){
    alert('The Password doesnt match')
    setPasswordMatch(false)
    return
  }else{
    setPasswordMatch(true)
  }
  if(passwordMatch){
    try{
      const response = await fetch('http://localhost:3000/users',{
          method: 'POST',
          headers:{
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newUser),
        }
      )
      if(!response.ok){
        alert('There was an error creating the account')
        console.error('server error: ', response.status)
      }
      const data= await response.json()
      console.log('Response data: ', data)      
      setNewUser({
        first_name: '',
        last_name: '',
        email:'',
        phone:'',
        birth_date:'',
        password: '',
      })
      setConfirmPassword('')
      navigate('/login')
    }catch (error){
      console.error('Error creating account: ', error)
      alert('There was an error creating the account')     
      setNewUser({
        first_name: '',
        last_name: '',
        email:'',
        phone:'',
        birth_date:'',
        password: '',
      })
      return
    }
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
                <CForm onSubmit={handleCreateAction}>
                  <div className='d-flex justify-content-end'>
                   <CIcon icon={cilX} size='xl' onClick={() =>navigate('/')} className='x_nav' ></CIcon>
                  </div>
                  <h1>Register</h1>
                  <p className="text-body-secondary">Create your account</p>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>@</CInputGroupText>
                    <CFormInput type="email" placeholder="Email" autoComplete="email" required
                      value={newUser.email || ''}
                      onChange={(e)=>setNewUser({...newUser, email:e.target.value})}
                    />
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilUser} />
                    </CInputGroupText>
                    <CFormInput type="text" placeholder="First Name" required
                      value={newUser.first_name || ''}
                      onChange={(e)=>setNewUser({...newUser, first_name:e.target.value})}
                    />
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilUser} />
                    </CInputGroupText>
                    <CFormInput type="text" placeholder="Last Name" required
                      value={newUser.last_name || ''}
                      onChange={(e)=>setNewUser({...newUser, last_name:e.target.value})}
                    />
                  </CInputGroup>
                  <CInputGroup className='mb-3'>
                  <CInputGroupText>
                      <CIcon icon={cilUser} />
                  </CInputGroupText>
                  <CFormInput type="tel" placeholder="Phone" required
                    value={newUser.phone || ''} 
                    onChange={(e) => setNewUser({ ...newUser, phone: e.target.value })}
                  />
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilCalendar}/>
                    </CInputGroupText>
                  <CFormInput type="date"
                    value={newUser.birth_date || ''}
                    onChange={(e)=>setNewUser({...newUser, birth_date:e.target.value})}
                  />
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
                      value={newUser.password}
                      onChange={(e)=> setNewUser({...newUser, password:e.target.value})}
                      required
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
                      required
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
