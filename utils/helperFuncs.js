export const mapGlobals = (globals) => {
  if (!globals) {
    return null;
  }
  let response = {};
  globals.map((global) => {
    switch (global.slug) {
      case 'contact_form':
        response.contact_form = global;
        break;
      case 'header':
        response.header = global;
        break;
      case 'nav':
        response.nav = global;
        break;
      case 'social':
        response.social = global;
        break;
      case 'contact_info':
        response.contact_info = global;
        break;
      case 'footer':
        response.footer = global;
        break;
    }
  })
  return response;

};

export const mapHome = (data) => {
  const home = {};
  if (!data || !data.metadata) {
    return null;
  }
  data.metadata.map((obj) => {
    if (obj.key === 'carousel' || obj.key === 'blurbs') {
      home[obj.key] = obj.children
    } else
      home[obj.key] = obj;
  });
  return home;
}

export const mapFaqs = (data) => {
  if (!data || !data.metadata) {
    return null;
  }
  const faqs = {};
  faqs.title = 'FAQs'
  data.metadata.map((obj) => {
    faqs[obj.key] = obj.children
  });
  return faqs;
}