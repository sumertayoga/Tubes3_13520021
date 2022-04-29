import React from "react"
import axios from "axios";

export const FindPenyakit = ({hasil}) => {

    // React.useEffect(() =>{
    //     fetch("//localhost:8000/tesdna")
    //     .then(res => res.json())
    //     .then(data => setData(data))
    // })

    if(hasil != null){

        return(
        <p>{hasil.nama + '-' + hasil.penyakit + '-' + hasil.isTrue}</p>
        )
    }else{
        return(
            <p> </p>
        )
    }

}