# 🌤️ Weather API with Fastify, Redis & Visual Crossing

<div align="center">
  <strong>A lightweight weather API using Fastify, Redis for caching, and Visual Crossing as the data provider.</strong>
</div>

---

## 📌 About the Project

This project is built to demonstrate how to:
- Connect to an external weather service (Visual Crossing)
- Cache responses using Redis to reduce redundant API calls
- Build a maintainable backend structure with Fastify

### 🧰 Built With

- [Fastify](https://www.fastify.io/)
- [Redis](https://redis.io/)
- [Visual Crossing API](https://www.visualcrossing.com/weather-api)
- [Axios](https://axios-http.com/)
- [dotenv](https://github.com/motdotla/dotenv)

---

## 🚀 Getting Started

To get a local copy up and running, follow these steps.

### Prerequisites

- [Node.js](https://nodejs.org/)
- [Docker](https://www.docker.com/) (to run Redis easily)

### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/MMCagdas/weather-api.git
   cd weather-api-fastify
   ```

2. Install dependencies
   ```sh
   npm install
   ```

3. Start Redis with Docker
   ```sh
   docker run -d -p 6379:6379 redis
   ```

4. Create a `.env` file in the root directory and add the following:

   ```env
   WEATHER_API_KEY=your_visualcrossing_api_key
   WEATHER_API_URL=https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/
   REDIS_URL=redis://localhost:6379
   CACHE_EXPIRATION=43200
   PORT=3000
   ```

5. Start the development server
   ```sh
   npm start
   ```

6. Access the API at:
   ```
   http://localhost:3000/weather/Antalya
   ```

---

## 📋 Example Response

```json
{
  "location": "Antalya, Turkey",
  "temperature": 30.2,
  "maxtemp": 32.5,
  "mintemp": 25.0,
  "humidity": 58,
  "windspeed": 10.4
}
```

---

## 📝 License

Distributed under the MIT License. See `LICENSE` for more information.