import { Route, Routes } from 'react-router-dom';
import './App.css';
import { Dashboard } from './views/Dashboard';
import { DisplayStore } from './views/DisplayStore';
import { AddStore } from './views/AddStore';
import { EditStore } from './views/EditStore';


function App() {
    return (
        <div className="App m-3">
            <h1>Store Finder</h1>

            <Routes>
                <Route path='/' element={<Dashboard />} />
                <Route path='/stores/add' element={<AddStore />} />
                <Route path='/stores/edit/:id' element={<EditStore />} />
                <Route path='/stores/:id' element={<DisplayStore />} />
            </Routes>

        </div>
    );
}

export default App;
