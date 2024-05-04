import React, { useEffect, useState } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import moment from 'moment';
import axios from "axios";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./Reservation.scss";
import Button from "../../components/Button/Button";

const apiURL = process.env.REACT_APP_API_URL;

const ReservationPage = () => {
  const { inventoryId } = useParams();
  const location = useLocation();
  const [availability, setAvailability] = useState([]);
  const queryParams = new URLSearchParams(location.search)
  const [startDate, setStartDate] = useState(new Date());
  // let [searchParams, setSearchParams] = useSearchParams();
  const  quantity = queryParams.get("quantity");
  const [endDate, setEndDate] = useState(null);
  const navigate = useNavigate();

  const handleStartDateChange = (date) => {
    setStartDate(date);
  };

  const handleEndDateChange = (date) => {
    setEndDate(date);
  };
  useEffect(() => {
    const getAvailability = async() => {
      const token = localStorage.getItem("authToken");
      try {
        const res = await axios.get(`${apiURL}/api/availability/${inventoryId}`,  {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          
        });
       
        setAvailability(res.data);
      } catch (error) {
        console.error("Error:", error);
      }
      
    }; 
    getAvailability();
}, [inventoryId]);
  
  const handleBooking = async () => {
    console.log("Booking from:", startDate);
    console.log("Booking to:", endDate);
    const token = localStorage.getItem("authToken");
    const borrowerId = localStorage.getItem("userId");
    const postData = {
      borrower_id: Number(borrowerId),
      inventory_id: Number(inventoryId),
      quantity: Number(quantity),
      start_date: moment(startDate).format('YYYY-MM-DD'),
      end_date: moment(endDate).format('YYYY-MM-DD'),
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
            tileDisabled={({ activeStartDate, date, view }) => { 
              for (const availableDate of availability ) {
               if (moment(date).isSame(availableDate, "day")) {
                return false;
               }
            }  return true;
            }}
          />
        </div>
        <div>
          <p>Select end date:</p>
          <Calendar
            onChange={handleEndDateChange}
            value={endDate}
            minDate={startDate}
            disabled={!startDate}
            tileDisabled={({ activeEndDate, date, view }) => { 
              for (const availableDate of availability ) {
               if (moment(date).isSame(availableDate, "day")) {
                return false;
               }
            }  return true;
            }}
          />
        </div>
      </div>
      <Button
        btnType="submit"
        className="btn btn--book"
        btnContent="Add To Cart"
        handleButtonOnClick={handleBooking}
      />
    </div>
  );
};

export default ReservationPage;
