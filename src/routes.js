import React from 'react'
import PrivateRoute from './PrivateRoute'

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))
const Colors = React.lazy(() => import('./views/theme/colors/Colors'))
const Typography = React.lazy(() => import('./views/theme/typography/Typography'))

const Visits = React.lazy(() => import('./views/pages/visits/Visits'))
const Users = React.lazy(() => import('./views/pages/users/Users'))
const Residents = React.lazy(()=> import('./views/pages/residents/Residents'))
const Donations = React.lazy(()=> import('./views/pages/donations/Donations'))

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/visits' , name: 'Events', element: <PrivateRoute><Visits /></PrivateRoute> },
  { path: '/residents' , name: 'Residents' , element: <PrivateRoute><Residents /></PrivateRoute>},
  { path: '/users', name: 'Users', element: <PrivateRoute><Users /></PrivateRoute>},
  { path: '/donations', name: 'Donations', element: <PrivateRoute><Donations /></PrivateRoute>},
  { path: '/dashboard', name: 'Dashboard', element: <PrivateRoute><Dashboard /></PrivateRoute> },
  { path: '/theme', name: 'Theme', element: <PrivateRoute><Colors /></PrivateRoute> },
  { path: '/theme/colors', name: 'Colors', element: <PrivateRoute><Colors /></PrivateRoute> },
  { path: '/theme/typography', name: 'Typography', element: <PrivateRoute><Typography /></PrivateRoute> },
]

export default routes
