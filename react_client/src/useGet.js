//Custom Hook for Get Items
import axios from "axios";
import { useEffect, useState } from "react";


const useGet = (url)=>{
    const [formData, setFormData] = useState([]);
    useEffect(()=>{
        axios.get(url)
        .then((resp)=>{
            console.log(resp.data)
            setFormData(resp.data)
        })
        .catch((error) => {
            console.error('Error fetching data:', error);
        });
    }, [url])

    return { formData }
}

export default useGet;