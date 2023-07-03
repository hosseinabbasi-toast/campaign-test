import React, { useContext } from 'react'
import {
  DividingLine,
  ScrollPanel
} from '@toasttab/buffet-pui-config-templates'
import { Image } from '@toasttab/buffet-pui-image'
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
        <Image
          src={currentCRInfo?.photo || ''}
          alt='device_photo'
          containerClassName='w-2/5 h-auto'
          fit='cover'
          testId='device_photo'
          onResize={undefined}
          onResizeCapture={undefined}
        />
        <div className='w-3/5 grid sm:grid-cols-2 gap-4 xxl:gap-6'>
          {infoField(
            'Device name',
            currentCRInfo?.name ||
              `${currentCRInfo?.modelName} ${currentCRInfo?.serial}`
          )}
          {infoField('Device model', currentCRInfo?.modelName)}
          {infoField('Serial number', currentCRInfo?.serial)}
          {infoField('Device ID', currentCRInfo?.terminalHandheld?.deviceId)}
          {infoField(
            'Primary mode',
            currentCRInfo?.terminalHandheld?.primaryMode
          )}
        </div>
      </div>
      <DividingLine />
      <div className='grid grid-cols-2 gap-3'>
        {infoField(
          'PCI compliance status',
          currentCRInfo?.terminalHandheld?.isPciCompliant
            ? 'Compliant'
            : 'Non-compliant'
        )}
        {infoField(
          'PCI non-compliance reason',
          currentCRInfo?.terminalHandheld?.pciNonComplianceReason || 'N/A'
        )}
      </div>
    </ScrollPanel>
  )
}

export default DeviceInformation
