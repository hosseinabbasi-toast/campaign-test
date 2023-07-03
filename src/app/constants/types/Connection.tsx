import ConnectionStatus from './ConnectionStatus'
import ConnectionType from './ConnectionType'

export default interface Connection {
  gateway: string
  ipAddress: string
  lastConnectedType: string
  macAddress: string
  networkInterface: string
  networkType: ConnectionType
  newStatus: ConnectionStatus
  origin: string
  ssid: string
}
