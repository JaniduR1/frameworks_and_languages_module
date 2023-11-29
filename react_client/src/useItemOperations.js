import axios from "axios";
import { useState, useEffect } from "react";

const useItemOperations = (urlAPI) => {
    const [items, setItems] = useState([]);

    const postForm = (form) => {
        return axios.post(`${urlAPI}/item`, form)
        .then(() => {
            getItems(); // To Refresh
        })
        .catch(err => {console.error('Youre a Dumbass: ', err);
        });
    };


    const getItems = () => {
        axios.get(`${urlAPI}/items`)
            .then(response => {
                setItems(response.data);
            })
            .catch(err => {console.error('Youre a Dumbass: ', err);
        });
    };


    const deleteItem = (id) => {
        axios.delete(`${urlAPI}/item/${id}`)
            .then(() => {
                getItems(); // To Refresh
            })
            .catch(err => {console.error('Youre a Dumbass: ', err);
        });
    };

    useEffect(() => {
        getItems();
// eslint-disable-next-line
    }, [urlAPI]);


    return { items, getItems, postForm, deleteItem };
};
 
export default useItemOperations;