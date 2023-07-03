export default interface TerminalHandheld {
  deviceId: string
  connectedPrinter?: string
  upTimeMillis?: number
  posAppVersion?: string
  firmwareVersion?: string
  androidOsLevel?: string
  securityPatchVersion?: string
  devicePolicy?: string
  isPciCompliant?: boolean
  pciNonComplianceReason?: string
  primaryMode?: string
  isAutoFirer?: boolean
}
