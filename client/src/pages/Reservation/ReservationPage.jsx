import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./Reservation.scss";
import Button from "../../components/Button/Button";

const apiURL = process.env.REACT_APP_API_URL;

const ReservationPage = () => {
  const { inventoryId } = useParams();
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(null);
  const navigate = useNavigate();

  const handleStartDateChange = (date) => {
    setStartDate(date);
  };

  const handleEndDateChange = (date) => {
    setEndDate(date);
  };

  const handleBooking = async () => {
    console.log("Booking from:", startDate);
    console.log("Booking to:", endDate);
    const token = localStorage.getItem("authToken");
    const borrowerId = localStorage.getItem("userId");
    const postData = {
      inventory_id: inventoryId,
      quantity: Number(1),
      start_date: startDate,
      end_date: endDate,
    };

    try {
      const response = await axios.post(`${apiURL}/api/order_item`, postData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      alert("Reservation Added Successfully! 🚀");
      navigate("/");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div>
      <h2>Reservation</h2>
      <div className="reservation">
        <div>
          <p>Select start date:</p>
          <Calendar
            onChange={handleStartDateChange}
            value={startDate}
            minDate={new Date()}
          />
        </div>
        <div>
          <p>Select end date:</p>
          <Calendar
            onChange={handleEndDateChange}
            value={endDate}
            minDate={startDate}
            disabled={!startDate}
          />
        </div>
      </div>
      <Button
        btnType="submit"
        className="btn btn--book"
        btnContent="Book"
        handleButtonOnClick={handleBooking}
      />
    </div>
  );
};

export default ReservationPage;
