import { useContext, useState } from 'react';
import { UserContext } from '../context/UserContext';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Link, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useTranslation } from 'react-i18next';

const theme = createTheme();

const validationSchema = yup.object({
  email: yup
    .string('Enter you mail')
    .email('Enter valid mail')
    .required('Email is required'),
  password: yup.string('Enter your password').required('Password is required'),
});

const Login = () => {
  const { user, setOpenBar } = useContext(UserContext);
  const navigate = useNavigate();
  const [errorFormE, setErrorFormE] = useState(false);
  const [errorFormP, setErrorFormP] = useState(false);
  const { t } = useTranslation();



  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema,
    onSubmit: async (values) => {
      const authorizationEmail = user.find(
        (user) => user.email === values.email
      );
      const authorizationPass = user.find(
        (user) => user.password === values.password
      );

      if (!authorizationEmail) {
        setErrorFormE(true);
      } else {
        setErrorFormE(false);
      }
      if (!authorizationPass) {
        setErrorFormP(true);
      } else {
        setErrorFormP(false);
      }

      if (authorizationEmail && authorizationPass) {
        setOpenBar(true);
        navigate('/home')
      }
    },
  });

  return (
    <div>
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
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component='h1' variant='h5'>
              {t('SignIn.1')}
            </Typography>
            <Box
              component='form'
              onSubmit={formik.handleSubmit}
              noValidate
              sx={{ mt: 1 }}
            >
              <TextField
                id='email'
                name='email'
                label={t('SignIn.2')}
                value={formik.values.email}
                onChange={formik.handleChange}
                error={
                  errorFormE ||
                  (formik.touched.email && Boolean(formik.errors.email))
                }
                helperText={formik.touched.email && formik.errors.email}
                margin='normal'
                required
                fullWidth
                autoComplete='email'
                autoFocus
              />
              <TextField
                id='password'
                name='password'
                label={t('SignIn.3')}
                value={formik.values.password}
                onChange={formik.handleChange}
                error={
                  errorFormP ||
                  (formik.touched.password && Boolean(formik.errors.password))
                }
                helperText={formik.touched.password && formik.errors.password}
                margin='normal'
                required
                fullWidth
                type='password'
                autoComplete='current-password'
              />

              <Button
                type='submit'
                fullWidth
                variant='contained'
                sx={{ mt: 3, mb: 2 }}
              >
                {t('SignIn.1')}
              </Button>
              <Grid container>
                <Grid item>
                  <Link to={'/signup'}>{t('SignIn.4')}</Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
    </div>
  );
};

export default Login;
