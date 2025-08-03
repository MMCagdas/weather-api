import Fastify from "fastify";
import Redis from "ioredis";
import dotenv from "dotenv";
import weatherRoute from "./routes/weatherRoute.js";

dotenv.config();

const fastify = Fastify({ logger: { level: "warn" } });
const redis = new Redis(process.env.REDIS_URL);

fastify.decorate("redis", redis);
fastify.register(weatherRoute);

const PORT = process.env.PORT || 3000;

fastify.listen({ port: PORT }, (err, address) => {
    if (err) {
        fastify.log.error(err);
        process.exit(1);
    }
    console.log(`Server is running on address: ${address}`);
})