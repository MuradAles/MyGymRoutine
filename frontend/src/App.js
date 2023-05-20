import { BrowserRouter, Route, Routes, Redirect } from "react-router-dom";
import Homepage from './pages/HomePage';
import RoutinesPage from './pages/RoutinesPage';
import { AuthProvider } from './firebase/Auth';


function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Homepage />} />
          <Route path='/routine' element={<RoutinesPage />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
