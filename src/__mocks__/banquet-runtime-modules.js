import * as React from 'react'

const SingleSpaContext = React.createContext()
export const SetSingleSpaContext = ({ children, value = {} }) => (
  <SingleSpaContext.Provider value={value}>
    {children}
  </SingleSpaContext.Provider>
)
export const useBanquetProps = () => React.useContext(SingleSpaContext)

export const BanquetLoader = (props) => {
  return (
    <div className='py-16 my-4 text-center w-100 bg-gray-0'>
      <p className='uppercase type-default'>{props.name}</p>
      <p className='type-subhead'>
        A banquet spa will be loaded here at runtime
      </p>
    </div>
  )
}
