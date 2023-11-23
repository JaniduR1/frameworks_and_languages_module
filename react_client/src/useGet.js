//Custom Hook for Get Items
import { useState, useEffect } from "react";


const useGet = (url) => {
    const [formData, setFormData] = useState(null);


    useEffect(() => {
        fetch(url)
        .then(res => 
            {
            if(!res.ok) {
                throw Error('Connection Error: ')
            }
            return res.json();
        })

        .then(formData => {
            setFormData(formData);
        })
        .catch(e => {
            console.log(e.message);
        })
    }, [url]);

    return { formData }
}

export default useGet;