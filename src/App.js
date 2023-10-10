import {Routes, Route} from 'react-router-dom';
import Home from './pages/Home'
import Header from './components/Header'
import Book from './pages/Book'

function App() {
  return (
    <div>
      <Header/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/book/:slug' element={<Book/>}/>
      </Routes>
    </div>
  );
}

export default App;
