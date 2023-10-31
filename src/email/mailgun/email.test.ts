import { Email } from './email.js';

it('should send mail', async () => {
  const e = process.env as any;

  const email = new Email({ domain: e.domain, apiKey: e.key });
  const p = email.send(e.from, e.to, 'Yo~', 'Test <strong>mail</strong>');
  p.catch((e: any) => {
    console.log(e);
  });
});
