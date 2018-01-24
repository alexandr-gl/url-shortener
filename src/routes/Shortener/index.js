import { injectReducer } from '../../store/reducers'

export default (store) => ({
  path : '/shortener',
  /*  Async getComponent is only invoked when route matches   */
  getComponent (nextState, cb) {
    /*  Webpack - use 'require.ensure' to create a split point
        and embed an async module loader (jsonp) when bundling   */
    require.ensure([], (require) => {
      /*  Webpack - use require callback to define
          dependencies for bundling   */
      const Shortener = require('./containers/ShortenerContainer').default
      const reducer = require('./modules/shortener').default

      /*  Add the reducer to the store on key 'counter'  */
      injectReducer(store, { key: 'shortener', reducer })

      /*  Return getComponent   */
      cb(null, Shortener)

    /* Webpack named bundle   */
    }, 'shortener')
  }
})
