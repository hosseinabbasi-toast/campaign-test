// This file should store our constant string values to be used across the project

import Health from './types/Health'
import SupportedDeviceType from './types/SupportedDeviceType'
export const UNKNOWN_FIRMWARE = 'Unknown firmware'

export const deviceListFilters = [
  { label: 'All', value: 'all' },
  { label: 'BBPOS', value: SupportedDeviceType.BBPOS },
]

export const deviceTypeOrder = [
  SupportedDeviceType.BBPOS.toString()
]

// sort devices by health status critical > at risk > healthy > inactive
export const deviceHealthOrder = [
  Health.CRITICAL,
  Health.AT_RISK,
  Health.HEALTHY,
  Health.INACTIVE
]
