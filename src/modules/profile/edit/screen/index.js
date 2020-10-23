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

const useStyles = makeStyles((theme) => ({
  root: {
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
}));

const TextField = (props) => (
  <FormikTextField variant="standard" fullWidth {...props} />
);

const EditProfile = () => {
  const classes = useStyles();
  const router = useRouter();

  return (
    <Box className={classes.root}>
      <Box display="flex" justifyContent="space-between">
        <Box>
          <ButtonBase onClick={() => router.back()}>
            <BackIcon color="primary" />
          </ButtonBase>
        </Box>
        <Box className={classes.avatarContainer}>
          <Avatar
            alt="Avatar"
            src="https://material-ui.com/static/images/avatar/2.jpg"
            className={classes.avatar}
          />
          <ButtonBase className={classes.changeAvatar}>
            <PhotoCameraIcon style={{ color: 'white' }} />
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
          first_name: 'Sahabat',
          last_name: 'Kebaikan',
          username: 'sahabatkebaikan123',
          phone: '08976543212',
          email: 'me@sahabatkebaikan.org',
        }}
        validate={(values) => {
          const errors = {};
          const requiredFields = [
            'first_name',
            'last_name',
            'username',
            'phone',
            'email',
          ];

          requiredFields.forEach((field) => {
            if (!values[field]) {
              errors[field] = 'Harus diisi';
            }
          });

          if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
            errors.email = 'Alamat email tidak valid';
          }

          return errors;
        }}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            console.log('values', values);
            setSubmitting(false);
            // alert(JSON.stringify(values, null, 2));
            router.replace('/profil');
          }, 500);
        }}
      >
        {({ isSubmitting, submitForm }) => (
          <Form className={classes.form}>
            <Field
              component={TextField}
              name="first_name"
              type="text"
              label="Nama Depan"
            />
            <Field
              component={TextField}
              name="last_name"
              type="text"
              label="Nama Belakang"
            />
            <Field
              component={TextField}
              name="username"
              type="text"
              label="Username"
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
    </Box>
  );
};

export default EditProfile;
