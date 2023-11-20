import React, { useEffect, useState } from 'react';



const Form = () => {
    const urlParams = new URLSearchParams(window.location.search);
    const urlAPI = (urlParams.get('api') || '/api/v1').replace(/\/$/, '');

    //const [formData, setFormData] = useState(null);

    const handleClick = () => {
        console.log("POSTING!!")
    }

    useEffect(() => {
        fetch(`${urlAPI}/items`)
        .then(res => {
            return res.json();
        })
        .then(data => {
            console.log(...data);
        })
    }, []);

    return (
        <div classname="form">
            <h2>Create</h2>
            <button onClick={handleClick}>Post</button>
        </div>
    );
}
 
export default Form;