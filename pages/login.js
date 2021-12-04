import React, {useState} from 'react'
import { useUser } from '../lib/auth'
import LoadingButton from '@mui/lab/LoadingButton';
import { Formik, Form, Field } from 'formik'
import { TextField } from 'formik-mui';
import fetchJson, { FetchError } from '../lib/fetchJson'
import {AppBar, Box, Button, Card, Container, Grid, Tab, Tabs, Typography} from "@mui/material";
import {Alert, TabPanel} from "@mui/lab";
import {useRouter} from "next/router";

export default function Login() {
  // here we just check if user is already logged in and redirect to profile
  const { mutateUser } = useUser();
  const router = useRouter();
  const [tab, setTab] = useState(0);

  const handleTabChange = (event, newValue) => {
    setTab(newValue);
  };

  const LoginForm = () => {
    const [error, setError] = useState()

    const validateForm = (values) => {
      const errors = {};
      if (!values.email) {
        errors.email = 'Email is Required';
      } else if (
        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
      ) {
        errors.email = 'Invalid email address';
      }
      return errors;
    }

    const handleSubmit = async (values, { setSubmitting }) => {
      try {
        await mutateUser(
          await fetchJson('/api/auth/login', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(values),
          })
        )

        await router.push('/members')
      } catch (error) {
        if (error instanceof FetchError) {
          setError(error.data.message)
        } else {
          console.error('An unexpected error happened:', error)
        }
      } finally {
        setSubmitting(false);
      }
    }

    return (
      <Formik
        initialValues={{
          email: '',
          password: ''
        }}
        validate={validateForm}
        onSubmit={handleSubmit}
      >
        {({ submitForm, isSubmitting }) => (
          <Form>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography variant={"h6"}>
                  Welcome!
                </Typography>
                <Typography>
                  To preserve confidentiality, you must login to continue.
                </Typography>
              </Grid>
              { error &&
                <Grid item xs={12}>
                  <Alert severity="error">{error}</Alert>
                </Grid>
              }
              <Grid item xs={12}>
                <Field
                  component={TextField}
                  name="email"
                  type="email"
                  label="Email"
                  size="small"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <Field
                  component={TextField}
                  type="password"
                  label="Password"
                  name="password"
                  size="small"
                  fullWidth
                />
              </Grid>
              <Grid item xs={6}>
                <Button
                  variant="text"
                  color="primary"
                  fullWidth
                  disabled={isSubmitting}
                  onClick={submitForm}
                >
                  Forgot Password
                </Button>
              </Grid>
              <Grid item xs={6}>
                <LoadingButton
                  type="submit"
                  loading={isSubmitting}
                  variant="contained"
                  color="primary"
                  fullWidth
                  disabled={isSubmitting}
                  onClick={submitForm}
                >
                  Login
                </LoadingButton>
              </Grid>
            </Grid>
          </Form>
        )}
      </Formik>
    )

  }

  const RegisterForm = () => {
    const [error, setError] = useState()

    const validateForm = (values) => {
      const errors = {};
      if (!values.email) {
        errors.email = 'Email is Required';
      } else if (
        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
      ) {
        errors.email = 'Invalid email address';
      }

      if (!values.password) {
        errors.password = 'Password is required';
      } else if (values.password.length < 6) {
        errors.password = 'Password must be at least 6 characters'
      } else if (values.password !== values.confirmPassword) {
        errors.confirmPassword = 'Passwords must match!'
      }

      if (!values.name) {
        errors.name = 'Name is required';
      } else if (values.name.length < 3) {
        errors.name = 'Name must be at least 3 characters'
      } else if (!values.name.includes(" ")) {
        errors.name = 'Please enter your first and last name'
      }

      return errors;
    }

    const handleSubmit = async (values, { setSubmitting }) => {
      try {
        await mutateUser(
          await fetchJson('/api/auth/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(values),
          })
        )

        await router.push('/members')
      } catch (error) {
        if (error instanceof FetchError) {
          setError(error.data.message)
        } else {
          console.error('An unexpected error happened:', error)
        }
      } finally {
        setSubmitting(false);
      }
    }

    return (
      <Formik
        initialValues={{
          name: '',
          email: '',
          password: '',
          confirmPassword: '',
        }}
        validate={validateForm}
        onSubmit={handleSubmit}
      >
        {({ submitForm, isSubmitting }) => (
          <Form>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography variant={"h6"}>
                  Welcome!
                </Typography>
                <Typography>
                  To preserve confidentiality, registrations are open to active members.
                  Please note your membership must be verified before you will be allowed to login.
                </Typography>
              </Grid>
              { error &&
                <Grid item xs={12}>
                  <Alert severity="error">{error}</Alert>
                </Grid>
              }
              <Grid item xs={12}>
                <Field
                  component={TextField}
                  name="name"
                  type="text"
                  label="Full Name"
                  size="small"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <Field
                  component={TextField}
                  name="email"
                  type="email"
                  label="Email"
                  size="small"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <Field
                  component={TextField}
                  type="password"
                  label="Password"
                  name="password"
                  size="small"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <Field
                  component={TextField}
                  type="password"
                  label="Confirm Password"
                  name="confirmPassword"
                  size="small"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <LoadingButton
                  type="submit"
                  loading={isSubmitting}
                  variant="contained"
                  color="primary"
                  disabled={isSubmitting}
                  onClick={submitForm}
                  fullWidth
                >
                  Create Account
                </LoadingButton>
              </Grid>
            </Grid>
          </Form>
        )}
      </Formik>
    )
  }

  const TabPanel = (props) => {
    const { children, value, index, ...other } = props;

    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`full-width-tabpanel-${index}`}
        aria-labelledby={`full-width-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 3 }}>
            {children}
          </Box>
        )}
      </div>
    );
  }

  return (
    <Container sx={{display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
      <Box sx={{ maxWidth: '500px', width: '100%'}}>
        <Card>
          <AppBar position="static">
            <Tabs
              variant="fullWidth"
              textColor="inherit"
              indicatorColor="secondary"
              value={tab}
              onChange={handleTabChange}
              centered
            >
              <Tab label="Login" />
              <Tab label="Register" />
            </Tabs>
          </AppBar>
            <TabPanel value={tab} index={0}>
              <LoginForm/>
            </TabPanel>
            <TabPanel value={tab} index={1}>
              <RegisterForm/>
            </TabPanel>
        </Card>
      </Box>
    </Container>
  )
}