import React, { useState, useRef } from 'react';

const OTPInput: React.FC = () => {
  const [otp, setOtp] = useState<string[]>(Array(6).fill(''));
  const inputsRef = useRef<Array<HTMLInputElement | null>>([]);

  const handleChange = (index: number, value: string) => {
    // Ensure the input is only a digit
    if (/^\d$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      // Move focus to the next input field if the index is not the last one
      if (index < 5) {
        inputsRef.current[index + 1]?.focus();
      }
    }
  };

  const handleBackspace = (index: number, value: string) => {
    // Move focus back to the previous input if the current one is empty
    if (value === '' && index > 0) {
      const newOtp = [...otp];
      newOtp[index] = '';
      setOtp(newOtp);
      inputsRef.current[index - 1]?.focus();
    }
  };

  const handleClear = () => {
    // Clear all input fields and reset focus to the first input
    setOtp(Array(6).fill(''));
    inputsRef.current[0]?.focus();
  };

  return (
    <div className="flex flex-col items-center space-y-4">
      <div className="flex space-x-2">
        {otp.map((digit, index) => (
          <input
            key={index}
            ref={(el) => (inputsRef.current[index] = el)}
            type="text"
            maxLength={1}
            value={digit}
            onChange={(e) => handleChange(index, e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Backspace') {
                handleBackspace(index, e.currentTarget.value);
              }
            }}
            className="w-10 h-10 border-2 border-gray-300 rounded-md text-center text-lg focus:outline-none focus:border-primarycolor transition"
            disabled={index > 0 && otp[index - 1] === ''}
            autoFocus={index === 0} // Set autoFocus on the first input
          />
        ))}
      </div>

      <button
        onClick={handleClear}
        className="mt-2 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
      >
        Clear
      </button>
    </div>
  );
};

export default OTPInput;
