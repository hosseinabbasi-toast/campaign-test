import * as React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import {
  useBanquetProps,
  BanquetLoader
} from '@toasttab/banquet-single-spa-react'
import { ErrorPage404 } from '@toasttab/buffet-pui-error-pages'

export function App(props) {
  const { basename } = useBanquetProps()
  return (
    <BrowserRouter basename={basename}>
      <Switch>
        <Route path='/{{child-spa-route}}' exact>
          <BanquetLoader name='{{child-spa-name}}' />
        </Route>
        <Route path='*' exact>
          <ErrorPage404 />
        </Route>
      </Switch>
    </BrowserRouter>
  )
}
