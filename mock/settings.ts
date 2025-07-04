import { MockMethod } from 'vite-plugin-mock';

let settings = {
  company: {
    name: 'Jegr Jalal Company',
    logo: '',
    address: 'Baghdad, Iraq',
    phone: '+964 XXX XXX XXXX',
    email: 'info@jegrjalal.com',
    facebook: 'https://facebook.com/jegrjalal',
    linkedin: 'https://linkedin.com/company/jegrjalal',
    whatsapp: 'https://wa.me/964XXXXXXXXX',
  },
  site: {
    defaultLanguage: 'en',
    enableTestimonials: true,
    enableBlog: true,
    enableFAQ: true,
    maintenanceMode: false,
  },
  admin: {
    darkMode: false,
  },
};

export default [
  {
    url: '/api/settings',
    method: 'get',
    response: () => settings,
  },
  {
    url: '/api/settings',
    method: 'post',
    response: ({ body }: any) => {
      settings = { ...settings, ...body };
      return { success: true };
    },
  },
] as MockMethod[]; 