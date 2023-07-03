import { DividingLine } from '@toasttab/buffet-pui-config-templates'
import { DateRangePicker } from '@toasttab/buffet-pui-date-picker'
import { Modal, ModalBody, ModalHeader } from '@toasttab/buffet-pui-modal'
import React, { useState } from 'react'
import {
  formatDate,
  getCurrentDate,
  getOneWeekAgoDate
} from '../../../constants/constants'
import ConnectionTypesTable from './ConnectionTypesTable/ConnectionTypesTableWrapper'

interface ConnectionTypesModalProps {
  open: boolean
  setIsModalOpen: Function
}

const ConnectionTypesModal = ({
  open,
  setIsModalOpen
}: ConnectionTypesModalProps) => {
  const currentDate = getCurrentDate()
  const oneWeekAgo = getOneWeekAgoDate()
  const [lastEventTime, setLastEventTime] = useState<Date | undefined>()
  return (
    <Modal
      testId='connection_modal'
      isOpen={open}
      onRequestClose={() => setIsModalOpen(false)}
      className='md:max-w-5xl '
    >
      <ModalHeader>Connection history</ModalHeader>
      <ModalBody>
        <div>
          <DividingLine />
          <div className='flex justify-between my-8 items-center'>
            <DateRangePicker
              disabled // disabled for phase 1, preset last 7 days filter
              containerClassName='md:max-w-xs mr-2'
              testId='connection_modal_controls_datePicker'
              name='datepicker'
              numberOfMonths={2}
              definedRanges={[
                {
                  label: 'Last 7 days',
                  range: {
                    from: oneWeekAgo,
                    to: currentDate
                  }
                }
              ]}
              value={{
                from: oneWeekAgo,
                to: currentDate
              }}
              showDefinedRanges
            />
            Last event: {lastEventTime && formatDate(lastEventTime)}
          </div>

          <ConnectionTypesTable
            pagination
            setLastEventTime={setLastEventTime}
          />
        </div>
      </ModalBody>
    </Modal>
  )
}

export default ConnectionTypesModal
