export interface IAuthUser {
  id: number;
  username?: string;
  email?: string;
  /** 密码版本 */
  pv: number;
  /** 过期时间 */
  exp?: number;
  /** 签发时间 */
  iat?: number;
}
