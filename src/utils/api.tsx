import axios from 'axios'
import CardReaderInfo from '../app/constants/types/CardReaderInfo'
import SupportedDeviceType from '../app/constants/types/SupportedDeviceType'

const aggregatedCardReaderInfoUrl =
    '/reader-updates/v1/reader-updates/card-reader-info'

const instance = axios.create({
    baseURL: "https://ws-preprod.eng.toasttab.com"
})
export const getAggregatedCardReaderInfo = () =>
    instance
        .post(`${aggregatedCardReaderInfoUrl}/retrieve`, {
                restaurantGuid: "cd1d454f-a798-4dc4-8df5-4e6e10083761",
                fromDate: "20230614"
            },
            {
                headers: {
                    'Authorization': `Bearer eyJyZWRpcmVjdFVybCI6bnVsbCwic2VjdXJlUmFuZG9tS2V5IjoiY2I2YzVmMGYtNTUyNy00YzZlLWE4ZTQtZjkyMjFhZWYyOWY0c3RhdGUiLCJzZWN1cmVSYW5kb21WYWx1ZSI6ImdwbGtvY2J2cHY3bWdyMDBydDJyZXY3OCIsIm1lc3NhZ2UiOm51bGx9`,
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
    instance
        .post(`${aggregatedCardReaderInfoUrl}/retrieve`, {
                restaurantGuid: "cd1d454f-a798-4dc4-8df5-4e6e10083761",
                fromDate: "20230614"
            },
            {
                headers: {
                    'Authorization': `Bearer eyJyZWRpcmVjdFVybCI6bnVsbCwic2VjdXJlUmFuZG9tS2V5IjoiY2I2YzVmMGYtNTUyNy00YzZlLWE4ZTQtZjkyMjFhZWYyOWY0c3RhdGUiLCJzZWN1cmVSYW5kb21WYWx1ZSI6ImdwbGtvY2J2cHY3bWdyMDBydDJyZXY3OCIsIm1lc3NhZ2UiOm51bGx9`,
                    'Content-Type': "application/json"
                }
            })
        .then((response) => response.data)
        .then((response) => response.data)
