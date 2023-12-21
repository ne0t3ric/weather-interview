export type WeatherAPILat = number
export type WeatherAPILon = number
export type WeatherAPIDateISO = string
export type WeatherTemperatureDegree = number

export type WeatherAPIQuery = {
    where?: string
    "order-by"?: string
    limit?: string,
    apikey?: string
}

export type WeatherAPIResult = {
  "forecast": WeatherAPIDateISO,
  "timestamp": WeatherAPIDateISO
  "temperature": WeatherTemperatureDegree
}

export type WeatherAPIResponse= {
  "total_count": number
  "results": WeatherAPIResult[]
}
