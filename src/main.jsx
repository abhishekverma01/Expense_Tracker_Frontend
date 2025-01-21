// import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {BrowserRouter as Router,Routes, Route} from 'react-router-dom';
import './index.css';
import App from './App.jsx';
import AddExpense from './components/AddExpense.jsx';
import UpdateExpense from './components/UpdateExpense.jsx';

const root = createRoot(document.getElementById('root'));

root.render(
  <Router>
      <Routes>
        <Route path='/' element={<App />}/>
        <Route path='/expense/new' element={<AddExpense />}/>
        <Route path='/expense/update/:id' element={<UpdateExpense />}/>
      </Routes>
  </Router>
)
