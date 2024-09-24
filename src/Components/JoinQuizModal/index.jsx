import './index.css'
import React, { useState } from 'react';

const JoinQuizModal = ({ onClose, onSubmit, error, success }) => {
  const [accessKey, setAccessKey] = useState('');

  const handleSubmit = () => {
    onSubmit(accessKey)
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="close-button" onClick={onClose}>
          &times;
        </button>
        <div className="modal-body">
          <input
            type="text"
            value={accessKey}
            onChange={(e) => setAccessKey(e.target.value)}
            placeholder="Enter access key"
            className="modal-input"
          />
          {error && <p className="error">{error}</p>}
          {success && !error && <p className="success">{success}</p>}
          <button onClick={handleSubmit} className="submit-button">
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default JoinQuizModal;