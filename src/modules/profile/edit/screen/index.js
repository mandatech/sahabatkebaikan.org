import { useState, useEffect } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import ButtonBase from '@material-ui/core/ButtonBase';
import CircularProgress from '@material-ui/core/CircularProgress';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';
import BackIcon from '@material-ui/icons/ChevronLeft';
import PhotoCameraIcon from '@material-ui/icons/PhotoCamera';
import { Field, Form, Formik } from 'formik';
import { TextField as FormikTextField } from 'formik-material-ui';
import { useRouter } from 'next/router';
import { updateProfile } from 'services/auth.service';
import Loading from 'components/Loading';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: 16,
    background: theme.palette.background.paper,
  },
  form: {
    marginTop: 16,
    '& > *': {
      margin: '8px 0',
    },
  },
  avatarContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
    position: 'relative',
  },
  avatar: {
    width: 115,
    height: 115,
  },
  changeAvatar: {
    background: '#6A6A6A',
    padding: 8,
    borderRadius: '50%',
    position: 'absolute',
    bottom: 0,
    cursor: 'pointer',
  },
  inputImage: {
    display: 'none',
  },
}));

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const TextField = (props) => (
  <FormikTextField variant="standard" fullWidth {...props} />
);

const EditProfile = () => {
  const classes = useStyles();
  const router = useRouter();
  const [profile, setProfile] = useState('');
  const [openAlert, setOpenAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertSeverity, setAlertSeverity] = useState('info');
  const [isLoading, setIsLoading] = useState(false);
  const [newProfilePhoto, setNewProfilePhoto] = useState({
    url: null,
    file: null,
  });

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
    if (localStorage.getItem('token') && localStorage.getItem('data_login')) {
      const dataLogin = JSON.parse(localStorage.getItem('data_login'));
      setProfile(dataLogin.user);
    } else {
      router.push('/login?redirect=/profil');
    }
  }, []);

  const handleUpdateProfile = async (values, { setSubmitting }) => {
    try {
      setIsLoading(true);
      const bodyRequest = {
        full_name: values.full_name,
        phone: values.phone,
      };

      if (newProfilePhoto.file) {
        bodyRequest.profile_photo = newProfilePhoto.file;
      }

      const data = await updateProfile(profile.id, bodyRequest);
      const data_login = JSON.parse(localStorage.getItem('data_login'));

      data_login.user = data;

      localStorage.setItem('data_login', JSON.stringify(data_login));

      setAlertSeverity('info');
      setAlertMessage('Profil berhasil diperbarui.');
      setOpenAlert(true);
      setSubmitting(false);
      setIsLoading(false);

      setTimeout(() => {
        router.replace('/profil');
      }, [1200]);
    } catch (error) {
      setOpenAlert(true);
      console.log('error', error);
      setIsLoading(false);
      setSubmitting(false);
      setOpenAlert(true);
      setAlertSeverity('error');
      if (error.response) {
        console.log(error.response.data);
        setAlertMessage(error.response.data.message);
      } else if (error.request) {
        console.log(error.request);
        setAlertMessage('Network Error');
      } else {
        console.log('Error', error.message);
        setAlertMessage(error.message);
      }
    }
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenAlert(false);
  };

  const handleUploadClick = (event) => {
    const file = event.target.files[0];
    const url = URL.createObjectURL(file);

    setProfile({
      ...profile,
      profile_photo: url,
    });
    setNewProfilePhoto({
      url,
      file,
    });
  };

  return (
    <Box className={classes.root}>
      {profile && (
        <>
          <Box display="flex" justifyContent="space-between">
            <Box>
              <ButtonBase onClick={() => router.back()}>
                <BackIcon color="primary" />
              </ButtonBase>
            </Box>
            <Box className={classes.avatarContainer}>
              <Avatar
                alt="Avatar"
                src={profile.profile_photo}
                // src={newProfilePhoto.url}
                className={classes.avatar}
              />
              <ButtonBase className={classes.changeAvatar}>
                <input
                  accept="image/*"
                  className={classes.inputImage}
                  id="input-image"
                  type="file"
                  onChange={handleUploadClick}
                />
                <label htmlFor="input-image">
                  <PhotoCameraIcon
                    style={{ color: 'white', cursor: 'pointer' }}
                  />
                </label>
              </ButtonBase>
            </Box>
            <Box>
              <Button color="primary" onClick={() => router.back()}>
                Batal
              </Button>
            </Box>
          </Box>
          <Formik
            initialValues={{
              full_name: profile.full_name,
              username: profile.username,
              phone: profile.phone,
              email: profile.email,
            }}
            validate={(values) => {
              const errors = {};
              const requiredFields = [
                'full_name',
                'username',
                'phone',
                'email',
              ];

              requiredFields.forEach((field) => {
                if (!values[field]) {
                  errors[field] = 'Harus diisi';
                }
              });

              if (!values.phone) {
                errors.phone = 'Harus diisi';
              }

              if (values.phone && !/^\d+$/i.test(values.phone)) {
                errors.phone = 'Nomor telepon tidak valid';
              }

              if (values.phone?.length < 8) {
                errors.phone = 'Nomor telepon tidak valid';
              }

              if (
                !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
              ) {
                errors.email = 'Alamat email tidak valid';
              }

              return errors;
            }}
            onSubmit={handleUpdateProfile}
          >
            {({ isSubmitting, submitForm }) => (
              <Form className={classes.form}>
                <Field
                  component={TextField}
                  name="full_name"
                  type="text"
                  label="Nama Lengkap"
                />
                <Field
                  component={TextField}
                  name="username"
                  type="text"
                  label="Username"
                  disabled
                />
                <Field
                  component={TextField}
                  name="phone"
                  type="text"
                  label="No Telepon"
                />
                <Field
                  component={TextField}
                  name="email"
                  type="email"
                  label="Email"
                  disabled
                />
                <Button
                  variant="contained"
                  color="secondary"
                  fullWidth
                  disabled={isSubmitting}
                  type="submit"
                  onClick={submitForm}
                >
                  {isSubmitting && (
                    <CircularProgress size={20} style={{ marginRight: 8 }} />
                  )}
                  Simpan
                </Button>
              </Form>
            )}
          </Formik>
        </>
      )}
      <Snackbar open={openAlert} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={alertSeverity}>
          {alertMessage}
        </Alert>
      </Snackbar>
      <Loading open={isLoading} onClose={() => setIsLoading(false)} />
    </Box>
  );
};

export default EditProfile;
