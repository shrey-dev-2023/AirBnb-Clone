import React, { useContext, useEffect, useState } from "react";
import { differenceInCalendarDays } from "date-fns";
import axios from "axios";
import { Navigate } from "react-router-dom";
import { UserContext } from "./UserContext";

const BookingWidget = ({ place }) => {
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [numberOfGuests, setNumberOfGuests] = useState(1);
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const [redirect, setRedirect] = useState("");
  const {user} = useContext(UserContext)

  useEffect(()=> {
    if(user){
      setName(user.name);
    }
  }, [user])

  let numberOfDays = 0;
  if (checkIn && checkOut) {
    numberOfDays = differenceInCalendarDays(
      new Date(checkOut),
      new Date(checkIn)
    );
  }

  async function bookThisPlace() {
    const response = await axios.post("/bookings", {
      checkIn,
      checkOut,
      numberOfGuests,
      name,
      number,
      place: place._id,
      price: numberOfDays * place.price,
    });
    const bookingId = response.data._id;
    setRedirect(`/account/bookings/${bookingId}`);
  }


  if (redirect) {
    return <Navigate to={redirect} />;
  }

  return (
    <div className=" bg-white shadow p-4 rounded-2xl">
      <div className=" text-2xl text-center">Price : ₹{place.price}/night</div>
      <div className="border rounded-2xl mt-4">
        <div className="flex">
          <div className="py-3 px-4">
            <label>Check In:</label>
            <input
              type="date"
              value={checkIn}
              onChange={(ev) => setCheckIn(ev.target.value)}
            />
          </div>
          <div className="py-3 px-4 border-l">
            <label>Check Out:</label>
            <input
              type="date"
              value={checkOut}
              onChange={(ev) => setCheckOut(ev.target.value)}
            />
          </div>
        </div>
        <div>
          <div className="py-3 px-4 border-t">
            <label>Max Guests:</label>
            <input
              type="number"
              min={1}
              value={numberOfGuests}
              onChange={(ev) => setNumberOfGuests(ev.target.value)}
            />
          </div>
        </div>
        {numberOfDays > 0 && (
          <div className="py-3 px-4 border-t">
            <label>Full name</label>
            <input
              type="text"
              value={name}
              onChange={(ev) => setName(ev.target.value)}
            />
            <label>Contact number</label>
            <input
              type="tel"
              value={number}
              onChange={(ev) => setNumber(ev.target.value)}
            />
          </div>
        )}
      </div>
      <button onClick={bookThisPlace} className="primary mt-4">
        Book now{" "}
        {numberOfDays > 0 && <span>₹{numberOfDays * place.price}</span>}
      </button>
    </div>
  );
};

export default BookingWidget;
