import React from 'react';
import ReactDOM from 'react-dom';
//import ReactDOM from 'react-dom/client';

//import RootComponent from './App';
import App from './App';
// import { createRoot } from 'react-dom/client';

// // Clear the existing HTML content
// document.body.innerHTML = '<div id="app"></div>';

// // Render your React component instead
// const root = createRoot(document.getElementById('app'));
// //root.render(<h1>Hello, world</h1>);

ReactDOM.render(
    <React.StrictMode>
        <App />
        </React.StrictMode>,
        document.getElementById('root')
);

// const root = ReactDOM.createRoot(document.getElementById("root"));
// root.render(<RootComponent />);