import React, { useEffect, useState } from 'react';
import { useContext } from 'react';
import { UserContext } from '../../App';

const Booking = () => {
    const [userInfo , setUserInfo] = useState([]);
    const [loggedInUser, setLoggedInUser] = useContext(UserContext)
    useEffect(() => {
           fetch('http://localhost:4200/bookings?email=' + loggedInUser.email, {
             method: "GET",
             headers: {
               "Content-Type": "application/json",
               "Authorization" : `Bearer ${sessionStorage.getItem('token')}`
             },
           })
             .then((res) => res.json())
             .then((data) => setUserInfo(data));
    }, []);
    console.log(userInfo);
   
    return (
      <div>
        <h1>room: {userInfo.length}</h1>
        {userInfo.map((pd) => (
          <li>
            Name:{pd.name} chackin:{" "}
            {new Date(pd.chackIn).toDateString("dd/MM/yyyy")} chack-out:
            {new Date(pd.chackOut).toDateString("dd/MM/yyyy")}
          </li>
        ))}
      </div>
    );
};

export default Booking;