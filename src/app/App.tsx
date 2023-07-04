import React, { createContext, useState } from 'react'
import { useBanquetProps, BanquetProps } from 'banquet-runtime-modules'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ErrorPage403 } from '@toasttab/buffet-pui-error-pages'
import CRInfos from './pages/CardReaderInfos/CRInfos'
import CardReaderInfo from './constants/types/CardReaderInfo'
import CardReaderInfoDetails from "./constants/types/CardReaderInfoDetails";


const BASE_ROUTE = '/restaurants/admin/devices'
const CR_INFO_DETAILS_ROUTE = ''

interface CardReaderInfoContextProps {
    crInfos: CardReaderInfoDetails | undefined
    currentCRInfo: CardReaderInfo | undefined
    setCRInfos: Function
    setCurrentCRInfo: Function
}

const initialState = {
    crInfos: undefined,
    currentCRInfo: undefined,
    setCRInfos: (_value: CardReaderInfoDetails) => {},
    setCurrentCRInfo: (_value: CardReaderInfo) => {}
}

export const CRInfosContext = createContext<CardReaderInfoContextProps>(initialState)

export function App(props?: BanquetProps) {
    const {auth} = useBanquetProps()
    const hasPermissions = auth?.hasToastPermissionAtBitPosition(113) ?? false

    if (!hasPermissions) {
        return <ErrorPage403/>
    }

    const [crInfos, setCrInfos] = useState<CardReaderInfoDetails | undefined>(
        initialState.crInfos
    )
    const [currentCRInfo, setCurrentCRInfo] = useState<CardReaderInfo | undefined>(
        initialState.currentCRInfo
    )

    const value = React.useMemo(
        () => ({
            crInfos: crInfos,
            currentCRInfo: currentCRInfo,
            setCRInfos: setCrInfos,
            setCurrentCRInfo: setCurrentCRInfo
        }),
        [crInfos, currentCRInfo]
    )
    return (
        <div data-tw-spa className='space-y-2 type-default'>
            <CRInfosContext.Provider value={value}>
                <BrowserRouter basename={BASE_ROUTE}>
                    <Routes>
                        <Route element={<CRInfos/>} path={CR_INFO_DETAILS_ROUTE}/>
                    </Routes>
                </BrowserRouter>
            </CRInfosContext.Provider>
        </div>
    )
}
