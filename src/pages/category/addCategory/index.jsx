import React, { useEffect, useState } from 'react'
import categoryService from '../../../service/category.service';
import { Button, TextField, Typography } from '@mui/material';
import { Formik } from 'formik';
import ValidationErrorMessage from '../../../components/ValidationErrorMessage';
import { toast } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';
import Shared from '../../../utils/shared';
import * as Yup from "yup";

const AddCategory = () => {
    const navigate = useNavigate();
    const initialValues = { name: "" };
  const [initialValueState, setInitialValueState] = useState(initialValues);
  const { id } = useParams();

  useEffect(() => {
    if (id) getCategoryById();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Category Name is required"),
  });

  const getCategoryById = () => {
    categoryService.getById(Number(id)).then((res) => {
      setInitialValueState({
        id: res.id,
        name: res.name,
      });
    });
  };
    const onSubmit = (values) => {
        categoryService
          .save(values)
          .then((res) => {
            toast.success(Shared.messages.UPDATED_SUCCESS);
            navigate("/category");
          })
          .catch((e) => toast.error(Shared.messages.UPDATED_FAIL));
      };
  return (
    <div>
      <div className="container">
        <Typography variant="h4" style={{marginBottom: "50px", marginTop: "50px", color: "#f44403"}}>{id ? "Edit" : "Add"} Category</Typography>
        <Formik
          initialValues={initialValueState}
          validationSchema={validationSchema}
          enableReinitialize={true}
          onSubmit={onSubmit}
        >
          {({
            values,
            errors,
            touched,
            handleBlur,
            handleChange,
            handleSubmit,
          }) => (
            <form onSubmit={handleSubmit}>
              <div className="form-row-wrapper">
                <div className="form-col">
                  <TextField
                    id="first-name"
                    name="name"
                    label="Category Name *"
                    variant="outlined"
                    inputProps={{ className: "small" }}
                    value={values.name}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    style={{marginBottom: "10px"}}

                  />
                  <ValidationErrorMessage
                    message={errors.name}
                    touched={touched.name}
                  />
                </div>
              </div>
              <div className="btn-wrapper">
                <Button
                  // className="green-btn btn"
                  variant="contained"
                  type="submit"
                  style= {{background: "green", marginRight: "10px"}}
                  disableElevation
                >
                  Save
                </Button>
                <Button
                  // className="pink-btn btn"
                  variant="contained"
                  type="button"
                  style= {{background: "#f44403", marginRight: "10px"}}
                  disableElevation
                  onClick={() => {
                    navigate("/category");
                  }}
                >
                  Cancel
                </Button>
              </div>
            </form>
          )}
        </Formik>
      </div>
    </div>
  )
}

export default AddCategory
