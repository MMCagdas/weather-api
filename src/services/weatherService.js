import axios from "axios";

export async function fetchWeather(city) {
    const url = `${process.env.WEATHER_API_URL}${encodeURIComponent(city)}?key=${process.env.WEATHER_API_KEY}&unitGroup=metric&contentType=json`;

    try {
        console.log(`[API] Fetching weather for: ${city}`);
        const response = await axios.get(url);
        console.log(`[API] Received  weather data for: ${city}`);
        return response.data;
    } catch (err) {
        console.error(`[API ERROR] Failed to fetch weather data for ${city}:`, err.message);
        throw new Error("Failed  to fetch weather data");
    }
}

export async function cacheWeatherData(city, data, redisClient) {
    const expirationSeconds = parseInt(process.env.CACHE_EXPIRATION) || 43200;

    try {
        console.log(`[CACHE] Caching weather data for ${city} (Expires in ${expirationSeconds} seconds)`);
        await redisClient.set(city, JSON.stringify(data), "EX", expirationSeconds);
        console.log(`[CACHE] Weather data cached successfully for ${city}`);
    } catch (err) {
        console.error(`[CACHE ERROR] Failed to cache data for ${city}:`, err.message);
    }
}