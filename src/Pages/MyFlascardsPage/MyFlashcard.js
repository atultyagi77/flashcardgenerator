import React, { useState } from "react";
import { useSelector } from "react-redux";
import { BsArrowRight } from "react-icons/bs";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { showFlashCard } from "../../redux/action/Action";

const MyFlashcard = () => {

  // local state to manage number of initially displayed cards
  const [cardHandle, setCardHandle] = useState(6);

  // Redux state selector to get group data
  const state = useSelector((state) => {
    return state.Reducer.groupData;
  });
  const dispatch = useDispatch();

  // Click handler to show all cards
  const showAllcard = () => {
    setCardHandle(state.length);
  };
  // card show starting

  return (
    <div>
      <div className="pb-7">
        {/* Grid layout to display flashcards */}
        <div className="grid md:grid-cols-3 gap-5 justify-center">
           {/* Mapping over state to render each flashcard */}
          {state.map((ele, index) => {
            return index < cardHandle ? (
              <div
                key={index}
                className="p-6 max-w-sm bg-white rounded-lg border border-gray-200 shadow-md"
              >
                <div className="">
                  <div className="">
                    <div className="grid md:grid-cols-12 font-medium">
                      <div className="col-span-3">
                        {/* group image */}
                        <div className="w-[40px] h-[40px] rounded-full bg-gray-200 mr-4">
                          <img alt="Group" src={ele.group?.groupImage} className="w-full h-full object-cover rounded-full" />
                        </div>
                      </div>

                      {/* group detail name & description */}
                      <div className="col-span-9">
                        <div className="">
                          <h3 className="text-black font-bold">
                            {ele.group.groupName}
                          </h3>
                          <small>Card {ele.state.length}</small>
                        </div>
                      </div>
                    </div>
                    <p className="md:col-span-12 text-sm text-gray-500">
                      {ele.group.description}
                    </p>

                    {/* Link to view card details */}
                    <div className="md:col-span-6">
                      <Link
                        to={`/flashcardDetails${index}`}
                        className="py-2 font-medium flex items-center text-red-500"
                        onClick={() => dispatch(showFlashCard(index))}
                      >
                        <span>View Cards</span>
                        <BsArrowRight className="text-lg ml-3" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ) : null;
          })}
        </div>
        {/* Show all cards button or message if no cards */}
        <div
          className="text-right pb-11 px-5"
          style={cardHandle < 7 ? { display: "block" } : { display: "none" }}
        >
          {state.length === 0 ? (
            <div className="font-semibold ">You have not created Cards</div>
          ) : (
            <button className="text-red-500 font-bold" onClick={showAllcard}>
              See all
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyFlashcard;
