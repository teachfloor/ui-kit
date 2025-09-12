import React from 'react'

import {
  TeachfloorProvider,
  Box,
  DonutChart,
  SimpleGrid,
} from './'

export default {
  title: 'Components/DonutChart',
  component: DonutChart,
  parameters: {
    docs: {
      description: {
        component: '',
      },
    },
  },
  argTypes: {
    withLabels: { control: 'boolean' },
    withTooltip: { control: 'boolean' },
    withLegend: { control: 'boolean' },
    size: {
      control: 'number',
      min: 80,
      max: 300,
    },
    thickness: {
      control: 'number',
      min: 2,
      max: 50,
    },
    paddingAngle: {
      control: 'number',
      min: 0,
      max: 30,
    },
    strokeWidth: {
      control: 'number',
      min: 0,
      max: 5,
      step: 0.1
    },
    labelsType: {
      options: ['value', 'percent'],
      control: { type: 'radio' },
    },
    labelsPosition: {
      options: ['inside', 'outside'],
      control: { type: 'radio' },
    },
  },
}

const data = [
  { name: 'USA', value: 400 },
  { name: 'India', value: 300 },
  { name: 'Japan', value: 100 },
  { name: 'Other', value: 200 },
]

const data2 = [
  { name: 'USA', value: 19 },
  { name: 'India', value: 2 },
  { name: 'Japan', value: 2 },
]

const DonutChartTemplate = (args) => (
  <TeachfloorProvider>
    <SimpleGrid>
      <Box h={250}>
        <DonutChart data={data} {...args} />
      </Box>
      <Box h={250}>
        <DonutChart
          data={data2}
          thickness={45}
          labelsType="percent"
          labelsPosition="inside"
          withLabels
          withLegend
        />
      </Box>
    </SimpleGrid>
  </TeachfloorProvider>
)

export const Usage = DonutChartTemplate.bind({})

Usage.args = {
  withTooltip: true,
  withLegend: false,
}