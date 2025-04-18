import React, {useState} from 'react'
import { CCard, CCardBody, CPagination, CPaginationItem,CCardHeader, CButton, CTable, CModal, CModalHeader, CModalBody, CModalFooter,CForm, CFormInput } from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilUser } from '@coreui/icons'

const Users = () => {
    const[visible,setVisible]=useState(false)
    const[visible2,setVisible2]=useState(false)
    const[visible3,setVisible3]=useState(false)
    const [newUser,setNewUser]=useState({
      first_name:'',
      last_name:'',
      email:'',
      phone:'',
    })
    //Seleccion de Usuario Vacia
    const[selectUser,setSelectUser]=useState(null)
    //Arreglo de Usuarios
    const[users,setUsers]=useState([
      { first_name: 'Mark', last_name: 'Otto', email: 'mark@mdo.com', phone: '555-123', _cellProps: { first_name: {className: 'fs-5'}, last_name: {className: 'fs-5'} } },
      { first_name: 'Jacob', last_name: 'Thornton', email: 'jacob@fat.com', phone: '555-321', _cellProps: { first_name: {className: 'fs-5'}, last_name: {className: 'fs-5' }}, },
      { first_name: 'Larry', last_name: 'Gonzales', email: 'larry@twitter.com', phone:'555-132', _cellProps: { first_name: {className: 'fs-5'}, last_name: {className: 'fs-5'}}, },
      { first_name: 'John', last_name: 'Doe', email: 'john@doe.com', phone: '555-456', _cellProps: { first_name: {className: 'fs-5'}, last_name: {className: 'fs-5'}} },
      { first_name: 'Jane', last_name: 'Smith', email: 'jane@smith.com', phone: '555-789', _cellProps: { first_name: {className: 'fs-5'}, last_name: {className: 'fs-5'}} },
      { first_name: 'Robert', last_name: 'Johnson', email: 'robert@johnson.com', phone: '555-987', _cellProps: { first_name: {className: 'fs-5'}, last_name: {className: 'fs-5'}} },
      { first_name: 'Emily', last_name: 'Williams', email: 'emily@williams.com', phone: '555-654', _cellProps: { first_name: {className: 'fs-5'}, last_name: {className: 'fs-5'}} },
      { first_name: 'Michael', last_name: 'Brown', email: 'michael@brown.com', phone: '555-321', _cellProps: { first_name: {className: 'fs-5'}, last_name: {className: 'fs-5'}} },
      { first_name: 'Sarah', last_name: 'Jones', email: 'sarah@jones.com', phone: '555-876', _cellProps: { first_name: {className: 'fs-5'}, last_name: {className: 'fs-5'}} },
      { first_name: 'David', last_name: 'Garcia', email: 'david@garcia.com', phone: '555-234', _cellProps: { first_name: {className: 'fs-5'}, last_name: {className: 'fs-5'}} },
      { first_name: 'Jessica', last_name: 'Miller', email: 'jessica@miller.com', phone: '555-567', _cellProps: { first_name: {className: 'fs-5'}, last_name: {className: 'fs-5'}} },
      { first_name: 'James', last_name: 'Davis', email: 'james@davis.com', phone: '555-890', _cellProps: { first_name: {className: 'fs-5'}, last_name: {className: 'fs-5'}} },
      { first_name: 'Lisa', last_name: 'Rodriguez', email: 'lisa@rodriguez.com', phone: '555-432', _cellProps: { first_name: {className: 'fs-5'}, last_name: {className: 'fs-5'}} },
      { first_name: 'Daniel', last_name: 'Martinez', email: 'daniel@martinez.com', phone: '555-765', _cellProps: { first_name: {className: 'fs-5'}, last_name: {className: 'fs-5'}} },
      { first_name: 'Amanda', last_name: 'Hernandez', email: 'amanda@hernandez.com', phone: '555-098', _cellProps: { first_name: {className: 'fs-5'}, last_name: {className: 'fs-5'}} },
      { first_name: 'Christopher', last_name: 'Lopez', email: 'chris@lopez.com', phone: '555-543', _cellProps: { first_name: {className: 'fs-5'}, last_name: {className: 'fs-5'}} },
      { first_name: 'Ashley', last_name: 'Wilson', email: 'ashley@wilson.com', phone: '555-876', _cellProps: { first_name: {className: 'fs-5'}, last_name: {className: 'fs-5'}} },
      { first_name: 'Matthew', last_name: 'Anderson', email: 'matt@anderson.com', phone: '555-210', _cellProps: { first_name: {className: 'fs-5'}, last_name: {className: 'fs-5'}} },
      { first_name: 'Jennifer', last_name: 'Thomas', email: 'jennifer@thomas.com', phone: '555-543', _cellProps: { first_name: {className: 'fs-5'}, last_name: {className: 'fs-5'}} },
      { first_name: 'Joshua', last_name: 'Taylor', email: 'josh@taylor.com', phone: '555-876', _cellProps: { first_name: {className: 'fs-5'}, last_name: {className: 'fs-5'}} },
      { first_name: 'Elizabeth', last_name: 'Moore', email: 'liz@moore.com', phone: '555-109', _cellProps: { first_name: {className: 'fs-5'}, last_name: {className: 'fs-5'}} },
      { first_name: 'Andrew', last_name: 'Jackson', email: 'andrew@jackson.com', phone: '555-432', _cellProps: { first_name: {className: 'fs-5'}, last_name: {className: 'fs-5'}} },
      { first_name: 'Nicole', last_name: 'White', email: 'nicole@white.com', phone: '555-765', _cellProps: { first_name: {className: 'fs-5'}, last_name: {className: 'fs-5'}} },
  ])

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
    const handleDeleteAction=()=>{
        setUsers(users.filter((users) => users.email !== selectUser.email))
        setVisible(false)
        setSelectUser(null)
    }
    const handleEditAction=()=>{
        setUsers(users.map((users)=> users.email === selectUser.email ? {...selectUser, _cellProps: users._cellProps}:users))
        setVisible2(false)
        setSelectUser(null)
    }
    const handleCreateAction=()=>{
      setUsers([...users, { ...newUser, _cellProps: { first_name: {className: 'fs-5'}, last_name: {className: 'fs-5'} } }])
      setNewUser({
        first_name:'',
        last_name:'',
        email:'',
        phone:''
      })
      setVisible3(false)
    }
    
  return (
    <CCard>
    <CCardHeader className='d-flex justify-content-between align-items-center'>
        <h1>List of Users</h1>
        <CButton onClick={handleCreateClick} color='info' variant='outline'>
          <CIcon icon={cilUser} size='lg'/> Add +</CButton>
    </CCardHeader>
    <CCardHeader>
      <p>APARTADO DE FILTRACION</p>
    </CCardHeader>
      <CCardBody>
        <CTable columns={columns} items={users.map(users =>(
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