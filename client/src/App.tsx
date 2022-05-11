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

// Store
import store from './store';

type Props = {}

const App = (props: Props) => {

  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Notes />} />
          <Route path='/:noteId' element={<Note />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  )
}

export default App;