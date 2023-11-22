import React, { useEffect, useState } from 'react';
import useGet from './useGet';


const urlParams = new URLSearchParams(window.location.search);
const urlAPI = (urlParams.get('api') || '/api/v1').replace(/\/$/, '');
//const { formData } = useGet(urlAPI);

const handleClick = () => {
    console.log("POSTING!!")
}

const Form = () => {
    const [userID, setUserID] = useState('');
    const [keywords, setKeywords] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState('');
    const [lat, setLat] = useState('');
    const [lon, setLon] = useState('');

    return (
        <div classname="form">
            <form>
                <h2>Create</h2>

                <label>UserID: </label>
                <input
                    type="text"
                    required
                    value={userID}
                    onChange={(event) => setUserID(event.target.value)}
                />

                <label>Keywords: </label>
                <input
                    type="text"
                    required
                    value={keywords}
                    onChange={(event) => setKeywords(event.target.value)}
                />

                <label>Description: </label>
                <textarea
                    required
                    value={description}
                    onChange={(event) => setDescription(event.target.value)}
                ></textarea>

                <label>Image: </label>
                <input
                    type="text"
                    value={image}
                    onChange={(event) => setImage(event.target.value)}
                />

                <label>Lat: </label>
                <input
                    type="number"
                    required
                    value={lat}
                    onChange={(event) => setLat(event.target.value)}
                />

                <label>Lon: </label>
                <input
                    type="number"
                    required
                    value={lon}
                    onChange={(event) => setLon(event.target.value)}
                />
                <p>{userID}</p>
                <p>{keywords}</p>
                <p>{description}</p>
                <p>{image}</p>
                <p>{lat}</p>
                <p>{lon}</p>
            </form>



            <button onClick={handleClick}>Post</button>
        </div>
    );
}
 
export default Form;