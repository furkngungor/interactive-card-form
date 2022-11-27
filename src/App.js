import React, {useState} from "react";
import "./style.css"
import cardLogo from "./images/card-logo.svg";
import completeLogo from "./images/icon-complete.svg";

function App() {
  const [error, setError] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [card, setCard] = useState({
    name: "Furkan Güngör",
    number: "0000000000000000",
    cvc: "000",
    mm: "00",
    yy: "00"
  });

  const errorMessage = document.getElementsByClassName("error-message");
  const error1 = document.getElementsByClassName("error1")[0];
  const error2 = document.getElementsByClassName("error2")[0];
  const error3 = document.getElementsByClassName("error3")[0];
  const error4 = document.getElementsByClassName("error4")[0];
  const error5 = document.getElementsByClassName("error5")[0];

  const year = new Date().getFullYear() - 2000;

  function handleChange(event) {
    const {name, value} = event.target;
    
    setCard(prevValue => {
      if (name === "name") {
        return {...prevValue, name: value};
      } else if (name === "number") {
        return {...prevValue, number: value};
      } else if (name === "cvc") {
        return {...prevValue, cvc: value};
      } else if (name === "mm") {
        return {...prevValue, mm: value};
      } else if (name === "yy") {
        return {...prevValue, yy: value};
      }
    });
  }

  function setConfirmed(event) {
    if (isConfirmed === false) {
      if (error === true) {
        document.querySelector("#myForm").reset();
        alert("Please enter your card information correctly.");
      } else if (error === false) {
        setIsConfirmed(true);
      }
    } else if (isConfirmed === true) {
      setIsConfirmed(false);
    } 
  }

  function showError(event) {
    const {name, value, style} = event.target;
    if (value !== "") {
      style.borderColor = "#6448fe";
        if (name === "name") {
          if (!isAlphabet(value)) {
            style.borderColor = "red";
            error1.innerHTML = "Wrong format."
          } 
          else {
            error1.innerHTML = "";
          }
      } else if (name === "number") {
        if (isNaN(Number(value))) {
          style.borderColor = "red";
          error2.innerHTML = "Wrong format.";
        } else {
          error2.innerHTML = "";
        }
      } else if (name === "mm") {
        if (isNaN(Number(value))) {
          style.borderColor = "red";
          error3.innerHTML = "Wrong format.";
        } else if (value > 12) {
          style.borderColor = "red";
          error3.innerHTML = "Month cannot be greater than 12.";
        } else {
          error3.innerHTML = "";
        } 
        
      } else if (name === "yy") {
        if (isNaN(Number(value))) {
          style.borderColor = "red";
          error4.innerHTML = "Wrong format.";
        } else if (year > value) {
          style.borderColor = "red";
          error4.innerHTML = "Credit card has expired.";
        } else {
          error4.innerHTML = "";
        }

        
      } else if (name === "cvc") {
        if (isNaN(Number(value))) {
          style.borderColor = "red";
          error5.innerHTML = "Wrong format.";
        } else {
          error5.innerHTML = "";
        }
      }
        
    } else if (value === "") {
      style.borderColor = "red";
      setError(true);
      if (name === "name") {
        error1.innerHTML = "Can't be blank.";
      } else if (name === "number") {
        error2.innerHTML = "Can't be blank.";
      } else if (name === "mm") {
        error3.innerHTML = "Can't be blank.";
      } else if (name === "yy") {
        error4.innerHTML = "Can't be blank.";
      } else if (name === "cvc") {
        error5.innerHTML = "Can't be blank.";
      }
    } 
    for (let index = 0; index < errorMessage.length; index++) {
      if (errorMessage[index].innerHTML === "Can't be blank." || errorMessage[index].innerHTML === "Wrong format."
        || errorMessage[index].innerHTML === "Month cannot be greater than 12." || 
        errorMessage[index].innerHTML === "Credit card has expired.") 
      {
       setError(true);
       break; 
      } else {
        setError(false);
      }
    }
  }

  function isAlphabet(str) {
    let char = str.split("");
  
    if (
      char.some(
        (c) =>
          c.charCodeAt() < 65 &&
          c.charCodeAt() !== 32 &&
          c.charCodeAt() !== 39 &&
          c.charCodeAt() !== 47
      )
    ) {
      return false;
    } else if (
      char.some(
        (c) => c.charCodeAt() > 90 && c.charCodeAt() < 97 && c.charCodeAt() > 122
      )
    ) {
      return false;
    }
    return true;
  }

  return (
    <div className="App">
      <main className="Main">
        <div className="card-section">
          <div className="cards">
            <div className="card-back">
              <p>{card.cvc}</p>
            </div>
            <div className="card-front">
              <img src={cardLogo} alt="logo" />
              <h5>{card.number.slice(0,4)+" "+card.number.slice(4,8)+" "+card.number.slice(8,12)+" "+card.number.slice(12,16)}</h5>
              <div>
                <p>{card.name}</p>
                <p>{card.mm}/{card.yy}</p>
              </div>
            </div>
          </div>
        </div>
          
        <div className="form-section">
        
         {!isConfirmed && 
         
         <form autoComplete="off" onSubmit={setConfirmed} id="myForm">
            <label htmlFor="name">CARDHOLDER NAME</label>
            <input type="text" name="name" id="name" placeholder="e.g. Jane Appleseed" onChange={(event) => {handleChange(event); showError(event)}} 
            title="Just letters." maxLength="25" required />
            <p className="error-message error1"></p>
            <label htmlFor="cardnumber">CARD NUMBER</label>
            <input type="text" name="number" id="number" placeholder="e.g. 1234 5678 9123 0000" minLength="16" maxLength="16" onChange={(event) => {handleChange(event);showError(event)}} required />
            <p className="error-message error2"></p>
            <div className="card-info">
              <div>
                <label htmlFor="mm">EXP. DATE</label>
                <input type="text" name="mm" id="mm" placeholder="MM" minLength="2" maxLength="2" onChange={(event) => {handleChange(event);showError(event)}} required />
                <p className="error-message error3"></p>
              </div>
              <div>
                <label htmlFor="yy">(MM/YY)</label>
                <input type="text" name="yy" id="yy" placeholder="YY" minLength="2" maxLength="2" onChange={(event) => {handleChange(event);showError(event)}} required />
                <p className="error-message error4"></p>
              </div>
              <div>
                <label htmlFor="cvc">CVC</label>
                <input type="text" name="cvc" id="cvc" placeholder="e.g. 123" minLength="3" maxLength="3" onChange={(event) => {handleChange(event);showError(event)}} required />  
                <p className="error-message error5"></p>
              </div>
            </div>
            <button type="submit" className="confirm-button">Confirm</button>
          </form> 
          }

          {isConfirmed &&
            <div className="confirmed">
              <img src={completeLogo} alt="complete"></img>
              <h2>Thank you</h2>
              <p>We've added your card details.</p>
              <button type="submit" className="confirm-button" onClick={setConfirmed}>Continue</button>
            </div>
          }
        </div>
      </main>
    </div>
  );
}

export default App;
