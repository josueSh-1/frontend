import react, {useEffect, useState} from 'react'
import CIcon from '@coreui/icons-react'
import { cilSearch } from '@coreui/icons'
import { CCard, CCardBody, CCardFooter, CRow, CCardImage, CCol, CCardText, CCardTitle, CCardHeader, CModal, CModalHeader, CModalBody, CModalFooter, CForm, CFormInput,CFormTextarea, CButton, CInputGroupText} from '@coreui/react'
import '../../../scss/style.scss'
import axios from "axios"


const Residents= () =>{
    
    const [visible,setVisible]=useState(false)
    const [visible2, setVisible2] = useState(false)
    const [selectResident,setSelectResident] = useState(null)
    const [search,setSearch]=useState('')
    const [residents,setResidents]=useState([])
    useEffect(()=>{axios.get('http://localhost:3001/residents').then(response=>setResidents(response.data)).catch(error=>console.error('Error carga: ',error))}, 
    [])
    const [newResident, setNewResident]=useState({
        first_name: '',
        last_name: '',
        birthdate: '',
        admission_date: '',
        bio: '',
        photo: '',
    })

    const handleImage=(e)=>{
        const file = e.target.files[0]
        if(file){
            const imageURL = URL.createObjectURL(file) 
            setNewResident({...newResident, photo: imageURL})
        }
    }
    const handleInfoAction=(residents)=>{
        setSelectResident({...residents})
        setVisible2(true)
    }
    const handleAddCreate= async()=>{
        try{
            const response = await axios.post('http://localhost:3001/residents', newResident)
            setResidents([...residents, response.data])
            setNewResident({
                first_name: '',
                last_name: '',
                birthdate: '',
                admission_date: '',
                bio: '',
                photo: '',})
        }catch(error){
            console.error('Error creating resident: ', error)
        }
        setVisible(false)
    }
    const handleDeleteAction= async()=>{
        try{
            const response = await axios.delete(`http://localhost:3001/residents/${selectResident.id}`)
            setResidents(residents.filter((resident)=>resident.id!==selectResident.id))
            setSelectResident(null)
        }catch(error){
            console.error('Error deleting: ', error)
        }
        setVisible2(false)
    }
    const searching = residents.filter(residents=>
        residents.first_name.toLowerCase().includes(search.toLowerCase()) ||
        residents.last_name.toLowerCase().includes(search.toLowerCase())
    )
        
    
    return(
        <div>
        <CCard>
            <CCardHeader>
                <div className='d-flex justify-content-end'>
                    <CForm className='w-50'>
                        <CInputGroupText>
                            <CIcon icon={cilSearch} size='lg'/>
                            <CFormInput placeholder='Search Residents Name' value={search} onChange={(e) => setSearch(e.target.value)}/> 
                        </CInputGroupText>
                    </CForm>
                </div>
            </CCardHeader>
            <CCardBody>
                <CRow xs={{ cols: 1 }} md={{ cols: 3 }} className="g-5">
                    <CCol xs>
                        <CCard className="h-100 card_resident" onClick={()=>setVisible(true)}> 
                        <CCardHeader><h4> ADD a Resident</h4></CCardHeader>
                        <CCardBody>
                        <CCardTitle> 
                            <div style={{ fontSize: '3rem', color: '#6c757d', marginBottom: '2rem', border: '1px solid', borderColor: 'gray', marginTop:'125px', paddingBottom:'15px'}}>
                                +
                            </div>
                        </CCardTitle>
                        <CCardText>
                            You can Add news residents, Click Here!
                        </CCardText>
                        </CCardBody>
                        <CCardFooter>
                            <small className="text-body-secondary">What are you waiting for?</small>
                        </CCardFooter>
                        </CCard>
                    </CCol>
                    {searching.map((resident)=>
                     <CCol xs>
                      <CCard className="h-100 card_resident" onClick={()=>handleInfoAction(resident)}> 
                         <CCardHeader><h4>{resident.first_name} {resident.last_name}</h4></CCardHeader>
                         <CCardBody>
                         <CCardImage 
                            src={resident.photo}
                         />
                        </CCardBody>
                         <CCardFooter>
                           <small className="text-body-secondary">In the geriatric since: {resident.admission_date} </small>
                         </CCardFooter>
                         </CCard>
                     </CCol>
                    )}
                </CRow>
            </CCardBody>
            </CCard>
            <CModal 
                visible={visible} 
                onClose={() => setVisible(false)}
                alignment="center"
                backdrop="static"
            >
            <CModalHeader className="bg-primary text-white">
                <h5 className="modal-title">Adding a Resident</h5>
            </CModalHeader>
            <CModalBody>
            <CForm onSubmit={handleAddCreate} className="px-3 py-2">
                <CFormInput
                    label="First Name"
                    type="text"
                    placeholder="Enter first name"
                    value={newResident.first_name}
                    onChange={(e) => setNewResident({...newResident, first_name: e.target.value})}
                    className="mb-3"
                />
                <CFormInput
                    label="Last Name"
                    type="text"
                    placeholder="Enter last name"
                    value={newResident.last_name}
                    onChange={(e) => setNewResident({...newResident, last_name: e.target.value})}
                    className="mb-3"
                />
                <CFormInput
                    label="Birthdate"
                    type="date"
                    value={newResident.birthdate}
                    onChange={(e) => setNewResident({...newResident, birthdate: e.target.value})}
                    className="mb-3"
                />
                <CFormInput
                    label="Admission Date"
                    type="date"
                    value={newResident.admission_date}
                    onChange={(e) => setNewResident({...newResident, admission_date: e.target.value})}
                    className="mb-3"
                />
                <CFormTextarea
                    label="Biography"
                    placeholder="Enter resident's biography"
                    value={newResident.bio}
                    onChange={(e) => setNewResident({...newResident, bio: e.target.value})}
                    rows={4}
                    className="mb-3"
                />
                <div className="mb-3">
                    <label className="form-label">Photo</label>
                    <CFormInput
                        type="file"
                        onChange={handleImage}
                    />
                </div>
            </CForm>
            </CModalBody>
            <CModalFooter className="border-top-0">
                <CButton color="secondary" onClick={() => setVisible(false)}>
                    Cancel
                </CButton>
                <CButton 
                    color="primary" 
                    type="submit" 
                    onClick={handleAddCreate}
                >
                    Add Resident
                </CButton>
            </CModalFooter>
            </CModal>
            <CModal 
                visible={visible2} 
                onClose={() => setVisible2(false)}
                alignment="center"
            >
            <CModalHeader className="bg-primary text-white">
                <h5 className="modal-title">Resident Information</h5>
            </CModalHeader>
            <CModalBody>
                {selectResident && (
                    <div className="text-center px-4 py-3">
                        <div className="mb-4">
                            <img
                                src={selectResident.photo}
                                alt={`${selectResident.first_name} ${selectResident.last_name}`}
                                className="rounded-circle border border-3 border-primary"
                                style={{ 
                                width: '180px', 
                                height: '180px', 
                                objectFit: 'cover',
                                boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
                                }}
                            />
                        </div>
                         <h4 className="mb-3">
                        {selectResident.first_name} {selectResident.last_name}
                        </h4>
                    <div className="text-start mx-auto" style={{ maxWidth: '400px' }}>
                    <div className="d-flex justify-content-between border-bottom py-2">
                        <span className="fw-bold">Birthdate:</span>
                        <p>{selectResident.birthdate}</p>
                    </div>
                    <div className="d-flex justify-content-between border-bottom py-2">
                        <span className="fw-bold">Admission Date:</span>
                        <p>{selectResident.admission_date}</p>
                    </div>
                    <div className="mt-3">
                        <h6 className="fw-bold">Biography:</h6>
                        <p className="text-muted">
                        {selectResident.bio}
                        </p>
                    </div>
                </div>
            </div>
            )}
            </CModalBody>
            <CModalFooter className="border-top-0 justify-content-center">
            <CButton color="danger" onClick={() => handleDeleteAction(residents)}> Delete </CButton>
            <CButton color="secondary" onClick={() => setVisible2(false)}> Close </CButton>
            </CModalFooter>
            </CModal>
        </div>
    )
}

export default Residents