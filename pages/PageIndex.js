import React from 'react'
import withResolve from '../resolve_next/packages/resolve-next.js/withResolve'
import App from '../components/App'
import routes from '../routes'
const { Router } = routes;

@withResolve
export default class PageIndex extends React.PureComponent {
  componentDidMount() {
    Router.pushRoute('PageRecipes')
  }

  render() {
    return (
      <App/>
    )
  }
}