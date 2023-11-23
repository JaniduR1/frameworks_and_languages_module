import React, { useState } from 'react';
import useGet from './useGet';
import ListView from './ListView';
import axios from 'axios' /* Axios is a very widely used JS library that is known for its 
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

    const {formData} = useGet(`${urlAPI}/items`)

    const handleSubmit = (e) => {
        e.preventDefault()
        const form = { user_id, keywords, description, image, lat, lon };
        console.log(form)
        axios.post(`${urlAPI}/item`, form)
        .then((response) => {
            console.log("New form Added")
            console.log(response)
            console.log(formData)
            console.log(JSON.stringify(formData, null, 2));

        })

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
    }
    const [items, setItems] = useState([]);

    const handleDelete = (id) => {
        axios.delete(`${urlAPI}/item/${id}`)
          .then(() => {
            // Remove the item from the state
            setItems(items.filter(item => item.id !== id));
          })
          
          .catch(error => {
            console.error('Error deleting item:', error);
          });
      };

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
            <ListView items={formData} onDelete={handleDelete} />
        </div>
    );
}
 
export default Form;