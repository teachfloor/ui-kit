import React, { useState, useEffect } from 'react'

import {
  TeachfloorProvider,
  DataTable,
  Text,
  Box,
  openModal,
  Group,
  ActionIcon,
  IconEye,
  IconEdit,
  IconTrash,
} from './'

export default {
  title: 'Components/DataTable',
  component: DataTable,
  parameters: {
    docs: {
      description: {
        component: 'DataTable shares the same `props` of Table component, extends them with more options. Visit https://icflorescu.github.io/mantine-datatable for a detailed documentation.',
      },
    },
  },
  argTypes: {
    withBorder: { control: 'boolean' },
    borderRadius: { control: 'text' },
    withColumnBorders: { control: 'boolean' },
    striped: { control: 'boolean' },
    highlightOnHover: { control: 'boolean' },
    shadow: { control: 'text' },
    horizontalSpacing: { control: 'text' },
    verticalSpacing: { control: 'text' },
    fontSize: { control: 'text' },
    verticalAlignment: { control: 'select', options: ['top', 'center', 'bottom'] },
    textSelectionDisabled: { control: 'boolean' },
    fetching: { control: 'boolean' },
  },
}

const records = [
  { position: 6, mass: 12.011, symbol: 'C', name: 'Carbon' },
  { position: 7, mass: 14.007, symbol: 'N', name: 'Nitrogen' },
  { position: 39, mass: 88.906, symbol: 'Y', name: 'Yttrium' },
  { position: 56, mass: 137.33, symbol: 'Ba', name: 'Barium' },
  { position: 58, mass: 140.12, symbol: 'Ce', name: 'Cerium' },
  { position: 79, mass: 197.0, symbol: 'Au', name: 'Gold' },
  { position: 80, mass: 200.59, symbol: 'Hg', name: 'Mercury' },
  { position: 82, mass: 207.2, symbol: 'Pb', name: 'Lead' },
  { position: 92, mass: 238.03, symbol: 'U', name: 'Uranium' },
  { position: 13, mass: 26.982, symbol: 'Al', name: 'Aluminum' },
  { position: 29, mass: 63.546, symbol: 'Cu', name: 'Copper' },
  { position: 30, mass: 65.38, symbol: 'Zn', name: 'Zinc' },
  { position: 35, mass: 79.904, symbol: 'Br', name: 'Bromine' },
  { position: 47, mass: 107.87, symbol: 'Ag', name: 'Silver' },
  { position: 48, mass: 112.41, symbol: 'Cd', name: 'Cadmium' },
  { position: 53, mass: 126.9, symbol: 'I', name: 'Iodine' },
  { position: 77, mass: 183.84, symbol: 'Ir', name: 'Iridium' },
  { position: 78, mass: 186.2, symbol: 'Pt', name: 'Platinum' },
  { position: 87, mass: 223, symbol: 'Fr', name: 'Francium' },
  { position: 88, mass: 226, symbol: 'Ra', name: 'Radium' },
  { position: 104, mass: 262, symbol: 'Rf', name: 'Rutherfordium' },
  { position: 105, mass: 267, symbol: 'Db', name: 'Dubnium' }
]

const columns = [
  {
    title: '#',
    accessor: 'position',
    width: 80,
  },
  {
    accessor: 'mass',
    width: '20%',
    Cell: ({ value, row: { original } }) => (
      `${value} ${original.symbol}`
    ),
  },
  {
    accessor: 'symbol',
  },
  {
    accessor: 'name',

    /**
     * This column has custom cell data rendering
     */
    render: ({ mass }) => (
      <Text weight={700} color={mass > 20 ? 'brand.6' : 'red'}>
        {mass}
      </Text>
    ),
  },
  {
    accessor: 'actions',
    title: <Text mr="xs">Row actions</Text>,
    textAlignment: 'right',
    render: (row, rowIndex) => (
      <Group spacing={4} position="right" noWrap>
        <ActionIcon
          color="green"
          onClick={(e) => {
            e.stopPropagation()
            console.log('View', row)
            openModal({
              title: 'Row Clicked',
              children: (
                <Box>{`You clicked row ${rowIndex}, on ${row.name}, ${row.mass} mass, symbol ${row.symbol}`}</Box>
              )
            })
          }}
        >
          <IconEye size={16} />
        </ActionIcon>
        <ActionIcon
          color="blue"
          onClick={(e) => {
            e.stopPropagation()
            console.log('Edit', row)
          }}
        >
          <IconEdit size={16} />
        </ActionIcon>
        <ActionIcon
          color="red"
          onClick={(e) => {
            e.stopPropagation()
            console.log('Delete', row)
          }}
        >
          <IconTrash size={16} />
        </ActionIcon>
      </Group>
    ),
  },
]

const DataTableTemplate = (args) => {
  const [selectedRecords, setSelectedRecords] = useState([]);

  return (
    <TeachfloorProvider>
      <Box sx={{ maxHeight: args.height }}>
        <DataTable
          minHeight={150}
          records={records}
          columns={columns}
          caption="Some elements from periodic table"
          onRowClick={({ name, mass, symbol }, rowIndex) => {
            console.log(`You clicked row ${rowIndex}, on ${name}, ${mass} mass, symbol ${symbol}`)
          }}
          idAccessor="name"
          selectedRecords={selectedRecords}
          onSelectedRecordsChange={setSelectedRecords}
          isRecordSelectable={(record) => record.mass > 18}
          rowExpansion={{
            content: ({ record }, rowIndex) => (
              <Box p="md">{`You clicked row ${rowIndex}, on ${record.name}, ${record.mass} mass, symbol ${record.symbol}`}</Box>
            ),
          }}
          {...args}
        />
      </Box>
    </TeachfloorProvider>
  )
}

export const Usage = DataTableTemplate.bind({})

Usage.args = {
  children: null,
  withBorder: false,
  borderRadius: 'sm',
  shadow: 'sm',
  horizontalSpacing: 'xs',
  verticalSpacing: 'xs',
  fontSize: 'sm',
  verticalAlignment: 'center',
  textSelectionDisabled: false,
  height: 800,
  // notificationsProps: {},
  // modalsProps: {},
  // spotlightProps: {},
}