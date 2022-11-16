import './App.css';
import { Header } from './components/Header';
import { Main } from './components/Main';
import toast, { Toaster } from 'react-hot-toast'

function App() {
  return (
    <>
      <Header />
      <Main />
      <Toaster position="bottom-right"/>
    </>
  );
}

export default App;
