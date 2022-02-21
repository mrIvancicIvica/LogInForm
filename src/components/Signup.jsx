import { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Link, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as yup from 'yup';
import axios from 'axios';
import {
  randFirstName,
  randLastName,
  randUserName,
  randEmail,
  randPassword,
} from '@ngneat/falso';
import {useTranslation} from 'react-i18next'

const validationSchema = yup.object({
  firstName: yup.string('Enter you name').required('Name is required'),
  lastName: yup.string('Enter you last Name').required('Last Name is required'),
  username: yup.string('Enter you username').required('Username is required'),
  email: yup
    .string('Enter you email')
    .email('Enter you email')
    .required('Email is required'),
  password: yup
    .string('Enter you password')
    .min(1, 'Password should be of minimum 5 characters length')
    .required('Password is required'),
  confirmpassword: yup
    .string('Please confirm password')
    .min(1, 'Password should be of minimum 5 characters length')
    .required('Confirmation password is required'),
});

const theme = createTheme();

const SignUp = () => {
  const [checked, setChecked] = useState(false);
  const [errorForm, setErrorForm] = useState(false);
  const {t} = useTranslation()

  const navigate = useNavigate();

  const fetchData = async () => {
    await axios('http://localhost:8000/users');
  };

  useEffect(() => {
    fetchData();
  }, []);

  const formik = useFormik({
    initialValues: {
      firstName: randFirstName(),
      lastName: randLastName(),
      username: randUserName(),
      email: randEmail(),
      password: randPassword(),
      confirmpassword: '',
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      fetchData();

      if (values.password !== values.confirmpassword) {
        alert('Passwords not match');
        setErrorForm(true);
      } else if (checked === false) {
        alert('Please check terms and conditions');
      } else {
        const user = {
          firstName: values.firstName,
          lastName: values.lastName,
          username: values.username,
          email: values.email,
          password: values.password,
        };

        await axios.post('http://localhost:8000/users', user);
        navigate('/home');
      }

      console.log(
        values.firstName,
        values.lastName,
        values.email,
        values.username,
        values.password,
        values.confirmpassword
      );
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <Container component='main' maxWidth='xs'>
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography component='h1' variant='h5'>
            {t('SignUp.8')}
          </Typography>
          <Box
            component='form'
            noValidate
            onSubmit={formik.handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  id='firstName'
                  name='firstName'
                  label={t('SignUp.1')}
                  value={formik.values.firstName}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.firstName && Boolean(formik.errors.firstName)
                  }
                  helperText={
                    formik.touched.firstName && formik.errors.firstName
                  }
                  margin='normal'
                  required
                  autoComplete='firstName'
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  id='lastName'
                  name='lastName'
                  label={t('SignUp.2')}
                  value={formik.values.lastName}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.lastName && Boolean(formik.errors.lastName)
                  }
                  helperText={formik.touched.lastName && formik.errors.lastName}
                  margin='normal'
                  required
                  autoComplete='lastName'
                  autoFocus
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id='email'
                  name='email'
                  label={t('SignUp.3')}
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  error={formik.touched.email && Boolean(formik.errors.email)}
                  helperText={formik.touched.email && formik.errors.email}
                  margin='normal'
                  required
                  autoComplete='email'
                  autoFocus
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id='username'
                  name='username'
                  label={t('SignUp.4')}
                  value={formik.values.username}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.username && Boolean(formik.errors.username)
                  }
                  helperText={formik.touched.username && formik.errors.username}
                  margin='normal'
                  required
                  autoComplete='username'
                  autoFocus
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id='password'
                  name='password'
                  label={t('SignUp.5')}
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.password && Boolean(formik.errors.password)
                  }
                  helperText={formik.touched.password && formik.errors.password}
                  type='password'
                  margin='normal'
                  required
                  autoComplete='password'
                  autoFocus
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id='confirmpassword'
                  name='confirmpassword'
                  label={t('SignUp.6')}
                  value={formik.values.confirmpassword}
                  onChange={formik.handleChange}
                  error={
                    errorForm ||
                    (formik.touched.confirmpassword &&
                      Boolean(formik.errors.confirmpassword))
                  }
                  helperText={
                    formik.touched.confirmpassword &&
                    formik.errors.confirmpassword
                  }
                  type='password'
                  margin='normal'
                  required
                  autoComplete='confirmpassword'
                  autoFocus
                />
              </Grid>
            </Grid>
            <FormControlLabel
              control={
                <Checkbox
                  checked={checked}
                  onChange={() => setChecked((value) => !value)}
                  value='remember'
                  color='primary'
                />
              }
              label={t('SignUp.7')}
            />
            <Button
              type='submit'
              fullWidth
              variant='contained'
              sx={{ mt: 3, mb: 2 }}
            >
               {t('SignUp.8')}
            </Button>
            <Grid container>
              <Grid item>
                <Link to={'/'}>{t('SignUp.9')}</Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default SignUp;
