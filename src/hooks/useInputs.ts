import  {useState, useCallback, SyntheticEvent} from 'react'
import {DropdownProps} from "semantic-ui-react";


const useInputs = () => {
    const [selectedCountry,setSelectedCountry] = useState<string>('')
    const [selectedCity,setSelectedCity] = useState<any>()

    const changeCountry = useCallback((event: SyntheticEvent<HTMLElement, Event>, data: DropdownProps)=>{
        const country = data.value as string
        setSelectedCountry(country)
    },[])

    const changeCity = useCallback((event: SyntheticEvent<HTMLElement, Event>, data: DropdownProps)=>{
        const city = data.value as any
        setSelectedCity(city)
    },[])

    return {changeCountry,changeCity,selectedCity,selectedCountry}
}

export default useInputs