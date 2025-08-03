import { getWeather } from "../controllers/weatherController.js";

export default async function (fastify, options) {
    fastify.get('/weather/:city', getWeather);
}