import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import Router from './Router/AppRouter'
import { Provider } from 'react-redux'
import { Store } from './Redux/Store/Store'
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={Store}>
    <Router/>
    </Provider>
  </StrictMode>,
)
