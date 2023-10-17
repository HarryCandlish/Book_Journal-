import {Routes, Route} from 'react-router-dom';
import Home from './pages/Home'
import Header from './components/Header'
import Book from './pages/Book'
import CreateBookForm from './pages/CreateBookForm';
import EditBookForm from './pages/EditBookForm';

function App() {
  return (
    <div>
      <Header/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/book/:slug' element={<Book/>}/>
        <Route path='/create-book' element={<CreateBookForm/>}/>
        <Route path="/edit-book/:bookId" element={<EditBookForm />} />
    </Routes>
    </div>
  );
}

export default App;
