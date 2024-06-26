import React, { useEffect, useState } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import moment from "moment";
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
  const queryParams = new URLSearchParams(location.search);
  const [startDate, setStartDate] = useState(new Date());
  const quantity = queryParams.get("quantity");
  const [endDate, setEndDate] = useState(null);
  const navigate = useNavigate();
  const [existingReservations, setExistingReservations] = useState([]);
  const [availableRanges, setAvailableRanges] = useState([]);
  const [error, setError] = useState(false);
  const [availableRangeMessage, setAvailableRangeMessage] = useState([]);
  const [unAvailableRange, setUnAvailableRange] = useState("");
  const errorMessage =
    "Unfortunately, selected date range overlaps with an existing reservation. Please choose dates from Available Booking Ranges.";
  const handleStartDateChange = (date) => {
    setStartDate(date);
    setEndDate(null);
  };

  const handleEndDateChange = (date) => {
    setEndDate(date);
  };

  useEffect(() => {
    const getAvailability = async () => {
      const token = localStorage.getItem("authToken");
      try {
        const res = await axios.get(
          `${apiURL}/api/availability/${inventoryId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setAvailability(res.data);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    const fetchExistingReservations = async () => {
      try {
        const res = await axios.get(
          `${apiURL}/api/reservations/${inventoryId}`
        );
        setExistingReservations(res.data);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchExistingReservations();
    getAvailability();
  }, [inventoryId]);

  useEffect(() => {
    const calculateAvailableRanges = () => {
      const ranges = [];
      for (const reservation of existingReservations) {
        const startDate = moment(reservation.start_date);
        const endDate = moment(reservation.end_date);
        ranges.push({ start: startDate, end: endDate });
      }
      const available = [];
      let prevEnd = moment().subtract(1, "day");
      for (const range of ranges) {
        if (range.start.diff(prevEnd, "days") > 1) {
          available.push({
            start: moment(prevEnd).add(1, "day"),
            end: moment(range.start).subtract(1, "day"),
          });
        }
        prevEnd = moment(range.end);
      }
      if (prevEnd.diff(moment(), "days") > 0) {
        available.push({
          start: moment(prevEnd).add(1, "day"),
          end: moment().add(1, "month"),
        });
      }
      setAvailableRanges(available);
      const message = available.map((range) => (
        <p key={range.start.format("YYYY-MM-DD")}>
          Kindly reserve a date frame from {range.start.format("MMM DD, YYYY")}{" "}
          to {range.end.format("MMM DD, YYYY")}
        </p>
      ));
      setAvailableRangeMessage(message);
    };
    const calculateUnavailableRanges = () => {
      const ranges = existingReservations.map((reservation) => {
        return {
          start: moment(reservation.start_date),
          end: moment(reservation.end_date),
        };
      });
      setUnAvailableRange(ranges);
    };

    calculateUnavailableRanges();
    calculateAvailableRanges();
  }, [existingReservations]);

  const validateBooking = () => {
    if (!startDate || !endDate) {
      setError("Please select both start and end dates.");
      return false;
    }

    const selectedRange = (startDate, endDate, type) => {
      let fromDate = moment(startDate);
      let toDate = moment(endDate);
      let diff = toDate.diff(fromDate, type);
      let range = [];
      for (let i = 0; i <= diff; i++) {
        range.push(moment(startDate).add(i, type));
      }
      return range;
    };

    const selectedDates = selectedRange(startDate, endDate, "days");

    for (const date of selectedDates) {
      for (const range of unAvailableRange) {
        if (date.isSameOrAfter(range.start) && date.isSameOrBefore(range.end)) {
          setError(errorMessage);
          console.log(error);
          return false;
        }
      }
    }
    return true;
  };

  const handleBooking = async () => {
    const isValid = validateBooking();
    if (isValid === true) {
      const token = localStorage.getItem("authToken");
      const borrowerId = localStorage.getItem("userId");
      const postData = {
        borrower_id: Number(borrowerId),
        inventory_id: Number(inventoryId),
        quantity: Number(quantity),
        start_date: moment(startDate).format("YYYY-MM-DD"),
        end_date: moment(endDate).format("YYYY-MM-DD"),
      };

      try {
        const response = await axios.post(
          `${apiURL}/api/order_item`,
          postData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        navigate("/profile");
      } catch (error) {
        console.error("Error:", error);
      }
    } else {
      setError(errorMessage);
    }
  };

  return (
    <div className="reservation">
      <div className="reservation__wrapper">
        <h2 className="reservation__title">Reserve Item</h2>
        {error && (
          <div className="reservation__notification">
            <span>Error:</span> {error}
            <button onClick={() => setError(null)}>X</button>
          </div>
        )}
        {availableRangeMessage.length > 0 ? (
          <div className="reservation__available-ranges">
            <h3 className="reservation__title">Available Booking Range:</h3>
            {availableRangeMessage.map((message, index) => (
              <p key={index} className="reservation__para">
                {message}
              </p>
            ))}
          </div>
        ) : (
          <div className="reservation__available-ranges">
            <h3 className="reservation__title">Available Booking Range:</h3>
            <p className="reservation__para">
              Item can be reserved only 1 month in advance.
            </p>
          </div>
        )}

        <div className="reservation__group">
          <div className="reservation__calendar">
            <h2 className="reservation__calendar-title">Select Start Date:</h2>
            <Calendar
              onChange={handleStartDateChange}
              value={startDate}
              minDate={new Date()}
              tileDisabled={({ date }) => {
                for (const availableDate of availability) {
                  if (moment(date).isSame(availableDate, "day")) {
                    return false;
                  }
                }
                return true;
              }}
            />
          </div>
          <div className="reservation__calendar">
            <h2 className="reservation__calendar-title">Select End Date:</h2>
            <Calendar
              onChange={handleEndDateChange}
              value={endDate}
              minDate={startDate}
              disabled={!startDate}
              tileDisabled={({ date }) => {
                for (const availableDate of availability) {
                  if (moment(date).isSame(availableDate, "day")) {
                    return false;
                  }
                }
                return true;
              }}
            />
          </div>
        </div>
        <div className="reservation__book">
          <Button
            btnType="submit"
            className="btn btn--book"
            btnContent="Confirm"
            handleButtonOnClick={handleBooking}
          />
        </div>
      </div>
    </div>
  );
};

export default ReservationPage;
