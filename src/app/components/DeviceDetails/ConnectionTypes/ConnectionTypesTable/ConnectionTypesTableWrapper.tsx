import React, {
  useMemo,
  useState,
  useEffect,
  useContext,
  useCallback
} from 'react'
import { Cell, Row } from '@toasttab/buffet-pui-table'
import { Column } from 'react-table'
import ConnectionEvent from '../../../../constants/types/ConnectionEvent'
import { CRInfosContext } from '../../../../App'
import Connection from '../../../../constants/types/Connection'
import { NOT_AVAILABLE } from '../../../../constants/constants'
import ConnectionTypesPaginatedTable from './ConnectionTypesPaginatedTable'
import ConnectionTypesTable from './ConnectionTypesTable'
import {
  CONNECTION_TYPE_COLUMN,
  EVENT_TIME_COLUMN,
  EXPANDER_COLUMN,
  IP_ADDRESS_COLUMN,
  STATUS_COLUMN
} from './ConnectionTypesTableColumns'

interface ConnectionTypesTableProps {
  pagination?: boolean
  setLastEventTime?: Function
}
const ConnectionTypesTableWrapper = ({
  pagination = false,
  setLastEventTime
}: ConnectionTypesTableProps) => {
  interface ConnectionEventSubRow {
    label: string
    value: string
    id: number
  }
  interface ConnectionEventRow {
    data: Connection
    date: string
    deviceId: string
    serialNumber: string
    time: string
    subComponents: ConnectionEventSubRow[]
  }
  const { currentCRInfo } = useContext(CRInfosContext)
  const [connectionEventRows, setConnectionEventRows] = useState<
    ConnectionEventRow[] | undefined
  >()

  const CONNECTION_TABLE_COLUMNS = useMemo<Column<ConnectionEvent>[]>(
    () => [
      EXPANDER_COLUMN,
      { ...CONNECTION_TYPE_COLUMN, width: '40%' },
      STATUS_COLUMN,
      EVENT_TIME_COLUMN
    ],
    []
  )

  // IP address column exists in main table when using the paginated table
  const CONNECTION_PAGINATED_TABLE_COLUMNS = useMemo<Column<ConnectionEvent>[]>(
    () => [
      EXPANDER_COLUMN,
      { ...CONNECTION_TYPE_COLUMN, width: '30%' },
      STATUS_COLUMN,
      IP_ADDRESS_COLUMN,
      EVENT_TIME_COLUMN
    ],
    []
  )

  const renderRowSubComponent = useCallback(
    ({ row, row_index }) =>
      row.original.subComponents.map(
        (subComponent: ConnectionEventSubRow, subRow_index: number) => (
          <Row
            className='even:bg-gray-0'
            testId={`subRow_${row_index}_${subRow_index}`}
            key={subRow_index}
          >
            <Cell colSpan={1}></Cell>
            <Cell colSpan={4} className='pl-10 type-subhead'>
              <div className='grid grid-cols-4'>
                <div className='col-span-1'>{subComponent.label}</div>
                <div>{subComponent.value}</div>
              </div>
            </Cell>
          </Row>
        )
      ),
    []
  )

  const getSubComponents = useCallback(
    (connectionEvent: ConnectionEvent) => {
      const IP_TYPE_SUB_COMP = {
        label: 'IP type',
        value: NOT_AVAILABLE, // not available for M2
        id: 0
      }

      const WIFI_BAND_SUB_COMP = {
        label: 'Wi-Fi band',
        value: NOT_AVAILABLE, // not available for M2
        id: 1
      }

      const MAC_ADDRESS_SUB_COMP = {
        label: 'Mac address',
        value: connectionEvent.data.macAddress || NOT_AVAILABLE,
        id: 2
      }

      const IP_ADDRESS_SUB_COMP = {
        label: 'IP address',
        value: connectionEvent.data.ipAddress || NOT_AVAILABLE,
        id: 3
      }

      if (pagination)
        return [IP_TYPE_SUB_COMP, WIFI_BAND_SUB_COMP, MAC_ADDRESS_SUB_COMP]
      return [
        IP_TYPE_SUB_COMP,
        IP_ADDRESS_SUB_COMP,
        WIFI_BAND_SUB_COMP,
        MAC_ADDRESS_SUB_COMP
      ]
    },
    [pagination]
  )

  const createRows = useCallback(
    (rows: ConnectionEvent[]) => {
      const sortedRows: ConnectionEventRow[] = rows
        .map((connectionEvent) => ({
          ...connectionEvent,
          subComponents: getSubComponents(connectionEvent)
        }))
        .sort((a, b) => (new Date(a.time) < new Date(b.time) ? 1 : -1)) // sort by time in descending order
      setLastEventTime && setLastEventTime(new Date(sortedRows[0].time))
      return sortedRows
    },
    [setLastEventTime, getSubComponents]
  )

  useEffect(() => {
    if (currentCRInfo) {
      setConnectionEventRows(
        createRows(currentCRInfo.deviceDetails.networkConnectionHistory)
      )
    } else {
      setConnectionEventRows([])
    }
  }, [currentCRInfo, createRows])

  return (
    <div
      data-testid='connection_table'
      className='mb-8 -mx-4 sm:mx-0 overflow-x-auto'
    >
      {pagination ? (
        <ConnectionTypesPaginatedTable
          columns={CONNECTION_PAGINATED_TABLE_COLUMNS}
          data={connectionEventRows || []}
          renderRowSubComponent={renderRowSubComponent}
        />
      ) : (
        <ConnectionTypesTable
          columns={CONNECTION_TABLE_COLUMNS}
          data={connectionEventRows?.slice(0, 5) || []}
          renderRowSubComponent={renderRowSubComponent}
        />
      )}
    </div>
  )
}

export default ConnectionTypesTableWrapper
