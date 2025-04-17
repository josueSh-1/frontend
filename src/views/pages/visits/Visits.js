import React, {useState} from 'react';
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
import interactionPlugin from "@fullcalendar/interaction"

const Visits = () => {

  const handleDateClick = () => {
  }

  return (
    <FullCalendar
      plugins={[ dayGridPlugin, interactionPlugin ]}
      initialView="dayGridMonth"
      dateClick={handleDateClick}
    />
  )
}

export default Visits