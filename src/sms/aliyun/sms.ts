import Core, { Config } from '@alicloud/pop-core';
import { Invalid_opt } from '../../email/aliyun/error/invalid_opt.js';
import { Base_sms } from '../base_sms.js';

export type T_opt = Partial<Config> | Config;

export class Sms extends Base_sms<T_opt> {
  def: T_opt = {
    endpoint: 'https://dysmsapi.aliyuncs.com',
    apiVersion: '2017-05-25',
  };

  constructor(opt: T_opt) {
    super(opt);

    this.opt = { ...this.def, ...opt };
    this.validate_opt();
  }

  send(ccode: string, phone: string, content: {
    sign: string,
    template_id: string,
    template_arg: any
  }, opt?: Config | any): Promise<any> {
    const client = new Core(<Config>this.opt);

    const params = {
      PhoneNumbers: ccode + phone,
      SignName: content.sign,
      TemplateCode: content.template_id,
      TemplateParam: JSON.stringify(content.template_arg),
    };

    const requestOption = {
      method: 'POST',
    };

    return client.request('SendSms', params, requestOption);
  }

  validate_opt(): true {
    const o = this.opt;

    if (!o.accessKeyId || !o.accessKeySecret) {
      throw new Invalid_opt('Required options: {accessKeyId}, {accessKeySecret}', 'Pass required opts when constructing class');
    }

    return true;
  }
}
