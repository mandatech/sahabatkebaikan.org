/* eslint-disable no-useless-escape */
import { useState } from 'react';
import imageCompression from 'browser-image-compression';
import { Field, Form, Formik } from 'formik';
import { TextField as FormikTextField } from 'formik-material-ui';
import { useRouter } from 'next/router';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import MenuItem from '@material-ui/core/MenuItem';

import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import InputLabel from '@material-ui/core/InputLabel';
import { makeStyles } from '@material-ui/core/styles';
import slugify from 'slugify';
import { Select, CheckboxWithLabel } from 'formik-material-ui';
import { DateTimePicker } from 'formik-material-ui-pickers';
import format from 'date-fns/format';

import { useToast } from 'libs/toast';
import { createNewCampaign } from 'services/campaign.service';

import dynamic from 'next/dynamic';

const Editor = dynamic(() => import('components/Editor'), {
  ssr: false,
});

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: 16,
    paddingBottom: 32,
    background: theme.palette.background.paper,
  },
  form: {
    '& > *': {
      margin: '8px 0',
    },
  },
  button: {
    flexGrow: 1,
    marginTop: 8,
  },
  input: {
    display: 'none',
  },
  error: {
    color: theme.palette.error.main,
  },
}));

const TextField = (props) => (
  <FormikTextField size="small" fullWidth {...props} />
);

const FormikDatePicker = (props) => (
  <DateTimePicker
    format="yyyy-MM-dd HH:mm"
    ampm={false}
    style={{ width: '100%' }}
    {...props}
  />
);

const CreateNewCampaign = () => {
  const classes = useStyles();
  const [description, setDescription] = useState('');
  const toast = useToast();
  const router = useRouter();
  // const [image, setImage] = useState(null);

  // const handleCapture = ({ target }) => {
  //   setImage(target.files[0]);
  // };

  const onSubmit = async (values, { setSubmitting }) => {
    try {
      const options = {
        maxSizeMB: 1,
        maxWidthOrHeight: 1024,
        useWebWorker: true,
      };

      const compressedBlob = await imageCompression(values.image, options);

      const compressedFile = new File([compressedBlob], compressedBlob.name, {
        lastModified: new Date().getTime(),
        type: compressedBlob.type,
      });

      const newCampaign = {
        category_id: values.category,
        title: values.title,
        slug: slugify(values.title, { lower: 'true', remove: /[^\w\s]/ }),
        description,
        donation_target: values.donation_target,
        start_date: format(values.start_date, 'yyyy-MM-dd HH:mm:ss'),
        end_date: !values.is_never_end
          ? format(values.end_date, 'yyyy-MM-dd HH:mm:ss')
          : null,
        is_never_end: values.is_never_end,
        published: true,
        videos: values.video ? [values.video] : null,
        images: compressedFile,
      };

      const data = await createNewCampaign(newCampaign);

      toast.showMessage('Campaign berhasil ditambahkan', 'info');
      setSubmitting(false);
      router.push(`/campaign/${data.slug}`);
    } catch (error) {
      console.log('error', error);
      setSubmitting(false);
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

  return (
    <Box display="flex" flexDirection="column" p={1} className={classes.root}>
      <Formik
        initialValues={{
          title: '',
          category: 'zakat',
          donation_target: undefined,
          start_date: new Date(),
          end_date: new Date(),
          is_never_end: false,
          image: '',
          video: '',
        }}
        validate={(values) => {
          const errors = {};

          if (!values.title) {
            errors.title = 'Harus diisi';
          }

          if (!values.category) {
            errors.category = 'Harus diisi';
          }

          if (!values.donation_target) {
            errors.donation_target = 'Harus diisi';
          }

          if (!values.image) {
            errors.image = 'Harus diisi';
          }

          if (
            values.video &&
            !/^(?:https?:\/\/)?(?:www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})?$/.test(
              values.video
            )
          ) {
            errors.video = 'Link video YouTube tidak valid';
          }

          if (
            !values.is_never_end &&
            new Date(values.end_date) <= new Date(values.start_date)
          ) {
            errors.end_date =
              'Tanggal selesai harus lebih besar daripada tanggal mulai';
          }

          return errors;
        }}
        onSubmit={onSubmit}
      >
        {({
          submitForm,
          isSubmitting,
          values,
          errors,
          setFieldValue,
          touched,
        }) => (
          <Form className={classes.form}>
            <Field
              component={TextField}
              name="title"
              type="text"
              label="Judul Campaign"
            />
            <InputLabel htmlFor="description">Deskripsi Campaign</InputLabel>
            <Editor
              id="description"
              data={description}
              onChange={(event, editor) => {
                const data = editor.getData();

                setDescription(data);
              }}
            />
            <FormControl fullWidth>
              <InputLabel htmlFor="select-category">Kategori</InputLabel>
              <Field
                component={(props) => (
                  <Select {...props} MenuProps={{ disableScrollLock: true }} />
                )}
                name="category"
                inputProps={{
                  id: 'select-category',
                }}
              >
                <MenuItem value="zakat">Zakat</MenuItem>
                <MenuItem value="wakaf">Wakaf</MenuItem>
                <MenuItem value="pendidikan">Pendidikan</MenuItem>
                <MenuItem value="kemanusiaan">Kemanusiaan</MenuItem>
                <MenuItem value="sosial">Sosial</MenuItem>
              </Field>
            </FormControl>
            <Field
              component={TextField}
              name="donation_target"
              type="number"
              label="Target Donasi"
            />
            <Field
              component={FormikDatePicker}
              label="Tanggal mulai"
              name="start_date"
            />
            {!values.is_never_end && (
              <Field
                component={FormikDatePicker}
                label="Tanggal selesai"
                name="end_date"
              />
            )}
            <Field
              component={CheckboxWithLabel}
              type="checkbox"
              name="is_never_end"
              Label={{ label: 'Tanpa batas waktu' }}
            />

            <InputLabel error={touched.image && !!errors.image}>
              Gambar
            </InputLabel>
            <FormControl fullWidth error={touched.image && !!errors.image}>
              <input
                name="image"
                accept="image/*"
                type="file"
                onChange={(e) => setFieldValue('image', e.target.files[0])}
              />

              {touched.image && errors.image && (
                <FormHelperText>{errors.image}</FormHelperText>
              )}
            </FormControl>

            <Field
              component={TextField}
              name="video"
              type="text"
              label="Link Video YouTube"
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

export default CreateNewCampaign;
