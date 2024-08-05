import React, { useState } from 'react';
 // Make sure to include this CSS file

const AiComponent = ({ username }) => {
  const [inputValue, setInputValue] = useState('');
  const [response, setResponse] = useState('');

  const handleSubmit = () => {
    setResponse(inputValue);
    setInputValue('');
  };

  return (
    <div className="main-page">
      <div className="header">
        <h1>Welcome, {username}!</h1>
      </div>
      <div className="content">
        <div className="response-box">
          <p>{response || 'Your response will appear here.'}</p>
        </div>
      </div>
      <div className="footer">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Type your message here..."
        />
        <button onClick={handleSubmit}>Submit</button>
      </div>
    </div>
  );
};

export default AiComponent;
