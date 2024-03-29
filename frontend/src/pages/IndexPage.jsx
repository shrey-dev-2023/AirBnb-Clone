import React, { useEffect, useState } from "react";
import Header from "../Header";
import axios from "axios";
import { Link } from "react-router-dom";

const IndexPage = () => {
  const [places, setPlaces] = useState([]);
  useEffect(() => {
    axios.get("/places").then((response) => {
      setPlaces([
        ...response.data,
        ...response.data,
        ...response.data,
        ...response.data,
      ]);
    });
  }, []);
  return (
    <div className="mt-8 grid gap-x-6 gap-y-8 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {places.length > 0 &&
        places.map((place) => (
          <Link to={"/place/" + place._id}>
            <div className="mb-2 bg-gray-500 rounded-2xl flex">
              {place.photos?.[0] && (
                <img
                  className=" rounded-2xl object-cover aspect-square"
                  src={"https://airbnb-clone-qbid.onrender.com/uploads/" + place.photos?.[0]}
                />
              )}
            </div>
            <h2 className=" font-bold">{place.address}</h2>
            <h3 className="text-sm truncate text-gray-500">{place.title}</h3>
            <div className="mt-2">
              <span className="font-bold">₹{place.price}</span> per night
            </div>
          </Link>
        ))}
    </div>
  );
};

export default IndexPage;
