import React from 'react'
import CIcon from '@coreui/icons-react'
import {
  cilSpeedometer,
  cilPeople,
  cilNotes,
  cilHeart,
  cilHandshake,
} from '@coreui/icons'
import { CNavItem, CHeaderDivider } from '@coreui/react'

const _nav = [
  {
    component: CNavItem,
    name: 'Dashboard',
    to: '/dashboard',
    icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Users',
    to: '/users',
    icon: <CIcon icon={cilPeople} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Events',
    to: '/visits',
    icon: <CIcon icon={cilNotes} customClassName="nav-icon"/>
  },
  {
    component: CNavItem,
    name: 'Residents',
    to: '/residents',
    icon: <CIcon icon={cilHeart} customClassName="nav-icon"/>
  },
  {
    component: CNavItem,
    name: 'Donations',
    to: '/donations',
    icon: <CIcon icon={cilHandshake} customClassName="nav-icon"/>
  }
]

export default _nav
