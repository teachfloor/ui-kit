import React from 'react'

import {
  TeachfloorProvider,
  Box,
  BarChart,
  SimpleGrid,
} from './'

export default {
  title: 'Components/BarChart',
  component: BarChart,
  parameters: {
    docs: {
      description: {
        component: '',
      },
    },
  },
  argTypes: {
    withTooltip: { control: 'boolean' },
    withLegend: { control: 'boolean' },
  },
}

const sales = [
  {
    date: 'Jan',
    sold: 5,
    profit: 11,
    region: 2
  },
  {
    date: 'Feb',
    sold: 6,
    profit: 13,
    region: 1
  },
  {
    date: 'Mar',
    sold: 7,
    profit: 15,
    region: 3
  },
  {
    date: 'Apr',
    sold: 8,
    profit: 16,
    region: 2
  },
  {
    date: 'May',
    sold: 6,
    profit: 14,
    region: 1
  },
  {
    date: 'Jun',
    sold: 9,
    profit: 17,
    region: 4
  },
  {
    date: 'Jul',
    sold: 10,
    profit: 18,
    region: 3
  },
  {
    date: 'Aug',
    sold: 11,
    profit: 19,
    region: 2
  },
  {
    date: 'Sep',
    sold: 6,
    profit: 12,
    region: 4
  },
  {
    date: 'Oct',
    sold: 7,
    profit: 14,
    region: 1
  },
  {
    date: 'Nov',
    sold: 8,
    profit: 16,
    region: 3
  },
  {
    date: 'Dec',
    sold: 9,
    profit: 17,
    region: 2
  }
]

const BarChartTemplate = (args) => (
  <TeachfloorProvider>
    <SimpleGrid>
      <Box w={730} h={250}>
        <BarChart data={sales} {...args} x="date" y={['sold', 'profit', 'region']} />
      </Box>
      <Box w={730} h={250}>
        <BarChart data={sales} x="date" y={{ value: 'sold', label: 'Sold' }} />
      </Box>
      <Box w={730} h={250}>
        <BarChart data={sales} x="date" y={[{ value: 'sold', label: 'Sold' }, { value: 'region', label: 'Region' }]} />
      </Box>
    </SimpleGrid>
  </TeachfloorProvider>
)

export const Usage = BarChartTemplate.bind({})

Usage.args = {
  withTooltip: true,
  withLegend: false,
}