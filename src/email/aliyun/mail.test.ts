import { Email } from './email.js';

it('should send mail', async () => {
  const e = process.env;

  const email = new Email({ accessKeyId: e.key, accessKeySecret: e.secret });
  await email.send('x@x.com', 'x@x.com', 'Yo~');
});
