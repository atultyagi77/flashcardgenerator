import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addInputBox } from "../../redux/action/Action";

const AddMore = ({ formik, files }) => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state.Reducer.inputData);

  const [openModal, setOpenModal] = useState(false);

  const handleSelectModal = () => setOpenModal((prev) => !prev);

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

        <div
          role="banner"
          onClick={handleSelectModal}
          className="flex flex-col w-full sm:mt-4 sm:w-2/6"
        >
          {/* Button */}
          Select Image
        </div>

        {/* Modal
                    Use Any Library Modal
              */}
        {openModal && (
          <div
            style={{
              position: "fixed",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
            }}
          >
            <div
              style={{
                width: "50vw",
                height: "70vh",
                background: "white",
                color: "white",
                zIndex: "10",
                borderRadius: "16px",
                border: "1px solid black",
                boxShadow: "0 5px 20px 0 rgba(0, 0, 0, 0.04)",
              }}
            >
              <div className="p-[20px] flex items-center gap-5">
                {files?.map((file) => (
                  <img
                    key={file}
                    src={file}
                    className="w-[150px] h-[150px] cursor-pointer"
                    onClick={() => {
                      handleSelectModal();
                      formik.setFieldValue("selectedImage", file);
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

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
