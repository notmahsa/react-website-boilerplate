import React from 'react';
import Router from 'next/router';

import {mapGlobals} from 'utils/helperFuncs';
import Head from 'next/head';
import Meta from 'components/widgets/Meta';
import Blog from 'components/views/blog'
import Header from 'components/views/partials/header'
import Footer from 'components/views/partials/footer'
import Request from 'utils/request';
import {LookupItemInMetadata} from '../components/content/Bucket';

class BlogPage extends React.Component {

  static async getInitialProps({req, query}) {
    const Response = await Request.getGlobals();
    const blogResponse = await Request.getBlogs();
    const blogPage = await Request.getObject('blog');
    let blog = '';
    if (!!query.slug) {
      const blogRes = await Request.getObject(query.slug);
      blog = blogRes;
    }
    const blogs = blogResponse;
    const globals = mapGlobals(Response);
    console.log(blogs);
    return {globals, blogs, blog, blogPage};
  }

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Meta>
        <Head>
          <title>Delooman. Excellence in Design.</title>
          <meta name="description"
                content={LookupItemInMetadata(this.props.blogPage.metadata, 'seo_descriptio').value}/>
          <link rel="icon" type="image/png"
                href={`${LookupItemInMetadata(this.props.globals.header.metadata, 'favicon').value}?w=32`}
                sizes="32x32"/>
          <link rel="icon" type="image/png"
                href={`${LookupItemInMetadata(this.props.globals.header.metadata, 'favicon').value}?w=16`}
                sizes="16x16"/>
        </Head>
        <Header header={this.props.globals.header} nav={this.props.globals.nav}/>
        <Blog blogs={this.props.blogs} blog={this.props.blog}/>
        <Footer footer={this.props.globals.footer} social={this.props.globals.social}
                contactInfo={this.props.globals.contact_info.metadata}
        />
      </Meta>
    );
  }
}

export default BlogPage;
