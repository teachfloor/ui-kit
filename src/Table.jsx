import React, { useMemo } from 'react'
import PropTypes from 'prop-types'
import {
  Table as TableUI,
  Box,
  IconChevronUp,
  IconChevronDown,
} from '@mantine/core'
import { useTable, usePagination } from 'react-table'

/**
 * Uses Mantine Table component with react-table
 *
 * https://mantine.dev/core/table/ - https://react-table-v7.tanstack.com/
 */
const Table = ({
  data: defaultData,
  columns: defaultColumns,
  caption = null,
  ...props
}) => {
  const data = useMemo(() => {
    if (defaultData) return defaultData
    return []
  }, [defaultData]);

  const columns = useMemo(() => {
    if (defaultColumns) return defaultColumns
    if (data.length) return Object.keys(data[0]).map((key) => ({ Header: key, accessor: key }))
    return []
  }, [defaultColumns])

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
  } = useTable(
    {
      columns,
      data,
      initialState: {
        ...props,
        pageSize: props.pageSize || 10,
        pageIndex: 0,
      }
    },
    usePagination
  )

  return (
    <TableUI {...props} {...getTableProps()}>
      {caption ? <caption>{caption}</caption> : null}
      <thead>
        {headerGroups.map((headerGroup) => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <th {...column.getHeaderProps()}>
                {column.render('Header')}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {page.map((row) => {
          prepareRow(row);
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map((cell) => {
                return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>;
              })}
            </tr>
          );
        })}
      </tbody>
    </TableUI>
  )
}

Table.propTypes = {
  /**
   * Data
   */
  data: PropTypes.array,

  /**
   * Array of table columns
   */
  columns: PropTypes.array,

  /**
   * Caption
   */
  caption: PropTypes.node,

  /**
   * Page size
   */
  pageSize: PropTypes.number,
}

Table.defaultProps = {
  caption: null
}

export default Table