import React from "react";

const SigninInput = ({ type, text, name, autocomplete, handleChange }) => {
  return (
    <div className="signup-input-box">
      <div className="signup-input-container">
        <div className="signup-input-text">{text}</div>
        <input type={type} name={name} autoComplete={autocomplete} onChange={(e) => handleChange(e, name)}/>
      </div>
    </div>
  );
};

export default SigninInput;
