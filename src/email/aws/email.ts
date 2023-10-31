import { SESClientConfig } from '@aws-sdk/client-ses/dist-types/SESClient.js';
import { Not_implemented } from '../../error/not_implemented.js';
import { Base_email } from '../base_email.js';

type Config = SESClientConfig;

export interface T_opt_send {}

export interface T_opt extends Partial<Config> {}

export class Email extends Base_email<T_opt> {
  def: T_opt = {
    apiVersion: '2010-12-01',
  };

  constructor(opt: T_opt) {
    super(opt);
    throw new Not_implemented();
    // this.opt = { ...this.def, ...opt };
    // this.validate_opt();
  }

  send(from: string, to: string | string[], subject: string, content: string, opt?: T_opt_send): Promise<any> | any {
    throw new Not_implemented();
    //
    // if (typeof to === 'string') {
    //   to = [to];
    // }
    //
    // const def = {
    //   Source: from, /* required */
    //   Destination: { /* required */
    //     ToAddresses: to,
    //   },
    //   Message: { /* required */
    //     Body: { /* required */
    //       Html: {
    //         Charset: 'UTF-8',
    //         Data: content,
    //       },
    //     },
    //     Subject: {
    //       Charset: 'UTF-8',
    //       Data: subject,
    //     },
    //   },
    // };
    //
    // opt = { ...def, ...opt };
    //
    // const ses = new SESClient(this.opt);
    // const params = opt;
    // const command = new ListIdentitiesCommand(params);
    // return ses.send(command);
  }

  validate_opt(): true {
    throw new Not_implemented();
    // const o = this.opt;
    //
    // if (!o.credentials.accessKeyId || !o.credentials.secretAccessKey || !o.region) {
    //   throw new Invalid_opt('Required options: {accessKeyId}, {secretAccessKey}, {region}', 'Pass required opts when constructing class');
    // }
    //
    // return true;
  }
}
