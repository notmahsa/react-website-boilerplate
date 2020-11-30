/*
*
* CHECKED FOR BUCKET
*
*/

import React from 'react';

import {mapGlobals} from 'utils/helperFuncs';
import Head from 'next/head';
import Meta from 'components/widgets/Meta';
import Page from 'components/views/page'
import Header from 'components/views/partials/header'
import Footer from 'components/views/partials/footer'
import Request from 'utils/request';
import {LookupItemInMetadata} from '../components/content/Bucket';

class DynamicPage extends React.Component {

  static async getInitialProps({req, query}) {
    const Response = await Request.getGlobals();
    const pageResponse = await Request.getObject(query.pagename);
    const page = pageResponse;
    const globals = mapGlobals(Response);
    return {globals, page};
  }

  constructor(props) {
    super(props);
    this.state = {
      header: props.globals.header,
      contact_form: Request.getObject('contact_form'),
      nav: props.globals.nav,
      social: props.globals.social,
      contactInfo: Request.getObject('contact_info').metadata,
      footer: props.globals.footer,
      page: props.page
    }
  }

  render() {
    return (
      <Meta>
        <Head>
          <title>Delooman. Excellence in Design.</title>
          <meta name="description" content={LookupItemInMetadata(this.state.header.metadata, 'seo_description').value}/>
          <link rel="icon" type="image/png"
                href={`${LookupItemInMetadata(this.state.header.metadata, 'favicon').value}?w=32`} sizes="32x32"/>
          <link rel="icon" type="image/png"
                href={`${LookupItemInMetadata(this.state.header.metadata, 'favicon').value}?w=16`} sizes="16x16"/>
        </Head>
        <Header header={this.state.header} nav={this.state.nav}/>
        <Page page={this.state.page}/>
        <Footer footer={this.state.footer} social={this.state.social} contactInfo={this.state.contactInfo}/>
      </Meta>
    );
  }
}

export default DynamicPage;