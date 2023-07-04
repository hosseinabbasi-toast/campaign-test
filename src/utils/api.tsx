import axios from 'axios'
import CardReaderInfo from '../app/constants/types/CardReaderInfo'
import SupportedDeviceType from '../app/constants/types/SupportedDeviceType'

const aggregatedCardReaderInfoUrl =
    '/api/service/reader-updates/v1/reader-updates/card-reader-info'

export const getAggregatedCardReaderInfo = () =>
    axios
        .post(`${aggregatedCardReaderInfoUrl}/retrieve`, {
                restaurantGuid: "cd1d454f-a798-4dc4-8df5-4e6e10083761",
                fromDate: "20230614"
            },
            {
                headers: {
                    'Authorization': `Bearer eyJyZWRpcmVjdFVybCI6bnVsbCwic2VjdXJlUmFuZG9tS2V5IjoiMDk0YjE2NjQtMjc0OC00ODM2LTk3MTAtNjU3YjM3YTA4ZDAyc3RhdGUiLCJzZWN1cmVSYW5kb21WYWx1ZSI6IjZsY2pkcWk3YWQ1ZDJmcXNpa3ExdnBwaiIsIm1lc3NhZ2UiOm51bGx9`,
                    'Content-Type': "application/json"
                }
            })
        .then((response) => response.data)
        .then((data) =>
            data.devices.filter(
                (device: CardReaderInfo) =>
                    device.reader_type === SupportedDeviceType.BBPOS
            )
        )

export const getAggregatedCardReaderInfoByDeviceId = (deviceId: string) =>
    axios
        .post(`${aggregatedCardReaderInfoUrl}/retrieve`, {
                restaurantGuid: "cd1d454f-a798-4dc4-8df5-4e6e10083761",
                fromDate: "20230614"
            },
            {
                headers: {
                    'Authorization': `Bearer eyJyZWRpcmVjdFVybCI6bnVsbCwic2VjdXJlUmFuZG9tS2V5IjoiMDk0YjE2NjQtMjc0OC00ODM2LTk3MTAtNjU3YjM3YTA4ZDAyc3RhdGUiLCJzZWN1cmVSYW5kb21WYWx1ZSI6IjZsY2pkcWk3YWQ1ZDJmcXNpa3ExdnBwaiIsIm1lc3NhZ2UiOm51bGx9`,
                    'Content-Type': "application/json"
                }
            })
        .then((response) => response.data)
        .then((response) => response.data)
