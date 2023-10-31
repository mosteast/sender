import { Sms } from './sms.js';

it('should send sms', async () => {
  const e = process.env;
  const sms = new Sms({ accessKeyId: e.key, accessKeySecret: e.secret });
  await sms.send('86', 'xxx', {
      sign: 'xxx',
      template_id: 'SMS_xxx',
      template_arg: { code: '4321' },
    })
    .catch(console.log)
    .then(console.log);
});
