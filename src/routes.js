import { element } from 'prop-types'
import React from 'react'


const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))
const Colors = React.lazy(() => import('./views/theme/colors/Colors'))
const Typography = React.lazy(() => import('./views/theme/typography/Typography'))

const Visits = React.lazy(() => import('./views/pages/visits/Visits'))
const Users = React.lazy(() => import('./views/pages/users/Users'))
const Residents = React.lazy(()=> import('./views/pages/residents/residents'))
const Donations = React.lazy(()=> import('./views/pages/donations/donations'))

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/visits' , name: 'Events', element: Visits },
  { path: '/residents' , name: 'Residents' , element: Residents},
  { path: '/users', name: 'Users', element: Users},
  { path: '/donations', name: 'Donations', element: Donations},
  { path: '/dashboard', name: 'Dashboard', element: Dashboard },
  { path: '/theme', name: 'Theme', element: Colors, exact: true },
  { path: '/theme/colors', name: 'Colors', element: Colors },
  { path: '/theme/typography', name: 'Typography', element: Typography },
]

export default routes
