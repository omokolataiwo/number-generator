import React from 'react';

const PhoneNumberGenerator = ({onInputFieldChange, onGenerateNumber}) => {
  return (
    <div>
      <input
        type="text"
        name="numberCount"
        placeholder="Number of phone number"
        onChange={e => onInputFieldChange(e)}
      />
      <button onClick={onGenerateNumber}>Generate</button>
    </div>
  );
};

export default PhoneNumberGenerator;

