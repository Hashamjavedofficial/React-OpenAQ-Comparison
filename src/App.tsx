import React,{useEffect,useState} from 'react';
import {Dimmer, Grid, Loader, Segment} from 'semantic-ui-react'

import Inputs from "./components/Inputs";
import BackDrop from "./components/Backdrop";
import useInputs from "./hooks/useInputs";
import {OpenQAApis} from "./Apis";

import {Countries} from "./types";

import './App.css'



const App:React.FC = () =>  {
    const [countries,setCountries] = useState<Countries[]>([])
    const [parameters,setParameters] = useState<string[]>([])
    const [isLoading,setIsLoading] = useState<boolean>(false)
    const firstCity = useInputs()
    const secondCity = useInputs()

    useEffect(()=>{
        setIsLoading(true)
        OpenQAApis.fetchParameters().then((params:string[])=>{
            setParameters(params)
            setIsLoading(false)
        }).catch(()=>{
            setIsLoading(false)
        })
        OpenQAApis.fetchAllCountries().then((countries:Countries[])=>{
            setCountries(countries)
            setIsLoading(false)
        }).catch(()=>{
            setIsLoading(false)
        })
    },[])

  return (
     <>
         {isLoading && <BackDrop />}
       <div className='heading-container'>
         <h2>Air Quality Comparison</h2>
       </div>
       <Grid>
         <Grid.Row columns={2}>
           <Grid.Column>
             <Inputs params={parameters} setIsLoading={setIsLoading} countries={countries} changeCountry={firstCity.changeCountry} selectedCountry={firstCity.selectedCountry} selectedCity={firstCity.selectedCity} changeCity={firstCity.changeCity} />
           </Grid.Column>
           <Grid.Column>
               <Inputs params={parameters} setIsLoading={setIsLoading} countries={countries} changeCountry={secondCity.changeCountry} selectedCountry={secondCity.selectedCountry} selectedCity={secondCity.selectedCity} changeCity={secondCity.changeCity} />
           </Grid.Column>
         </Grid.Row>
       </Grid>
     </>
  );
}

export default App;
