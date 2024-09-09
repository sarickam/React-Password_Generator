import "./App.css";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { LC, NC, SC, UC } from "./Data/passchar";
import Button from 'react-bootstrap/Button';

function App() {
  let [uppercase, setUppercase] = useState(false);
  let [lowercase, setLowercase] = useState(false);
  let [symbols, setSymbols] = useState(false);
  let [number, setNumber] = useState(false);
  let [passwordlen, setPasswordlength] = useState(10);
  let [finalpass, setFinalpass] = useState('')

  let createPassword = () => {
    let charset = ''
    let finalpass = ''
    if (uppercase || lowercase || symbols || number) {
      if (uppercase) charset += UC;
      if (lowercase) charset += LC;
      if (symbols) charset += SC;
      if (number) charset += NC;
      for (let i = 0; i < passwordlen; i++) {
        finalpass += charset.charAt(Math.floor(Math.random() * charset.length))
      }
      setFinalpass(finalpass);
    }
    else {
      toast.error("Please Select One CheckBox....");
    }
  };


  let copypass = () => {
    if (!finalpass === 0) {
      navigator.clipboard.writeText(finalpass);
      toast.success("Password Coppied to Clipboard ")
    }
    else {
      toast.error("Kindly Generate Password First..")
    }
  }
  let clearpass = () => {
    setFinalpass('');
    toast.info("Password Cleared");
  }


  return (
    <>
      <div className="passwordBox">
        <h2>Password Generator</h2>
        <div className="passwordBoxin">
          <input type="text" readOnly disabled value={finalpass} />
          <button onClick={copypass}>Copy</button>
          <button onClick={clearpass}>Clear</button>
        </div>
        <div className="passLength">
          <label>Password Length</label>
          <input type="number" max={20} min={8} onChange={(event) => setPasswordlength(event.target.value)} />
        </div>
        <div className="passLength">
          <label>Including Uppercase Letters</label>
          <input
            type="checkbox"
            checked={uppercase}
            onChange={() => setUppercase(!uppercase)}
          />
        </div>
        <div className="passLength">
          <label>Including Lowercase Letters</label>
          <input
            type="checkbox"
            checked={lowercase}
            onChange={() => setLowercase(!lowercase)}
          />
        </div>
        <div className="passLength">
          <label>Including Numbers</label>
          <input
            type="checkbox"
            checked={number}
            onChange={() => setNumber(!number)}
          />
        </div>
        <div className="passLength">
          <label>Including Symbols</label>
          <input
            type="checkbox"
            checked={symbols}
            onChange={() => setSymbols(!symbols)}
          />
        </div>
        <button className="btn" onClick={createPassword}>
          Generate Password
        </button>
      </div>
    </>
  );
}

export default App;
