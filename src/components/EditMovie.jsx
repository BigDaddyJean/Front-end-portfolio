import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function EditMovie() {
  const {id} = useParams();
  const initialState = { name: "", rating: 0, image: "", description: "" };
  const [state, setState] = useState({ ...initialState });
  const [status, setStatus] = useState("");
  const updateValue = (field, value) => {
    setState({ ...state, [field]: value });
  };

  const getMovie = async () => {
    try {
      const movie = await axios.get(`/movies/${id}`);
      setState(movie.data);
    } catch(err) {
      console.error(err)
    }
  }

  useEffect(() => {
    if (id) getMovie();
  }, [id])

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("loading");
    try {
      await axios.put(`/movies/${id}`, state);
      setStatus("success");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container">
      <h1>Update A Movie</h1>
      <form onSubmit={handleSubmit} className="form">
        <label>Name</label>
        <input
          type="text"
          value={state.name}
          id="name"
          onChange={(e) => updateValue(e.target.id, e.target.value)}
        />
        <label>Rating</label>
        <input
          type="number"
          step={0.1}
          value={state.rating}
          id="rating"
          onChange={(e) => updateValue(e.target.id , e.target.value)}
        />
        <label>image</label>
        <input
          type="text"
          value={state.image}
          id="image"
          onChange={(e) => updateValue(e.target.id , e.target.value)}
        />
        <label>Description</label>
        <textarea
          value={state.description}
          id="description"
          onChange={(e) => updateValue(e.target.id, e.target.value)}
        ></textarea>
        <button disabled={status == "loading"} className="btn">
          {status === "loading" ? "Updating..." : "Update"}
        </button>
      </form>
      {status==="success" && <p className="green">Successully Updated the movie</p>}
      {status==="error" && <p className="red">Couldn't update it</p>}
    </div>
  );
}
