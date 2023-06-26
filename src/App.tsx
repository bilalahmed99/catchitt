import { useState } from 'react';
import classNames from 'classnames';
import styles from './App.module.scss';
import { Authentication } from './components/authentication/authentication';
import { ForgotPassword } from './components/forgot-password/forgot-password';
import { SetNewPassword } from './components/set-newPassword/set-newPassword';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
    return (
        <div className={styles.App}>
            <Router>
                <Routes>
                    <Route path="/" element={<Authentication />} />
                    <Route path="/auth" element={<Authentication />} />
                    <Route path="/forgot-password" element={<ForgotPassword />} />
                    <Route path="/set-newpassword" element={<SetNewPassword />} />
                </Routes>
            </Router>
        </div>
    );
}

export default App;
