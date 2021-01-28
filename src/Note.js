import React, { useState } from "react";

export default function Note({ item, pallette, edit, create, trash }) {
  
  const [visible, setVisible] = useState(false);

  const style = {
    backgroundColor: pallette[item.swatch]
  };

  return (
    <div className="note" style={style}>
      <div className="head">
        <div className="select">
          <button
            title="change note color"
            onFocus={() => setVisible(true)}
            onBlur={() => setVisible(false)}
          >
            v
          </button>

          {visible && (
            <div className="select-body" onMouseDown={e => e.preventDefault()}>
              {pallette.map((swatch, index) => (
                <button
                  className="swatch"
                  onClick={() => edit({ ...item, swatch: index })}
                  style={{ backgroundColor: swatch }}
                />
              ))}
            </div>
          )}
        </div>

        <button onClick={create} title="add a new note to the board">+</button>
        <button onClick={trash} title="delete this note">x</button>
      </div>
      <div
        className="content"
        contenteditable="true"
        onBlur={e => edit({ ...item, content: e.target.innerHTML })}
      >
        {item.content}
      </div>
    </div>
  );
}
