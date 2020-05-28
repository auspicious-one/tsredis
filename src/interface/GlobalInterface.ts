/**
 * 定义 Redis- Hash表操作函数
 */
export interface HashInterface {
  /** 全局共享HashKey */
  setHashKey(hashKey: string): void;

  /** Hash表里是否存在该字段 */
  hExists(hashField: string): Promise<any | boolean>;

  /** 设置Hash表字段的值 */
  hSet(hashField: string, hashValue: string | number): Promise<any | boolean>;
}

/**
 * 定义 Redis - Key 操作函数
 */
export interface KeyInterface {
  /** 设置一个Key */
  set(key: string, value: string): Promise<"OK" | boolean>;
}

export interface HandleOptions {
  hashKey?: string;
  isIgnoreReject?: boolean;
  isCheckResult?: boolean;
}
