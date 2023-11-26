import React, { useState } from 'react';
import ListView from './ListView';
import useItemOperations from './useItemOperations';
//import axios from 'axios' 
/* Axios is a very widely used JS library that is known for its 
ability to handle HTTP requests. 
*/


const urlParams = new URLSearchParams(window.location.search);
const urlAPI = (urlParams.get('api') || '/api/v1').replace(/\/$/, '');
//const { formData } = useGet(urlAPI);



const Form = () => {
    const [user_id, setUserID] = useState('');
    const [keywords, setKeywords] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState('');
    const [lat, setLat] = useState('');
    const [lon, setLon] = useState('');

    const { items, postForm, deleteItem } = useItemOperations(`${urlAPI}`);

    //const {formData} = useGet(`${urlAPI}/items`)


    //Clearing the Form
    const clearForm = () => {
        setUserID('');
        setKeywords('');
        setDescription('');
        setImage('');
        setLat('');
        setLon('');
    };

    const handleSubmit = (event) => {
        event.preventDefault(); // Prevent the default form submit behavior

        const newItem = {
            user_id,
            keywords,
            description,
            image,
            lat,
            lon
        };

        postForm(newItem).then(() => {
            clearForm(); // Clear form fields after successful submission
        }).catch(err => {
            // Handle any posting errors here
            console.error('Posting Error Dumbass: ', err);
        });

        // const form = { userID, keywords, description, image, lat, lon };
        // console.log(form)

        // fetch(`${urlAPI}/item`, {
        //     method: 'POST',
        //     headers: {'Content-Type': 'application/json'},
        //     body: JSON.stringify(this.form)
        // })
        // .then(() => {
        //     console.log("New form Added")
        //     console.log(form)
        // })
    };


    // const handleDelete = (id) => {
    //     axios.delete(`${urlAPI}/item/${id}`)
    //       .then(() => { 
    //         fetchItems();
    //         })
    //         .catch(err => console.error(err))
    //   };

    return (
        <div className="form">
            <form>
                <label>UserID: </label>
                <input
                    type="text"
                    required
                    value={user_id}
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
                <p>{user_id}</p>
                <p>{keywords}</p>
                <p>{description}</p>
                <p>{image}</p>
                <p>{lat}</p>

                

            </form>
            <button onClick={handleSubmit}>Post</button>
            <ListView items={items} onDelete={deleteItem} />
        </div>
    );
}
 
export default Form;