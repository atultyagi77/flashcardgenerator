import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addInputBox } from "../../redux/action/Action";

const AddMore = ({ formik, files }) => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state.Reducer.inputData);

  const fileInputRef = useRef(null);

  // Function to open image file input dialog
  const handleFileInputClick = () => {
    fileInputRef.current.click();
  };

  //handle image selection of flash card
  const handleImageChange = (e) => {
    // Get the first file from the event
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        formik.setFieldValue("selectedImage", reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Function to dispatch form data and reset form values
  const addInputValue = () => {
    dispatch(
      addInputBox({
        term: formik.values.term,
        defination: formik.values.defination,
        selectedImage: formik.values.selectedImage,
      })
    );
    formik.values.term = "";
    formik.values.defination = "";
    formik.values.selectedImage = "";
  };

  return (
    <div>
      <div
        id="form_resp"
        className="flex flex-col sm:justify-start sm:flex-row"
      >
        {/* Input for flashcard term */}
        <div className="relative flex flex-col sm mr-4 mb-3 sm:mb-0 sm:mt-4 w-full sm:w-2/6">
          <span id="num1" className="bg-red-500">
            {state.length + 1}
          </span>
          <label htmlFor="term" className="text-gray-600 pb-3 font-medium">
            Enter Term
          </label>
          <input
            type="text"
            id="term"
            name="term"
            value={formik.values.term}
            onChange={formik.handleChange}
            placeholder="write title here..."
            className="focus:outline-gray-500 outline-blue-100 rounded py-4 px-5 outline outline-2"
          />
          {formik.errors.term ? (
            <div className="text-red-600 text-sm">{formik.errors.term}</div>
          ) : null}
        </div>

        {/*Input Definition for flashcard */}
        <div className="flex flex-col w-full sm:mt-4 sm:w-2/6">
          <label htmlFor="define" className="text-gray-600 pb-3 font-medium">
            Enter Defination*
          </label>
          <input
            type="text"
            id="define"
            name="defination"
            value={formik.values.defination}
            onChange={formik.handleChange}
            placeholder="Write defination here..."
            className="focus:outline-gray-500 outline-blue-100 py-4 px-5 outline outline-2 rounded"
          />
          {formik.errors.defination ? (
            <span className="text-red-600 text-sm">
              {formik.errors.defination}
            </span>
          ) : null}
        </div>

        {/*FlashCard Image Selection */}
        <div
          role="banner"
          className="flex flex-col w-full sm:mt-4 sm:w-2/6"
        >
          <label htmlFor="selectImage" className="text-gray-600 pb-3 font-medium">
            &nbsp;
          </label>
          {formik.values.selectedImage ? (
            // Display selected image preview
            <img
              src={formik.values.selectedImage}
              alt="Selected"
              className="w-[50px] h-[50px] ml-4"
              onClick={handleFileInputClick}
            />
          ) : (
            <button
              onClick={handleFileInputClick}
              className="bg-transparent ml-4 mt-2 hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
            >
              Select Image
            </button>
          )}
          <input
            type="file"
            ref={fileInputRef}
            accept="image/*"
            onChange={handleImageChange}
            className="hidden"
          />
          {formik.errors.selectedImage ? (
            <span className="text-red-600 text-sm">
              {formik.errors.selectedImage}
            </span>
          ) : null}
        </div>
      </div>

      {/* Add more button */}
      <span
        className="py-4 inline-block cursor-pointer font-medium mt-8 text-blue-700"
        onClick={addInputValue}
      >
        + Add more
      </span>
    </div>
  );
};

export default AddMore;
