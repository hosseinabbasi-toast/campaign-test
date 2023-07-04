import React from 'react'
import cx from 'classnames'
import { Link } from 'react-router-dom'
import { Alert } from '@toasttab/buffet-pui-alerts'
import { CardContainer } from '@toasttab/buffet-pui-card'
import {
  getDeviceIcon,
  formatDate,
} from '../../constants/constants'
import CardReaderInfo from '../../constants/types/CardReaderInfo'
import { UNKNOWN_FIRMWARE } from '../../constants/strings'
import SupportedDeviceType from '../../constants/types/SupportedDeviceType'
import { Button } from '@toasttab/buffet-pui-buttons'

interface CardReaderInfoCardProps {
  crInfo: CardReaderInfo
}

function getHref(crInfo: string) {
  return `${encodeURIComponent(crInfo)}`
}

export const CRInfoCardContainer = ({
  children,
  className,
  testId
}: {
  children: React.ReactNode
  className?: string
  testId?: string
}) => {
  return (
    <CardContainer
      className={cx(
        'p-4 md:p-6 w-full flex flex-col justify-between',
        className
      )}
      noPadding
      testId={testId}
      verticalEdge='auto-sm'
    >
      {children}
    </CardContainer>
  )
}

export const CRInfoCardDivider = () => (
  <div className='my-4 h-px w-full bg-darken-12' />
)

const CardReaderInfoCard = ({ crInfo }: CardReaderInfoCardProps) => {
  /* modelName will be Unknown model if it does not match any other model in this supported devices list:
  https://github.com/toasttab/device-info/blob/fc4175b45548dcb5e5ce89188b7a2a334c535829/device-info-application/src/main/kotlin/com/toasttab/service/deviceinfo/util/Model.kt#L13-L25 */
  const isUnsupportedModel = crInfo.manufacturer.localeCompare(UNKNOWN_FIRMWARE) === 0
  const deviceIcon = crInfo?.reader_type && getDeviceIcon(crInfo.reader_type)

  const lastEventTime = crInfo?.yyyymmdd
    ? formatDate(new Date(crInfo.yyyymmdd))
    : ''
  return (
    <CRInfoCardContainer testId={`deviceCard_${crInfo.device_id}`}>
      {/* Static minHeight value needed to keep card body height uniform with or w/o connections. 
      Height cannot be used here because we need to allow for variable device info content such as a very long device name.
      Pixel value not supported for tailwind minHeight - custom tailwind theme added in tailwind config to allow this value. */}
      <div className='min-h-240px'>
        <div>
          {deviceIcon}
        </div>
        <div className='type-default font-semibold mb-1 mt-3'>
          {crInfo?.manufacturer?.replace('_NOT_CONFIGURED', '') ||
            `${crInfo.reader_type} ${crInfo.device_id}`}
        </div>
        <div className='type-subhead my-1'>{crInfo.manufacturer}</div>
        <div className='text-secondary type-caption my-1'>
          Last event: {lastEventTime}
        </div>
        <CRInfoCardDivider />
        <div className='type-subhead my-1'>Serial number: {crInfo.device_id}</div>
        {(
          <div className='type-subhead my-1'>
            Device ID: {crInfo?.device_id}
          </div>
        )}
      </div>
      <div className='h-12 flex items-end justify-end'>
        {
          (isUnsupportedModel ? (
            <Alert
              title=''
              variant='info'
              className='w-full'
              testId={`unsupportedAlert_${crInfo.device_id}`}
            >
              Unsupported device.
            </Alert>
          ) : (
            <Button
              as={Link}
              to={getHref(crInfo.device_id)}
              variant='text-link'
              id='details_link'
            >
              Full details
            </Button>
          ))}
      </div>
    </CRInfoCardContainer>
  )
}

export default CardReaderInfoCard
