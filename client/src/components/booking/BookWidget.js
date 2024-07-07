import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import { addDays, addWeeks } from "date-fns";
import TextField from '@mui/material/TextField';
// import DateRangePicker from "@material-ui/lab/DateRangePicker";
// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Box from '@mui/material/Box';
import { DateRangePicker } from 'rsuite';
import { getAllAvailable, postBookingDetails } from "../../actions/booking";
import "../../styles/BookWidget.scss";

/* Have to redo redux, store local form here and ONLY update onSubmission... */

const { beforeToday } = DateRangePicker;
const BookWidget = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();
  const [showInfo, setShowInfo] = useState(false);
  const [formData, setFormData] = useState({
    dates: [new Date(), addDays(new Date(), 7)],
    adults: 1,
    children: 0,
  });
  const [selectedDateRange, setSelectedDateRange] = useState([
    {
      startDate: new Date(),
      endDate: null,
      key: 'selection'
    }
  ]);
  const toggleMobileDisplay = () => {
    setShowInfo(!showInfo);
  };

  function getWeeksAfter(date, amount) {
    return date ? addWeeks(date, amount) : undefined;
  }

  const updateAdultQuantity = (val) => {
    if (formData.adults === 1 && val === -1) return;
    if (formData.adults === 5 && val === 1) return;
    setFormData({ ...formData, adults: formData.adults + val });
  };
  const updateChildrenQuantity = (val) => {
    if (formData.children === 0 && val === -1) return;
    if (formData.children === 5 && val === 1) return;
    setFormData({ ...formData, children: formData.children + val });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { adults, children, dates } = formData;
    if (location.pathname !== "/booking") {
      history.push("/booking");
    }
    dispatch(getAllAvailable({ adults, children, dates }));
    // have to include this information, or retrieve it from the state, to the create booking request
    dispatch(postBookingDetails({ adults, children, dates }));
  };
  return (
    <div className={`BookWidget ${showInfo ? "active" : ""}`}>
      <form onSubmit={handleSubmit}>
        <div className="date">   
          {/* <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateRangePicker
              disablePast
              maxDate={getWeeksAfter(formData.dates[0], 4)}
              startText="Check-in"
              endText="Check-out"
              value={formData.dates}
              onChange={(newValue) => {
                if (!newValue.includes(null)) {
                  setFormData({
                    ...formData,
                    dates: newValue,
                  });
                }
              }}
              renderInput={(startProps, endProps) => (
                <React.Fragment>
                  <TextField {...startProps} />
                  <Box sx={{ mx: 2 }}> to </Box>
                  <TextField {...endProps} />
                </React.Fragment>
              )}
            />
          </LocalizationProvider> */}
          <DateRangePicker
            shouldDisableDate={beforeToday()}
            size="lg"
            placeholder="Select Date Range"
            onChange={(value)=>{
              console.log(value);
              if(value){
                setFormData({
                  ...formData,
                  dates: value,
                });
              }
            }}
          />
        </div>
        <div className="guest">
          <div className="adults">
            <label>Adults</label>
            <div className="guest-select">
              <div
                className="btn-sm contrast"
                name="adults"
                onClick={() => updateAdultQuantity(1)}
              >
                <i className="fas fa-plus"></i>
              </div>
              <span>{formData.adults}</span>
              <div
                className="btn-sm contrast"
                name="adults"
                onClick={() => {
                  updateAdultQuantity(-1);
                }}
              >
                <i className="fas fa-minus"></i>
              </div>
            </div>
          </div>
          <div className="children">
            <label>Children</label>
            <div className="guest-select">
              <div
                className="btn-sm contrast"
                name="children"
                onClick={() => {
                  updateChildrenQuantity(1);
                }}
              >
                <i className="fas fa-plus"></i>
              </div>
              <span>{formData.children}</span>
              <div
                className="btn-sm contrast"
                name="children"
                onClick={() => {
                  updateChildrenQuantity(-1);
                }}
              >
                <i className="fas fa-minus"></i>
              </div>
            </div>
          </div>
        </div>

        <button className="btn">Check Availability</button>
        <i
          className={`mobile-toggle fas fa-chevron-${showInfo ? "up" : "down"}`}
          onClick={toggleMobileDisplay}
        ></i>
      </form>
    </div>
  );
};

export default BookWidget;
