export interface ClientDefine {
  /** 全局共享HashKey */
  setHashKey(hashKey: string): void;

  /** Hash表里是否存在该字段 */
  hExists(hashField: string): Promise<any | boolean>;

  /** 设置Hash表字段的值 */
  hSet(hashField: string, hashValue: string | number): Promise<any | boolean>;
}

export interface HandleOptions {
  hashKey?: string;
  isIgnoreReject?: boolean;
  isCheckResult?: boolean;
}
