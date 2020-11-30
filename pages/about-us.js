import React from 'react';

import { mapGlobals } from 'utils/helperFuncs';
import Head from 'next/head';
import Meta from 'components/widgets/Meta';
import AboutUs from 'components/views/about-us'
import Header from 'components/views/partials/header'
import Footer from 'components/views/partials/footer'
import Request from 'utils/request';
import {LookupItemInMetadata} from '../components/content/Bucket';

class AboutUsPage extends React.Component {

  static async getInitialProps({ req, query }) {
    const Response = await Request.getGlobals();
    const aboutUs = await Request.getObject('about_us');
    const globals = mapGlobals(Response);
    return { globals, aboutUs };
  }

  constructor(props){
    super(props);
    this.state = {
        header: props.globals.header,
        contact_form: props.globals.contact_form,
        nav: props.globals.nav,
        social: props.globals.social,
        contactInfo: props.globals.contact_info.metadata,
        footer: props.globals.footer,
        aboutUs: props.aboutUs
    }
  }

	render() {
		return (
      <Meta>
        <Head>
          <title>Delooman. Excellence in Design.</title>
          <meta name="description" content={ LookupItemInMetadata(this.state.aboutUs.metadata, 'seo_description').value } />
          <link rel="icon" type="image/png" href={`${LookupItemInMetadata(this.state.header.metadata, 'favicon').value}?w=32`} sizes="32x32" />
          <link rel="icon" type="image/png" href={`${LookupItemInMetadata(this.state.header.metadata, 'favicon').value}?w=16`} sizes="16x16" />
        </Head>
        <Header header={this.state.header} nav={this.state.nav} />
        <AboutUs aboutUs={this.state.aboutUs} />
        <Footer footer={this.state.footer} social={this.state.social} contactInfo={this.state.contactInfo} />
      </Meta>
		);
	}
}

export default AboutUsPage;
