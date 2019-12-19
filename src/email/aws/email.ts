import { Base_email } from '../base_email'
import { Invalid_opt } from './error/invalid_opt'
import { SES } from 'aws-sdk'

type Config = SES.Types.ClientConfiguration

export interface T_opt_send extends SES.Types.SendEmailRequest {}

export interface T_opt extends Partial<Config> {}

export class Email extends Base_email<T_opt> {
  def: T_opt = {
    apiVersion: '2010-12-01',
  }

  constructor(opt: T_opt) {
    super(opt)
    this.opt = { ...this.def, ...opt }
    this.validate_opt()
  }

  send(from: string, to: string | string[], subject: string, content: string, opt?: T_opt_send): Promise<any> | any {
    if (typeof to === 'string') {
      to = [ to ]
    }

    const def = {
      Source: from, /* required */
      Destination: { /* required */
        ToAddresses: to,
      },
      Message: { /* required */
        Body: { /* required */
          Html: {
            Charset: 'UTF-8',
            Data: content,
          },
        },
        Subject: {
          Charset: 'UTF-8',
          Data: subject,
        },
      },
    }

    opt = { ...def, ...opt }

    const ses = new SES(this.opt)
    return ses.sendEmail(opt).promise()
  }

  validate_opt(): true {
    const o = this.opt

    if (!o.accessKeyId || !o.secretAccessKey || !o.region) {
      throw new Invalid_opt('Required options: {accessKeyId}, {secretAccessKey}, {region}', 'Pass required opts when constructing class')
    }

    return true
  }
}
