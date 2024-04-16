import React, { useState } from 'react';

const Freedom = () => {
  const [currentScreen, setCurrentScreen] = useState('home');
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });

  const [formDataHistory, setFormDataHistory] = useState([]);
  const [formDataIndex, setFormDataIndex] = useState(-1);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));

    // Save the new form data state to history
    const newFormDataHistory = formDataHistory.slice(0, formDataIndex + 1);
    setFormDataHistory([...newFormDataHistory, { ...formData }]);
    setFormDataIndex(formDataIndex + 1);
  };

  const handleNextScreen = () => {
    // Add logic to validate form data before proceeding to the next screen
    setCurrentScreen('confirmation');
  };

  const handlePreviousScreen = () => {
    setCurrentScreen('home');
  };

  const handleCancel = () => {
    setCurrentScreen('home');
    // Reset form data if the user cancels their action
    setFormData({
      username: '',
      email: '',
      password: '',
    });
  };

  const handleUndo = () => {
    if (formDataIndex > 0) {
      const previousFormData = formDataHistory[formDataIndex - 1];
      setFormData(previousFormData);
      setFormDataIndex(formDataIndex - 1);
    }
  };

  const handleRedo = () => {
    if (formDataIndex < formDataHistory.length - 1) {
      const nextFormData = formDataHistory[formDataIndex + 1];
      setFormData(nextFormData);
      setFormDataIndex(formDataIndex + 1);
    }
  };

  return (
    <div className="container">
      {currentScreen === 'home' && (
        <div style={styles.screen}>
          <h1>Welcome to our Application</h1>
          <button style={styles.button} onClick={() => setCurrentScreen('form')}>Start</button>
        </div>
      )}

      {currentScreen === 'form' && (
        <div style={styles.screen}>
          <h2>Registration Form</h2>
          <form>
            <div style={styles.inputContainer}>
              <label style={styles.label}>Username:</label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleInputChange}
                style={styles.input}
              />
            </div>
            <div style={styles.inputContainer}>
              <label style={styles.label}>Email:</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                style={styles.input}
              />
            </div>
            <div style={styles.inputContainer}>
              <label style={styles.label}>Password:</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                style={styles.input}
              />
            </div>
          </form>
          <button style={styles.button} onClick={handleNextScreen}>Next</button>
          <button style={styles.button} onClick={handleCancel}>Cancel</button>
          <button style={styles.button} onClick={handleUndo}>Undo</button>
          <button style={styles.button} onClick={handleRedo}>Redo</button>
        </div>
      )}

      {currentScreen === 'confirmation' && (
        <div style={styles.screen}>
          <h2>Confirmation</h2>
          <p>Username: {formData.username}</p>
          <p>Email: {formData.email}</p>
          <p>Password: {formData.password}</p>
          <button style={styles.button} onClick={handlePreviousScreen}>Previous</button>
          <button style={styles.button} onClick={handleCancel}>Cancel</button>
          <button style={styles.button} onClick={handleUndo}>Undo</button>
          <button style={styles.button} onClick={handleRedo}>Redo</button>
        </div>
      )}
    </div>
  );
};

const styles = {
  screen: {
    textAlign: 'center',
    marginTop: '50px',
  },
  inputContainer: {
    marginBottom: '20px',
  },
  label: {
    marginRight: '10px',
  },
  input: {
    padding: '5px',
    borderRadius: '5px',
    border: '1px solid #ccc',
  },
  button: {
    margin: '0 5px',
    padding: '10px 20px',
    borderRadius: '5px',
    cursor: 'pointer',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
  },
};

export default Freedom;




