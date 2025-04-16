import React, {useState} from 'react'
import { CCard, CCardBody, CPagination, CPaginationItem,CCardHeader, CButton, CTable, CModal, CModalHeader, CModalBody, CModalFooter,CForm, CFormInput } from '@coreui/react'

const Users = () => {
    const[visible,setVisible]=useState(false)
    const[visible2,setVisible2]=useState(false)
    //Seleccion de Usuario Vacia
    const[selectUser,setSelectUser]=useState(null)
    //Arreglo de Usuarios
    const[users,setUsers]=useState([
        { first_name: 'Mark', last_name: 'Otto', email: '@mdo', phone: '555-123',_cellProps: { first_name: {className: 'fs-5'}, last_name: {className: 'fs-5'} } },
        { first_name: 'Jacob', last_name: 'Thornton', email: '@fat', phone: '555-321',_cellProps: { first_name: {className: 'fs-5'}, last_name: {className: 'fs-5' }}, },
        { first_name: 'Larry', last_name: 'Gonzales', email: '@twitter', phone:'555-132',_cellProps: { first_name: {className: 'fs-5'}, last_name: {className: 'fs-5'}}, },
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
    const handelDeleteClick=(users)=>{
        setSelectUser({...users})
        setVisible(true)
    }

    const handleDeleteAction=()=>{
        setUsers(users.filter((users) => users.email !== selectUser.email))
        setVisible(false)
        setSelectUser(null)
    }
    const handleEditAction=()=>{
        setUsers(users.map((users)=> users.email === selectUser.email ? {...selectUser, _cellProps: users._cellProps}:users))
        setVisible2(false)
        selectUser(null)
    }

  return (
    <CCard>
    <CCardHeader className='d-flex justify-content-between align-items-center'>
        <h2>List of Users</h2>
    </CCardHeader>
      <CCardBody>
        <CTable columns={columns} items={users.map(users =>(
            {...users,
            actions: (
                <div className='d-flex gap-3'>
                <CButton color='primary'  onClick={()=>handleEditClick(users)}>Edit</CButton>
                <CButton color='danger'  onClick={()=>handelDeleteClick(users)}>Delete</CButton>
                </div>
            )}))}
            striped hover responsive align='middle' className='mb-0'
            />
      </CCardBody>
      <div className='d-flex justify-content-center'>
      <CPagination size="lg" aria-label='Page navigation example' className='content-align-center'>
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
        <CModalHeader>Edit User: {selectUser?.first_name}</CModalHeader>
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
    </CCard>
  )
}

export default Users