import React, {useEffect, useState} from 'react'
import CIcon from '@coreui/icons-react'
import { cilSearch, cilUser } from '@coreui/icons'
import { CCard, CCardHeader ,CCardBody, CPagination, CPaginationItem, CButton, CTable, CModal, CModalHeader, CModalBody, CModalFooter,CForm, CFormInput, CInputGroupText, CFormSelect, CInputGroup, CFormLabel } from '@coreui/react'
import api from '../../../api/axiosToken'

const Users = () => {
    const[deleteModal,setDeleteModal]=useState(false)
    const[editModal,setEditModal]=useState(false)
    const[createModal,setCreateModal]=useState(false)
    const[phoneCode, setPhoneCode]=useState('+58')
    const[search,setSearch]=useState('')
    const [newUser,setNewUser]=useState({
      first_name:'',
      last_name:'',
      email:'',
      phone:'',
      birth_date:'',
      password:'',
      role: 'user',
    })
    //Seleccion de Usuario Vacia
    const[selectUser,setSelectUser]=useState(null)
    //Arreglo de Usuarios
    const[users,setUsers]=useState([])
    //Carga de usuarios una vez
    useEffect(()=>{ api.get('/users').then(response=>setUsers(response.data)).catch(error=>console.error("Error: ",error))},[])
    const columns = [
        {  key: 'first_name', label: 'First Name',_props: { scope: 'col', className:'fs-4' }, },
        {  key: 'last_name', label: 'Last Name', _props: { scope: 'col', className:'fs-4'  },},
        {  key: 'email', label: 'Email', _props: { scope: 'col', className:'fs-4'  }, },
        {  key: 'phone', label: 'Cellphone', _props: { scope: 'col', className:'fs-4' }, },
        {  key: 'birth_date', label: 'BirthDate', _props: { scope: 'col', className:'fs-4' }, },
        {  key: 'role', label: 'Role', _props: { scope: 'col', className:'fs-4' }, },
        {  key: 'actions', label: '', _props: {scope: 'col', className:'fs-4' }, },
      ]
  
      
    const handleEditClick=(users)=>{
        const [phoneCode, phoneNumber] = users.phone.split(' ')
        setPhoneCode(phoneCode);
        setSelectUser({ ...users, phone: phoneNumber });
        setEditModal(true);
    }

    const handleDeleteClick=(users)=>{
        setSelectUser({...users})
        setDeleteModal(true)
    }

    const handleCreateClick=()=>{
      setNewUser({
        first_name:'',
        last_name:'',
        email:'',
        phone:'',
        birth_date:'',
        password:'',
        role: 'user',
      })
      setCreateModal(true)
    }

    const handleDeleteAction= async()=>{
      try{
        await api.delete(`/users/${selectUser.id}`)
        setUsers(users.filter((users) => users.id !== selectUser.id))
        setDeleteModal(false)
        setSelectUser(null)
      }catch(error){
        console.error('Error deleting: ', error)
      }
    }

    const handleEditAction= async()=>{
      const fulldata = { ...selectUser, phone: `${phoneCode} ${selectUser.phone}` };
      try{
        const response = await api.put(`/users/${selectUser.id}`, fulldata)
        setUsers(users.map((users)=> users.id === selectUser.id ? response.data: users))
        setEditModal(false)
        setSelectUser(null)
      }catch(error){
        console.error("Error Editing: ",error)
      } 
    }

    const handleCreateAction= async()=>{
      const fulldata = {...newUser, phone: `${phoneCode} ${newUser.phone}`}
      try{
        console.log('Phone: ', fulldata)
        const response = await api.post('/users', fulldata)
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
        setNewUser({
          first_name: '',
          last_name: '',
          email:'',
          phone:'',
          birth_date:'',
          password: '',
        })
      }
      setCreateModal(false)
    }

    const searching = users.filter(users =>
      users.first_name?.toLowerCase().includes(search.toLowerCase()) ||
      users.last_name?.toLowerCase().includes(search.toLowerCase()) ||
      users.email?.toLowerCase().includes(search.toLowerCase()) ||
      users.phone?.toLowerCase().includes(search.toLowerCase()) || 
      users.birth_date?.toLowerCase().includes(search.toLowerCase())
    )

    // Render role as text in the table
    const getRoleName = (role) => {
      if (role === 1) return 'Admin';
      if (role === 2) return 'Nurse';
      return 'User';
    };

  return (
    <CCard>
    <CCardHeader className='d-flex justify-content-between align-items-center'>
        <h1>Users</h1>
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
        <CTable 
          columns={columns} 
          items={searching.map(users => ({
            ...users,
            role: getRoleName(users.role),
            actions: (
              <div className='d-flex gap-3'>
                <CButton color='primary' onClick={() => handleEditClick(users)}>Edit</CButton>
                <CButton color='danger' onClick={() => handleDeleteClick(users)}>Delete</CButton>
              </div>
            )
          }))}
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
      <CModal visible={deleteModal} onClose={()=> setDeleteModal(false)} backdrop="static">
        <CModalHeader className="bg-primary text-white">
          <h5 className="modal-title">You want delete this User?</h5>
          </CModalHeader>
        <CModalBody>
        {selectUser &&(
            <strong>{selectUser.first_name} | {selectUser.last_name} | {selectUser.email} | {selectUser.phone}</strong>
        )} 
        <CModalFooter>
            <CButton color='danger' onClick={handleDeleteAction}>Delete</CButton>
        </CModalFooter>
        </CModalBody>
      </CModal>
      <CModal 
        visible={editModal} 
        onClose={() => setEditModal(false)}
        alignment="center"
        backdrop="static"
      >
      <CModalHeader className="bg-primary text-white">
        <h5 className="modal-title">Editing User: {selectUser?.first_name}</h5>
      </CModalHeader>
      <CModalBody>
      {selectUser && (
        <CForm className="px-3 py-2">
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
            type="email"
            label="Email Address"
            value={selectUser.email}
            onChange={(e) => setSelectUser({ ...selectUser, email: e.target.value })}
            className="mb-3"
          />
          <CFormInput
            label="Birthdate"
            type="date"
            value={selectUser.birth_date}
            onChange={(e) => setSelectUser({...selectUser, birth_date: e.target.value})}
            className="mb-3"
          />
          <div className="mb-3">
            <CFormLabel>Role</CFormLabel>
            <CFormSelect
              value={selectUser.role || 3}
              onChange={e => setSelectUser({ ...selectUser, role: Number(e.target.value) })}
            >
              <option value={1}>Admin</option>
              <option value={2}>Nurse</option>
              <option value={3}>User</option>
            </CFormSelect>
          </div>
          <div className="mb-3">
            <CFormLabel>Phone number</CFormLabel>
            <CInputGroup>
            <CFormSelect 
              value={phoneCode} 
              onChange={(e) => setPhoneCode(e.target.value)}
              style={{maxWidth: '100px'}}>
              <option value="+58">+58 (VE)</option>
              <option value="+57">+57 (CO)</option>
            </CFormSelect>
            <CFormInput
              placeholder="Enter phone number"
              value={selectUser.phone}
              onChange={(e) => setSelectUser({...selectUser, phone: e.target.value})}
              feedbackInvalid="Please provide a valid phone number."
              valid={selectUser.phone.length > 5}
            />
            </CInputGroup>
          </div>
        </CForm>
      )}
      </CModalBody>
      <CModalFooter className="border-top-0">
        <CButton color="secondary" onClick={() => setEditModal(false)}>
          Cancel
        </CButton>
        <CButton color="primary" onClick={handleEditAction}>
        Save Changes
        </CButton>
      </CModalFooter>
      </CModal>
      <CModal 
        visible={createModal} 
        onClose={() => setCreateModal(false)}
        alignment="center"
        backdrop="static"
      >
      <CModalHeader className="bg-primary text-white">
        <h5 className="modal-title">Create New User</h5>
      </CModalHeader>
      <CModalBody>
        <CForm className="px-3 py-2">
          <CFormInput 
            label="First Name"
            placeholder="Enter first name"
            value={newUser.first_name}
            onChange={(e) => setNewUser({...newUser, first_name: e.target.value})}
            className="mb-3"
          />
          <CFormInput 
            label="Last Name"
            placeholder="Enter last name"
            value={newUser.last_name}
            onChange={(e) => setNewUser({...newUser, last_name: e.target.value})}
            className="mb-3"
          />
          <CFormInput
            type="email"
            label="Email Address"
            placeholder="Enter email"
            value={newUser.email}
            onChange={(e) => setNewUser({...newUser, email: e.target.value})}
            className="mb-3"
          />
          <CFormInput
            label="Birthdate"
            type="date"
            value={newUser.birth_date}
            onChange={(e) => setNewUser({...newUser, birth_date: e.target.value})}
            className="mb-3"
          />
          <div className="mb-3">
            <CFormLabel>Role</CFormLabel>
            <CFormSelect
              value={newUser.role}
              onChange={e => setNewUser({ ...newUser, role: Number(e.target.value) })}
            >
              <option value={1}>Admin</option>
              <option value={2}>Nurse</option>
              <option value={3}>User</option>
            </CFormSelect>
          </div>
          <div className="mb-3">
            <CFormLabel>Phone number</CFormLabel>
            <CInputGroup>
            <CFormSelect 
              value={phoneCode} 
              onChange={(e) => setPhoneCode(e.target.value)}
              style={{maxWidth: '100px'}}>
              <option value="+58">+58 (VE)</option>
              <option value="+57">+57 (CO)</option>
            </CFormSelect>
            <CFormInput
              placeholder="Enter phone number"
              value={newUser.phone}
              onChange={(e) => setNewUser({...newUser, phone: e.target.value})}
              feedbackInvalid="Please provide a valid phone number."
              valid={newUser.phone.length > 5}
            />
            </CInputGroup>
          </div>
        </CForm>
        </CModalBody>
        <CModalFooter className="border-top-0">
          <CButton color="secondary" onClick={() => setCreateModal(false)}>
            Cancel
          </CButton>
          <CButton color="primary" onClick={handleCreateAction}>
            Create User
          </CButton>
        </CModalFooter>
      </CModal>
    </CCard>
  )
}

export default Users