import { createRoot } from 'react-dom/client'
import { GlobalDataProvider } from './global';
import App from './App';
import './global.css';


createRoot(document.getElementById('root')).render(
    <GlobalDataProvider>
        <App />
    </GlobalDataProvider>,
)
