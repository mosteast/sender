import { SNSClientConfig } from '@aws-sdk/client-sns/dist-types/SNSClient.js';
import { Not_implemented } from '../../error/not_implemented.js';
import { Base_sms } from '../base_sms.js';

type T_opt = SNSClientConfig;
type T_opt_send = any;

export class Sms extends Base_sms<T_opt> {
  def = { apiVersion: '2010-03-31' };

  constructor(opt: T_opt) {
    super(opt);
    throw new Not_implemented();
  }

  send(ccode: string, phone: string, text: string, opt?: T_opt_send): Promise<any> {
    throw new Not_implemented();

    // const def = {
    //   PhoneNumber: ccode + phone,
    //   Message: text,
    // };
    //
    // opt = { ...def, ...opt };
    // const it = new SNSClient(this.opt);
    //
    // return it.publish(opt).promise();
  }

  validate_opt(): true {
    throw new Not_implemented();
    // const o = this.opt;
    // if (!o.region || !o.credentials?.accessKeyId || !o.credentials?.secretAccessKey) {
    //   throw new Invalid_opt('Required options: {region}, {accessKeyId}, {secretAccessKey}', 'Pass required opts when constructing class');
    // }
    //
    // return true;
  }
}
