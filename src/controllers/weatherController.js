import { cacheWeatherData, fetchWeather } from "../services/weatherService.js";

export async function getWeather(request, reply) {
    try {
        const { city } = request.params;
        const key = city.toLowerCase().trim();

        console.log(`[REQUEST] Weather data requested for: ${key}`);

        const cachedData = await request.server.redis.get(key);
        if (cachedData) {
            console.log(`[CACHE HIT] Found cached weather data for: ${key}`);
            return reply.status(200).send(JSON.parse(cachedData));
        }

        console.log(`[CACHE MISS] No cached data found for: ${key}. Fetching from API...`);
        const newData = await fetchWeather(key);

        const filteredData = {
            location: newData.resolvedAddress,
            temperature: newData.days[0].temp,
            maxtemp: newData.days[0].tempmax,
            mintemp: newData.days[0].tempmin,
            humidity: newData.days[0].humidity,
            windspeed: newData.days[0].windspeed
        }

        await cacheWeatherData(key, filteredData, request.server.redis);
        console.log(`[RESPONSE] Returning fresh weather data for: ${key}`);

        return reply.status(200).send(filteredData);
    } catch (err) {
        console.error(`[ERROR] Failed to get weather data:`, err.message);
        return reply.status(500).send({ error: err.message || 'Internal server error' });
    }
}
