//import React, { useState, useEffect } from 'react';

import './App.css'
import Navbar from './Navbar';
import Form from './Form';


function App() {
    return (
        <div className='App'>
            <Navbar />
            <div className='content'>
                <Form />
            </div>
        </div>
    
    );
}

export default App;
