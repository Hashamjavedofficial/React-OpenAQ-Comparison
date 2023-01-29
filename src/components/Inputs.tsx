import React, {SyntheticEvent,useState,useEffect} from 'react'
import {Divider, Dropdown, DropdownProps, Header} from 'semantic-ui-react'

import {Cities, Countries} from "../types";
import {OpenQAApis} from "../Apis";

interface Props{
    params: string[];
    countries: Countries[];
    changeCountry: (event: SyntheticEvent<HTMLElement, Event>, data: DropdownProps)=>void;
    changeCity: (event: SyntheticEvent<HTMLElement, Event>, data: DropdownProps)=>void;
    selectedCity: any;
    selectedCountry:string;
    setIsLoading: (arg:boolean)=>void
}
const Inputs :React.FC<Props> = (props)=>{
    const {countries,changeCountry,selectedCountry,selectedCity,changeCity,setIsLoading,params} = props
    const [cities,setCities] = useState<Cities[]>([])
    const [measurments,setMeasurments] = useState<any>({})

    const filterParams = params.filter(function(item, pos) {
        return params.indexOf(item) === pos;
    })

    const resetCity = ()=>{
        const event: any = ''
        changeCity(event,{
            value:''
        })
    }

    useEffect(()=>{
        setCities([])
        setMeasurments({})
        resetCity()
        setIsLoading(true)
        OpenQAApis.fetchCities(selectedCountry).then((cities:Cities[])=>{
            setCities(cities)
            setIsLoading(false)
        }).catch(()=>{
            setIsLoading(false)
        })

    },[selectedCountry])

    useEffect(()=>{
        setMeasurments({})
        setIsLoading(true)
        OpenQAApis.fetchMesurments(selectedCity).then((res:any)=>{
            setMeasurments(res)
            setIsLoading(false)
        }).catch(()=>{
            setIsLoading(false)
        })
    },[selectedCity])


    return (<div className={'input-container'}>
        <Dropdown
            placeholder='Select Country'
            fluid
            search
            selection
            options={countries}
            value={selectedCountry}
            onChange={changeCountry}
        />
        <div className={'mt-4'}></div>
        {cities.length > 0 &&  <Dropdown
            placeholder='Select City'
            fluid
            search
            selection
            options={cities}
            onChange={changeCity}
            value={selectedCity}
        />}

        {Object.keys(measurments).length > 0  && filterParams.map((measurment:string)=>(<div key={measurment}>
            <Divider horizontal>
                <Header as='h4'>
                    {measurment.toUpperCase()}
                </Header>
            </Divider>

            <p className={'mesurment-value'}>
                {measurments.hasOwnProperty(measurment) ? measurments[measurment].value : 'N/A'}
            </p>
        </div>))}
    </div>)
}

// @ts-ignore
export default Inputs