import { Config } from '@alicloud/pop-core'
import * as Core from '@alicloud/pop-core'

export function aliyun_send(phone, sign, template_id, template_param, config: Config | any): Promise<any> {
  const default_config = {
    endpoint: 'https://dysmsapi.aliyuncs.com',
    apiVersion: '2017-05-25',
  }

  const client = new Core({ ...default_config, ...config })

  const params = {
    PhoneNumbers: phone,
    SignName: sign,
    TemplateCode: template_id,
    TemplateParam: JSON.stringify(template_param),
  }

  const requestOption = {
    method: 'POST',
  }

  return client.request('SendSms', params, requestOption)
}