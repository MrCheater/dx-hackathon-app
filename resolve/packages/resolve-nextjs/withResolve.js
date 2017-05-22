import React from 'react'
import { Provider } from 'react-redux'

export default createStore => Component => {
  let memoizedStore
  function getStoreInstance(initialState) {
    if (typeof window === 'undefined') {
      return createStore(initialState)
    }
    if (!memoizedStore) {
      memoizedStore = createStore(initialState)
    }
    return memoizedStore
  }

  function ResolveWrapper({ initialState, ...initialProps }) {
    return (
      <Provider store={getStoreInstance(initialState)}>
        <div>
          <Component {...initialProps} />
        </div>
      </Provider>
    )
  }

  ResolveWrapper.getInitialProps = async context => {
    const initialState = context.req ? context.req.initialState : undefined
    const initialProps = Component.getInitialProps
      ? await Component.getInitialProps(context)
      : {}

    return {
      initialState,
      ...initialProps
    }
  }

  return ResolveWrapper
}
