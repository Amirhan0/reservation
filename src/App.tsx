import { BrowserRouter } from 'react-router-dom'
import './App.css'
import AuthForm from './pages/AuthForm'
function App() {

  return (
    <>
    <BrowserRouter>
    <AuthForm></AuthForm>
    </BrowserRouter>
    </>
  )
}

export default App
