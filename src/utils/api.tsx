import axios from 'axios'
import CardReaderInfo from '../app/constants/types/CardReaderInfo'
import SupportedDeviceType from '../app/constants/types/SupportedDeviceType'

const aggregatedCardReaderInfoUrl =
    '/api/service/reader-updates/v1/card-reader-info'

export const getAggregatedCardReaderInfo = () =>
    axios
        .post(`${aggregatedCardReaderInfoUrl}/retrieve`, {
                restaurantGuid: "cd1d454f-a798-4dc4-8df5-4e6e10083761",
                fromDate: "20230614"
            },
            {
                headers: {
                    'Authorization': `Bearer eyJyZWRpcmVjdFVybCI6bnVsbCwic2VjdXJlUmFuZG9tS2V5IjoiNTVhNmQwZDUtYzFjYi00NjYyLWJhNzMtNDUxMjNkODU0ODUzc3RhdGUiLCJzZWN1cmVSYW5kb21WYWx1ZSI6ImRoOW8xbnV2bmxjZ2lxZXUwOGpldnNkaCIsIm1lc3NhZ2UiOm51bGx9`,
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
                    'Authorization': `Bearer eyJyZWRpcmVjdFVybCI6bnVsbCwic2VjdXJlUmFuZG9tS2V5IjoiNTVhNmQwZDUtYzFjYi00NjYyLWJhNzMtNDUxMjNkODU0ODUzc3RhdGUiLCJzZWN1cmVSYW5kb21WYWx1ZSI6ImRoOW8xbnV2bmxjZ2lxZXUwOGpldnNkaCIsIm1lc3NhZ2UiOm51bGx9`,
                    'Content-Type': "application/json"
                }
            })
        .then((response) => response.data)
        .then((response) => response.data)
