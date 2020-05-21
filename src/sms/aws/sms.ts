import { SNS } from 'aws-sdk';
import { Base_sms } from '../base_sms';
import { Invalid_opt } from './error/invalid_opt';

type T_opt = SNS.Types.ClientConfiguration
type T_opt_send = SNS.Types.PublishInput

export class Sms extends Base_sms<T_opt> {
  def = { apiVersion: '2010-03-31' };

  constructor(opt: T_opt) {
    super(opt);
    this.opt = { ...this.def, ...opt };
    this.validate_opt();
  }

  send(ccode: string, phone: string, text: string, opt?: T_opt_send): Promise<any> {

    const def = {
      PhoneNumber: ccode + phone,
      Message: text,
    };

    opt = { ...def, ...opt };
    const it = new SNS(this.opt);

    return it.publish(opt).promise();
  }

  validate_opt(): true {
    const o = this.opt;
    if ( ! o.region || ! o.accessKeyId || ! o.secretAccessKey) {
      throw new Invalid_opt('Required options: {region}, {accessKeyId}, {secretAccessKey}', 'Pass required opts when constructing class');
    }

    return true;
  }
}
