import React from 'react'

import {
  TeachfloorProvider,
  Table,
} from './'

export default {
  title: 'Components/Table',
  component: Table,
  argTypes: {
    captionSide: {
      control: 'select',
      options: ['bottom', 'top']
    },
    fontSize: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl']
    },
    horizontalSpacing: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl']
    },
    verticalSpacing: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl']
    },
    highlightOnHover: {
      control: 'boolean',
    },
    striped: {
      control: 'boolean',
    },
    withBorder: {
      control: 'boolean',
    },
    withColumnBorders: {
      control: 'boolean',
    },
    caption: {
      control: 'text'
    },
  },
}

const elements = [
  { position: 6, mass: 12.011, symbol: 'C', name: 'Carbon' },
  { position: 7, mass: 14.007, symbol: 'N', name: 'Nitrogen' },
  { position: 39, mass: 88.906, symbol: 'Y', name: 'Yttrium' },
  { position: 56, mass: 137.33, symbol: 'Ba', name: 'Barium' },
  { position: 58, mass: 140.12, symbol: 'Ce', name: 'Cerium' },
];

const columns = [
  {
    Header: 'Position',
    accessor: 'position',
  },
  {
    Header: 'Mass',
    accessor: 'mass',
    Cell: ({ value, row: { original } }) => (
      `${value} ${original.symbol}`
    ),
  },
  {
    Header: 'Symbol',
    accessor: 'symbol',
  },
  {
    Header: 'Name',
    accessor: 'name',
  },
];

const TableTemplate = (args) => (
  <TeachfloorProvider>
    <Table
      data={elements}
      columns={columns}
      caption="Some elements from periodic table"
      {...args}
    />
  </TeachfloorProvider>
)

export const Usage = TableTemplate.bind({})

Usage.args = {
  children: null,
  captionSide: 'bottom',
  fontSize: 'sm',
}
