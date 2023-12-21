export class HttpApi {
  protected originUrl: URL
  protected url: URL
  constructor(origin: string){
    this.originUrl =  new URL(origin)
    this.url = new URL(this.originUrl)
  }

  setEndpoint(endpoint: string){
    this.url = new URL(endpoint, this.originUrl)
  }

  setQuery(queryParams: Record<string, string>){
    this.resetQuery()
    for (let [key, value] of Object.entries(queryParams)) {
      this.url.searchParams.set(key, value)
    }
  }

  resetQuery(){
    for (const [key, value] of  this.url.searchParams.entries()) {
      this.url.searchParams.delete(key)
    }
  }
  getStringUrl(): string{
    return this.url.toString()
  }
}
