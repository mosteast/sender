/**
 * All platforms Email classes should implement this base class
 */
export abstract class Base_email<O> {
  /**
   * Default options
   *
   * new options should merge with it.
   */
  def!: O | Partial<O>;

  /**
   * @param opt Could option like region, key and secret etc.
   */
  constructor(protected opt: O | Partial<O>) {}

  /**
   * Send email
   * @param from - from address
   * @param to - to address
   * @param subject - title
   * @param content - content
   * @param opt - send options
   */
  abstract send(from: string, to: string, subject: string, content: string, opt: any): Promise<any> | any;

  /**
   * Verify this.opt
   *
   * throws if invalid
   */
  abstract validate_opt(): true;
}
