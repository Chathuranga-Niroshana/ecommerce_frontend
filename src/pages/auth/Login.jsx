import React, { useEffect, useState } from 'react';
import { Button, Dialog, DialogContent, DialogTitle, TextField, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import welcomeImg from '../../assets/images/welcomeImg.png';
import { useDispatch, useSelector } from 'react-redux';
import { register, login, clearAlert } from '../../app/features/authSlice';
import { useSnackbar } from 'notistack';


const Login = ({ isOpen, onClose }) => {
    const [isRegister, setIsRegister] = useState(false);
    const dispatch = useDispatch();
    const { alert } = useSelector((state) => state.auth);
    const { enqueueSnackbar } = useSnackbar();

    useEffect(() => {
        if (alert) {
            enqueueSnackbar(alert.message, { variant: alert.type });
            if (alert.type === 'success' && alert.message === "Logged in successfully.") {
                onClose();
                window.location.reload()
            }
            dispatch(clearAlert());
        }
    }, [alert, dispatch, enqueueSnackbar, onClose, isRegister]);

    const validationSchema = Yup.object({
        name: isRegister
            ? Yup.string().required('Name is required')
            : Yup.string(),
        email: Yup.string()
            .email('Invalid email format')
            .required('Email is required'),
        password: Yup.string()
            .min(6, 'Password must be at least 6 characters long')
            .required('Password is required'),
    });

    const formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            password: '',
        },
        validationSchema,
        onSubmit: (values) => {
            if (isRegister) {
                dispatch(register(values));
                setIsRegister(false)
            } else {
                dispatch(login({ email: values.email, password: values.password }))

            }
            formik.resetForm();
        },
    });

    return (
        <Dialog
            open={isOpen}
            onClose={() => {
                onClose();
                dispatch(clearAlert());
            }}
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
            <DialogTitle sx={{ textAlign: 'center', paddingBottom: 0 }}>
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                >
                    <Typography
                        variant="h6"
                        sx={{
                            fontWeight: 700,
                            color: '#FFF',
                            fontSize: 40,
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
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="mb-8"
                >
                    <img
                        src={welcomeImg}
                        alt="Welcome"
                        className="rounded-lg max-h-20 mx-auto my-5 shadow-lg"
                    />
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4 }}
                >
                    <form onSubmit={formik.handleSubmit}>
                        {isRegister && (
                            <TextField
                                label="Full Name"
                                name="name"
                                value={formik.values.name}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                fullWidth
                                error={formik.touched.name && Boolean(formik.errors.name)}
                                helperText={formik.touched.name && formik.errors.name}
                                sx={{ mt: 3, }}
                            />
                        )}
                        <TextField
                            label="Email"
                            name="email"
                            value={formik.values.email}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            fullWidth
                            error={formik.touched.email && Boolean(formik.errors.email)}
                            helperText={formik.touched.email && formik.errors.email}
                            sx={{ mt: 3 }}
                        />
                        <TextField
                            label="Password"
                            name="password"
                            type="password"
                            value={formik.values.password}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            fullWidth
                            error={formik.touched.password && Boolean(formik.errors.password)}
                            helperText={formik.touched.password && formik.errors.password}
                            sx={{ mt: 3 }}
                        />
                        <Button sx={{ mt: 3 }} type="submit" fullWidth variant="contained">
                            {isRegister ? 'Register' : 'Login'}
                        </Button>
                    </form>
                </motion.div>

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
                    {alert && (
                        <Typography color={alert.type === 'error' ? 'error' : 'primary'}>
                            {alert.message}
                        </Typography>
                    )}
                </motion.div>
            </DialogContent>
        </Dialog>
    );
};

export default Login;
