import React, { useMemo } from 'react'
import { useTable, usePagination } from 'react-table'
import { TableConfig } from '../../../../TableConfig'
import { LookupChecksIcon } from '@toasttab/buffet-pui-icons'
import { EmptyState } from '@toasttab/buffet-pui-empty-state'
import { Pagination, useRowPagination } from '@toasttab/buffet-pui-pagination'
import Alert from '../../../../constants/types/Alert'

interface AlertTablePaginatedProps {
  columns: any[]
  alerts: Alert[]
}

const AlertPaginatedTable = ({ columns, alerts }: AlertTablePaginatedProps) => {
  const pageSize = 10
  const memoizedAlerts = useMemo(() => alerts, [alerts])
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    rows,
    gotoPage,
    state: { pageIndex }
  }: any = useTable(
    {
      columns: columns,
      data: memoizedAlerts,
      initialState: { pageIndex: 0, pageSize }
    },
    usePagination
  )

  const { currentPageData, ...paginationProps } = useRowPagination({
    rows,
    pageSize,
    currentPage: pageIndex,
    onChangePage: gotoPage
  })

  const tableMemoized = useMemo(
    () => (
      <TableConfig
        getTableBodyProps={getTableBodyProps}
        getTableProps={getTableProps}
        headerGroups={headerGroups}
        prepareRow={prepareRow}
        rows={currentPageData}
        emptyState={
          <EmptyState icon={<LookupChecksIcon />} children='No alerts found.' />
        }
      />
    ),
    [
      getTableBodyProps,
      getTableProps,
      headerGroups,
      prepareRow,
      currentPageData
    ]
  )

  return (
    <div>
      <div data-testid='alert_paginated_table'>{tableMemoized}</div>
      <div className='py-4'>
        <Pagination
          {...paginationProps}
          className='float-right'
          testId='alert_pagination'
        />
      </div>
    </div>
  )
}

export default AlertPaginatedTable
