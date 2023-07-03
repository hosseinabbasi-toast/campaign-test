import React, { useState, useContext } from 'react'
import { Link } from 'react-router-dom'
import { WarningOutlineIcon } from '@toasttab/buffet-pui-icons'
import { Skeleton } from '@toasttab/buffet-pui-loading-indicators'
import { ToggleToken } from '@toasttab/buffet-pui-toggle-token'
import { DateRangePicker } from '@toasttab/buffet-pui-date-picker'
import CRInfoCard, {
  CRInfoCardContainer,
  CRInfoCardDivider
} from '../DeviceCard/CardReaderInfoCard'
import { getCurrentDate, getOneWeekAgoDate } from '../../constants/constants'
import { CRInfosContext } from '../../App'
import { AxiosError } from 'axios'
import ErrorState from '../StateViews/ErrorState'
import { DividingLine } from '@toasttab/buffet-pui-config-templates'
import { deviceListFilters } from '../../constants/strings'

interface DevicesListProps {
  loading: boolean
  error?: AxiosError | null
}

const DevicesList = ({ loading, error }: DevicesListProps) => {
  const { crInfos } = useContext(CRInfosContext)
  const [selected, setSelected] = useState<String[]>(['all'])

  const currentDate = getCurrentDate()
  var oneWeekAgo = getOneWeekAgoDate()

  const setFilters = (type: String) => {
    if (type === 'all') {
      // if 'all' selected, remove other selections
      setSelected(['all'])
    } else if (selected.includes('all')) {
      // if other type is clicked while 'all'is selected, remove 'all'
      setSelected([...selected.filter((v) => v !== 'all'), type])
    } else {
      // toggle selection of type
      selected.includes(type)
        ? setSelected(selected.filter((v) => v !== type))
        : setSelected([...selected, type])
    }
  }

  const filters = (
    <div className='flex mb-4 mx-4 md:mx-0 items-center flex-wrap gap-2'>
      {deviceListFilters.map((type, index) => (
        <div className='text-center' key={`${index}_filter`}>
          <ToggleToken
            disabled={loading || error != null}
            name={type.value}
            multiple
            checked={selected.includes(type.value)}
            hideMultiSelectCheckboxes={true}
            onClick={() => setFilters(type.value)}
            testId={`${type.value}_filter`}
            onChange={() => {}}
          >
            {type.label}
          </ToggleToken>
        </div>
      ))}
      <div className='m-2 h-6 w-px bg-gray-50' />
      <div className='text-center'>
        <DateRangePicker
          disabled // disabled for phase 1, preset last 7 days filter
          containerClassName='md:max-w-xs'
          name='datepicker'
          numberOfMonths={2}
          definedRanges={[
            {
              label: 'Last 7 days',
              range: {
                from: oneWeekAgo,
                to: currentDate
              }
            }
          ]}
          value={{
            from: oneWeekAgo,
            to: currentDate
          }}
          showDefinedRanges
          size='lg'
        />
      </div>
    </div>
  )

  const getDevicesDisplay = () => {
    if (error) {
      return (
        <ErrorState
          header={
            <div>
              Sorry, we are unable to load the Device list. Please{' '}
              <Link
                to={''}
                onClick={() => window.location.reload()}
                className='inline-link'
                id='refresh_link'
              >
                reload the page
              </Link>
              .
            </div>
          }
          subheader=''
          icon={
            <WarningOutlineIcon
              className='text-secondary'
              accessibility='decorative'
            />
          }
        />
      )
    } else if (crInfos) {
      const filteredDevices = crInfos.filter(
        (device) =>
          selected.indexOf('all') > -1 ||
          (device.deviceType &&
            selected.indexOf(device.deviceType.toLowerCase()) > -1)
      )
      return (
        <CardGrid>
          {filteredDevices.map((device, index) => (
            <CRInfoCard key={index} crInfo={device} />
          ))}
        </CardGrid>
      )
    }
  }

  return (
    <div>
      <h3 className='type-headline-5 md:type-headline-4 mb-4 mx-4 md:mx-0'>
        Devices
      </h3>
      <div>
        {filters}
        {loading ? <LoadingCards /> : getDevicesDisplay()}
      </div>
    </div>
  )
}

const LoadingCards = () => {
  const cards = Array.from({ length: 6 }, (_, index) => (
    <CRInfoCardContainer
      testId={`devices_loading_${index}`}
      key={`devices_loading_${index}`}
      className='gap-2'
    >
      <Skeleton className='w-10 h-8' />
      <Skeleton className='w-60 h-6' />
      <Skeleton className='w-28 h-6' />
      <div className='my-0'>
        <CRInfoCardDivider />
      </div>
      <Skeleton className='w-60 h-6' />
      <Skeleton className='w-60 h-6' />
      <Skeleton className='w-10 h-8' />
      <div className='w-full h-10' />
    </CRInfoCardContainer>
  ))
  return <CardGrid>{cards}</CardGrid>
}

export const CardGrid = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 xxl:gap-6 sm:px-4 md:px-0'>
      {children}
    </div>
  )
}

export default DevicesList
