//import React, { useState, useEffect } from 'react';
import './App.css'
import './index.css'
import Navbar from './Navbar';
import Form from './Form';


function App() {
    return (
        //<h1 className='text-7xl text-center text-blue-400'>Hello World</h1>
        <div className='App'>
            <Navbar />
            <div className='content'>
                <h2 className='text-4xl font-bold'>Create</h2>
                <Form />
            </div>
        </div>
    
    );
}

export default App;
