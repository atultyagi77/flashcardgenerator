import React, { useState } from "react";
import { BsArrowLeft, BsShare, BsDownload, BsPrinter } from "react-icons/bs";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux/es/exports";
import { BiCopy } from "react-icons/bi";
import { CgClose } from "react-icons/cg";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const FlashcardDetails = () => {
  // Redux state selector to get Redux state
  const state = useSelector((state) => state.Reducer);

  // Local state to manage current card index
  const [cardHandler, setCardHandle] = useState(0);

  // Increment handler for navigating to next flashcard
  const incrementHandler = (num, array) => {
    if (array.length - 1 > cardHandler) {
      setCardHandle(cardHandler + num);
    } else {
      setCardHandle(0);
    }
  };

  // Decrement handler for navigating to previous flashcard
  const decrementHandler = (num, array) => {
    if (cardHandler <= 0) {
      setCardHandle(array.length - 1);
    } else if (cardHandler > 0) {
      setCardHandle(cardHandler + num);
    }
  };

  // Copy URL
  const [copyAlertColor, setCopyAlertColor] = useState("initial");
  const [url, setUrl] = useState();
  const urlCopyHandler = () => {
    navigator.clipboard.writeText(document.location.href);
    //success copy url color 
    setCopyAlertColor("green");
    //success copy url alert
    toast.success("URL copied to clipboard!");
  };

  // Share handler for displaying share options
  const [share, setShare] = useState("none");
  const shareHandlerOpen = () => {
    setShare("flex");
    setUrl(`${document.location.href}`);
  };
  const shareHandlerClose = () => {
    setShare("none");
  };

  // Download handler
  const downloadHandler = () => {
    const currentCard = state.groupData[state.showNum].state[cardHandler];
    const content = `Term: ${currentCard.term}\nDefinition: ${currentCard.defination}`;
    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = `${currentCard.term}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // Print handler
  const printHandler = () => {
    window.print();
  };

  return (
    <div>
      <div className="mb-12">
        {/* Mapping over group data to display flashcard details */}
        {state.groupData.map((elem, index) => {
          return index === state.showNum ? (
            <div key={index}>
              {/* flashcard heading main container */}
              <div>
                <Link
                  to="/myflashcard"
                  className="flex items-center font-bold text-black"
                >
                  <BsArrowLeft className="text-lg mr-3" />
                  <span>{elem.group.groupName}</span>
                </Link>
                <p className="text-sm text-gray-600 pl-8 pt-4 text-justify">
                  {elem.group.description}
                </p>
              </div>
              {/* Container for flashcard carousel and controls */}
              <div className="flex flex-col items-center justify-center lg:items-start my-11 lg:flex-row lg:justify-between sm:items-center sm:justify-center sm:flex-col mb-14">
                 {/* List of flashcards */}
                <div className="w-full bg-white rounded-md px-2 shadow-lg lg:w-1/5 sm:w-full ">
                  <p className="text-sm px-5 py-2 text-gray-300">Flashcards</p>
                  <hr className="bg-gray-300" style={{ height: "1px" }} />
                  <h3 className="font-extrabold px-5 py-2 text-red-500">
                    Cards list
                  </h3>
                  <ul>
                    {elem.state.map((childElement, childIndex) => {
                      return (
                        <li
                          key={childIndex}
                           // Style to highlight current card index
                          style={
                            cardHandler === childIndex
                              ? { color: "red" }
                              : { color: "initial" }
                          }
                          onClick={() => setCardHandle(childIndex)}
                          className={`px-5 py-2 cursor-pointer ${
                            cardHandler === childIndex
                              ? "text-red-500 font-bold"
                              : ""
                          }`}
                        >
                          {childIndex + 1}. {childElement.term}
                        </li>
                      );
                    })}
                  </ul>
                </div>

                {/* Container for flashcard display and navigation */}
                <div className="w-full lg:w-2/4 sm:w-full">
                  {elem.state.map((childElement, childIndex) => {
                    return cardHandler === childIndex ? (
                      <div
                        key={childIndex}
                        className="w-full flex flex-col justify-between px-5 py-9 sm:flex-col lg:flex-row bg-white rounded-md shadow-lg"
                      >
                        <div className="w-full text-justify sm:mt-6 lg:mt-0 sm:w-full lg:w-5/5">
                          <h2>{childElement.term}</h2>
                          <p>{childElement.defination}</p>
                          {/* Displaying selected image if available */}
                          {childElement.selectedImage && (
                            <img
                              src={childElement.selectedImage}
                              alt={`Card ${childIndex + 1}`}
                              className="mt-4 rounded-md shadow-md"
                            />
                          )}
                        </div>
                      </div>
                    ) : null;
                  })}

                  <div
                    style={{ userSelect: "none" }}
                    className="px-8 py-6 mt-6 text-center"
                  >
                    <span
                      className="text-3xl mr-10 cursor-pointer"
                      onClick={() => decrementHandler(-1, elem.state)}
                    >
                      &lt;
                    </span>
                    <span className="text-2xl ">
                      {cardHandler + 1}/{elem.state.length}
                    </span>
                    <span
                      className="text-3xl ml-10 cursor-pointer"
                      onClick={() => incrementHandler(1, elem.state)}
                    >
                      &#62;
                    </span>
                  </div>
                </div>

                {/* Share icons */}
                <div className="w-full lg:w-1/5 sm:w-full">
                  <div className="mb-2 shadow-lg">
                    <button
                      onClick={shareHandlerOpen}
                      className="bg-white w-full rounded-md px-4 py-4 font-bold flex items-center text-gray-700"
                    >
                      <BsShare className="mr-5" />
                      <span>Share</span>
                    </button>
                  </div>
                  <div className="mb-2 shadow-lg">
                    <button onClick={downloadHandler} className="bg-white w-full rounded-md px-4 py-4 font-bold flex items-center text-gray-700">
                      <BsDownload className="mr-5" />
                      <span>Download</span>
                    </button>
                  </div>
                  <div className="mb-2 shadow-lg">
                    <button onClick={printHandler} className="bg-white w-full rounded-md px-4 py-4 font-bold flex items-center text-gray-700">
                      <BsPrinter className="mr-5" />
                      <span>Print</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ) : null;
        })}

        {/* Share URL copy box */}
        <div className="popupBox" style={{ display: share }}>
          <div className="relative w-11/12 xl:w-2/5 sm:w-11/12 p-3 sm:p-8 bg-white rounded-md ">
            <h3 className="text-lg font-semibold mb-2">Share</h3>
            <div className="flex sm:items-center flex-col sm:flex-row ">
              <p className="w-3/4 px-4 py-3 rounded-md outline-dashed outline-1 outline-blue-200">
                <span>Link :</span>&nbsp;&nbsp;
                <span>{url}</span>
              </p>
              <p className="flex mt-3 sm:mt-0">
                <BiCopy
                  className="text-2xl ml-4 cursor-pointer"
                  onClick={urlCopyHandler}
                  style={{ color: copyAlertColor }}
                />
                <BsShare className="text-2xl ml-4 cursor-pointer" />
                <CgClose className="closbtn" onClick={shareHandlerClose} />
              </p>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default FlashcardDetails;
