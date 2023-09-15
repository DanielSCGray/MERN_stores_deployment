import axios from 'axios';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';


export const AddStore = (props) => {

    const [storeName, setStoreName] = useState('');
    const [storeNumber, setStoreNumber] = useState(Number);
    const [isOpen, setIsOpen] = useState(Boolean)
    const [errorMsg, setErrorMsg] = useState('');
    const [storeNameErr, setStoreNameErr] = useState('*StoreName must be 3+ characters');
    const [storeNumberErr, setStoreNumberErr] = useState('*A Store number greater than 0 is required');
    const [buttonDisabled, setbuttonDisabled] = useState(true);
    const navigate = useNavigate();
    


    const validator = () => {
        if (storeName.length > 2) {
            setbuttonDisabled(false);
            console.log('storeName ' + buttonDisabled)
            setStoreNameErr('')
            if (storeNumber && storeNumber > 0) {
                setbuttonDisabled(false);
                setStoreNumberErr('')
                console.log('storeNum ' + buttonDisabled)
            }
            else {
                setbuttonDisabled(true);
                setStoreNumberErr('*A Store number greater than 0 is required')
            }
        } else {
            setbuttonDisabled(true);
            setStoreNameErr('*Store Name must be 3+ characters')
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();


        axios.post('http://localhost:8000/api/stores', {
            storeName,
            storeNumber,
            isOpen
        })
            .then(res => {
                console.log(res.data);
                navigate(`/stores/${res.data._id}`)
            })
            .catch(err =>
                setErrorMsg(err.response.data.message))
    }



    return (
        <div className='m-3'>
            <div>
                <p><Link to={'/'}>go back home</Link></p>
                <p>Add a new store!</p>
            </div>

            <div>{errorMsg}</div>
            <form className="form-control" onSubmit={handleSubmit}>
                <label className="form-label">Store Name:</label>
                <input className="form-control" name={storeName} onChange={(e) => { { setStoreName(e.target.value) }; { validator() } }} />
                <p className='text-danger' >{storeNameErr}</p>
                <label className="form-label">Store Number:</label>
                <input className="form-control" type='number' name={storeNumber} onChange={(e) => { { setStoreNumber(e.target.value) }; { validator() } }} />
                <p className='text-danger' >{storeNumberErr}</p>
                <div className="form-check">
                    <input className="form-check-input" type="checkbox" name='Opencheck' onChange={(e) => { setIsOpen(!isOpen) }} />
                        <label className="form-check-label"> Open?</label>
                </div>
                <input className="form-control bg-primary" type='submit' value='Add store' disabled={buttonDisabled} />
            </form>
        </div>
    )

}
