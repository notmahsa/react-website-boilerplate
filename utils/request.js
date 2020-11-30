import config from 'config'
import axios from 'axios'
import {
  Bucket,
  LookupObjectBySlugInBucket,
  LookupObjectsInBucket
} from '../components/content/Bucket';

const bucket = Bucket.bucket;

function getGlobals() {
  return LookupObjectsInBucket('globals');
}

function getPages() {
  return LookupObjectsInBucket('pages')
}

function getObject(slug) {
  const obj = LookupObjectBySlugInBucket(slug);
  return obj;
}

function getObjects() {
  return bucket.objects;
}

function getBlogs() {
  return LookupObjectsInBucket('blogs');
}

async function contactForm(data, contact) {
  if (!data || !contact) {
    return null;
  }

  if (!config.env.SENDGRID_FUNCTION_ENDPOINT) {
    return {
      status: false,
      message: 'You must add a SendGrid Function Endpoint URL.  Contact your developer to add this value.'
    }
  } else {
    try {
      let message = 'Name:<br>' + data.name + '<br><br>' +
        'Subject:<br>' + contact.metadata.subject + '<br><br>' +
        'Message:<br>' + data.message + '<br><br>'
      let email_data = {
        from: data.email,
        to: contact.metadata.to,
        subject: data.name + ' sent you a new message',
        text_body: message,
        html_body: message
      }
      const url = config.env.SENDGRID_FUNCTION_ENDPOINT
      await axios.post(url, email_data)
      await saveForm(data)
      return {
        status: true,
        message: 'Success.'
      }
    } catch (error) {
      return {
        status: false,
        message: 'You must add a SendGrid Function Endpoint URL.  Contact your developer to add this value.'
      }
    }
  }

  async function saveForm(data) {
    const params = {
      type_slug: 'form_submissions',
      title: data.name,
      content: data.message,

      metadata: [{
        title: 'Email',
        key: 'email',
        type: 'text',
        value: data.email
      },
        {
          title: 'Phone',
          key: 'phone',
          type: 'text',
          value: data.phone
        }
      ]
    }
    // Write to Cosmic Bucket (Optional)
    console.log('PROMPTED SAVE FORM', params)
  }
}

export default {
  getGlobals,
  getPages,
  getBlogs,
  getObject,
  contactForm,
  getObjects
}