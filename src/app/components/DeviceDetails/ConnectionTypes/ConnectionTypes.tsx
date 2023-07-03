import React, { useContext, useState } from 'react'
import { Button } from '@toasttab/buffet-pui-buttons'
import { ScrollPanel } from '@toasttab/buffet-pui-config-templates'
import { CRInfosContext } from '../../../App'
import { DeviceDetailsSections } from '../../../constants/constants'
import ConnectionTypesModal from './ConnectionTypesModal'
import ConnectionTypesTableWrapper from './ConnectionTypesTable/ConnectionTypesTableWrapper'

const ConnectionTypes = () => {
  const { currentCRInfo } = useContext(CRInfosContext)
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  return (
    <ScrollPanel
      panelId={DeviceDetailsSections.CONNECTION_TYPES}
      title={DeviceDetailsSections.CONNECTION_TYPES}
      subtitle='The device is connected to the listed connection types'
    >
      <ConnectionTypesModal
        open={isModalOpen}
        setIsModalOpen={setIsModalOpen}
      />
      <div className='inline-block w-full'>
        <ConnectionTypesTableWrapper />
        {currentCRInfo &&
          currentCRInfo.deviceDetails.networkConnectionHistory.length > 0 && (
            <Button
              testId='history_link'
              variant='text-link'
              className='float-right'
              onClick={() => setIsModalOpen(true)}
            >
              View full history
            </Button>
          )}
      </div>
    </ScrollPanel>
  )
}

export default ConnectionTypes
