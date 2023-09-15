import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';


export const Dashboard = () => {

    const [allStores, setAllStores] = useState([]);
    const navigate = useNavigate();

    useEffect( () => {axios.get('http://localhost:8000/api/stores')
        .then(response => setAllStores(response.data))
        .catch(err => console.log(err))
}, []);

    const deleteStore = (targetID) => {
        axios.delete(`http://localhost:8000/api/stores/${targetID}`)
        .then( removeFromDOM(targetID))
        .catch(err => console.log(err))
    }

    const removeFromDOM = deletedID => {
        const filteredList = allStores.filter((eachStore, idx) => eachStore._id !== deletedID)
        setAllStores(filteredList)

    }
    console.log(allStores)

    const buttonRender = (id, bool) => {
        if(bool){
            return(
                <button className='btn btn-danger btn-sm m-2' onClick={ () => deleteStore(id)}>Delete</button>
            )
        } else{
            return(
                null
            )
        }
    }

    return (
        <div>
            
            
            <p>Find stores in your area!</p>
            <table className='table'>
                <tbody>
                    <tr>
                <td>Store</td>
                <td>Number</td>
                <td>Open</td>
                <td>Action</td>
                    </tr>
                
                
            {
                allStores.map((eachStore, idx) =>{
                    return(
                        <tr key={idx}>
                            <td><Link to={`/stores/${eachStore._id}`}>{eachStore.storeName}</Link></td>
                            <td>{eachStore.storeNumber}</td>
                            <td>{String(eachStore.isOpen)}</td>
                            <td>{buttonRender(eachStore._id, eachStore.isOpen)}</td>
                        </tr>
                    )
                }
                )}
                </tbody>
            </table>
                <button className='btn btn-primary btn-sm m-2' onClick={ () => navigate('/stores/add')}>Can't find your store?</button>
        </div>
    )
}