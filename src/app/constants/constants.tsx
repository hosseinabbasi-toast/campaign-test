import React from 'react'
import {
  WifiIcon,
  LightningIcon,
  LocationSetupIcon,
  OutageIcon,
  CellphoneIcon,
  PosIcon,
  IconSize,
  PrintIcon
} from '@toasttab/buffet-pui-icons'
import { Badge } from '@toasttab/buffet-pui-badge'
import { createFormat, Formats } from '@toasttab/buffet-pui-date-utilities'
import CardReaderInfo from './types/CardReaderInfo'
import {UNKNOWN_FIRMWARE, deviceTypeOrder} from './strings'
import CardReaderInfoDetails from "./types/CardReaderInfoDetails";

export const getDeviceIcon = (deviceType: string, size: IconSize = 'sm') => {
  const lowercaseType = deviceType.toLowerCase()
  const iconProps = {
    className: 'text-secondary mr-2',
    size: size
  }
  switch (lowercaseType) {
    case 'terminal':
      return <PosIcon {...iconProps} testId='terminal_icon' />
    case 'handheld':
      return <CellphoneIcon {...iconProps} testId='handheld_icon' />
    default:
      return <PosIcon {...iconProps} testId='default_icon' />
  }
}

export const sortCardReaderInfosByType = (crInfosList: CardReaderInfoDetails) => {
  if (crInfosList.CardReaderInfoDetails.length > 0) {
    crInfosList.CardReaderInfoDetails.sort((a: CardReaderInfo, b: CardReaderInfo) => {
      // sort unsupported devices to end of card list
      if (a.firmware_version.localeCompare(UNKNOWN_FIRMWARE) === 0) {
        return 1
      }
      if (b.firmware_version.localeCompare(UNKNOWN_FIRMWARE) === 0) {
        return -1
      }
      if (
          a.reader_type &&
          b.reader_type
      ) {
        return (
            deviceTypeOrder.indexOf(a.reader_type) -
            deviceTypeOrder.indexOf(b.reader_type)
        )
      }
      return 0
    })
  }
  return crInfosList
}

export const getCurrentDate = () => new Date()
export const getOneMonthAgoDate = () => {
  var oneMonthAgo = getCurrentDate()
  oneMonthAgo.setDate(oneMonthAgo.getDate() - 30)
  return oneMonthAgo
}

export const infoField = (label: string, value?: string | number) => (
  <div>
    <div className='font-semibold'>{label}</div>
    <div>{value?.toString()}</div>
  </div>
)

export function formatDate(date: Date) {
  const timeFormat = createFormat(Formats.time.short, 'en-US')
  const dateFormat = createFormat(Formats.date.short, 'en-US')
  return `${timeFormat(date)}, ${dateFormat(date)}`
}
