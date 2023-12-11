// https://github.com/axios/axios
import axios from "axios";
import { useState, useEffect } from "react";
// A custom React hook for abstracting logic into reusable functions - 
//https://react.dev/learn/reusing-logic-with-custom-hooks#extracting-your-own-custom-hook-from-a-component

const useItemOperations = (urlAPI) => {
    const [items, setItems] = useState([]);

    // Using Axios, this hook preforms 'asynchronous operations' which show the handeling of asynchronous data fetching and updating in React
    // https://rapidapi.com/guides/axios-async-await
    // ?? Should I put this? https://www.youtube.com/watch?v=--Db-ZO-NVM, https://www.youtube.com/watch?v=4uUwpZOCIqM
    const postForm = (form) => {
        return axios.post(`${urlAPI}/item`, form)
        .then(() => {
            getItems(); // To Refresh
        })
        .catch(err => {console.error('Post item error: ', err);
        });
    };


    const getItems = () => {
        axios.get(`${urlAPI}/items`)
            .then(response => {
                setItems(response.data);
            })
            .catch(err => {console.error('Get items error: ', err);
        });
    };


    const deleteItem = (id) => {
        axios.delete(`${urlAPI}/item/${id}`)
            .then(() => {
                getItems(); // To Refresh
            })
            .catch(err => {console.error('Delete item error: ', err);
        });
    };

    useEffect(() => {
        getItems();
// eslint-disable-next-line
    }, [urlAPI]);


    return { items, getItems, postForm, deleteItem };
};
 
export default useItemOperations;