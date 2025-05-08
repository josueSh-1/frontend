import React from 'react'
import { CChartBar } from '@coreui/react-chartjs'
import { getStyle } from '@coreui/utils'

const UserChart = ({ userCount }) => {
  return (
    <CChartBar
      style={{ height: '200px' }}
      data={{
        labels: ['Usuarios'],
        datasets: [
          {
            label: 'Total de Usuarios',
            backgroundColor: getStyle('--cui-info'),
            data: [userCount],
          },
        ],
      }}
      options={{
        maintainAspectRatio: false,
        scales: {
          y: {
            beginAtZero: true,
            max: userCount < 10 ? 10 : undefined,
            ticks: {
              color: getStyle('--cui-body-color'),
              stepSize: 1,
            },
            grid: {
              color: getStyle('--cui-border-color-translucent'),
            },
          },
          x: {
            ticks: {
              color: getStyle('--cui-body-color'),
            },
            grid: {
              color: getStyle('--cui-border-color-translucent'),
            },
          },
        },
        plugins: {
          legend: {
            display: false,
          },
        },
      }}
    />
  )
}

export default UserChart
