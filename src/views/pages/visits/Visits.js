import React, {useEffect, useState } from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
import { CModal, CModalHeader, CModalBody, CModalFooter, CButton, CForm, CFormInput, CFormTextarea, CPopover  } from '@coreui/react'
import api from '../../../api/axiosToken'



const Visits = () => {
  const [eventModal, setEventModal] = useState(false)
  const [newEvent, setNewEvent] = useState({
    title: '',
    date: '',
    description: '',
    start_time: '',
    end_time: ''
  })
  const [events, setEvents] = useState([])
  const [eventOptions, setEventOptions] = useState([]) // lista de eventos base para el select
  // Hook para cargar eventos desde events_log y eventos base al montar el componente
  useEffect(() => {
    // Cargar eventos completos desde el nuevo endpoint
    api.get('/event_log/full')
      .then(res => {
        // El backend ya trae todo: title, description, first_name, last_name, etc.
        const eventsFull = res.data.map(ev => ({
          ...ev,
          title: ev.title,
          description: ev.description,
          creator_name: `${ev.first_name || ''} ${ev.last_name || ''}`.trim()
        }));
        setEvents(eventsFull);
      })
      .catch(error => console.error("Error cargando eventos: ", error));

    // Cargar eventos base para el select
    api.get('/event')
      .then(response => setEventOptions(response.data))
      .catch(error => console.error("Error cargando eventos base: ", error));
  }, [])

  const handleDateClick = (arg) => {
    setNewEvent({ title: '', date: arg.dateStr, description: '', start_time: '', end_time: '' })
    setEventModal(true)
  }

  // Cuando el usuario selecciona un evento base, actualiza el título y la descripción
  const handleEventSelect = (e) => {
    const selectedId = e.target.value;
    const selectedEvent = eventOptions.find(ev => String(ev.id_event || ev.id) === String(selectedId));
    setNewEvent({
      ...newEvent,
      title: selectedId,
      description: selectedEvent ? selectedEvent.description : ''
    });
  }

  const handleCreateEvent = async () => {
    try {
      // Ya no se crea el evento base aquí, solo se usa el seleccionado
      const eventId = newEvent.title; // el value del select es el id del evento base

      // Obtener el usuario actual desde localStorage (ya decodificado)
      let fk_user = null;
      let creator_name = '';
      try {
        const user = JSON.parse(localStorage.getItem('user'));
        console.log('USER LOCALSTORAGE:', user);
        // Ajusta aquí según la estructura real del objeto user
        fk_user = user?.id || user?.id_user || null;
        creator_name = `${user?.first_name || ''} ${user?.last_name || ''}`.trim();
        if (!fk_user) {
          alert('No se pudo obtener el id del usuario. Revisa la estructura del objeto user en localStorage.');
          throw new Error 
        }
      }catch(e){
        fk_user = null;
        creator_name = '';
        console.log(e)
        alert('Error obteniendo el usuario actual. Debes volver a iniciar sesión.', e);
        return;
      }

      // 2. Crear el registro en events_log
      const logRes = await api.post('/event_log', {
        date: newEvent.date,
        start_time: newEvent.start_time,
        end_time: newEvent.end_time,
        fk_id_event: eventId,
        fk_user: fk_user,
        creator_name: creator_name
      })

      // Buscar el evento base para mostrar el título y descripción correctos
      const selectedEvent = eventOptions.find(ev => String(ev.id_event || ev.id) === String(eventId));

      // 3. Actualizar el estado con el nuevo evento (incluye title, description y creator_name para el calendario)
      setEvents([
        ...events,
        {
          ...logRes.data,
          title: selectedEvent ? selectedEvent.title : '',
          description: selectedEvent ? selectedEvent.description : '',
          creator_name: creator_name
        }
      ])
    } catch (error) {
      console.error("Error Creating event: ", error)
    }
    setNewEvent({ title: '', date: '', description: '', start_time: '', end_time: '' })
    setEventModal(false)
  }
  return (
    <>
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        weekends={false}
        dateClick={handleDateClick}
        eventContent={renderEventContent}
        events={events.map(ev => ({
          title: ev.title,
          start: ev.date,
          end: ev.date,
          extendedProps: {
            description: ev.description,
            start_time: ev.start_time,
            end_time: ev.end_time,
            creator_name: ev.creator_name
          }
        }))}
      />
      <CModal visible={eventModal} onClose={() => setEventModal(false)}>
        <CModalHeader><h2>Creating a New Event</h2></CModalHeader>
        <CModalBody>
          <CForm>
            <label className="form-label">Event Title</label>
            <select
              className="form-select mb-4"
              value={newEvent.title}
              onChange={handleEventSelect}
              required
            >
              <option value="">Select an event...</option>
              {eventOptions.map(ev => (
                <option key={ev.id_event || ev.id} value={ev.id_event || ev.id}>
                  {ev.title}
                </option>
              ))}
            </select>
            <CFormTextarea
              label="Description"
              value={newEvent.description}
              readOnly
              rows={4}
              className='mb-4'
            />
            <CFormInput
              label="Start Time"
              type="time"
              value={newEvent.start_time}
              onChange={(e) => setNewEvent({...newEvent, start_time: e.target.value})}
              className='mb-4'            
            />
             <CFormInput
              label="End Time"
              type="time"
              value={newEvent.end_time}
              onChange={(e) => setNewEvent({...newEvent, end_time: e.target.value})}
              className='mb-4'            
            />
            <p>Selected Date: {newEvent?.date}</p>
          </CForm>
        </CModalBody>
        <CModalFooter>
          <CButton color="primary" type='submit'onClick={handleCreateEvent}>
            Create an Event
          </CButton>
        </CModalFooter>
      </CModal>
    </>
  );
};

// Función para renderizar el contenido de los eventos
function renderEventContent(eventInfo) {
  const startTime = eventInfo.event.extendedProps.start_time;
  const endTime = eventInfo.event.extendedProps.end_time;
  const creatorName = eventInfo.event.extendedProps.creator_name;
  return (
    <CPopover
      placement="right"
      title={eventInfo.event.title}
      trigger={['hover', 'focus']}
      content={
        <div style={{ padding: '10px', fontSize: '16px'}}>
          <p><b>Date:</b> {eventInfo.event.start.toLocaleDateString()}</p>
          <p><b>Time:</b> {startTime} - {endTime}</p>
          <p><b>Description:</b> {eventInfo.event.extendedProps.description}</p>
          <p><b>Creado por:</b> {creatorName}</p>
        </div>
      }
    >
      <div style={{ cursor: 'pointer', padding: '4px', fontSize: '20px'}}>
        <h5>{eventInfo.event.title}</h5>
        <p>{startTime} - {endTime}</p>
      </div>
    </CPopover>
  );
}

export default Visits;