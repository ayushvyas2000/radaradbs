import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import 'normalize.css'
import './index.css'
import { RadarProvider } from './RadarContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RadarProvider>
    <App />
    </RadarProvider>
  </React.StrictMode>,
)
