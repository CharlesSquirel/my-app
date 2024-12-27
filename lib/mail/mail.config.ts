export const transporterOptions = {
  host: process.env.EMAIL_HOST as string,
  port: parseInt(process.env.EMAIL_PORT || '0'),
  secure: false,
  auth: {
    user: process.env.EMAIL as string,
    pass: process.env.EMAIL_PASSWORD as string,
  },
  tls: {
    ciphers: 'SSLv3',
  },
};
