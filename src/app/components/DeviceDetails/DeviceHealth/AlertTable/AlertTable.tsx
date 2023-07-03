import React, { useMemo } from 'react'
import { useTable } from 'react-table'
import { TableConfig } from '../../../../TableConfig'
import { LookupChecksIcon } from '@toasttab/buffet-pui-icons'
import { EmptyState } from '@toasttab/buffet-pui-empty-state'
import Alert from '../../../../constants/types/Alert'

interface AlertTableProps {
  columns: any[]
  alerts: Alert[]
}

const AlertTable = ({ columns, alerts }: AlertTableProps) => {
  const memoizedAlerts = useMemo(() => alerts, [alerts])
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    rows
  }: any = useTable({
    columns: columns,
    data: memoizedAlerts
  })

  const tableMemoized = useMemo(
    () => (
      <TableConfig
        getTableBodyProps={getTableBodyProps}
        getTableProps={getTableProps}
        headerGroups={headerGroups}
        prepareRow={prepareRow}
        rows={rows}
        emptyState={
          <EmptyState icon={<LookupChecksIcon />} children='No alerts found.' />
        }
      />
    ),
    [getTableBodyProps, getTableProps, headerGroups, prepareRow, rows]
  )

  return <div data-testid='alert_table'>{tableMemoized}</div>
}

export default AlertTable
