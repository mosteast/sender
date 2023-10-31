export interface T_send<T> {
  (from: string, to: string, subject: string, content: string, opt: any): Promise<T | any>;
}
