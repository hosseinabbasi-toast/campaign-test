import axios from 'axios'
import CardReaderInfo from '../app/constants/types/CardReaderInfo'
import SupportedDeviceType from '../app/constants/types/SupportedDeviceType'

const aggregatedCardReaderInfoUrl =
    '/reader-updates/v1/reader-updates/card-reader-info'

export const getAggregatedCardReaderInfo = () =>
    axios
        .post(`${aggregatedCardReaderInfoUrl}/retrieve`, {
                restaurantGuid: "cd1d454f-a798-4dc4-8df5-4e6e10083761",
                fromDate: "20230614"
            },
            {
                headers: {
                    'Authorization': `Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6Ik9VVXhSakJFUlVOQ00wRTNNME5DTnprNE5EQkVRVUZHTlRnM1JrRkJNa0l6UWtKQlJqVkNSQSJ9.eyJodHRwczovL3RvYXN0dGFiLmNvbS9jbGllbnRfbmFtZSI6IlJFQURFUl9VUERBVEVTIiwiaHR0cHM6Ly90b2FzdHRhYi5jb20vYWNjZXNzX3R5cGUiOiJUT0FTVF9NQUNISU5FX0NMSUVOVCIsImh0dHBzOi8vdG9hc3R0YWIuY29tL2V4dGVybmFsX2lkIjoiUkVBREVSX1VQREFURVMiLCJodHRwczovL3RvYXN0dGFiLmNvbS90eXBlIjoiU0VSVklDRSIsImlzcyI6Imh0dHBzOi8vcHJlcHJvZHVjdGlvbi10b2FzdC1wb3MudG9hc3R0YWIuYXV0aDAuY29tLyIsInN1YiI6IjNMWENlN0VIV3BxNXE3Zk51QUZQWE8yTmcySHI1SDFSQGNsaWVudHMiLCJhdWQiOiJodHRwczovL3RvYXN0LXNlcnZpY2VzLWFwaS8iLCJpYXQiOjE2ODgzNzQ1MTgsImV4cCI6MTY4ODQ2MDkxOCwiYXpwIjoiM0xYQ2U3RUhXcHE1cTdmTnVBRlBYTzJOZzJIcjVIMVIiLCJzY29wZSI6InNoYXJkLWJyYWluIHNlbWktcGF5bWVudHMuZnJlZWRvbXBheS1tZXJjaGFudDpyZWFkIiwiZ3R5IjoiY2xpZW50LWNyZWRlbnRpYWxzIn0.pTLIXFXsanxY2r9cpxClu1rCsYWGtlLhhIlHz0FZjIexSaLmEZ2w4Mdi9UPJqEX5WSBHBthldhSQYhlpA6TBS3mjeM8A2ptOPzpi3KdpieM66n6276zxwlEn0cg0seyTnvqOpFlMFk3sNUe3Vmekmuc4vJseIfdRvG47XyCytirEW5Y66cUFayLinHXsaF62dWxm_FH7Ge-fMxSL9f5-bum_EAnYJHS43knWMMDokIkJJa0_v4JCtxai_zS0B02Unf0mTHvagy6BbNQk2YzeqWaOcySToJrQRVoOw2rwavzGJZaqssem6HPuVPgckhgS2m6qLxGCUDw9LuLRbomlAQ`,
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
                    'Authorization': `Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6Ik9VVXhSakJFUlVOQ00wRTNNME5DTnprNE5EQkVRVUZHTlRnM1JrRkJNa0l6UWtKQlJqVkNSQSJ9.eyJodHRwczovL3RvYXN0dGFiLmNvbS9jbGllbnRfbmFtZSI6IlJFQURFUl9VUERBVEVTIiwiaHR0cHM6Ly90b2FzdHRhYi5jb20vYWNjZXNzX3R5cGUiOiJUT0FTVF9NQUNISU5FX0NMSUVOVCIsImh0dHBzOi8vdG9hc3R0YWIuY29tL2V4dGVybmFsX2lkIjoiUkVBREVSX1VQREFURVMiLCJodHRwczovL3RvYXN0dGFiLmNvbS90eXBlIjoiU0VSVklDRSIsImlzcyI6Imh0dHBzOi8vcHJlcHJvZHVjdGlvbi10b2FzdC1wb3MudG9hc3R0YWIuYXV0aDAuY29tLyIsInN1YiI6IjNMWENlN0VIV3BxNXE3Zk51QUZQWE8yTmcySHI1SDFSQGNsaWVudHMiLCJhdWQiOiJodHRwczovL3RvYXN0LXNlcnZpY2VzLWFwaS8iLCJpYXQiOjE2ODgzNzQ1MTgsImV4cCI6MTY4ODQ2MDkxOCwiYXpwIjoiM0xYQ2U3RUhXcHE1cTdmTnVBRlBYTzJOZzJIcjVIMVIiLCJzY29wZSI6InNoYXJkLWJyYWluIHNlbWktcGF5bWVudHMuZnJlZWRvbXBheS1tZXJjaGFudDpyZWFkIiwiZ3R5IjoiY2xpZW50LWNyZWRlbnRpYWxzIn0.pTLIXFXsanxY2r9cpxClu1rCsYWGtlLhhIlHz0FZjIexSaLmEZ2w4Mdi9UPJqEX5WSBHBthldhSQYhlpA6TBS3mjeM8A2ptOPzpi3KdpieM66n6276zxwlEn0cg0seyTnvqOpFlMFk3sNUe3Vmekmuc4vJseIfdRvG47XyCytirEW5Y66cUFayLinHXsaF62dWxm_FH7Ge-fMxSL9f5-bum_EAnYJHS43knWMMDokIkJJa0_v4JCtxai_zS0B02Unf0mTHvagy6BbNQk2YzeqWaOcySToJrQRVoOw2rwavzGJZaqssem6HPuVPgckhgS2m6qLxGCUDw9LuLRbomlAQ`,
                    'Content-Type': "application/json"
                }
            })
        .then((response) => response.data)
        .then((response) => response.data)
