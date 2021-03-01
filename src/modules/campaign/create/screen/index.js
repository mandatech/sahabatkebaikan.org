// import Box from '@material-ui/core/Box';
// import { Formik, Form, Field, useFormik } from 'formik';
// import MenuItem from '@material-ui/core/MenuItem';
// import Grid from '@material-ui/core/Grid';
// import LinearProgress from '@material-ui/core/LinearProgress';

// import FormControl from '@material-ui/core/FormControl';
// import InputLabel from '@material-ui/core/InputLabel';

// import { makeStyles } from '@material-ui/core/styles';
// import {
//   Select,
//   CheckboxWithLabel,
//   SimpleFileUpload,
// } from 'formik-material-ui';
// import * as yup from 'yup';
// import Button from '@material-ui/core/Button';
// import TextField from '@material-ui/core/TextField';
// import { DatePicker } from 'formik-material-ui-pickers';
// import dynamic from 'next/dynamic';

// const Editor = dynamic(() => import('components/Editor'), {
//   ssr: false,
// });

// const FormikTextField = (props) => (
//   <TextField size="small" fullWidth {...props} />
// );

// const FormikDatePicker = (props) => (
//   <DatePicker style={{ width: '100%' }} {...props} />
// );

// const validationSchema = yup.object({
//   title: yup
//     .string('Masukkan judul campagin')
//     .required('Masukkan judul campaign'),
//   description: yup.string().required('Masukkan deskripsi campaign'),
//   category: yup.string().required('Masukkan category'),
//   donation_target: yup.number().required('Masukkan target donasi'),
//   start_date: yup.date().required('Masukkan tanggal mulai'),
//   end_date: yup.date(),
//   is_never_end: yup.boolean(),
//   image: yup.object(),
// });

// const useStyles = makeStyles((theme) => ({
//   root: {
//     flexGrow: 1,
//     // marginBottom: 100,
//     padding: 16,
//     paddingBottom: 32,
//     background: theme.palette.background.paper,
//   },
//   form: {
//     '& > *': {
//       margin: '8px 0',
//     },
//   },
//   formControl: {
//     widht: '100%',
//   },
// }));

// const CreateNewCampaign = () => {
//   const classes = useStyles();
//   // const formik = useFormik({
//   //   initialValues: {
//   //     email: '',
//   //     description: '',
//   //     category: 'zakat',
//   //   },
//   //   validationSchema: validationSchema,
//   //   onSubmit: (values) => {
//   //     alert(JSON.stringify(values, null, 2));
//   //   },
//   // });

//   return (
//     <Box className={classes.root}>
//       <Formik
//         initialValues={{
//           title: '',
//           category: 'zakat',
//           donation_target: null,
//           start_date: new Date(),
//           end_date: new Date(),
//           is_never_end: false,
//           image: '',
//         }}
//         validate={(values) => {
//           const errors = {
//             title: null,
//             category: null,
//             donation_target: null,
//             start_date: null,
//             end_date: null,
//             is_never_end: null,
//             image: null,
//           };
//           if (!values.title) {
//             errors.title = 'Required';
//           }

//           if (!values.description) {
//             errors.description = 'Required';
//           }

//           if (!values.category) {
//             errors.category = 'Required';
//           }

//           if (!values.donation_target) {
//             errors.donation_target = 'Required';
//           }

//           if (!values.start_date) {
//             errors.start_date = 'Required';
//           }

//           if (!values.end_date) {
//             errors.start_date = 'Required';
//           }

//           return errors;
//         }}
//         // validationSchema={validationSchema}
//         onSubmit={(values, { setSubmitting }) => {
//           console.log('valuess', values);
//           setTimeout(() => {
//             setSubmitting(false);
//             console.log('values', JSON.stringify(values, null, 2));
//             // alert(JSON.stringify(values, null, 2));
//           }, 500);
//         }}
//       >
//         {({ submitForm, isSubmitting, values }) => (
//           <Form className={classes.form}>
//             <Field
//               component={FormikTextField}
//               name="title"
//               label="Judul Campaign"
//             />
//             <InputLabel htmlFor="description">Deskripsi Campaign</InputLabel>
//             <Editor
//               id="description"
//               // onChange={formik.handleChange}
//             />
//             <FormControl fullWidth>
//               <InputLabel htmlFor="select-category">Kategori</InputLabel>
//               <Field
//                 component={(props) => <Select fullWidth {...props} />}
//                 name="category"
//                 inputProps={{
//                   id: 'select-category',
//                 }}
//               >
//                 <MenuItem value="zakat">Zakat</MenuItem>
//                 <MenuItem value="wakaf">Wakaf</MenuItem>
//                 <MenuItem value="pendidikan">Pendidikan</MenuItem>
//                 <MenuItem value="kemanusiaan">Kemanusiaan</MenuItem>
//                 <MenuItem value="sosial">Sosial</MenuItem>
//               </Field>
//             </FormControl>
//             <Field
//               component={(props) => (
//                 <TextField type="number" style={{ width: '100%' }} {...props} />
//               )}
//               name="donation_target"
//               label="Target Donasi"
//             />
//             <Field
//               component={FormikDatePicker}
//               label="Tanggal mulai"
//               name="start_date"
//             />
//             {!values.is_never_end && (
//               <Field
//                 component={FormikDatePicker}
//                 label="Tanggal selesai"
//                 name="end_date"
//               />
//             )}
//             <Field
//               component={CheckboxWithLabel}
//               type="checkbox"
//               name="is_never_end"
//               Label={{ label: 'Tanpa batas waktu' }}
//             />

//             <Field
//               component={SimpleFileUpload}
//               name="image"
//               label="Gambar"
//               style={{ width: '100%' }}
//             />

//             <Field
//               component={FormikTextField}
//               name="video"
//               label="Link Video"
//             />

//             {isSubmitting && <LinearProgress />}
//             <Button
//               variant="contained"
//               color="secondary"
//               disabled={isSubmitting}
//               onClick={submitForm}
//               fullWidth
//             >
//               Submit
//             </Button>
//           </Form>
//         )}
//       </Formik>
//     </Box>
//   );
// };

// export default CreateNewCampaign;

/* eslint-disable no-useless-escape */
import { useState } from 'react';
import { Field, Form, Formik } from 'formik';
import { TextField as FormikTextField } from 'formik-material-ui';
import { useRouter } from 'next/router';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import MenuItem from '@material-ui/core/MenuItem';

import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import { makeStyles } from '@material-ui/core/styles';
import slugify from 'slugify';
import {
  Select,
  CheckboxWithLabel,
  SimpleFileUpload,
} from 'formik-material-ui';
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

const RegistrationForm = () => {
  const classes = useStyles();
  const [description, setDescription] = useState('');
  const toast = useToast();
  const router = useRouter();

  const onSubmit = async (values, { setSubmitting }) => {
    console.log('valuess', values);

    const newCampaign = {
      category_id: values.category,
      title: values.title,
      slug: slugify(values.title, { lower: 'true', remove: /[*+~.()'"!:@–]/g }),
      description,
      donation_target: values.donation_target,
      start_date: format(values.start_date, 'yyyy-MM-dd HH:mm:ss'),
      end_date: !values.is_never_end
        ? format(values.end_date, 'yyyy-MM-dd HH:mm:ss')
        : null,
      is_never_end: values.is_never_end,
      published: true,
      videos: [values.video],
      images: values.image,
    };

    try {
      await createNewCampaign(newCampaign);
      toast.showMessage('Campaign berhasil ditambahkan', 'info');
      setSubmitting(false);
      router.push('/');
      // }, 1200);
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
          donation_target: null,
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
        // onSubmit={(values, { setSubmitting }) => {
        //   console.log('valuess', values);
        //   setTimeout(() => {
        //     setSubmitting(false);
        //     console.log('values', JSON.stringify(values, null, 2));
        //     // alert(JSON.stringify(values, null, 2));
        //   }, 500);
        // }}
      >
        {({ submitForm, isSubmitting, values }) => (
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
                component={(props) => <Select fullWidth {...props} />}
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

            <Field
              component={SimpleFileUpload}
              name="image"
              label="Gambar"
              style={{ width: '100%' }}
            />

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
              Daftar
            </Button>
          </Form>
        )}
      </Formik>
    </Box>
  );
};

export default RegistrationForm;
