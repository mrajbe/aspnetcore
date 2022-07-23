export interface OpenApi {
    openapi: string
    info: Info
    paths: Paths
  }
  
  export interface Info {
    title: string
    description: string
    contact: Contact
    license: License
    version: string
  }
  
  export interface Contact {
    name: string
    email: string
  }
  
  export interface License {
    name: string
  }

  export interface Paths {
    path: Path[]
  }
  
  export interface Path {
    get: Method[]
  }

  export interface Method {
    tags: string[]
    summary: string
    description: string
  }