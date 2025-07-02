import React, {useEffect, useState } from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
import axios from 'axios'
import { CModal, CModalHeader, CModalBody, CModalFooter, CButton, CForm, CFormInput, CFormTextarea, CPopover  } from '@coreui/react'



const Visits = () => {
  const [eventModal, setEventModal] = useState(false)
  const [newEvent,setNewEvent]=useState({
    title:'',
    date:'',
    description:'', 
    start_time:'', 
    end_time:''
  })
  const [events, setEvents] = useState([ ])
  // Hook para cargar eventos desde la API al montar el componente
  useEffect(()=>{axios.get('http://localhost:4000/events').then(response=>setEvents(response.data)).catch(error=>console.error("Error ",error))},[])
  const handleDateClick = (arg) => {
    //Guardado de fecha seleccionada
    setNewEvent({...newEvent, date: arg.dateStr})
    setEventModal(true); 
  }
  const handleCreateEvent = async() => {
    try{
      const response = await axios.post('http://localhost:4000/events',newEvent)
    }catch(error){
      console.error("Error Creating event: ", error)
    }
    setEvents([...events, newEvent])
    setNewEvent({title:'', date:'', description:'', start_time:'', end_time:''})
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
        events={events} 
      />
      <CModal visible={eventModal} onClose={() => setEventModal(false)}>
        <CModalHeader><h2>Creating a New Event</h2></CModalHeader>
        <CModalBody>
          <CForm>
            <CFormInput
              label="Event Title"
              type="text"
              placeholder="title"
              value={newEvent.title}
              onChange={(e) => setNewEvent({...newEvent, title: e.target.value})}
              className='mb-4'
            />
            <CFormTextarea
              label="Description"
              value={newEvent.description}
              onChange={(e) => setNewEvent({...newEvent, description: e.target.value})}
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
  const startTime = eventInfo.event.extendedProps.start_time
  const endTime = eventInfo.event.extendedProps.end_time
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