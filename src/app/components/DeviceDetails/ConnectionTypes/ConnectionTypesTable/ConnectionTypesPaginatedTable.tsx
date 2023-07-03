import React, { useMemo } from 'react'
import { useTable, useExpanded, usePagination } from 'react-table'
import { TableConfig } from '../../../../TableConfig'
import { LookupChecksIcon } from '@toasttab/buffet-pui-icons'
import { EmptyState } from '@toasttab/buffet-pui-empty-state'
import { Pagination, useRowPagination } from '@toasttab/buffet-pui-pagination'

interface ConnectionTypesPaginatedTableProps {
  columns: any[]
  data: any[]
  renderRowSubComponent: Function
}

const ConnectionTypesPaginatedTable = ({
  columns,
  data,
  renderRowSubComponent
}: ConnectionTypesPaginatedTableProps) => {
  const pageSize = 10
  const memoizedData = useMemo(() => data, [data])
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
      autoResetExpanded: false,
      columns: columns,
      data: memoizedData,
      initialState: { pageIndex: 0, pageSize }
    },
    useExpanded,
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
      currentPageData,
      renderRowSubComponent
    ]
  )

  return (
    <div>
      <div data-testid='connection_modal_table'>{tableMemoized}</div>
      <div className='py-4'>
        <Pagination
          {...paginationProps}
          className='float-right'
          testId='connection_pagination'
        />
      </div>
    </div>
  )
}

export default ConnectionTypesPaginatedTable
