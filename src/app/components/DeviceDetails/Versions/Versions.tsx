import { ScrollPanel } from '@toasttab/buffet-pui-config-templates'
import React, { useContext } from 'react'
import { CRInfosContext } from '../../../App'
import { DeviceDetailsSections, infoField } from '../../../constants/constants'

const Versions = () => {
  const { currentCRInfo } = useContext(CRInfosContext)
  return (
    <ScrollPanel
      panelId={DeviceDetailsSections.VERSIONS}
      title={DeviceDetailsSections.VERSIONS}
    >
      <div className='grid grid-cols-2 gap-3'>
        {infoField(
          'Toast POS application version',
          currentCRInfo?.terminalHandheld?.posAppVersion
        )}
        {infoField(
          'Firmware version',
          currentCRInfo?.terminalHandheld?.firmwareVersion
        )}
        {infoField(
          'Android OS version',
          currentCRInfo?.terminalHandheld?.androidOsLevel
        )}
        {infoField(
          'Security patch version',
          currentCRInfo?.terminalHandheld?.securityPatchVersion
        )}
      </div>
    </ScrollPanel>
  )
}

export default Versions
