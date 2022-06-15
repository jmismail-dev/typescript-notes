import { Provider } from 'react-redux';
import {
  BrowserRouter,
  Routes,
  Route,
  Link
} from "react-router-dom"

//  Pages
import Notes from './routes/Notes';
import Note from './routes/Note';
import AddNote from './routes/AddNote';
import EditNote from './routes/EditNote';

// Store
import store from './store';

type Props = {}

const App = (props: Props) => {

  console.log(import.meta.env)

  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Notes />} />
          <Route path='/edit/:noteId' element={<EditNote />} />
          <Route path='/:noteId' element={<Note />} />
          <Route path='/create' element={<AddNote />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  )
}

export default App;