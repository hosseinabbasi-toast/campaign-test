import React, {
  useMemo,
  useState,
  useEffect,
  useContext,
  useCallback
} from 'react'
import { Column } from 'react-table'
import { CRInfosContext } from '../../../../App'
import {
  capitalizeFirstLetter,
  formatDate
} from '../../../../constants/constants'
import Alert from '../../../../constants/types/Alert'
import AlertTable from './AlertTable'
import AlertType from '../../../../constants/types/AlertType'
import AlertPaginatedTable from './AlertPaginatedTable'

interface AlertsTableProps {
  pagination?: boolean
  setLastEventTime?: Function
}
const AlertTableWrapper = ({
  pagination = false,
  setLastEventTime
}: AlertsTableProps) => {
  const { currentCRInfo } = useContext(CRInfosContext)
  const [alerts, setAlerts] = useState<Alert[]>([])

  const ALERTS_TABLE_COLUMNS: Column<Alert>[] = useMemo(
    () => [
      {
        Header: 'Message',
        accessor: 'message',
        id: 'message',
        width: '40%'
      },
      {
        Header: 'Type',
        accessor: 'type',
        id: 'type',
        width: '15%',
        Cell: ({ value }) => {
          return capitalizeFirstLetter(value)
        }
      },
      {
        Header: 'Event time',
        accessor: 'time',
        id: 'eventTime',
        width: '25%',
        Cell: ({ value }) => {
          if (value) {
            return formatDate(new Date(value))
          }
        }
      }
      // {
      // Header: '',
      // accessor: '', // How to fix link not available for M2
      // id: 'link'
      // Cell: ({ value }) => { // commenting out until fix link is available
      //   if (value) {
      //     return (
      //       <LinkButton
      //         href={value}
      //         className='pl-0 float-right'
      //         testId='fix_link'
      //         size='sm'
      //       >
      //         How to fix
      //       </LinkButton>
      //     )
      //   }
      // }
      // }
    ],
    []
  )

  const alertTypesOrder = useMemo(
    () => [AlertType.ERROR, AlertType.WARNING],
    []
  )

  const sortRowsByTime = useCallback((rows: Alert[]) => {
    return rows.sort((a: Alert, b: Alert) => {
      const timeA = new Date(a.time).getTime()
      const timeB = new Date(b.time).getTime()
      return timeB - timeA
    })
  }, [])

  // sort by type ERROR > WARNING
  const sortRowsByType = useCallback(
    (rows: Alert[]) => {
      return rows.sort((a: Alert, b: Alert) => {
        return alertTypesOrder.indexOf(a.type) - alertTypesOrder.indexOf(b.type)
      })
    },
    [alertTypesOrder]
  )

  const sortRows = useCallback(
    (rows: Alert[]) => {
      const sortedByTime = sortRowsByTime(rows)
      if (sortedByTime.length > 0 && setLastEventTime) {
        setLastEventTime(new Date(sortedByTime[0].time)) // set most recent event time
      }
      return sortRowsByType(sortedByTime)
    },
    [setLastEventTime, sortRowsByType, sortRowsByTime]
  )

  useEffect(() => {
    setAlerts(currentCRInfo ? sortRows(currentCRInfo.deviceDetails.alerts) : [])
  }, [currentCRInfo, sortRows])

  return (
    <div data-testid='alert_table_wrapper' className='my-8 overflow-x-auto'>
      {pagination ? (
        <AlertPaginatedTable columns={ALERTS_TABLE_COLUMNS} alerts={alerts} />
      ) : (
        <AlertTable
          columns={ALERTS_TABLE_COLUMNS}
          alerts={alerts.slice(0, 5)}
        />
      )}
    </div>
  )
}

export default AlertTableWrapper
