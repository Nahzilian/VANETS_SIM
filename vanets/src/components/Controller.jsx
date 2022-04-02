import React, {useState } from "react";
import './stylesheets/Map.css';

export default function Controller() {
    const [show, setShow] = useState(true);
    //const myModal = document.getElementsByClassName('modal')
    // function handleClick() {
    //     myModal.style.display = "block";
    // }

    // function closeModal() {
    //     myModal.style.display = "none";
    // }

    // window.onclick = function(event) {
    //     if (event.target == myModal) {
    //     myModal.style.display = "none";
    //     }
    // }

    return (
      <div style={{position: 'abosolute'}} >
          <button id='car1'onClick={() => setShow((s) => !s)}>Car 1</button>
          {/* <button id='car2'onClick={handleClick}>Car 2</button>
          <button id='car3'onClick={handleClick}>Car 3</button>
          <button id='car4'onClick={handleClick}>Car 4</button>
          <button id='car5'onClick={handleClick}>Car 5</button> */}
          
        <div className="modal" style={{ visibility: show ? "visible" : "hidden" }}>
            <div className="modal-content">
                <span className="close">&times;</span>
                <p>Some text in the Modal..</p>
            </div>
        </div>
      </div>
    );
}


