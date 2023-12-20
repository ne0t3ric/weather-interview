export type GeocodingAPILon = number
export type GeocodingAPILat = number
export type GeocodingAPIFeature = {
  geometry: {
    type: 'Point',
    coordinates: [GeocodingAPILon, GeocodingAPILat]
  },
  property: {
    label: string
  }

}
export type GeocodingAPIResult = {
  features: GeocodingAPIFeature[]
}
