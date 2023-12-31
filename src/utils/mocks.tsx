import CardReaderInfo from '../app/constants/types/CardReaderInfo'

const restaurantGuid = 'cff3ea59-705c-44e9-b695-64a22bab5874'
const currentDate = new Date()
const thirtyDaysAgo = new Date()
thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)

export const mockHandheld1: CardReaderInfo = {
  collocation_id: -1217411909,
  version: 1,
  restaurant_guid: "cff3ea59-705c-44e9-b695-64a22bab5874",
  restaurant_location: "UNKNOWN",
  manufacturer: "BBPOS",
  reader_type: "BBPOS",
  device_id: "deviceId",
  config_version: "TQZZ_EVT_v21",
  firmware_version: "1.02.03.11",
  reader_info_response_time: -1,
  dukpt_keys: -1,
  emv_enabled: false,
  reader_usage_type: "PAYMENT",
  yyyymmdd: 20230629
}



export const mockDevicesListResponse = {
  devices: [mockHandheld1]
}

export const mockDevicesList = [
  mockHandheld1
]

export const mockEmptyDevicesListResponse = {
  devices: []
}

export const mockMixedTypeDevicesList = [mockHandheld1]

export const mockMixedTypeDevicesListResponse = {
  devices: [mockHandheld1]
}

export const unsortedDeviceList = [
  mockHandheld1,
]

export const sortedDeviceList = [
  mockHandheld1, // healthy, handheld
]