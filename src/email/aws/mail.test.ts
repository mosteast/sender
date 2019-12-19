import { Email } from './email'

it('should send mail', async (done) => {
  const e = process.env

  const email = new Email({ accessKeyId: e.key, secretAccessKey: e.secret, region: 'us-east-1' })
  const p = email.send('x@x.com', 'x@x.com', 'Yo~', 'Test mail')
  // email.send('service_mail@yo.com', 'myemail@gmail.com', 'Yo~')
  p.catch(e => {
    console.log(111, e)
    done()
  })
})
