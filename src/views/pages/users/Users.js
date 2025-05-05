import React, {use, useEffect, useState} from 'react'
import { CCard, CCardBody, CPagination, CPaginationItem,CCardHeader, CButton, CTable, CModal, CModalHeader, CModalBody, CModalFooter,CForm, CFormInput, CInputGroupText } from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilSearch, cilUser } from '@coreui/icons'
import afueras from '../../../assets/images/portada_geriatrico.jpg'
import axios from 'axios'

const Users = () => {
    const[visible,setVisible]=useState(false)
    const[visible2,setVisible2]=useState(false)
    const[visible3,setVisible3]=useState(false)
    const[search,setSearch]=useState('')
    const [newUser,setNewUser]=useState({
      first_name:'',
      last_name:'',
      email:'',
      phone:'',
    })
    //Seleccion de Usuario Vacia
    const[selectUser,setSelectUser]=useState(null)
    //Arreglo de Usuarios
    const[users,setUsers]=useState([])
    //Carga de usuarios una vez
    useEffect(()=>{ axios.get('http://localhost:3001/users').then(res=>setUsers(res.data)).catch(err=>console.error("Error: ",err))},[])
    const columns = [
        {  key: 'first_name', label: 'First Name',_props: { scope: 'col', className:'fs-4' }, },
        {  key: 'last_name', label: 'Last Name', _props: { scope: 'col', className:'fs-4'  },},
        {  key: 'email', label: 'Email', _props: { scope: 'col', className:'fs-4'  }, },
        {  key: 'phone', label: 'Cellphone', _props: { scope: 'col', className:'fs-4' }, },
        {  key: 'actions', label: '', _props: {scope: 'col', className:'fs-4' }, },
      ]
    //Manejo de seleccion y visibilidad
    const handleEditClick=(users)=>{
        setSelectUser({...users})
        setVisible2(true)
    }
    const handleDeleteClick=(users)=>{
        setSelectUser({...users})
        setVisible(true)
    }
    const handleCreateClick=()=>{
      setNewUser({
        first_name:'',
        last_name:'',
        email:'',
        phone:''
      })
      setVisible3(true)
    }
    const handleDeleteAction= async()=>{
      try{
        await axios.delete(`http://localhost:3001/users/${selectUser.id}`)
        setUsers(users.filter((users) => users.id !== selectUser.id))
        setVisible(false)
        setSelectUser(null)
      }catch(error){
        console.error('Error deleting: ', error)
      }
    }
    const handleEditAction= async()=>{
      try{
        const response = await axios.put(`http://localhost:3001/users/${selectUser.id}`, selectUser)
        setUsers(users.map((users)=> users.id === selectUser.id ? response.data: users))
        setVisible2(false)
        setSelectUser(null)
      }catch(error){
        console.error("Error Editing: ",error)
      } 
    }
    const handleCreateAction= async()=>{
      try{
        const response = await axios.post('http://localhost:3001/users', newUser)
        console.log('Response data: ', response.data)      
        setUsers([...users, response.data])
        setNewUser({
          first_name: '',
          last_name: '',
          email:'',
          phone:'',
          birth_date:'',
          password: '',
        })
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
      }
      setVisible3(false)
    }

    const searching = users.filter(users =>
      users.first_name?.toLowerCase().includes(search.toLowerCase()) ||
      users.last_name?.toLowerCase().includes(search.toLowerCase()) ||
      users.email?.toLowerCase().includes(search.toLowerCase()) ||
      users.phone?.toLowerCase().includes(search)
    )

  return (
    <CCard>
    <CCardHeader className='d-flex justify-content-between align-items-center'>
        <h1>List of Users</h1>
        <CButton onClick={handleCreateClick} color='info' variant='outline'>
          <CIcon icon={cilUser} size='lg'/> Add +</CButton>
    </CCardHeader>
    <CCardHeader>
      <div className='d-flex justify-content-end'>
        <CForm className='w-50'>
          <CInputGroupText>
           <CIcon icon={cilSearch} size='lg'/>
           <CFormInput placeholder='Search User (name,email,phone)' value={search} onChange={(e) => setSearch(e.target.value)}/> 
          </CInputGroupText>
        </CForm>
      </div>
    </CCardHeader>
      <CCardBody>
        <CTable columns={columns} items={searching.map(users =>(
            {...users,
            actions: (
                <div className='d-flex gap-3'>
                <CButton color='primary'  onClick={()=>handleEditClick(users)}>Edit</CButton>
                <CButton color='danger'  onClick={()=>handleDeleteClick(users)}>Delete</CButton>
                </div>
            )}))}
            striped hover responsive align='middle' className='mb-0'
            />
      </CCardBody>
      <div className='d-flex justify-content-center'>
      <CPagination size="lg" aria-label='Page navigation example' className='content-align-center' onClick={handleEditClick} style={{cursor:'pointer'}}>
        <CPaginationItem aria-label="Previous">
        <span aria-hidden="true">&laquo;</span>
        </CPaginationItem>
        <CPaginationItem>1</CPaginationItem>
        <CPaginationItem>2</CPaginationItem>
        <CPaginationItem>3</CPaginationItem>
        <CPaginationItem aria-label="Next">
        <span aria-hidden="true">&raquo;</span>
        </CPaginationItem>
      </CPagination>
      </div>
      <CModal visible={visible} onClose={()=> setVisible(false)}>
        <CModalHeader>You want delete this User?</CModalHeader>
        <CModalBody>
        {selectUser &&(
            <p>{selectUser.first_name}/{selectUser.last_name}/{selectUser.email}/{selectUser.phone}</p>
        )} 
        <CModalFooter>
            <CButton color='danger' onClick={handleDeleteAction}>Delete</CButton>
        </CModalFooter>
        </CModalBody>
      </CModal>
      <CModal visible={visible2} onClose={()=> setVisible2(false)}>
        <CModalHeader>Editing the User: {selectUser?.first_name}</CModalHeader>
        <CModalBody>
        {selectUser && (
        <CForm>
        <CFormInput
          label="First Name"
          value={selectUser.first_name}
          onChange={(e) => setSelectUser({ ...selectUser, first_name: e.target.value })}
          className="mb-3"
        />
        <CFormInput
          label="Last Name"
          value={selectUser.last_name}
          onChange={(e) => setSelectUser({ ...selectUser, last_name: e.target.value })}
          className="mb-3"
        />
        <CFormInput
          label="Email"
          value={selectUser.email}
          onChange={(e) => setSelectUser({ ...selectUser, email: e.target.value })}
          className="mb-3"
        />
        </CForm>
        )}
        </CModalBody>
        <CModalFooter>
            <CButton color='primary' onClick={handleEditAction}>Update</CButton>
        </CModalFooter>
      </CModal>
      <CModal visible={visible3} onClose={()=>setVisible3(false)} className='mt-5'>
        <CModalHeader>
          <h3>Creating a User</h3>
        </CModalHeader>
        <CModalBody>
          <CForm>
            <CFormInput 
            label="First Name"
            value={newUser.first_name}
            onChange={(e)=>setNewUser({...newUser, first_name: e.target.value})}
            className="mb-3"
            />
            <CFormInput 
            label="Last Name"
            value={newUser.last_name}
            onChange={(e)=>setNewUser({...newUser, last_name: e.target.value})}
            className="mb-3"
            />
            <CFormInput
            label="Email"
            value={newUser.email}
            onChange={(e)=>setNewUser({...newUser, email: e.target.value})}
            className="mb-3"
            />
            <CFormInput
            label="Phone"
            value={newUser.phone}
            onChange={(e)=>setNewUser({...newUser, phone: e.target.value})}
            className="mb-3"
            />
          </CForm>
        </CModalBody>
        <CModalFooter>
          <CButton onClick={handleCreateAction}>Create</CButton>
        </CModalFooter>
      </CModal>
    </CCard>
  )
}

export default Users