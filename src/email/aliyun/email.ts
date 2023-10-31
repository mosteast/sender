import Core from '@alicloud/pop-core';
import { Config } from '@alicloud/pop-core';
import { Base_email } from '../base_email.js';
import { Invalid_opt } from './error/invalid_opt.js';

export interface T_opt_send {
  AccountName?: string;
  AddressType?: number;
  ReplyToAddress?: boolean;
  ToAddress?: string;
  Subject?: string;
  HtmlBody?: string;
}

export interface T_opt extends Partial<Config> {}

export class Email extends Base_email<T_opt> {
  def: T_opt = {
    apiVersion: '2015-11-23',
    endpoint: 'https://dm.aliyuncs.com',
  };

  constructor(opt: T_opt) {
    super(opt);
    this.opt = { ...this.def, ...opt };
    this.validate_opt();
  }

  send(from: string, to: string, subject: string, content: string = '', opt?: T_opt_send): Promise<any> | any {

    const client = new Core(<Config>this.opt);

    const def: T_opt_send = {
      AccountName: from,
      AddressType: 1,
      ReplyToAddress: false,
      ToAddress: to,
      Subject: subject,
      HtmlBody: content,
    };

    opt = { ...def, ...opt };

    const requestOption = {
      method: 'POST',
    };

    return client.request('SingleSendMail', opt, requestOption);
  }

  validate_opt(): true {
    const o = this.opt;

    if (!o.accessKeyId || !o.accessKeySecret) {
      throw new Invalid_opt('Required options: {accessKeyId}, {accessKeySecret}', 'Pass required opts when constructing class');
    }

    return true;
  }
}
