import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import {
  Title,
  HeadingGroup,
  PageHeader,
  PageBack,
  PageActions
} from '@toasttab/buffet-pui-config-templates'
import { Button } from '@toasttab/buffet-pui-buttons'
import { RestartIcon } from '@toasttab/buffet-pui-icons'
import { DateRangePicker } from '@toasttab/buffet-pui-date-picker'
import { getCurrentDate, getOneWeekAgoDate } from '../../constants/constants'
import { CRInfosContext } from '../../App'

interface DeviceDetailsHeaderProps {
  disabled: boolean
  handleRefreshDeviceInfo: Function
}

const DeviceDetailsHeader = ({
  disabled,
  handleRefreshDeviceInfo
}: DeviceDetailsHeaderProps) => {
  const { currentCRInfo, setCurrentCRInfo } = useContext(CRInfosContext)
  const currentDate = getCurrentDate()
  const oneWeekAgo = getOneWeekAgoDate()

  return (
    <PageHeader isUsingPageTargetNav>
      <PageBack as={Link} to='/' onClick={() => setCurrentCRInfo(undefined)} />
      <HeadingGroup
        testId='details_subTitle'
        subTitle={currentCRInfo?.modelName}
        className='flex-row'
      >
        <Title testId='details_title'>
          {currentCRInfo
            ? currentCRInfo.name ||
              `${currentCRInfo?.modelName} ${currentCRInfo?.serial}`
            : ''}
        </Title>
      </HeadingGroup>
      <PageActions>
        <DateRangePicker
          disabled // disabled for phase 1, preset last 7 days filter
          containerClassName='md:max-w-xs mr-2'
          testId='details_datePicker'
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
        />
        <Button
          iconLeft={<RestartIcon />}
          onClick={() => handleRefreshDeviceInfo(currentCRInfo?.serial)}
          disabled={disabled}
          testId='details_refresh'
        >
          Refresh
        </Button>
      </PageActions>
    </PageHeader>
  )
}

export default DeviceDetailsHeader
