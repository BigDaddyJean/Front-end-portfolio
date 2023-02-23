import "./App.css";
import Home from "./components/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NewMovie from "./components/NewMovie";
import Header from "./components/Header";
import MovieDetails from "./components/MovieDetails";
import EditMovie from "./components/EditMovie";
import AddReview from "./components/AddReview";


function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Header/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/new" element={<NewMovie />} />
          <Route path="/movie/:id" element={<MovieDetails />} />
          <Route path="/movie/:id/edit" element={<EditMovie />} />
          <Route path="/review/:movie_id/new" element={<AddReview />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
  
}

export default App;
