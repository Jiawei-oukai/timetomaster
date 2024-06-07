import React, { useState, useEffect } from 'react';
import styles from './signUpForm.module.scss';

interface SignUpFormProps {
  onClose: () => void;
}

const SignUpForm: React.FC<SignUpFormProps> = ({ onClose }) => {
  const [username, setUsername] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [isPasswordMatch, setIsPasswordMatch] = useState<boolean>(false);
  const [isEmailValid, setIsEmailValid] = useState<boolean>(true);
  const [isEmailTouched, setIsEmailTouched] = useState<boolean>(false);
  const [isFormValid, setIsFormValid] = useState<boolean>(false);

  useEffect(() => {
    setIsPasswordMatch(password === confirmPassword);
  }, [password, confirmPassword]);

  useEffect(() => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setIsEmailValid(emailRegex.test(email));
  }, [email]);

  useEffect(() => {
    setIsFormValid(
      username !== '' &&
      email !== '' &&
      password !== '' &&
      confirmPassword !== '' &&
      isPasswordMatch &&
      isEmailValid
    );
  }, [username, email, password, confirmPassword, isPasswordMatch, isEmailValid]);

  const handleSignUp = () => {
    if (isFormValid) {
      // Handle sign-up logic
      console.log('Sign up:', { username, email, password });
      onClose(); // Close form after sign-up
    }
  };

  return (
    <div className={styles.pageContainer}>
      <div className={styles.signUpContainer}>
        <div className={styles.signUpForm}>
          <div className={styles.inputContainer}>
            <label htmlFor="username" className={styles.label}>User Name:</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className={styles.input}
            />
          </div>
          <div className={styles.inputContainer}>
            <label htmlFor="email" className={styles.label}>Email:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setIsEmailTouched(true);
              }}
              className={styles.input}
            />
            {!isEmailValid && isEmailTouched && (
              <div className={styles.error}>Invalid email format!</div>
            )}
          </div>
          <div className={styles.inputContainer}>
            <label htmlFor="password" className={styles.label}>Password:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={styles.input}
            />
          </div>
          <div className={styles.inputContainer}>
            <label htmlFor="confirmPassword" className={styles.label}>Confirm Password:</label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className={styles.input}
            />
            {!isPasswordMatch && confirmPassword && (
              <div className={styles.error}>Passwords do not match!</div>
            )}
          </div>
          <button onClick={handleSignUp} className={styles.button} disabled={!isFormValid}>Sign Up</button>
          <button onClick={onClose} className={`${styles.button} ${styles.cancelButton}`}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default SignUpForm;
