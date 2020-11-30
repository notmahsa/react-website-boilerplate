import NProgress from 'nprogress';
import Router from 'next/router';
import React from 'react';

Router.onRouteChangeStart = () => NProgress.start()
Router.onRouteChangeComplete = () => NProgress.done()
Router.onRouteChangeError = () => NProgress.done()

export default (props) => (
  <div>
    {props.children}
  </div>
)
