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

const FILTER_NON_ALPHANUMERIC_REGEX = /[^0-9a-z\s]/gi

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
    case 'printer':
      return <PrintIcon {...iconProps} testId='printer_icon' />
    default:
      return <PosIcon {...iconProps} testId='default_icon' />
  }
}

export const sortCardReaderInfosByType = (crInfosList: CardReaderInfo[]) => {
  if (crInfosList.length > 0) {
    crInfosList.sort((a: CardReaderInfo, b: CardReaderInfo) => {
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
export const getOneWeekAgoDate = () => {
  var oneWeekAgo = getCurrentDate()
  oneWeekAgo.setDate(oneWeekAgo.getDate() - 7)
  return oneWeekAgo
}

export const infoField = (label: string, value?: string | number) => (
  <div>
    <div className='font-semibold'>{label}</div>
    <div>{value?.toString()}</div>
  </div>
)

export enum DeviceDetailsSections {
  DEVICE_HEALTH = 'Device health',
  CONNECTION_TYPES = 'Connection types',
  DEVICE_INFORMATION = 'Device information',
  VERSIONS = 'Versions'
}

export function formatDate(date: Date) {
  const timeFormat = createFormat(Formats.time.short, 'en-US')
  const dateFormat = createFormat(Formats.date.short, 'en-US')
  return `${timeFormat(date)}, ${dateFormat(date)}`
}

export function capitalizeFirstLetter(string: string) {
  return string.charAt(0).toUpperCase() + string.toLowerCase().slice(1)
}