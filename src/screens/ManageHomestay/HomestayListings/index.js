import { useState } from "react";
import HomestayInList from "../../../components/HomestayInList/homestayInList";
import { useEffect, useCallback } from "react";
import { getCookie } from "../../../constant/request";
import { getListHomestay } from "../../../services/homestayManagementService";
const HomestayListings = () => {
  const userid = getCookie("userid");
  const [homestays, setHomestays] = useState([]);
  const [loading, setLoading] = useState(true);
  const [bookings, setBookings] = useState([]);
  useEffect(() => {
    async function getData() {
      const response = await getListHomestay(userid);
      setHomestays(response.data.homestays);
      setBookings(response.data.bookings);
      setLoading(false);
    }
    getData();
  }, []);

  var list = [];
  for (var i = 0; i < homestays.length; i++) {
    let newBooking = false;
    if (bookings.some((book) => book === homestays[i]._id)) {
      newBooking = true;
    }
    list.push(
      <HomestayInList
        key={homestays[i]._id}
        id={homestays[i]._id}
        name={homestays[i].name}
        price={homestays[i].price}
        address={homestays[i].address}
        people={homestays[i].people}
        pool={homestays[i].pool}
        bookingNumber={homestays[i].bookingNumber}
        rate={homestays[i].rate}
        newBooking={newBooking}
      />
    );
  }
  if (loading) {
    return <p className="text-center">Loading...</p>;
  }
  return (
    <>
      <div className="container">
        <h1 className="text-center mb-6" style={{ margin: "15px" }}>
          Homestay listings
        </h1>
        <div className="row">{list}</div>
      </div>
    </>
  );
};
export default HomestayListings;
