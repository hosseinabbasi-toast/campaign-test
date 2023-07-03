import * as React from 'react'
import {
  Body,
  Cell,
  Head,
  HeadingCell,
  Row,
  Table
} from '@toasttab/buffet-pui-table'

export const TableConfig = (props: any) => {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    emptyState,
    renderRowSubComponent
  } = props

  if (rows.length < 1) {
    return emptyState
  }

  return (
    <Table variant='plain' valign='middle' {...getTableProps()}>
      <Head>
        {headerGroups.map((headerGroup: any) => (
          <Row {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column: any) => {
              const headerProps = column.getHeaderProps({
                className: column.className,
                style: {
                  minWidth: column.minWidth,
                  width: column.width,
                  maxWidth: column.maxWidth
                }
              })
              return (
                <HeadingCell {...headerProps} tabIndex={0}>
                  {column.render('Header')}
                </HeadingCell>
              )
            })}
          </Row>
        ))}
      </Head>
      <Body {...getTableBodyProps()}>
        {rows.map((row: any, row_index: number) => {
          prepareRow(row)
          let rowProps = { ...row.getRowProps() }
          // row is exandable
          if (renderRowSubComponent || row.subRows.length > 0) {
            rowProps = {
              ...rowProps,
              ...row.getToggleRowExpandedProps()
            }
          }
          return (
            <React.Fragment key={row_index}>
              <Row
                {...rowProps}
                className='hover:bg-gray-25 cursor-pointer text-default'
              >
                {row.cells.map((cell: any) => (
                  <Cell
                    {...cell.getCellProps({
                      className: cell.column.className,
                      style: {
                        minWidth: cell.column.minWidth,
                        width: cell.column.width,
                        maxWidth: cell.column.maxWidth
                      }
                    })}
                    testId={`${cell.column.id}_${row_index}`}
                  >
                    {cell.render('Cell')}
                  </Cell>
                ))}
              </Row>
              {row.isExpanded && renderRowSubComponent({ row, row_index })}
            </React.Fragment>
          )
        })}
      </Body>
    </Table>
  )
}
