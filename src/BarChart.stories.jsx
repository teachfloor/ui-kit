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

const generateSalesData = () => {
  const months = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
  ];

  const getRandomValue = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

  return months.map((month) => ({
    date: month,
    sold: getRandomValue(5, 12), // Random values for 'sold' between 5 and 12
    profit: getRandomValue(10, 20), // Random values for 'profit' between 10 and 20
    region: getRandomValue(1, 4) // Random region between 1 and 4
  }));
}

const BarChartTemplate = (args) => (
  <TeachfloorProvider>
    <SimpleGrid>
      <Box w={730} h={250}>
        <BarChart data={generateSalesData()} {...args} x="date" y={['sold', 'profit', 'region']} />
      </Box>
      <Box w={730} h={250}>
        <BarChart data={generateSalesData()} x="date" y={{ value: 'sold', label: 'Sold', formatter: (val) => `$${val}` }} />
      </Box>
      <Box w={730} h={250}>
        <BarChart data={generateSalesData()} x="date" y={[{ value: 'sold', label: 'Sold', formatter: (val) => `$${val}` }, { value: 'region', label: 'Region' }]} />
      </Box>
    </SimpleGrid>
  </TeachfloorProvider>
)

export const Usage = BarChartTemplate.bind({})

Usage.args = {
  withTooltip: true,
  withLegend: false,
}