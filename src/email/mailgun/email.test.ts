import { Email } from './email'

it('should send mail', async (done) => {
  const e = process.env

  const email = new Email({ domain: e.domain, apiKey: e.key })
  const p = email.send('support@message.bsudo.com', 'thehailang@gmail.com', 'Yo~', 'Test <strong>mail</strong>')
  p.catch(e => {
    done()
  })
})
