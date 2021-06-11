import React, { useContext, useState } from "react";
import { Link, useParams } from "react-router-dom";
import "date-fns";
import Grid from "@material-ui/core/Grid";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import { UserContext } from "../../App";
import { Button } from "@material-ui/core";
import Booking from "../Booking/Booking";

const Book = () => {
  const { bedType } = useParams();
  const [loggedInUser, setLoggedInUser] = useContext(UserContext);

  const [selectedDate, setSelectedDate] = useState({
    chackIn: new Date(),
    chackOut: new Date(),   
  });

  const handleChackInDate = (date) => {
    const newDates = { ...selectedDate };
    newDates.chackIn = date;
    setSelectedDate(newDates);
  };

  const handleChackOutDate = (date) => {
    const newDates = { ...selectedDate };
    newDates.chackOut = date;
    setSelectedDate(newDates);
  };

  const hendleSubmit = () => {
      const newBooking = {...loggedInUser , ...selectedDate}
      fetch('http://localhost:4200/addBooking', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newBooking),
      })
        .then(res => res.json())
        .then(result => {
          console.log(result);
        });
  }
  return (
    <div style={{ textAlign: "center" }}>
      <h1>Hello, {loggedInUser.name}! Let's book a {bedType} Room.</h1>
      <p>
        Want a <Link to="/home">different room?</Link>
      </p>

      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <Grid container justify="space-around">
          <KeyboardDatePicker
            format="dd/MM/yyyy"
            margin="normal"
            id="date-picker-inline"
            label="Chack in Date"
            value={selectedDate.chackIn}
            onChange={handleChackInDate}
            KeyboardButtonProps={{
              "aria-label": "change date",
            }}
          />
          <KeyboardDatePicker
            margin="normal"
            id="date-picker-dialog"
            label="chack out Date"
            format="dd/MM/yyyy"
            value={selectedDate.chackOut}
            onChange={handleChackOutDate}
            KeyboardButtonProps={{
              "aria-label": "change date",
            }}
          />
        </Grid>
        <Button onClick={hendleSubmit} variant="contained" color="primary">
          submit
        </Button>
      </MuiPickersUtilsProvider>

        <Booking></Booking>
    </div>
  );
};

export default Book;
