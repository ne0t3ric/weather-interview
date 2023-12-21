export type GeocodingAPILon = number
export type GeocodingAPILat = number
export type GeocodingAPIFeaturePoint = {
  geometry: {
    type: 'Point',
    coordinates: [GeocodingAPILon, GeocodingAPILat]
  },
  properties: {
    id: number
    label: string
  }
}

export type GeocodingAPIQuery = {
  text: string
}

export type GeocodingAPIResponse = {
  features: GeocodingAPIFeaturePoint[]
}
