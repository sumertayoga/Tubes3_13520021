import React from "react"
import axios from "axios";

export const FindPenyakit = ({hasil}) => {

    // React.useEffect(() =>{
    //     fetch("//localhost:8000/tesdna")
    //     .then(res => res.json())
    //     .then(data => setData(data))
    // })

    if(hasil != null){
        if(hasil.isTrue == "Data tidak sesuai"){
            return (
                <p>{hasil.isTrue}</p>
            )
        }
        else{
            const d = new Date()
            let date = d.getFullYear().toString() + "-" + (d.getMonth()+1).toString() + "-" + d.getDate().toString();

            return(
            <p>{date +'-'+ hasil.nama + '-' + hasil.penyakit + '-' + hasil.isTrue}</p>
            )
        }

    }else{
        return(
            <p> </p>
        )
    }

}