import { useState, useEffect } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import ButtonBase from '@material-ui/core/ButtonBase';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';
import BackIcon from '@material-ui/icons/ChevronLeft';
import PhotoCameraIcon from '@material-ui/icons/PhotoCamera';
import { Field, Form, Formik } from 'formik';
import { TextField as FormikTextField } from 'formik-material-ui';
import { useRouter } from 'next/router';
import { updateProfile } from 'services/auth.service';
import Loading from 'components/Loading';
import { useAuth } from 'libs/auth-context';
import { useToast } from 'libs/toast';

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
  },
  inputImage: {
    display: 'none',
  },
}));

const TextField = (props) => (
  <FormikTextField variant="standard" fullWidth {...props} />
);

const EditProfile = () => {
  const classes = useStyles();
  const router = useRouter();
  const toast = useToast();
  const { dataLogin, updateDataLogin } = useAuth();
  const [profile, setProfile] = useState('');
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
    if (dataLogin) {
      setProfile(dataLogin.user);
    } else {
      router.push('/login?redirect=/profil');
    }
  }, [dataLogin]);

  const handleUpdateProfile = async (values, { setSubmitting }) => {
    try {
      setIsLoading(true);
      const data = await updateProfile(profile.id, {
        full_name: values.full_name,
        phone: values.phone,
        profile_photo: newProfilePhoto.file,
      });

      const newDataLogin = {
        ...dataLogin,
        user: data,
      };
      updateDataLogin(newDataLogin);

      toast.showMessage('Profil berhasil diperbarui.');

      setSubmitting(false);
      setIsLoading(false);

      setTimeout(() => {
        router.replace('/profil');
      }, [600]);
    } catch (error) {
      setIsLoading(false);
      if (error.response) {
        console.log(error.response.data);
        toast.showMessage(error.response.data.message, 'error');
      } else if (error.request) {
        console.log(error.request);
        toast.showMessage('Network Error', 'error');
      } else {
        console.log('Error', error.message);
        toast.showMessage(error.message, 'error');
      }
    }
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
                className={classes.avatar}
              />
              <input
                accept="image/*"
                className={classes.inputImage}
                id="input-image"
                type="file"
                onChange={handleUploadClick}
              />
              <ButtonBase className={classes.changeAvatar}>
                <label htmlFor="input-image">
                  <PhotoCameraIcon style={{ color: 'white' }} />
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
      <Loading open={isLoading} onClose={() => setIsLoading(false)} />
    </Box>
  );
};

export default EditProfile;
