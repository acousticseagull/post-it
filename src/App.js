import React, { useState, useEffect } from "react";
import Note from "./Note";
import "./style.css";

function uuidv4() {
  return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
    (
      c ^
      (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
    ).toString(16)
  );
}

export default function App() {
  const pallette = [
    "#FFCDD2",
    "#D1C4E9",
    "#BBDEFB",
    "#B2EBF2",
    "#B2DFDB",
    "#C8E6C9",
    "#FFECB3",
    "#FFE0B2",
    "#D7CCC8",
    "#CFD8DC"
  ];
  const [notes, setNotes] = useState([]);

  const create = () => {
    setNotes(s => [
      ...s,
      {
        key: uuidv4(),
        content: "",
        swatch: Math.floor(Math.random() * pallette.length)
      }
    ]);
  };

  const trash = (e, item) => {
    if (notes.length == 1) return;
    setNotes(s => s.filter(i => i.key != item.key));
  };

  useEffect(() => {
    let storage = JSON.parse(localStorage.getItem("notes") || []);
    if (!storage.length) create();
    else setNotes(storage);
  }, []);

  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  const edit = item => {
    setNotes(s => s.map(i => (i.key == item.key ? item : i)));
  };

  return (
    <div className="App">
      <div className="board">
        {notes.map(item => (
          <Note
            key={item.key}
            item={item}
            pallette={pallette}
            edit={edit}
            create={create}
            trash={e => trash(e, item)}
          />
        ))}
      </div>
    </div>
  );
}
