import react, {useEffect, useState} from 'react'
import CIcon from '@coreui/icons-react'
import { cilSearch } from '@coreui/icons'
import { CCard, CCardBody, CCardFooter, CRow, CCardImage, CCol, CCardText, CCardTitle, CCardHeader, CModal, CModalHeader, CModalBody, CModalFooter, CForm, CFormInput,CFormTextarea, CButton, CInputGroupText} from '@coreui/react'
import '../../../scss/style.scss'
import api from '../../../api/axiosToken'


const Residents= () =>{
    // Utilidad para formatear fechas tipo 1940-11-30T06:00:00.000Z a YYYY-MM-DD
    function formatDate(dateString) {
        if (!dateString) return '';
        const d = new Date(dateString);
        if (isNaN(d)) return dateString;
        return d.toISOString().slice(0, 10);
    }
    
    const [modalRegis,setModalRegis]=useState(false)
    const [infoRes, setInfoRes] = useState(false)
    const [selectResident,setSelectResident] = useState(null)
    const [search,setSearch]=useState('')
    const [residents,setResidents]=useState([])
    useEffect(()=>{api.get('/residents').then(response=>setResidents(response.data)).catch(error=>console.error('Error carga: ',error))}, 
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
        setInfoRes(true)
    }

    const handleAddCreate= async()=>{
        try{
            const response = await api.post('/residents', newResident)
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
        setModalRegis(false)
    }

    const handleDeleteAction= async()=>{
        try{
            const response = await api.delete(`/residents/${selectResident.id_resident}`)
            setResidents(residents.filter((resident)=>resident.id_resident!==selectResident.id_resident))
            setSelectResident(null)
        }catch(error){
            console.error('Error deleting: ', error)
        }
        setInfoRes(false)
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
                        <CCard className="h-100 card_resident" onClick={()=>setModalRegis(true)}> 
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
                    {searching.map((resident) =>
                      <CCol xs key={resident.id || resident.id_resident}>
                        <CCard className="h-100 card_resident" onClick={() => handleInfoAction(resident)}>
                          <CCardHeader><h4>{resident.first_name} {resident.last_name}</h4></CCardHeader>
                          <CCardBody>
                            <CCardImage
                              src={resident.photo}
                            />
                          </CCardBody>
                          <CCardFooter>
                            <small className="text-body-secondary">In the geriatric since: {formatDate(resident.admission_date)} </small>
                          </CCardFooter>
                        </CCard>
                      </CCol>
                    )}
                </CRow>
            </CCardBody>
            </CCard>
            <CModal 
                visible={modalRegis} 
                onClose={() => setModalRegis(false)}
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
                <CButton color="secondary" onClick={() => setModalRegis(false)}>
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
                visible={infoRes} 
                onClose={() => setInfoRes(false)}
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
                        <p>{formatDate(selectResident.birthdate)}</p>
                    </div>
                    <div className="d-flex justify-content-between border-bottom py-2">
                        <span className="fw-bold">Admission Date:</span>
                        <p>{formatDate(selectResident.admission_date)}</p>
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
            <CButton color="secondary" onClick={() => setInfoRes(false)}> Close </CButton>
            </CModalFooter>
            </CModal>
        </div>
    )
}

export default Residents