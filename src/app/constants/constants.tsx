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
import Health from './types/Health'
import Connection from './types/Connection'
import ConnectionType from './types/ConnectionType'
import {UNKNOWN_FIRMWARE, deviceHealthOrder, deviceTypeOrder} from './strings'

const FILTER_NON_ALPHANUMERIC_REGEX = /[^0-9a-z\s]/gi

export const getConnectionIcon = (
  interfaceType?: string,
  size: IconSize = 'sm'
) => {
  const strippedInterfaceType =
    interfaceType?.toUpperCase().replace(FILTER_NON_ALPHANUMERIC_REGEX, '') ||
    null // strip non-alphanumeric characters
  const iconProps = {
    className: 'text-secondary',
    size: size
  }
  switch (strippedInterfaceType) {
    case ConnectionType.WIFI:
      return <WifiIcon {...iconProps} testId='wifi_icon' />
    case ConnectionType.ETHERNET:
      return <LightningIcon {...iconProps} testId='ethernet_icon' />
    case ConnectionType.ETHERNET_RJ45:
      return <LightningIcon {...iconProps} testId='rj45_icon' />
    case ConnectionType.RJ45:
      return <LightningIcon {...iconProps} testId='rj45_icon' />
    case ConnectionType.ETHERNET_USBC:
      return <LocationSetupIcon {...iconProps} testId='usbc_icon' />
    case ConnectionType.USBC:
      return <LocationSetupIcon {...iconProps} testId='usbc_icon' />
    default:
      return <OutageIcon {...iconProps} testId='outage_icon' />
  }
}

export function getConnectionLabel(interfaceType?: string) {
  const strippedInterfaceType =
    interfaceType?.toUpperCase().replace(FILTER_NON_ALPHANUMERIC_REGEX, '') ||
    null // strip non-alphanumeric characters
  switch (strippedInterfaceType) {
    case ConnectionType.WIFI:
      return 'Wi-Fi'
    case ConnectionType.ETHERNET:
      return 'Ethernet'
    case ConnectionType.ETHERNET_RJ45:
      return 'RJ-45'
    case ConnectionType.RJ45:
      return 'RJ-45'
    case ConnectionType.ETHERNET_USBC:
      return 'USB-C'
    case ConnectionType.USBC:
      return 'USB-C'
    default:
      return 'Not connected'
  }
}

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

export const getHealthBadge = (health: Health) => {
  switch (health) {
    case Health.HEALTHY:
      return (
        <Badge color='success' variant='statusLg'>
          HEALTHY
        </Badge>
      )
    case Health.AT_RISK:
      return (
        <Badge color='warning' variant='statusLg'>
          AT RISK
        </Badge>
      )
    case Health.CRITICAL:
      return (
        <Badge color='error' variant='statusLg'>
          CRITICAL
        </Badge>
      )
    case Health.INACTIVE:
      return (
        <Badge color='neutral0' variant='statusLg'>
          INACTIVE
        </Badge>
      )
    default:
      return null
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

// This function gets the correct interface type to render for the user on a DeviceCard and a ConnectionTypes table:
// Use networkType value unless None, then use lastConnectedType
// If networkType = Ethernet, we need to look at SSID value to determine if USBC or RJ45 connection
export function getInterfaceTypeFromConnectionData(connection: Connection) {
  const interfaceType =
    connection.networkType.toUpperCase() === ConnectionType.NONE
      ? connection.lastConnectedType
      : connection.networkType
  const upperCaseInterface = interfaceType.toUpperCase()
  if (upperCaseInterface === ConnectionType.ETHERNET && connection.ssid) {
    return connection.ssid.toUpperCase()
  }
  return upperCaseInterface
}
export const NOT_AVAILABLE = 'N/A'

export function capitalizeFirstLetter(string: string) {
  return string.charAt(0).toUpperCase() + string.toLowerCase().slice(1)
}
