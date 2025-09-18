export const Errors = {
  // 系统错误
  UNKNOWN_ERROR: { code: 50000, message: 'Internal Server Error' },
  SERVER_CONNECT_FAILED: {
    code: 50001,
    message: 'Settings server connection failed'
  },

  // 认证相关
  INVALID_CREDENTIALS: { code: 10001, message: 'Invalid username or password' },
  TOKEN_EXPIRED: { code: 10002, message: 'Authentication token has expired' },
  INVALID_TOKEN: { code: 10003, message: 'Invalid authentication token' },
  PASSWORD_ERROR: { code: 10004, message: 'Password error' },
  ACCOUNT_DISABLED: { code: 10005, message: 'Account has been disabled' },
  INVALID_LOGIN: { code: 10006, message: 'Invalid login' },
  TOKEN_BLACKLISTED: {
    code: 10007,
    message: 'Authentication token has been blacklisted'
  },
  PASSWORD_CHANGED: {
    code: 10008,
    message: 'Password has been changed, please log in again'
  },
  // 权限相关
  INSUFFICIENT_PERMISSIONS: {
    code: 20001,
    message: 'Insufficient permissions'
  },

  // 业务相关
  USER_NOT_FOUND: { code: 30001, message: 'User not found' },
  VALIDATION_ERROR: { code: 30002, message: 'Validation error' },
  ACCOUNT_LOGGED_IN_ELSEWHERE: {
    code: 30003,
    message: 'Account logged in elsewhere'
  },
  USER_EXIST: { code: 30004, message: 'User already exists' },
  EMAIL_EXIST: { code: 30005, message: 'Email already exists' },
  MOBILE_EXIST: { code: 30006, message: 'Mobile already exists' },
  USER_PWD_INCORRECT: { code: 30007, message: 'Account or password incorrect' },

  // 数据相关
  DATA_NOT_FOUND: { code: 40001, message: 'Data not found' },
  NODE_HAS_CHILDREN: { code: 40002, message: 'Node has children' },
  NOT_FOUND: { code: 40003, message: 'Resource not found' }
} as const;

export type ErrorKey = keyof typeof Errors;
