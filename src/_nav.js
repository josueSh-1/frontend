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
    roles: ['admin']
  },
  {
    component: CNavItem,
    name: 'Users',
    to: '/users',
    icon: <CIcon icon={cilPeople} customClassName="nav-icon" />,
    roles: ['admin']
  },
  {
    component: CNavItem,
    name: 'Events',
    to: '/visits',
    icon: <CIcon icon={cilNotes} customClassName="nav-icon"/>,
    roles: ['admin','nurse','user']
  },
  {
    component: CNavItem,
    name: 'Residents',
    to: '/residents',
    icon: <CIcon icon={cilHeart} customClassName="nav-icon"/>,
    roles: ['admin','nurse','user']
  },
  {
    component: CNavItem,
    name: 'Donations',
    to: '/donations',
    icon: <CIcon icon={cilHandshake} customClassName="nav-icon"/>,
    roles: ['admin','nurse','user']
  }
]

const getUserRoleName = (roleId) => {
  const roles = {
    1: 'admin',
    2: 'nurse',
    3: 'user'
  };
  return roles[Number(roleId)] || 'user'; // Default a 'user' si no coincide
};

const userRoleId = localStorage.getItem('user_role'); 
const currentUserRole = getUserRoleName(userRoleId);

const filteredNav = _nav.filter(item => 
  item.roles.includes(currentUserRole)
);

export default filteredNav
