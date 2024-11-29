import React, { useState } from 'react';
import { Button, Dialog, DialogContent, DialogTitle, TextField, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import welcomeImg from '../../assets/images/welcomeImg.png'
import { useUser } from '../../context/UserContext';

const Login = ({ isOpen, onClose }) => {
    const [isRegister, setIsRegister] = useState(false);

    const [formData, setFormData] = useState({ email: "", password: "", name: "" });

    const { login, register } = useUser();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isRegister) {
            register(formData);
        } else {
            login({ email: formData.email, password: formData.password });
        }
        setFormData({ email: "", password: "", name: "" });
    };
    return (
        <Dialog
            open={isOpen}
            onClose={onClose}
            maxWidth="sm"
            fullWidth
            PaperProps={{
                style: {
                    background: 'linear-gradient(135deg, #1e1e2f, #292942)',
                    borderRadius: '12px',
                    boxShadow: '0px 4px 30px rgba(0, 0, 0, 0.8)',
                },
            }}
        >
            {/* Header with Logo */}
            <DialogTitle sx={{ textAlign: 'center', paddingBottom: 0 }}>
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                >
                    <Typography
                        variant="h6"
                        noWrap
                        sx={{
                            mr: 2,
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: '#FFF',
                            textDecoration: 'none',
                            fontSize: 40
                        }}
                    >
                        CNJ
                    </Typography>
                    <h2 className="text-2xl font-extrabold text-gray-200">
                        {isRegister ? 'Join Us Today!' : 'Welcome Back'}
                    </h2>
                    <p className="text-gray-400 text-sm">
                        {isRegister
                            ? 'Create your account and start exploring.'
                            : 'Sign in to continue your journey.'}
                    </p>
                </motion.div>
            </DialogTitle>

            <DialogContent sx={{ paddingTop: '16px', minHeight: '450px' }}>
                {/* Animated Image Section */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="mb-8"
                >
                    <img
                        src={welcomeImg} // Replace with your background image
                        alt="Welcome"
                        className="rounded-lg max-h-20 mx-auto my-5 shadow-lg"
                    />
                </motion.div>

                {/* Login/Register Form */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4 }}
                >
                    <form onSubmit={handleSubmit}>
                        {isRegister && (
                            <TextField
                                label="Full Name"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                fullWidth
                                sx={{ mt: 3, borderColor: '#FFFFFF', color: '#FFFFFF' }}
                            />
                        )}
                        <TextField
                            label="Email"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            fullWidth
                            sx={{ mt: 3, borderColor: '#FFFFFF', color: '#FFFFFF' }}
                        />
                        <TextField
                            label="Password"
                            type="password"
                            value={formData.password}
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                            fullWidth
                            sx={{ mt: 3, borderColor: '#FFFFFF', color: '#FFFFFF' }}
                        />
                        <Button
                            sx={{ mt: 3 }}
                            type="submit" fullWidth variant="contained">
                            {isRegister ? "Register" : "Login"}
                        </Button>
                    </form>
                </motion.div>

                {/* Toggle Login/Register */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                    className="mt-6 text-center"
                >
                    <p className="text-sm text-gray-400">
                        {isRegister ? 'Already have an account?' : "Don't have an account?"}{' '}
                        <span
                            className="text-purple-500 cursor-pointer hover:underline"
                            onClick={() => setIsRegister(!isRegister)}
                        >
                            {isRegister ? 'Login' : 'Register'}
                        </span>
                    </p>
                </motion.div>
            </DialogContent>
        </Dialog>
    );
};

export default Login;
