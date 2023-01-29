export interface Countries {
    name: string;
    text: string;
    value:string;
    key:string;
    code:string;
    cities:number;
    parameters: string[]
}

export interface Parameters{
    id: number;
    name: string;
    displayName: string;
    description: string;
    preferredUnit:string
    isCore: true;
    maxColorValue: number
}

export interface ModifiedParams {
     [key:string] : Parameters
}

export interface Cities{
    name: string;
    text: string;
    value:string;
    key:number;
    city:number;
    country:string;
    parameters: string[]
}

export interface City{
    city: string
    count: number
    country: string
    firstUpdated: string
    lastUpdated: string
    locations: number
    parameters: string[]
}