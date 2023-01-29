import axios from 'axios'

import {errorHandler, getDate} from "./helpers";
import { City} from "./types";

interface OpenQAApisInterface {
    fetchAllCountries:() => Promise<any>;
    fetchParameters:() => Promise<any>;
    fetchCities: (country: string) => Promise<any>
    fetchMesurments: (city: City) => Promise<any>
}

export const OpenQAApis: OpenQAApisInterface = {
    async fetchAllCountries () {
        return axios.get('https://api.openaq.org/v2/countries?limit=2000&page=1&offset=0&sort=asc&order_by=country').then(r => r.data.results.map((item:any) => ({
            name:item.name,
            text:item.name,
            code:item.code,
            value:item.code,
            key:item.code,
            cities:item.cities,
            parameters:item.parameters
        })))
            .catch(errorHandler)
    },
    async fetchCities (country:string) {
        return axios.get(`https://api.openaq.org/v2/cities?limit=100&page=1&offset=0&sort=asc&country=${country}&order_by=city`).then(r => r.data.results.map((item:any,index:number)=>({
            name:item.city,
            text:item.city,
            country:item.country,
            value:item,
            key:index,
            city:item.city,
            parameters:item.parameters
        })))
            .catch(errorHandler)
    },
    async fetchParameters(){
        return axios.get(`https://api.openaq.org/v2/parameters?limit=1000&page=1&offset=0&sort=asc&order_by=id`).then(r => {
            let parameters:string[] = []
            r.data.results.forEach((param:any)=>{
                parameters.push(param.name)
            })
            return parameters
        })
            .catch(errorHandler)
    },

    async fetchMesurments(city:City){
        return axios.get(`https://api.openaq.org/v2/measurements?date_from=2000-01-01&date_to=${getDate()}&limit=${city.parameters.length}&page=1&offset=0&sort=desc&parameter=${city.parameters.join('&parameter=')}&radius=1000&country=${city.country}&city=${city.city}&order_by=datetime`).then(r => {
            let parameters = {}
            r.data.results.forEach((param:any)=>{
                parameters = {
                    ...parameters,
                    [param.parameter]: {...param}
                }
            })
            return parameters
        })
            .catch(errorHandler)
    },

}