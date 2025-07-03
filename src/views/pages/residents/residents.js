import React, {useEffect, useState} from 'react'
import CIcon from '@coreui/icons-react'
import { cilSearch } from '@coreui/icons'
import { CCard, CCardBody, CCardFooter, CRow, CCardImage, CCol, CCardText, CCardTitle, CCardHeader, CModal, CModalHeader, CModalBody, CModalFooter, CForm, CFormInput,CFormTextarea, CButton, CInputGroupText} from '@coreui/react'
import '../../../scss/style.scss'
import api from '../../../api/axiosToken'

const Residents = () => {
    function formatDate(dateString) {
        if (!dateString) return '';
        const d = new Date(dateString);
        if (isNaN(d)) return dateString;
        return d.toISOString().slice(0, 10);
    }
    
    const [modalRegis, setModalRegis] = useState(false)
    const [infoRes, setInfoRes] = useState(false)
    const [selectResident, setSelectResident] = useState(null)
    const [search, setSearch] = useState('')
    const [residents, setResidents] = useState([])
    const [tempImages, setTempImages] = useState({}) // Almacenará las imágenes temporales

    const getUserRoleName = (roleId) => {
        const roles = {
            1: 'admin',
            2: 'nurse',
            3: 'user'
        };
        return roles[roleId] || 'user';
    };

    const userRoleId = localStorage.getItem('user_role');
    const currentUserRole = getUserRoleName(userRoleId);

    useEffect(() => {
        api.get('/residents').then(response => setResidents(response.data)).catch(error => console.error('Error carga: ', error))
    }, [])

    const [newResident, setNewResident] = useState({
        first_name: '',
        last_name: '',
        birthdate: '',
        admission_date: '',
        bio: '',
        photo: null, // Cambiado a null para manejar el archivo
    })

    const handleImage = (e) => {
        const file = e.target.files[0]
        if (file) {
            const imageURL = URL.createObjectURL(file)
            setNewResident({...newResident, photo: file}) // Guardamos el archivo
        }
    }

    const handleInfoAction = (resident) => {
        setSelectResident({
            ...resident,
            // Usamos la imagen temporal si existe, sino la del residente
            photo: tempImages[resident.id_resident] || resident.photo
        })
        setInfoRes(true)
    }

    const handleAddCreate = async () => {
        try {
            // Crear residente sin la foto (ya que no la estamos enviando al backend)
            const residentData = {
                first_name: newResident.first_name,
                last_name: newResident.last_name,
                birthdate: newResident.birthdate,
                admission_date: newResident.admission_date,
                bio: newResident.bio,
                // photo no se incluye ya que no lo estamos guardando en el backend
            }
            
            const response = await api.post('/residents', residentData)
            
            // Si hay una foto, guardarla temporalmente
            if (newResident.photo) {
                const imageURL = URL.createObjectURL(newResident.photo)
                setTempImages(prev => ({
                    ...prev,
                    [response.data.id_resident]: imageURL
                }))
            }
            
            setResidents([...residents, response.data])
            setNewResident({
                first_name: '',
                last_name: '',
                birthdate: '',
                admission_date: '',
                bio: '',
                photo: null,
            })
        } catch (error) {
            console.error('Error creating resident: ', error)
        }
        setModalRegis(false)
    }

    const handleDeleteAction = async () => {
        try {
            await api.delete(`/residents/${selectResident.id_resident}`)
            setResidents(residents.filter((resident) => resident.id_resident !== selectResident.id_resident))
            
            // Limpiar imagen temporal si existe
            if (tempImages[selectResident.id_resident]) {
                const newTempImages = {...tempImages}
                delete newTempImages[selectResident.id_resident]
                setTempImages(newTempImages)
            }
            
            setSelectResident(null)
        } catch (error) {
            console.error('Error deleting: ', error)
        }
        setInfoRes(false)
    }

    const searching = residents.filter(resident =>
        resident.first_name.toLowerCase().includes(search.toLowerCase()) ||
        resident.last_name.toLowerCase().includes(search.toLowerCase())
    )

    // Función para obtener la imagen (temporal o por defecto)
    const getResidentImage = (resident) => {
        if (tempImages[resident.id_resident]) {
            return tempImages[resident.id_resident]
        }
        return resident.photo || 'https://via.placeholder.com/150' // Imagen por defecto si no hay ninguna
    }
        
    return (
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
                        {(currentUserRole === 'admin' || currentUserRole === 'nurse') && (
                            <CCol xs>
                                <CCard className="h-100 card_resident" onClick={() => setModalRegis(true)}> 
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
                        )}
                        {searching.map((resident) =>
                            <CCol xs key={resident.id || resident.id_resident}>
                                <CCard className="h-100 card_resident" onClick={() => handleInfoAction(resident)}>
                                    <CCardHeader><h4>{resident.first_name} {resident.last_name}</h4></CCardHeader>
                                    <CCardBody>
                                        <CCardImage
                                            src={getResidentImage(resident)}
                                            style={{ height: '200px', objectFit: 'cover' }}
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
            
            {/* Modal para agregar residente (se mantiene igual) */}
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
                            required
                        />
                        <CFormInput
                            label="Last Name"
                            type="text"
                            placeholder="Enter last name"
                            value={newResident.last_name}
                            onChange={(e) => setNewResident({...newResident, last_name: e.target.value})}
                            className="mb-3"
                            required
                        />
                        <CFormInput
                            label="Birthdate"
                            type="date"
                            value={newResident.birthdate}
                            onChange={(e) => setNewResident({...newResident, birthdate: e.target.value})}
                            className="mb-3"
                            required
                        />
                        <CFormInput
                            label="Admission Date"
                            type="date"
                            value={newResident.admission_date}
                            onChange={(e) => setNewResident({...newResident, admission_date: e.target.value})}
                            className="mb-3"
                            required
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
                                accept="image/*"
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
            
            {/* Modal de información del residente */}
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
                                    src={getResidentImage(selectResident)}
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
                    <CButton color="danger" onClick={handleDeleteAction}> Delete </CButton>
                    <CButton color="secondary" onClick={() => setInfoRes(false)}> Close </CButton>
                </CModalFooter>
            </CModal>
        </div>
    )
}

export default Residents