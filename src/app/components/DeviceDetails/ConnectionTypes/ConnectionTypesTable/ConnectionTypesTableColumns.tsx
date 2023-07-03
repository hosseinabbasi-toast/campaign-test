import React from 'react'
import { CellProps, Column } from 'react-table'
import ConnectionEvent from '../../../../constants/types/ConnectionEvent'
import { ExpandIcon } from '@toasttab/buffet-pui-icons'
import {
  NOT_AVAILABLE,
  formatDate,
  getConnectionIcon,
  getConnectionLabel,
  getInterfaceTypeFromConnectionData
} from '../../../../constants/constants'
import ConnectionType from '../../../../constants/types/ConnectionType'
import ConnectionStatus from '../../../../constants/types/ConnectionStatus'
import { Badge } from '@toasttab/buffet-pui-badge'

// Currently, toastmobile is sending "" around SSID value - to be fixed in DEVEXP-1449
// We want a temporary fix here to hide quotes from UI
function parseSSID(ssid: string) {
  return ssid?.replace(/['"]+/g, '')
}

function parseStatus(status: ConnectionStatus) {
  if (status === ConnectionStatus.ONLINE) return 'Connected'
  return 'Disconnected'
}

export const EXPANDER_COLUMN: Column<ConnectionEvent> = {
  id: 'expander',
  Header: () => null,
  Cell: ({ row }: CellProps<ConnectionEvent>) => (
    <span>
      <ExpandIcon
        isExpanded={row.isExpanded}
        aria-label='Expand'
        className='text-secondary'
      />
    </span>
  ),
  width: '8%'
}

export const CONNECTION_TYPE_COLUMN: Column<ConnectionEvent> = {
  Header: 'Connection type',
  accessor: 'data',
  id: 'connectionType',
  Cell: ({ value }: CellProps<ConnectionEvent>) => {
    if (value) {
      return (
        <div className='flex items-baseline'>
          <div className='mr-2'>
            {getConnectionIcon(getInterfaceTypeFromConnectionData(value), 'xs')}
          </div>
          <div>
            <span className='font-semibold'>
              {getConnectionLabel(getInterfaceTypeFromConnectionData(value))}
            </span>
            <div className='type-subhead'>
              {value.networkType.toUpperCase() === ConnectionType.WIFI &&
                parseSSID(value.ssid)}
            </div>
          </div>
        </div>
      )
    }
  },
  minWidth: 20
}

export const STATUS_COLUMN: Column<ConnectionEvent> = {
  Header: 'Status',
  accessor: 'data',
  id: 'status',
  Cell: ({ value }: CellProps<ConnectionEvent>) => {
    if (value) {
      return (
        <Badge
          className='whitespace-nowrap'
          color={
            value.newStatus === ConnectionStatus.ONLINE ? 'lavender' : 'gray'
          }
        >
          {parseStatus(value.newStatus)}
        </Badge>
      )
    }
  }
}

export const EVENT_TIME_COLUMN: Column<ConnectionEvent> = {
  Header: 'Event time',
  accessor: 'time',
  id: 'eventTime',
  Cell: ({ value }: CellProps<ConnectionEvent>) => {
    if (value) {
      return formatDate(new Date(value))
    }
  }
}

export const IP_ADDRESS_COLUMN: Column<ConnectionEvent> = {
  Header: 'IP address',
  accessor: 'data',
  id: 'ipAddress',
  Cell: ({ value }: CellProps<ConnectionEvent>) => {
    return <div>{value?.ipAddress || NOT_AVAILABLE}</div>
  }
}
