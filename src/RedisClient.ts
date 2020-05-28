import { RedisClient as Redis, ClientOpts } from "redis";
import {
  HashInterface,
  KeyInterface,
  HandleOptions
} from "./interface/GlobalInterface";
import { isObject } from "./utils/index";

export default class RedisClient implements HashInterface, KeyInterface {
  /** Redis 实例 */
  private redisClientInstance: Redis;

  /** 要操作的Hash表的Key */
  private hashKey: string = "";

  /** 是否忽略Redis返回的异常 */
  private isIgnoreReject: boolean = false;

  /** 是否检查判断性的结果，这样只会对 resolve 返回 true|false */
  private isCheckResult: boolean = false;

  constructor(connectOptions: ClientOpts, handleOptions?: HandleOptions) {
    this.redisClientInstance = new Redis(connectOptions);

    if (isObject(handleOptions) && handleOptions) {
      this.hashKey = handleOptions.hashKey || "";
      this.isIgnoreReject = handleOptions.isIgnoreReject || false;
      this.isCheckResult = handleOptions.isCheckResult || false;
    }
  }

  setIsIgnoreReject(isIgnoreReject: boolean = false) {
    this.isIgnoreReject = isIgnoreReject;
  }

  setIsCheckResult(isCheckResult: boolean = false) {
    this.isCheckResult = isCheckResult;
  }

  set(key: string, value: string): Promise<"OK" | boolean> {
    return new Promise((resolve, reject) => {
      this.redisClientInstance.SET(key, value, (err, reply) => {
        if (err) {
          this.isIgnoreReject ? resolve(false) : reject(err);
          return;
        }

        resolve(this.isCheckResult ? reply === "OK" : reply);
      });
    });
  }

  setHashKey(hashKey: string) {
    this.hashKey = hashKey;
  }

  hExists(hashField: string): Promise<number | boolean> {
    return new Promise((resolve, reject) => {
      this.redisClientInstance.HEXISTS(
        this.hashKey,
        hashField,
        (err, reply) => {
          if (err) {
            this.isIgnoreReject ? resolve(false) : reject(err);
            return;
          }
          // 如果哈希表含有给定字段，返回 1 。
          // 如果哈希表不含有给定字段，或 key 不存在，返回 0 。
          resolve(this.isCheckResult ? reply === 1 : reply);
        }
      );
    });
  }

  hSet(hashField: string, hashValue: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.redisClientInstance.HSET(
        this.hashKey,
        hashField,
        hashValue,
        (err, reply) => {
          if (err) {
            this.isIgnoreReject ? resolve(false) : reject(err);
            return;
          }

          // 如果字段是哈希表中的一个新建字段，并且值设置成功，返回 1 。
          // ！！！如果哈希表中域字段已经存在且旧值已被新值覆盖，返回 0;
          resolve(this.isCheckResult ? reply === 0 || reply === 1 : reply);
        }
      );
    });
  }
}
