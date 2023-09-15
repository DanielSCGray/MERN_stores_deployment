import axios from 'axios';
import { useEffect, useState} from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';


export const EditStore = (props) => {

    const [storeName, setStoreName] = useState('');
    const [storeNumber, setStoreNumber] = useState(Number);
    const [isOpen, setIsOpen] = useState(Boolean)
    const [errorMsg, setErrorMsg] = useState('');
    const [storeNameErr, setStoreNameErr] = useState('');
    const [storeNumberErr, setStoreNumberErr] = useState('');
    const [buttonDisabled, setbuttonDisabled] = useState(false);
    const {id} = useParams();
    const navigate = useNavigate();
    
    useEffect( () => { axios.get(`http://localhost:8000/api/stores/${id}`)
    .then(res => {
        let oneStore = (res.data);
        setStoreName(oneStore.storeName);
        setStoreNumber(oneStore.storeNumber);
        setIsOpen(oneStore.isOpen);
    })
    .catch(err => console.log(err))
}, []);

const validator = () => {
    if (storeName.length>2) {
        setbuttonDisabled(false);
        console.log('storeName ' + buttonDisabled)
        setStoreNameErr('')
        if (storeNumber && storeNumber>0) {
            setbuttonDisabled(false);
            setStoreNumberErr('')
            console.log('storeNum ' + buttonDisabled)
        }
            else{
            setbuttonDisabled(true);
            setStoreNumberErr('*A Store number greater than 0 is required')
        }
    }else{
        setbuttonDisabled(true);
        setStoreNameErr('*Store Name must be 3+ characters')
    }
}

const handleSubmit = (e) => {
    e.preventDefault();
    
    axios.put(`http://localhost:8000/api/stores/${id}`, {
        storeName,
        storeNumber,
        isOpen
    })
        .then(res=>{
            console.log(res.data);
            navigate(`/stores/${res.data._id}`)
        })
        .catch(err=>
            setErrorMsg(err.response.data.message))
}

    const checkedValSetter = (bool) => {
        if (bool) {
            return (
                <div className="form-check">
                    <input className="form-check-input" type="checkbox" name='Opencheck' onChange={(e) => { setIsOpen(!isOpen) }} checked/>
                        <label className="form-check-label"> Open?</label>
                </div>
            )
        }else{
            return (
                <div className="form-check">
                    <input className="form-check-input" type="checkbox" name='Opencheck' onChange={(e) => { setIsOpen(!isOpen) }} />
                        <label className="form-check-label"> Open?</label>
                </div>
            )
        }
    }

    return (
        <div className='m-3'>
            <div>
            <p><Link to={'/'}>go back home</Link></p>
            <p>Edit this store</p>
            </div>
            
            <div>{errorMsg}</div>
            <form className="form-control" onSubmit={handleSubmit}>
                <label className="form-label">Store Name:</label>
                <input className="form-control" name={storeName} value={storeName} onChange={(e)=> {{setStoreName(e.target.value)}; {validator()}}} />
                <p className='text-danger' >{storeNameErr}</p>
                <label className="form-label">Store Number:</label>
                <input className="form-control" type='number' name={storeNumber} value={storeNumber} onChange={(e) => {{setStoreNumber(e.target.value)}; {validator()}}} />
                <p className='text-danger' >{storeNumberErr}</p>
                {checkedValSetter(isOpen)}
                <input className="form-control bg-primary" type='submit' value='Update store' disabled={buttonDisabled}/>
            </form>
        </div>
    )
}