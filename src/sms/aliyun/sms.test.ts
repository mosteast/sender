import { Sms } from './sms'

it('should send sms', async (done) => {
  const e = process.env
  const sms = new Sms({ accessKeyId: e.key, accessKeySecret: e.secret })
  await sms.send('86', 'xxx', {
      sign: 'xxx',
      template_id: 'SMS_xxx',
      template_arg: { code: '4321' },
    })
    .catch(console.log)
    .then(console.log)

  done()
})
