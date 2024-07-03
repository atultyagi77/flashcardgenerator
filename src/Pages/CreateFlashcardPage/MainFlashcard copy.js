import React from "react";

const MainFlashcard = ({ formik, handleChange }) => {

  //Image Handler
  const handleImageChange = (e) => {
    //event for target first file at 0 index
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        formik.setFieldValue("groupImage", reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div>
      <div className="mt-5 sm:px-14 px-10 py-7 bg-white rounded-md shadow-lg">
        <div className="flex flex-col mb-4">
          <label htmlFor="groupname" className="text-gray-600 pb-3 font-medium">
            Create Group*
          </label>

          <div className="flex gap-5 items-center">
            {/* input for group name */}
            <input
              type="text"
              name="groupName"
              id="groupname"
              value={formik.values.groupName}
              onChange={formik.handleChange}
              placeholder="Add Group name"
              className="py-4 px-5 focus:outline-blue-500 outline-blue-100 outline outline-2 focus:outline-7 rounded md:w-96"
            />
             {/* validation for group name length if short or empty formik gives error */}
            {formik.errors.groupName ? (
              <div className="text-red-600 text-sm">
                {formik.errors.groupName}
              </div>
            ) : null}


            
            {/* input for group image */}
            <input
              type="file"
              // name="groupImage"
              accept="image/*"
              label="Upload Image"
              // multiple
              onChange={handleImageChange}
            />
            {/* validation for group image if not found formik gives error */}
            {formik.errors.groupImage ? (
              <div className="text-red-600 text-sm">
                {formik.errors.groupImage}
              </div>
            ) : null}
          </div>
        </div>

        <div className="flex flex-col">
          <label htmlFor="role" className="text-gray-600 pb-3 font-medium">
            Add description
          </label>
          {/* textarea input for long group description */}
          <textarea
            type="textarea"
            name="description"
            id="role"
            value={formik.values.description}
            onChange={formik.handleChange}
            placeholder="Add about you"
            className="py-4 focus:outline-blue-500 outline-blue-100 px-5 outline outline-2 rounded h-35"
          ></textarea>
          {/* validation for group description length if short or empty formik gives error */}
          {formik.errors.description ? (
            <div className="text-red-600 text-sm">
              {formik.errors.description}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default MainFlashcard;
