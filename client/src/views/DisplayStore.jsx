import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';


export const DisplayStore = () => {

    const [store, setStore] = useState({});
    const navigate = useNavigate();

    const {id} = useParams();

    useEffect( () => { axios.get(`http://localhost:8000/api/stores/${id}`)
    .then(res => setStore(res.data))
    .catch(err => console.log(err))
});

    const openStatus = bool =>{
        if(bool){
            return 'Open'
        } else{
            return 'Closed'
        }
    }
    if (store) {
        
        return (
            <div>

                <p><Link to={'/'}>go back home</Link></p>
                <h3>{store.storeName}</h3>
                <h3>Store Number : {store.storeNumber}</h3>
                <h3>{openStatus(store.isOpen)}</h3>
                <button className='btn btn-warning btn-sm m-2' onClick={ () => navigate(`/stores/edit/${store._id}`)}>Edit Store Details</button>
            </div>
        )
    }
}

