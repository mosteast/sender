import mailgun, { ConstructorParams, Mailgun, messages } from 'mailgun-js';
import { Base_email } from '../base_email.js';
import { Invalid_opt } from './error/invalid_opt.js';

type T_opt = Partial<ConstructorParams>;
type T_opt_send = Partial<messages.SendData>;

export class Email extends Base_email<T_opt> {
  def: T_opt = {};

  constructor(opt: T_opt) {
    super(opt);
    this.opt = { ...this.def, ...opt };
    this.validate_opt();
  }

  send(from: string, to: string | string[], subject: string, content: string, opt?: T_opt_send): Promise<any> | any {
    const mg: Mailgun = mailgun(<ConstructorParams>this.opt);
    return mg.messages().send({
      from, to, subject, html: content,
      ...opt,
    });
  }

  validate_opt(): true {
    const o = this.opt;

    if (!o.domain || !o.apiKey) {
      throw new Invalid_opt('Required options: {domain}, {apiKey}', 'Pass required opts when constructing class');
    }

    return true;
  }
}
