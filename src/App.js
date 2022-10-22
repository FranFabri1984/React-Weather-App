import { BrowserRouter, Routes, Route } from 'react-router-dom';
import WelcomePage from './Pages/WelcomePage';
import MainPage from './Pages/MainPage';
import CityPage from './Pages/CityPage';
import NotFoundPage from './Pages/NotFoundPage';
import 'typeface-roboto'
import './App.css';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<WelcomePage />} />

        <Route path="/main" element={<MainPage />} />

        <Route path="/city/:countryCode/:city/:country" element={<CityPage />} />

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
