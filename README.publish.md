# tsredis
## Redis Promise库，在原有官方Redis库的基础上，进行了 Promise 封装以及强类型定义。

Remark：时间问题，就先写了3个方法接口，后续慢慢追加所有接口 😂

npm 安装

```
npm install tsredis5 
```

TS 方式使用
```ts
import RedisClient from "tsredis5";

const redisInstance: RedisClient = new RedisClient(
  {
    host: "127.0.01",
    port: 6379
  },
  {
    hashKey: "test-hash-key",
    isIgnoreReject: true,
    isCheckResult: true
  }
);

(async () => {
  const res1 = await redisInstance.hExists("a");

  const res2 = await redisInstance.hSet("a", "number");

  console.log(res1, res2);
})();

```

NodeJS 方式使用
```js
const RedisClient = require("tsredis5");

const redisInstance = new RedisClient(
  {
    host: "127.0.01",
    port: 6379
  },
  {
    hashKey: "test-hash-key",
    isIgnoreReject: true,
    isCheckResult: true
  }
);

(async () => {
  const res1 = await redisInstance.hExists("a");

  const res2 = await redisInstance.hSet("a", "number");

  console.log(res1, res2);
})();

```