import React, { useState, useEffect } from "react";
import { MapPin, Phone, User, Mail } from "react-feather";
import WashingMachine from "../../assets/washing.png";
import StarRatings from "react-star-ratings"; // Import the StarRatings component
import LaundryDialog from "./components/DialogBox";
import { useLocation, useNavigate } from "react-router-dom";



// Custom StarRating component
function StarRating({ rating, onRatingChange }) {
  return (
    <StarRatings
      rating={rating}
      starDimension="20px" // Set the size of the stars
      starSpacing="2px" // Set the spacing between stars
      starRatedColor="#FFD700" // Set the color of the rated stars
      changeRating={onRatingChange}
      numberOfStars={5}
      name="rating"
    />
  );
}

function LaundryDetails() {
  const navigate = useNavigate();
  const Location = useLocation();
  const shop_id = Location.state.id;

  const [orders, setOrders] = useState([]);

  const [laundry, setLaundry] = useState(null);
  const [showAllReviews, setShowAllReviews] = useState(false);
  const [newReview, setNewReview] = useState("");
  const [newRating, setNewRating] = useState(0);
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch laundry details and reviews when the component mounts
  useEffect(() => {
    
    // Make a GET request to your backend to fetch laundry details
    fetch(`https://wazhine-backend.vercel.app/laundries/laundry/${shop_id}`)
      .then((response) => response.json())
      .then((data) => {
        console.log("J");
        console.log(data);
        setLaundry(data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching laundry details:", error);
      });
  }, [shop_id]);

  useEffect(() => {
    fetch(`https://wazhine-backend.vercel.app/order/user/${localStorage.getItem('user_id')}`)
      .then((response) => response.json())
      .then((data) => {
        setOrders(data);
      })
      .catch((error) => {
        console.error("Error fetching user orders:", error);
      });
  });

  // Function to post a review
  const postReview = () => {
    if (newReview.trim() !== "" && newRating > 0) {
      fetch(`https://wazhine-backend.vercel.app/reviews/reviews`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          rating: newRating,
          description: newReview,
          shop_id,
          user_id: localStorage.getItem("user_id"),
        }),
      })
        .then((response) => {
          if (response.status === 201) {
            // The review was successfully posted. You can update your UI accordingly.
            location.reload();
            console.log("Review posted successfully");
            // You may also want to update the list of reviews.
            // Fetch reviews again and update the state.
          } else {
            // Handle errors if necessary.
            console.error("Error posting review:", response.data);
          }
        })
        .catch((error) => {
          console.error("Error posting review:", error);
        });

      setNewReview("");
      setNewRating(0);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-gray-700 py-4">
        <div className="container mx-auto px-8 text-white font-semibold text-xl flex justify-between items-center">
          <span onClick={() => navigate('/')}>WashWiz</span>
        </div>
      </header>
      {isLoading ? (
        <p>Loading</p>
      ) : (
        <>
          {" "}
          <div className="container grid grid-cols-1 md:grid-cols-6 gap-5 md:gap-10  mx-auto p-4">
            <div className="bg-white shadow-md h-fit rounded-md col-span-4 md:col-span-2 p-4">
              <button
                onClick={() => setDialogOpen(true)}
                className="bg-gray-700 p-2 rounded-lg w-full text-white hover:bg-gray-900 duration-200 transition-all ease-in-out"
              >
                Add Laundry
              </button>
              <div className=" my-2">
                {orders.map((jsondata) => {
                  return (
                    <div className="bg-gray-600 p-2 my-2 text-white rounded-md">
                      <div className="flex justify-between text-sm text-gray-300">
                        <p>22 DEC 2023</p>
                        <p>02:00</p>
                      </div>
                      <div className="grid grid-cols-6 gap-2 mt-2">
                        <div className="col-span-2">
                          <img src={WashingMachine} alt="Washing Machine" />
                        </div>
                        <div className="col-span-4 flex p-2 flex-col bg-gray-500 rounded-md">
                          <div>
                            <h3 className="text-sm text-gray-300">Status</h3>
                          </div>
                          <div className="flex-1 flex justify-center items-center">
                            <h1>{jsondata.status}</h1>
                          </div>
                        </div>
                      </div>
                      <div className="py-3 flex flex-col gap-2">
                        {jsondata.clothes.map((clothing, index) => (
                          <div
                            key={index}
                            className={`flex w-full justify-between rounded-md p-2 ${clothing.bgColor}`}
                          >
                            <p>{clothing.type}</p>
                            <p>{clothing.count}</p>
                          </div>
                        ))}
                      </div>
                      
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="col-span-4">
              <div className="bg-white p-4 rounded-lg shadow-md ">
                <img
                  src={laundry.image_path}
                  alt={laundry.title}
                  className="w-full h-48 object-cover rounded-md mb-2"
                />
                <h2 className="text-lg font-semibold">{laundry.title}</h2>
                <div className="flex items-center mb-2">
                  <MapPin className="text-gray-600" size={16} />
                  <p className="text-gray-600 ml-2">{laundry.location}</p>
                </div>
                <div className="flex items-center mb-2">
                  <Phone className="text-gray-600" size={16} />
                  <p className="text-gray-600 ml-2">{laundry.phone_number}</p>
                </div>
                <div className="flex items-center mb-2">
                  <Mail className="text-gray-600" size={16} />
                  <p className="text-gray-600 ml-2">{laundry.email}</p>
                </div>
                <div className="flex items-center mb-2">
                  <span className="text-yellow-500">★</span>
                  <span className="ml-2">{parseInt(laundry.averageRating)}</span>
                </div>
                <h3 className="text-xl font-semibold mt-4 mb-2">
                  Customer Reviews
                </h3>
                <>
                  {laundry.reviews.length == 0 ? (
                    <p>No Reviews...</p>
                  ) : (
                    <>
                      <ul>
                        {showAllReviews ? (
                          laundry.reviews.map((review) => (
                            <li
                              key={review.id}
                              className="mb-4 p-4 rounded-lg bg-gray-200"
                            >
                              <div className="flex items-center">
                                <User className="w-8 h-8 rounded-full mr-2" />
                                <div>
                                  <div className="text-lg font-semibold">
                                    {review.username}
                                  </div>
                                  <div className="flex items-center">
                                    <StarRating rating={review.rating} />
                                  </div>
                                </div>
                              </div>
                              <p className="mt-2">{review.description}</p>
                            </li>
                          ))
                        ) : (
                          <li className="mb-2 p-4 rounded-lg bg-gray-200">
                            <div className="flex items-center">
                              <User className="w-8 h-8 rounded-full mr-2" />
                              <div>
                                <div className="text-lg font-semibold">
                                  {laundry.reviews[0].username}
                                </div>
                                <div className="flex items-center">
                                  <StarRating
                                    rating={laundry.reviews[0].rating}
                                  />
                                </div>
                              </div>
                            </div>
                            <p className="mt-2">
                              {laundry.reviews[0].description}
                            </p>
                          </li>
                        )}
                      </ul>
                      {laundry.reviews.length > 1 && (
                        <button
                          onClick={() => setShowAllReviews(!showAllReviews)}
                          className="text-blue-500 hover:underline mt-2"
                        >
                          {showAllReviews ? "Show Less" : "Show All Reviews"}
                        </button>
                      )}
                    </>
                  )}
                </>

                <div className="mt-4 border-t border-gray-300 pt-4">
                  <h3 className="text-xl font-semibold mb-2">Post a Review</h3>
                  <StarRating
                    rating={newRating}
                    onRatingChange={(newRating) => setNewRating(newRating)}
                  />
                  <textarea
                    rows="4"
                    placeholder="Write your review here..."
                    value={newReview}
                    onChange={(e) => setNewReview(e.target.value)}
                    className="w-full p-2 mt-2 rounded-md border border-gray-300 focus:outline-none"
                  ></textarea>
                  <button
                    onClick={() => postReview()}
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg mt-2 hover:bg-blue-600"
                  >
                    Post Review
                  </button>
                </div>
              </div>
            </div>
          </div>
          <LaundryDialog
            shop_id={shop_id}
            isOpen={isDialogOpen}
            onClose={() => setDialogOpen(false)} // Close the dialog when needed
            onAddLaundry={() => window.location.reload(false)}
          />
        </>
      )}
    </div>
  );
}

export default LaundryDetails;
