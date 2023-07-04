import React, { useContext } from 'react'
import {
  DividingLine,
  ScrollPanel
} from '@toasttab/buffet-pui-config-templates'
import { CRInfosContext } from '../../../App'
import { DeviceDetailsSections, infoField } from '../../../constants/constants'

const DeviceInformation = () => {
  const { currentCRInfo } = useContext(CRInfosContext)

  return (
    <ScrollPanel
      panelId={DeviceDetailsSections.DEVICE_INFORMATION}
      title={DeviceDetailsSections.DEVICE_INFORMATION}
    >
      <div className='flex gap-4 xxl:gap-6 content-center items-center'>
        <div className='w-3/5 grid sm:grid-cols-2 gap-4 xxl:gap-6'>
          {infoField(
            'Device name',
            currentCRInfo?.manufacturer ||
              `${currentCRInfo?.reader_type} ${currentCRInfo?.device_id}`
          )}
          {infoField('Device model', currentCRInfo?.reader_type)}
          {infoField('Device ID', currentCRInfo?.device_id)}
        </div>
      </div>
      <DividingLine />
    </ScrollPanel>
  )
}

export default DeviceInformation
