import Connection from './Connection'

export default interface ConnectionEvent {
  data: Connection
  date: string
  deviceId: string
  serialNumber: string
  time: string
}
