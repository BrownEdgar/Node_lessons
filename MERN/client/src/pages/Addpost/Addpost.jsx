import React from 'react'
import { Formik, Form, Field, ErrorMessage, FieldArray, FastField } from 'formik'

import './Addpost.css'
import axios from 'axios'


export default function Addpost() {

  const onSubmit = (values) => {
    console.log(values);
    axios.post('http://localhost:3001/posts', values, {
      headers: {
        'accept': 'application/json',
        'Content-Type': 'multipart/form-data',
        "Access-Control-Allow-Credentials": true,
      }
    })
  }
  const initialValues = {
    title: "",
    img: null,
    desc: "",
    longdesc: "",
  }
  return (
    <div className='home home__colored'>
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validateOnChange={false}
        validateOnBlur={true}
      >
        {(formik) => {

          return (
            <Form className='Addpost' >
              <div className="form-control">

                <label htmlFor="name">title</label>
                <Field type="text" id="title" name="title" />
                <ErrorMessage name="title" component="p" />
              </div>
              <div className="form-control">
                <label htmlFor="name">description</label>
                <Field type="text" id="desc" name="desc" />
                <ErrorMessage name="desc" component="p" />
              </div>
              <div className="form-control">
                <label htmlFor="name">long description</label>
                <Field id="longdesc" name="longdesc" as='textarea' placeholder="post long description..." rows='10' />
                < ErrorMessage name="longdesc" component="p" />
              </div>
              <div className="form-control">
                <label htmlFor="name">post image</label>
                <input id="file" name="img" type="file" onChange={(event) => {
                  formik.setFieldValue('img', event.target.files[0])
                }} />
                <ErrorMessage name="img" component="p" />
              </div>
              <div>
                <input type="submit" value='add post' />
              </div>
            </Form>
          )
        }}


      </Formik>
    </div>
  )
}
