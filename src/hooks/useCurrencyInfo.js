//custum hook - is not much different from just a function in other file

import {useEffect, useState} from "react"

let myapi = '9eef865aad7a1a040d4a39f5'

function useCurrencyInfo(currency){
    const [data, setData] = useState({})
    useEffect(() => {
        fetch(`https://v6.exchangerate-api.com/v6/${myapi}/latest/${currency}`)
        .then((res) => res.json())
        .then((res) => {setData(res["conversion_rates"])})
        // console.log(data);
    }, [currency])
    // console.log(data);
    return data
}

export default useCurrencyInfo;