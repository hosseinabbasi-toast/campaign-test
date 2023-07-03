import Alert from './Alert'
import ConnectionEvent from './ConnectionEvent'
import Health from './Health'

export default interface DeviceDetails {
  alerts: Alert[]
  health: Health
  lastEvent?: number
  networkConnectionHistory: ConnectionEvent[]
}
