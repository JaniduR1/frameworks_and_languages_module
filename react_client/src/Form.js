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

                <div className='md:flex md:items-center mb-6'>
                    <div className='md:w-1/3'>
                        <label className='block font-bold md:text-right mb-1 md:mb-0 pr-4' for="UserID">UserID: </label>
                    </div>
                    <div className='md:w-1/3'>
                        <input
                            className='appearance-none border-black border-4 rounded w-full py-2 px-4 leading-tight focus:border-blue-900'
                            type="text"
                            required
                            value={user_id}
                            onChange={(event) => setUserID(event.target.value)}
                        />
                    </div>
                </div>

                <div className='md:flex md:items-center mb-6'>
                    <div className='md:w-1/3'>
                        <label className='block font-bold md:text-right mb-1 md:mb-0 pr-4' for="Keywords">Keywords: </label>
                    </div>
                    <div className='md:w-1/3'>
                        <input
                            className='appearance-none border-black border-4 rounded w-full py-2 px-4 leading-tight focus:border-blue-900'
                            type="text"
                            required
                            value={keywords}
                            onChange={(event) => setKeywords(event.target.value)}
                        />
                    </div>
                </div>

                <div className='md:flex md:items-center mb-6'>
                    <div className='md:w-1/3'>
                        <label className='block font-bold md:text-right mb-1 md:mb-0 pr-4' for="Description">Description: </label>
                    </div>
                    <div className='md:w-1/3'>
                        <textarea
                            className='appearance-none border-black border-4 rounded w-full py-2 px-4 leading-tight focus:border-blue-900'
                            required
                            value={description}
                            onChange={(event) => setDescription(event.target.value)}
                        ></textarea>
                    </div>
                </div>

                <div className='md:flex md:items-center mb-6'>
                    <div className='md:w-1/3'>
                        <label className='block font-bold md:text-right mb-1 md:mb-0 pr-4' for="Image">Image: </label>
                    </div>
                    <div className='md:w-1/3'>
                        <input
                            className='appearance-none border-black border-4 rounded w-full py-2 px-4 leading-tight focus:border-blue-900'
                            type="text"
                            value={image}
                            onChange={(event) => setImage(event.target.value)}
                        />
                    </div>
                </div>

                <div className='md:flex md:items-center mb-6'>
                    <div className='md:w-1/3'>
                        <label className='block font-bold md:text-right mb-1 md:mb-0 pr-4' for="Latitude">Latitude: </label>
                    </div>
                    <div className='md:w-1/3'>
                        <input
                            className='appearance-none border-black border-4 rounded w-full py-2 px-4 leading-tight focus:border-blue-900'
                            type="number"
                            required
                            value={lat}
                            onChange={(event) => setLat(event.target.value)}
                        />
                    </div>
                </div>

                <div className='md:flex md:items-center mb-6'>
                    <div className='md:w-1/3'>
                        <label className='block font-bold md:text-right mb-1 md:mb-0 pr-4' for="Longitude">Longitude: </label>
                    </div>
                    <div className='md:w-1/3'>
                        <input
                            className='appearance-none border-black border-4 rounded w-full py-2 px-4 leading-tight focus:border-blue-900'
                            type="number"
                            required
                            value={lon}
                            onChange={(event) => setLon(event.target.value)}
                        />
                    </div>
                </div>
                <p>{user_id}</p>
                <p>{keywords}</p>
                <p>{description}</p>
                <p>{image}</p>
                <p>{lat}</p>

            </form>

            <div className='flex items-center justify-center'>
                <button className='bg-blue-500 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded-xl focus:shadow-outline" type="button' onClick={handleSubmit}>Post</button>
            </div>

            <ListView items={items} onDelete={deleteItem} />
        </div>
    );
}
 
export default Form;