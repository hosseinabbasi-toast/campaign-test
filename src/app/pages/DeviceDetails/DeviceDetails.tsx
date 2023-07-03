import React, { useState, useEffect, useContext, useCallback } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { getAggregatedCardReaderInfoByDeviceId } from '../../../utils/api'
import { patternGeneralIllustrationDataUrl } from '@toasttab/buffet-pui-illustrations'
import DeviceDetailsHeader from '../../components/DeviceDetails/DeviceDetailsHeader'
import DeviceDetailsBody from '../../components/DeviceDetails/DeviceDetailsBody'
import { LayoutProvider, Page } from '@toasttab/buffet-pui-config-templates'
import { CRInfosContext } from '../../App'
import { AxiosError } from 'axios'
import { UNKNOWN_FIRMWARE } from '../../constants/strings'
import SupportedDeviceType from '../../constants/types/SupportedDeviceType'

const DeviceDetails = () => {
  const navigate = useNavigate()
  let { device_id } = useParams()

  const { crInfos, setCurrentCRInfo, currentCRInfo, setCRInfos } =
    useContext(CRInfosContext)

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleRefreshDeviceInfo = useCallback(
    async (refreshDeviceId: string) => {
      setLoading(true)
      await getAggregatedCardReaderInfoByDeviceId(decodeURIComponent(refreshDeviceId))
        .then((data) => {
          setError('')
          if (
            data.modelName === UNKNOWN_FIRMWARE
          ) {
            navigate('/')
          } else {
            setCurrentCRInfo(data)
            if (crInfos) {
              setCRInfos(
                crInfos.map(
                  (device) =>
                    crInfos.find((d) => d.device_id === device.device_id) || device // store updated device by serial in devices list state
                )
              )
            }
          }
        })
        .catch((err: AxiosError) => {
          if (err.response?.status === 404) {
            return navigate('/') // if device serial non-existent for this restaurant, navigate back to device list page
          }
          setError(err.message)
        })
        .finally(() => {
          setLoading(false)
        })
    },
    [navigate, setCurrentCRInfo, setCRInfos, crInfos]
  )

  const handleFetchCurrentDevice = useCallback(() => {
    if (crInfos && (!currentCRInfo || currentCRInfo?.device_id !== device_id)) {
      const storedDevice = crInfos?.find((device) => device.device_id === device_id)
      if (
        storedDevice?.firmware_version === UNKNOWN_FIRMWARE
      ) {
        navigate('/')
      } else {
        setCurrentCRInfo(storedDevice)
      }
    } else if (!crInfos && !currentCRInfo && device_id) {
      handleRefreshDeviceInfo(device_id)
    }
  }, [
    device_id,
    crInfos,
    currentCRInfo,
    setCurrentCRInfo,
    handleRefreshDeviceInfo,
    navigate
  ])

  useEffect(() => {
    handleFetchCurrentDevice()
  }, [handleFetchCurrentDevice])

  return (
    <LayoutProvider>
      <Page style={{ backgroundImage: patternGeneralIllustrationDataUrl }}>
        <DeviceDetailsHeader
          disabled={loading}
          handleRefreshDeviceInfo={handleRefreshDeviceInfo}
        />
        <DeviceDetailsBody loading={loading} error={error} />
      </Page>
    </LayoutProvider>
  )
}

export default DeviceDetails
