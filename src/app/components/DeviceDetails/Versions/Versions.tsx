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
          'Config version',
          currentCRInfo?.config_version
        )}
        {infoField(
          'Firmware version',
          currentCRInfo?.firmware_version
        )}
      </div>
    </ScrollPanel>
  )
}

export default Versions
