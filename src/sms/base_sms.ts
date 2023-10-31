export abstract class Base_sms<O> {
  constructor(protected opt: O) {}

  /**
   * Send sms
   * @param ccode - calling code
   * @param phone - phone number
   * @param content - sms text content
   * @param opt
   */
  abstract send(ccode: string, phone: string, content: string | object, opt: any): Promise<any>;

  /**
   * Verify this.opt
   *
   * throws if invalid
   */
  abstract validate_opt(): true;
}
