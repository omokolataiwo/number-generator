import React from 'react';

const PhoneNumberGenerator = ({
  onInputFieldChange,
  onGenerateNumber,
  error,
}) => {
  return (
    <div className="generate-form">
      <p data-testid="error" className="error">{error}</p>
      <input
        type="text"
        name="numberCount"
        id="numberCount"
        placeholder="Number of phone number"
        onChange={e => onInputFieldChange(e)}
      />
      <button id="generate-btn" onClick={onGenerateNumber}>Generate</button>
    </div>
  );
};

export default PhoneNumberGenerator;
