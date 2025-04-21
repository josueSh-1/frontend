import { CCard, CCardBody, CCardFooter, CRow, CCardImage, CCol, CCardText, CCardTitle, CCardHeader} from '@coreui/react'
import react, {useState} from 'react'
import '../../../scss/style.scss'

import avatar1 from 'src/assets/images/avatars/1.jpg'
import avatar2 from 'src/assets/images/avatars/2.jpg'
import avatar3 from 'src/assets/images/avatars/3.jpg'
import avatar4 from 'src/assets/images/avatars/4.jpg'
import avatar5 from 'src/assets/images/avatars/5.jpg'
import avatar6 from 'src/assets/images/avatars/6.jpg'

const Residents= () =>{

    const [residents,setResidents]=useState([
        {  id: 1, first_name: 'Juan', last_name: 'Pérez', birthdate: '1990-05-15', admission_date: '2023-01-10', bio: 'Juan es un ingeniero apasionado por la tecnología y la música.', photo: avatar6,},
        { id:2 ,first_name: 'María', last_name: 'Gómez', birthdate: '1985-08-22', admission_date: '2022-06-05', bio: 'María es una artista que disfruta pintar y viajar.', photo: avatar5, },
        { id:3, first_name: 'Carlos', last_name: 'Rodríguez', birthdate: '1995-03-30', admission_date: '2024-02-20', bio: 'Carlos es un estudiante de medicina con interés en la investigación.', photo: avatar3, },
        { id:4, first_name: 'Ana', last_name: 'Martínez', birthdate: '1988-11-12', admission_date: '2023-09-15', bio: 'Ana es una escritora que publica novelas de ficción.', photo: avatar4, },
        { id:5, first_name: 'Luis', last_name: 'Sánchez', birthdate: '1992-07-25', admission_date: '2024-01-30', bio: 'Luis es un chef especializado en cocina internacional.', photo: avatar2, },
    ])
    const [newResident, setNewResident]=useState({
        first_name: '',
        last_name: '',
        birthdate: '',
        admission_date: '',
        bio: '',
        photo: '',
    })

    return(
        <>
        <CCard>
            <CCardBody>
                <CRow xs={{ cols: 1 }} md={{ cols: 3 }} className="g-5">
                    <CCol xs>
                        <CCard className="h-100 card_resident"> 
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
                     <CCol xs key={resident.id}>
                      <CCard className="h-100 card_resident"> 
                         <CCardHeader><h4>{resident.first_name} {resident.last_name}</h4></CCardHeader>
                         <CCardBody>
                         <CCardImage 
                            src={resident.photo || 'https://via.placeholder.com/150'}
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
        
        </>   
    )
}

export default Residents