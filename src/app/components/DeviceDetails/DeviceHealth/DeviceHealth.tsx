import React, { useContext, useState, useMemo } from 'react'
import { ScrollPanel } from '@toasttab/buffet-pui-config-templates'
import { InfoTooltip } from '@toasttab/buffet-pui-tooltip'
import { CardContainer } from '@toasttab/buffet-pui-card'
import {
  DeviceDetailsSections,
  formatDate,
  getHealthBadge
} from '../../../constants/constants'
import { InfoIcon } from '@toasttab/buffet-pui-icons'
import { VerticalEdgeTypes } from '@toasttab/buffet-pui-card/dist/types/utils'
import { CRInfosContext } from '../../../App'
import AlertType from '../../../constants/types/AlertType'
import AlertTableWrapper from './AlertTable/AlertTableWrapper'
import { Button } from '@toasttab/buffet-pui-buttons'
import DeviceHealthModal from './DeviceHealthModal'

const DeviceHealth = () => {
  const { currentCRInfo } = useContext(CRInfosContext)
  const [isModalOpen, setIsModalOpen] = useState(false)

  interface DeviceCardProps {
    noElevation: boolean
    noPadding: boolean
    verticalEdge: VerticalEdgeTypes
    className: string
  }

  const cardProps: DeviceCardProps = {
    noElevation: true,
    noPadding: true,
    verticalEdge: 'rounded',
    className: 'p-4'
  }

  const errors = useMemo(
    () =>
      currentCRInfo?.deviceDetails.alerts.filter(
        (event) => event.type === AlertType.ERROR
      ),
    [currentCRInfo?.deviceDetails.alerts]
  )

  const warnings = useMemo(
    () =>
      currentCRInfo?.deviceDetails.alerts.filter(
        (event) => event.type === AlertType.WARNING
      ),
    [currentCRInfo?.deviceDetails.alerts]
  )

  const lastEventDate = currentCRInfo?.deviceDetails.lastEvent
    ? formatDate(new Date(currentCRInfo.deviceDetails.lastEvent))
    : ''

  const healthBadge =
    currentCRInfo?.deviceDetails.health &&
    getHealthBadge(currentCRInfo?.deviceDetails.health)

  return (
    <ScrollPanel panelId={DeviceDetailsSections.DEVICE_HEALTH}>
      <DeviceHealthModal open={isModalOpen} setIsModalOpen={setIsModalOpen} />
      <div className='flex justify-between content-center align-center items-center mb-4'>
        <h2 className='type-headline-5 font-bold'>
          {DeviceDetailsSections.DEVICE_HEALTH}
        </h2>
        <div className='text-secondary type-caption'>
          Last event: {lastEventDate}
        </div>
      </div>
      <div className='grid grid-cols-2 sm:grid-cols-3 gap-4 xxl:gap-6'>
        <CardContainer {...cardProps}>
          <div className='text-secondary mb-2'>Status</div>
          {healthBadge}
        </CardContainer>
        <CardContainer {...cardProps} testId='errors_card'>
          <div className='text-secondary mb-2 flex items-center content-center gap-2'>
            Errors
            <InfoTooltip
              className='max-w-xs'
              cropToIcon
              icon={<InfoIcon size='xs' />}
              testId='errors_tooltip'
            >
              Issues that affect taking, firing, or fulfilling orders, taking
              payments, closing out shifts, and maintaining financial integrity
            </InfoTooltip>
          </div>
          <div className='type-headline-4 font-medium'>
            {errors ? errors.length : 0}
          </div>
        </CardContainer>
        <CardContainer {...cardProps} testId='warnings_card'>
          <div className='text-secondary mb-2 flex items-center content-center gap-2'>
            Warnings
            <InfoTooltip
              className='max-w-xs'
              cropToIcon
              icon={<InfoIcon size='xs' />}
              testId='warnings_tooltip'
            >
              Issues that impact the performance of the device but don't block a
              restaurants core functions
            </InfoTooltip>
          </div>
          <div className='type-headline-4 font-medium'>
            {warnings ? warnings.length : 0}
          </div>
        </CardContainer>
      </div>
      <div className='inline-block w-full'>
        <AlertTableWrapper />
        {currentCRInfo && currentCRInfo.deviceDetails.alerts.length > 0 && (
          <Button
            testId='alert_history_link'
            variant='text-link'
            className='float-right'
            onClick={() => setIsModalOpen(true)}
          >
            View all
          </Button>
        )}
      </div>
    </ScrollPanel>
  )
}

export default DeviceHealth
