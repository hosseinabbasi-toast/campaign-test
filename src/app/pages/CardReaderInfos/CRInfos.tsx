import React, { useContext, useEffect, useState } from 'react'
import { AxiosError } from 'axios'
import {
  Page,
  PageHeader,
  PageBody,
  HeadingGroup,
  Title,
  LayoutProvider
} from '@toasttab/buffet-pui-config-templates'
import CardReaderInfo from '../../constants/types/CardReaderInfo'
import { patternGeneralIllustrationDataUrl } from '@toasttab/buffet-pui-illustrations'
import SnapshotHeader from '../../components/SnapshotHeader/SnapshotHeader'
import CardReaderInfosList from '../../components/CardReaderInfoList/CardReaderInfoList'
import { CRInfosContext } from '../../App'
import { getAggregatedCardReaderInfo } from '../../../utils/api'
import { sortCardReaderInfosByType } from '../../constants/constants'
import { LockLockedIcon } from '@toasttab/buffet-pui-icons'
import ErrorState from '../../components/StateViews/ErrorState'
import CardReaderInfoDetails from "../../constants/types/CardReaderInfoDetails";

const CRInfos = () => {
  const { setCRInfos, crInfos } = useContext(CRInfosContext)
  const [error, setError] = useState<AxiosError | null>(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!crInfos) {
      setLoading(true)
      getAggregatedCardReaderInfo()
        .then((crInfos: CardReaderInfoDetails) => {
          setCRInfos(sortCardReaderInfosByType(crInfos))
          setError(null)
        })
        .catch((err: AxiosError) => {
          setCRInfos({ CardReaderInfoDetails: [] })
          setError(err)
        })
        .finally(() => {
          setLoading(false)
        })
    }
  }, [])

  return (
    <LayoutProvider>
      <Page style={{ backgroundImage: patternGeneralIllustrationDataUrl }}>
        <PageHeader className='mb-8'>
          <HeadingGroup>
            <Title>Hello Card Readers Team!</Title>
          </HeadingGroup>
        </PageHeader>
        <PageBody>
          <SnapshotHeader />
          {error?.response?.status === 404 || crInfos?.CardReaderInfoDetails.length === 0 ? (
            <ErrorState
              header={
                "This restaurant doesn't have access to this feature, yet."
              }
              subheader={'Requires TM v2.64'}
              icon={
                <LockLockedIcon
                  className='text-secondary'
                  accessibility='decorative'
                />
              }
            />
          ) : (
            <CardReaderInfosList loading={loading} error={error} />
          )}
        </PageBody>
      </Page>
    </LayoutProvider>
  )
}

export default CRInfos
