import { CCard, CCardBody, CCardFooter, CRow, CCardImage, CCol, CCardText, CCardTitle, CCardHeader, CModal, CModalHeader, CModalBody, CModalFooter, CForm, CFormInput,CFormTextarea, CButton, COffcanvas, COffcanvasBody, COffcanvasHeader, COffcanvasTitle, CCloseButton} from '@coreui/react'
import react, {useState} from 'react'
import '../../../scss/style.scss'

import avatar2 from 'src/assets/images/avatars/2.jpg'
import avatar3 from 'src/assets/images/avatars/3.jpg'
import avatar4 from 'src/assets/images/avatars/4.jpg'
import avatar5 from 'src/assets/images/avatars/5.jpg'
import avatar6 from 'src/assets/images/avatars/6.jpg'

const Residents= () =>{

    const [visible,setVisible]=useState(false)
    const [visible2, setVisible2] = useState(false)
    const [selectResident,setSelectResident] = useState(null)
    const [residents,setResidents]=useState([
        {   first_name: 'Juan', last_name: 'Pérez', birthdate: '1990-05-15', admission_date: '2023-01-10', bio: 'Juan es un ingeniero apasionado por la tecnología y la música.', photo: avatar6,},
        {   first_name: 'María', last_name: 'Gómez', birthdate: '1985-08-22', admission_date: '2022-06-05', bio: 'María es una artista que disfruta pintar y viajar.', photo: avatar5, },
        {  first_name: 'Carlos', last_name: 'Rodríguez', birthdate: '1995-03-30', admission_date: '2024-02-20', bio: 'Carlos es un estudiante de medicina con interés en la investigación.', photo: avatar3, },
        {   first_name: 'Ana', last_name: 'Martínez', birthdate: '1988-11-12', admission_date: '2023-09-15', bio: 'Ana es una escritora que publica novelas de ficción.', photo: avatar4, },
        {  first_name: 'Luis', last_name: 'Sánchez', birthdate: '1992-07-25', admission_date: '2024-01-30', bio: 'Luis es un chef especializado en cocina internacional.', photo: avatar2, },
    ])
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

    const handleAddCreate=()=>{
        const newID= Math.max(...residents.map(r=>r.id),0)+1
        setResidents([...residents, {...newResident, id: newID}])
        setResidents([...residents, newResident])
        setNewResident({
            first_name: '',
            last_name: '',
            birthdate: '',
            admission_date: '',
            bio: '',
            photo: '',})
        setVisible(false)
    }

    const handleInfoAction=(residents)=>{
        setSelectResident({...residents})
        setVisible2(true)
    }
    return(
        <div>
        <CCard>
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
                    {residents.map((resident)=>
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
        <CModal visible={visible} onClose={()=>setVisible(false)} className='mt-5'>
            <CModalHeader>
                <h3>Adding a Resident</h3>
            </CModalHeader>
            <CModalBody>
                <CForm>
                 <CFormInput
                    label="First Name Resident"
                    type="text"
                    placeholder="first name"
                    value={newResident.first_name}
                    onChange={(e) => setNewResident({...newResident, first_name: e.target.value})}
                    className='mb-4'
                />
                <CFormInput
                    label="Last Name Resident"
                    type="text"
                    value={newResident.last_name}
                    onChange={(e) => setNewResident({...newResident, last_name: e.target.value})}
                    className='mb-4'            
                />
                <CFormInput
                    label="Birthdate Resident"
                    type="date"
                    value={newResident.birthdate}
                    onChange={(e) => setNewResident({...newResident, birthdate: e.target.value})}
                    className='mb-4'            
                />
                <CFormInput
                    label="Resident's income"
                    type="date"
                    value={newResident.admission_date}
                    onChange={(e) => setNewResident({...newResident, admission_date: e.target.value})}
                    className='mb-4'            
                />
                <CFormTextarea
                    label="Biografy of the Resident"
                    type="text"
                    value={newResident.bio}
                    onChange={(e) => setNewResident({...newResident, bio: e.target.value})}
                    rows={4}
                    className='mb-4'
                />
                <CFormInput
                    label="Photo of the Resident"
                    type="file"
                    onChange={handleImage}
                    className='mb-4'            
                />
                </CForm>
            </CModalBody>
            <CModalFooter>
                <CButton onClick={handleAddCreate} color='info' variant='outline'>Add +</CButton>
            </CModalFooter>
        </CModal>
        <CModal visible={visible2} onClose={() => setVisible2(false)}>
             <CModalHeader>
                 <h4>Resident Info</h4>
             </CModalHeader>
            <CModalBody>
                 {selectResident && (
                <div style={{ textAlign: 'center' }}>
                    <img
                    src={selectResident.photo}
                    alt={`${selectResident.first_name} ${selectResident.last_name}`}
                    style={{ borderRadius: '50%', width: '150px', height: '150px', objectFit: 'cover', marginBottom: '1rem' }}
                    />
                    <h5>{selectResident.first_name} {selectResident.last_name}</h5>
                    <p><strong>Birthdate:</strong> {selectResident.birthdate}</p>
                    <p><strong>Admission:</strong> {selectResident.admission_date}</p>
                    <p><strong>Bio:</strong> {selectResident.bio}</p>
                </div>
                )}
            </CModalBody>
        </CModal>
        </div>
    )
}

export default Residents