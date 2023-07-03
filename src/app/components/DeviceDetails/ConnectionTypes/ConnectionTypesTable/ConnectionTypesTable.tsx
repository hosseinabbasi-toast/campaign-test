import React, { useMemo } from 'react'
import { useTable, useExpanded } from 'react-table'
import { TableConfig } from '../../../../TableConfig'
import { LookupChecksIcon } from '@toasttab/buffet-pui-icons'
import { EmptyState } from '@toasttab/buffet-pui-empty-state'

interface ConnectionTypesPaginatedTableProps {
  columns: any[]
  data: any[]
  renderRowSubComponent: Function
}

const ConnectionTypesTable = ({
  columns,
  data,
  renderRowSubComponent
}: ConnectionTypesPaginatedTableProps) => {
  const memoizedData = useMemo(() => data, [data])
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    rows
  }: any = useTable(
    {
      autoResetExpanded: false,
      columns: columns,
      data: memoizedData
    },
    useExpanded
  )

  const tableMemoized = useMemo(
    () => (
      <TableConfig
        getTableBodyProps={getTableBodyProps}
        getTableProps={getTableProps}
        headerGroups={headerGroups}
        prepareRow={prepareRow}
        rows={rows}
        renderRowSubComponent={renderRowSubComponent}
        emptyState={
          <EmptyState
            icon={<LookupChecksIcon />}
            children='No connection history found.'
          />
        }
      />
    ),
    [
      getTableBodyProps,
      getTableProps,
      headerGroups,
      prepareRow,
      rows,
      renderRowSubComponent
    ]
  )

  return <div data-testid='connections_table'>{tableMemoized}</div>
}

export default ConnectionTypesTable
