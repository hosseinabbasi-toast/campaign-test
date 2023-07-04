// This file should store our constant string values to be used across the project

import SupportedDeviceType from './types/SupportedDeviceType'
export const UNKNOWN_FIRMWARE = 'Unknown firmware'

export const deviceListFilters = [
  { label: 'All', value: 'all' },
  { label: 'BBPOS', value: SupportedDeviceType.BBPOS },
  { label: 'Magtek', value: SupportedDeviceType.Magtek }
]

export const deviceTypeOrder = [
  SupportedDeviceType.BBPOS.toString(),
  SupportedDeviceType.Magtek.toString()
]
