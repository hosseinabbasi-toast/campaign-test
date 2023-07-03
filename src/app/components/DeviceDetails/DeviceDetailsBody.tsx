import React from 'react'
import { EmptyState } from '@toasttab/buffet-pui-empty-state'
import { WarningOutlineIcon } from '@toasttab/buffet-pui-icons'
import {
  PageBody,
  PageTargetNavLayout,
  PageTargetNavLoading,
  ScrollPanel
} from '@toasttab/buffet-pui-config-templates'
import DeviceHealth from './DeviceHealth/DeviceHealth'
import DeviceInformation from './DeviceInformation/DeviceInformation'
import Versions from './Versions/Versions'
import { Skeleton } from '@toasttab/buffet-pui-loading-indicators'
import { DeviceDetailsSections } from '../../constants/constants'
import ConnectionTypes from './ConnectionTypes/ConnectionTypes'

interface DeviceDetailsBodyProps {
  loading: boolean
  error: string
}
const DeviceDetailsBody = ({ loading, error }: DeviceDetailsBodyProps) => {
  const sections = [
    DeviceDetailsSections.DEVICE_HEALTH,
    DeviceDetailsSections.CONNECTION_TYPES,
    DeviceDetailsSections.DEVICE_INFORMATION,
    DeviceDetailsSections.VERSIONS
  ]

  if (error) {
    return (
      <EmptyState
        className=''
        icon={<WarningOutlineIcon />}
        children={error}
        testId='device_details_error'
      />
    )
  }

  return loading ? (
    <PageTargetNavLoading
      className='m-auto w-11/12'
      navItemsCount={sections.length}
      testId='device_details_loading'
    >
      {sections.map((section, index) => (
        <ScrollPanel panelId={section} key={index}>
          <Skeleton className='w-1/4 h-8 mb-2' />
          <Skeleton className='w-1/2 h-6 mb-2' />
        </ScrollPanel>
      ))}
    </PageTargetNavLoading>
  ) : (
    <PageBody>
      <PageTargetNavLayout sections={sections}>
        <DeviceHealth />
        <ConnectionTypes />
        <DeviceInformation />
        <Versions />
      </PageTargetNavLayout>
    </PageBody>
  )
}

export default DeviceDetailsBody
