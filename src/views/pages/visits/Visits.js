import React, { useState } from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
import { CModal, CModalHeader, CModalBody, CModalFooter, CButton, CForm, CFormInput, CFormText, CFormTextarea } from '@coreui/react'

const Visits = () => {
  const [visible, setVisible] = useState(false)
  const [newEvent,setNewEvent]=useState({
    title:'',
    date:'',
    description:'', 
    start_time:'', 
    end_time:''
  })
  const [events, setEvents] = useState([ ])

  const handleDateClick = (arg) => {
    setNewEvent({...newEvent, date: arg.dateStr})
    setVisible(true); 
  };
  const handleCreateEvent = () => {
    setEvents([...events, newEvent])
    setNewEvent({title:'', date:'', description:'', start_time:'', end_time:''})
    setVisible(false)
  };

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
      <CModal visible={visible} onClose={() => setVisible(false)} className=''>
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
          <CButton color="primary" onClick={handleCreateEvent}>
            Create an Event
          </CButton>
        </CModalFooter>
      </CModal>
    </>
  );
};

function renderEventContent(eventInfo) {
  return (
    <>
      <b>{eventInfo.timeText}</b>
      <i>{eventInfo.event.title}</i>
    </>
  );
}

export default Visits;