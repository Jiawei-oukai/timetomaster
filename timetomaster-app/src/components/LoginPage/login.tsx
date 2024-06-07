import React, { useState } from 'react';
import styles from './login.module.scss';
import SignUpForm from './components/signUpForm'; // 导入SignUpForm组件
import { useAuth } from '@/app/AuthContext';
import { useNavigate } from 'react-router-dom';
import MainPage from '../MainPage/mainPage';

const LoginPage: React.FC = () => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [showSignUp, setShowSignUp] = useState<boolean>(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = () => {
    // 处理登录逻辑
    console.log('Sign in:', { username, password });
    if (username && password) {
      login();
      navigate('/home');
    }
  };

  const handleRegister = () => {
    // 显示注册表单
    setShowSignUp(true);
  };

  const handleCloseSignUp = () => {
    // 关闭注册表单
    setShowSignUp(false);
  };

  return (
    <div className={styles.pageContainer}>
      <div className={styles.loginContainer}>
        {showSignUp ? (
          <SignUpForm onClose={handleCloseSignUp} /> // 传递关闭注册表单的函数
        ) : (
          <div className={styles.loginForm}>
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
              <label htmlFor="password" className={styles.label}>Password:</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={styles.input}
              />
            </div>
            <button onClick={handleLogin} className={styles.button}>Sign In</button>
            <button onClick={handleRegister} className={`${styles.button} ${styles.registerButton}`}>Sign Up</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default LoginPage;
