import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage'
import RoutinesPage from './pages/RoutinesPage';
import NavBar from "./pages/NavBar";
import { AuthProvider } from './firebase/Auth';
function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/authorization' element={<LoginPage />} />
          <Route path='/routine' element={<RoutinesPage />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
