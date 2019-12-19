import { Email } from './email'

it('should send mail', async (done) => {
  const e = process.env

  const email = new Email({ accessKeyId: e.key, accessKeySecret: e.secret })
  await email.send('x@x.com', 'x@x.com', 'Yo~')
  done()
})
