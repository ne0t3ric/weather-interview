export type GeocodingAPILon = number
export type GeocodingAPILat = number
export type GeocodingAPIFeaturePoint = {
  geometry: {
    type: 'Point',
    coordinates: [GeocodingAPILon, GeocodingAPILat]
  },
  property: {
    label: string
  }
}

export type GeocodingAPIResponse = {
  features: GeocodingAPIFeaturePoint[]
}
