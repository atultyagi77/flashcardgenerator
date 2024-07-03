import React, { useState } from "react";
import AddMore from "./AddMore";
import MainFlashcard from "./MainFlashcard";
import TermForm from "./TermForm";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { addGroup } from "../../redux/action/Action";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CreateNew = () => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state.Reducer.inputData);
  const [files, setFiles] = useState([]);


  // Function to handle file input change
  const handleChange = (e) => {
    const readFiles = [];
    Object.values(e.target.files)?.map((file) => {
      const reader = new FileReader();

      reader.onloadend = () => {
        readFiles.push(reader.result);
      };

      if (file) {
        reader.readAsDataURL(file);
      }
    });
    setFiles(readFiles);
  };

  // Initial values of formik form
  const initialValues = {
    groupName: "",
    description: "",
    term: "",
    defination: "",
    selectedImage: "",
    groupImage: "",
  };

  // Form submission handler
  const onSubmit = async (values) => {
    try {
      // async behavior with setTimeout
      await new Promise((resolve) => setTimeout(resolve, 500));
      // alert(JSON.stringify(values, null, 4));

      // current value to add to state
      const curentValue = {
        term: formik.values.term,
        defination: formik.values.defination,
        selectedImage: formik.values.selectedImage,
      };
      // push current value to state
      state.push(curentValue);
      // dispatch action to add group to Redux store
      dispatch(
        addGroup({
          state,
          group: {
            groupName: formik.values.groupName,
            description: formik.values.description,
            groupImage: formik.values.groupImage,
          },
        })
      );
      // reset formik form values
      formik.resetForm({
        values: {
          ...initialValues,
        },
      });

      toast.success("Form submitted successfully!");
    } catch (error) {
      toast.error("Form submission failed!");
    }

  };

  // Form validation function
  const validate = (values) => {
    let errors = {};

    //validate group name
    if (values.groupName.length < 3) {
      errors.groupName = "Please add minimum 3 characters";
    }
    //validate group description
    if (values.description.length < 15) {
      errors.description = "Please add minimum 15 words";
    }

    // Validate selected group image
    // if (!values.groupImage) {
    //   errors.groupImage = "Please select an image for the group";
    // } 

    // Validate term input
    if (values.term.length < 3) {
      errors.term = "Please add minimum 3 characters";
    }

    // Validate definition input
    if (values.defination.length < 15) {
      errors.defination = "Please add minimum 15 words";
    }

    // Validate selected flashcard image
    if (!values.selectedImage) {
      errors.selectedImage = "Please select an image";
    }

    return errors;
  };

  // initialize formik form
  const formik = useFormik({
    initialValues,
    onSubmit,
    validate,
  });

  console.log("🚀 ~ CreateNew ~ formik:", formik);

  return (
    <div>
      <div>
        {/* form element with formik handleSubmit */}
        <form onSubmit={formik.handleSubmit}>
          {/* main flash card form */}
          <MainFlashcard formik={formik} handleChange={handleChange} />

          {/* container for add more flashcard and termform */}
          <div className="mt-6 sm:px-14 px-10 py-7 bg-white rounded-md shadow-lg">
            <TermForm formik={formik} handleChange={handleChange} />
            <AddMore formik={formik} files={files} />
          </div>

          {/* Submit Button */}
          <div className="py-20 flex justify-center items-center">
            <button
              type="submit"
              className="focus:outline-none focus:ring focus:ring-blue-200 bg-red-700 text-yellow-50 px-14 py-2 rounded-md"
            >
              Create
            </button>
          </div>

        </form>
        <ToastContainer />
      </div>
    </div>
  );
};

export default CreateNew;
