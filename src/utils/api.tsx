import axios from 'axios'
import CardReaderInfo from '../app/constants/types/CardReaderInfo'
import SupportedDeviceType from '../app/constants/types/SupportedDeviceType'

const aggregatedCardReaderInfoUrl =
    '/api/service/reader-updates/v1/reader-updates/card-reader-info'

export const getAggregatedCardReaderInfo = () =>
    axios
        .post(`${aggregatedCardReaderInfoUrl}/retrieve`, {
                restaurantGuid: 'cff3ea59-705c-44e9-b695-64a22bab5874',
                fromDate: '20230604'
            },
            {
                headers: {
                    'Content-Type': "application/json"
                }
            })
        .then((response) => response.data)
        /*.then((data) =>
            data.CardReaderInfoDetails.filter(
                (crInfo: CardReaderInfo) =>
                    crInfo.manufacturer === SupportedDeviceType.BBPOS
            )
        )*/
