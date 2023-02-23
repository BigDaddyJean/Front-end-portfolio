import axios from "axios";
import React, { useState } from "react";

export default function NewMovie() {
  const initialState = { name: "", rating: 0, image: "", description: "" };
  const [state, setState] = useState({ ...initialState });
  const [status, setStatus] = useState("");
  const updateValue = (field, value) => {
    setState({ ...state, [field]: value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("loading");
    try {
      await axios.post("/movies", state);
      setStatus("success");
      setState({...initialState})
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="container">
      <h1>Create A New Movie</h1>
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
          {status === "loading" ? "submitting..." : "Submit"}
        </button>
      </form>
      {status==="success" && <p className="green">Successully Created A New Movie</p>}
      {status==="error" && <p className="red">Couldn't Create A new Movie</p>}
    </div>
  );
}
