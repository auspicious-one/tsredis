import RedisClient from "../src/RedisClient";

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
