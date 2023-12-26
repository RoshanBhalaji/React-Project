import { useState } from 'react';

function App() {
  const [options, setOptions] = useState({
    length: 10,
    uppercase: false,
    lowercase: false,
    number: false,
    symbols: false,
    isError: false,
  });

  const [generatedPassword, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleLengthChange = ({ target: { value } }) => {
    const newLength = parseInt(value);
    if (!isNaN(newLength)) {
      setOptions({ ...options, length: newLength });
    }
  };

  const handleCheckboxChange = (option) => {
    setOptions({ ...options, [option]: !options[option] });
  };

  const isAtLeastOneOptionSelected = () => {
    return Object.values(options).includes(true);
  };
  
  const generatePassword = () => {
    if (!isAtLeastOneOptionSelected()) {
      setErrorMessage('Please select at least one option.');
      setPassword('');
      return;
    }

    // Logic to generate the password based on selected options
    let characterSet = '';
    const lowercaseChars = 'abcdefghijklmnopqrstuvwxyz';
    const uppercaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const numberChars = '0123456789';
    const symbolsChars = '!@#$%^&*()_+{}[]:"<>?,./';

    if (options.lowercase) {
      characterSet += lowercaseChars;
    }
    if (options.uppercase) {
      characterSet += uppercaseChars;
    }
    if (options.number) {
      characterSet += numberChars;
    }
    if (options.symbols) {
      characterSet += symbolsChars;
    }

    let newPassword = '';
    for (let i = 0; i < options.length; i++) {
      const randomIndex = Math.floor(Math.random() * characterSet.length);
      newPassword += characterSet.charAt(randomIndex);
    }

    setPassword(newPassword);
    setErrorMessage('');
  };
   

  return (
    <div className="App">
      <div className="container">
        <div className="card">
          <div className="card-header">
            <p className="title">Generate Random Password</p><hr></hr>
          </div>
          <div className="cardbody">
            <label>Password Length</label>
            <input
              type="text"
              value={options.length}
              onChange={handleLengthChange}
            />
            <div className="row">
              <div className="checkbox-container">
                <input
                  type="checkbox"
                  checked={options.lowercase}
                  onChange={() => handleCheckboxChange('lowercase')}
                  style={{color:options.length?'green':'red'}}
                />
                <label>Lowercase</label>
              </div>
              <div className="checkbox-container">
                <input
                  type="checkbox"
                  checked={options.uppercase}
                  onChange={() => handleCheckboxChange('uppercase')}
                />
                <label>Uppercase</label>
              </div>
              <div className="checkbox-container">
                <input
                  type="checkbox"
                  checked={options.symbols}
                  onChange={() => handleCheckboxChange('symbols')}
                  
                />
             <label>Symbols</label>

              </div>
            </div><hr />
            <button onClick={generatePassword}>Generate Password</button>
            <div className="generated-password" style={{marginTop:'5px'}}>
              <label>Generated Password:</label>
              <p style={{ color: 'green' }}>{generatedPassword}</p>

            </div>
                <b>{errorMessage && (
             <p className="error-message" style={{ color:'red' }}>
            {errorMessage}
  </p>
)}</b> 

          </div>
        </div>
        <span id="logo"><i>Developed by Roshan</i>  </span>
      </div>
      
    </div>
  );
}

export default App;
