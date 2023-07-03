export default interface NetworkDetails {
  ipAddress?: string
  ipSettings?: string
  mac?: string
  ssid?: string
  isDefaultRoute?: boolean
  lastActive?: string
  dhcp?: boolean
  interfaceType?: string
  gatewayIp?: string
  netmaskIp?: string
  dns1?: string
  dns2?: string
  wifiFrequencyBand?: string
}
