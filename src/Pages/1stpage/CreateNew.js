import React, { useState } from "react";
import AddMore from "./AddMore";
import MainFlashcard from "./MainFlashcard";
import TermForm from "./TermForm";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { addGroup } from "../../redux/action/Action";

const CreateNew = () => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state.Reducer.inputData);

  const [files, setFiles] = useState();

  const handleChange = (e) => {
    const readFiles = [];
    Object.values(e.target.files)?.map((file) => {
      const reader = new FileReader();

      reader.onloadend = () => {
        // Store the image in localStorage
        // localStorage.setItem("uploadedImage", reader.result);
        // setImage(reader.result);
        readFiles.push(reader.result);
      };

      if (file) {
        reader.readAsDataURL(file);
      }
    });
    setFiles(readFiles);
  };

  const initialValues = {
    groupName: "",
    description: "",
    term: "",
    defination: "",
  };

  const onSubmit = async (values) => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    alert(JSON.stringify(values, null, 4));
    console.log("submit data:", values);
    const curentValue = {
      term: formik.values.term,
      defination: formik.values.defination,
      selectedImage: formik.values.selectedImage,
    };
    state.push(curentValue);
    dispatch(
      addGroup({
        state,
        group: {
          groupName: formik.values.groupName,
          description: formik.values.description,
        },
      })
    );
    formik.resetForm();
  };

  const validate = (values) => {
    let errors = {};

    if (values.groupName.length < 3) {
      errors.groupName = "Please add minimum 3 characters";
    }
    if (values.description.length < 15) {
      errors.description = "Please add minimum 15 words";
    }
    if (values.term.length < 3) {
      errors.term = "Please add minimum 3 characters";
    }
    if (values.defination.length < 15) {
      errors.defination = "Please add minimum 15 words";
    }

    return errors;
  };

  const formik = useFormik({
    initialValues,
    onSubmit,
    validate,
  });

  console.log("🚀 ~ CreateNew ~ formik:", formik);

  return (
    <div>
      <div>
        <form onSubmit={formik.handleSubmit}>
          <MainFlashcard formik={formik} handleChange={handleChange} />
          <div className="mt-6 sm:px-14 px-10 py-7 bg-white rounded-md shadow-lg">
            <TermForm />
            <AddMore formik={formik} files={files} />
          </div>

          <div className="py-20 flex justify-center items-center">
            <button
              type="submit"
              className="focus:outline-none focus:ring focus:ring-blue-200 bg-red-700 text-yellow-50 px-14 py-2 rounded-md"
            >
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateNew;
