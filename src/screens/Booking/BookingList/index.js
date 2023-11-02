import { useEffect, useRef, useState } from "react";
import Table from "react-bootstrap/Table";
import { useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { getBookingListByHomestay } from "../../../services/booking";
import { format } from "date-fns";
import { Link } from "react-router-dom";
import NavBottom from "../../../layout/components/NavBottom";

const BookingList = () => {
  const [tab, setTab] = useState("requested");
  const username = useRef("");
  const filter = useRef("");
  const [bookings, setBookings] = useState([]);
  const [homestayName, setHomestayName] = useState("");

  const { homestayId } = useParams();
  const homestayLink = `/homestays/${homestayId}`;

  const tabHandler = (tabClick) => {
    setTab(tabClick);
  };

  useEffect(() => {
    async function getData() {
      await getBookingList();
    }
    getData();
  }, [tab]);

  const submitHandler = (e) => {
    e.preventDefault();
    async function getData() {
      await getBookingList();
    }
    getData();
  };

  const getBookingList = async () => {
    let query =
      process.env.REACT_APP_BACK_END + "/bookings/homestay/" + homestayId;
    if (tab) {
      query = query + "?tab=" + tab;
    }
    if (username.current.value) {
      query = query + "&&username=" + username.current.value;
    }
    if (filter.current.value) {
      query = query + "&&time=" + filter.current.value;
    }
    const response = await getBookingListByHomestay(query);

    if (response.status >= 400) {
      toast.error("Something went wrong, please try again");
    }

    if (response.status === 200) {
      setBookings(response.data.bookingList);
      setHomestayName(response.data.homestay.name);
    }
  };
  return (
    <>
      <ToastContainer />
      <div class="container">
        <h2 class="text-center mb-5 mt-5 text-info">
          <Link class="text-info" to={homestayLink}>
            {homestayName}
          </Link>
          - Booking Listings
        </h2>

        <Table stripped bordered hover size="md">
          <thead>
            <tr>
              {tab === "requested" ? (
                <th
                  scope="col"
                  className="text-center"
                  onClick={(e) => {
                    e.preventDefault();
                    tabHandler("requested");
                  }}
                  style={{ backgroundColor: "rgb(199, 176, 253)" }}
                >
                  Requested List
                </th>
              ) : (
                <th
                  scope="col"
                  className="text-center"
                  onClick={(e) => {
                    e.preventDefault();
                    tabHandler("requested");
                  }}
                >
                  Requested List
                </th>
              )}
              {tab === "accepted" ? (
                <th
                  scope="col"
                  className="text-center"
                  onClick={(e) => {
                    e.preventDefault();
                    tabHandler("accepted");
                  }}
                  style={{ backgroundColor: "rgb(199, 176, 253)" }}
                >
                  Accepted List
                </th>
              ) : (
                <th
                  scope="col"
                  className="text-center"
                  onClick={(e) => {
                    e.preventDefault();
                    tabHandler("accepted");
                  }}
                >
                  Accepted List
                </th>
              )}
              {tab === "stayed" ? (
                <th
                  scope="col"
                  className="text-center"
                  onClick={(e) => {
                    e.preventDefault();
                    tabHandler("stayed");
                  }}
                  style={{ backgroundColor: "rgb(199, 176, 253)" }}
                >
                  Stayed List
                </th>
              ) : (
                <th
                  scope="col"
                  className="text-center"
                  onClick={(e) => {
                    e.preventDefault();
                    tabHandler("stayed");
                  }}
                >
                  Stayed List
                </th>
              )}
              {tab === "declined" ? (
                <th
                  scope="col"
                  className="text-center"
                  onClick={(e) => {
                    e.preventDefault();
                    tabHandler("declined");
                  }}
                  style={{ backgroundColor: "rgb(199, 176, 253)" }}
                >
                  Declined List
                </th>
              ) : (
                <th
                  scope="col"
                  className="text-center"
                  onClick={(e) => {
                    e.preventDefault();
                    tabHandler("declined");
                  }}
                >
                  Declined List
                </th>
              )}
            </tr>
          </thead>
        </Table>

        <div class="mb-5 ">
          <form onSubmit={submitHandler}>
            <div class="input-group">
              <input
                name="username"
                class="form-control rounded"
                placeholder="Name"
                type="text"
                style={{ width: "40%" }}
                ref={username}
              />
              <select
                name="time"
                class="form-control form-selec"
                id="type"
                ref={filter}
              >
                <option value="">All</option>
                <option value="thisweek">This week</option>
                <option value="thismonth">This month</option>
              </select>
              <button class="btn btn-outline-primary" type="submit">
                Search
              </button>
            </div>
          </form>
        </div>

        <Table stripped bordered hover size="sm">
          <thead className="thead-dark text-center">
            <tr>
              <th scope="col">User</th>
              <th scope="col">Phone</th>
              <th scope="col">People</th>
              <th scope="col">Checkin</th>
              <th scope="col">Checkout</th>
              <th scope="col">Money</th>
              <th scope="col">Deposit</th>
              <th scope="col">Status</th>
              <th scope="col">More</th>
            </tr>
          </thead>
          <tbody>
            {bookings?.map((booking) => {
              const url = `/bookings/${booking._id}/edit`;
              return (
                <tr key={booking._id} style={{ paddingTop: "6px" }}>
                  <td style={{ paddingTop: "10px" }} className="text-center">
                    {booking.user.name}
                  </td>
                  <td style={{ paddingTop: "10px" }} className="text-center">
                    {booking.phone}
                  </td>
                  <td style={{ paddingTop: "10px" }} className="text-center">
                    {booking.people}
                  </td>
                  <td style={{ paddingTop: "10px" }} className="text-center">
                    {format(new Date(booking.checkin), "dd/MM/yyyy")}
                  </td>
                  <td style={{ paddingTop: "10px" }} className="text-center">
                    {format(new Date(booking.checkout), "dd/MM/yyyy")}
                  </td>
                  <td style={{ paddingTop: "10px" }} className="text-center">
                    {booking.money}
                  </td>
                  <td style={{ paddingTop: "10px" }} className="text-center">
                    {booking.deposit}
                  </td>
                  <td style={{ paddingTop: "10px" }} className="text-center">
                    {booking.status}
                  </td>
                  <td style={{ paddingTop: "10px" }} className="text-center">
                    <Link to={url}>More</Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </div>
      <NavBottom />
    </>
  );
};

export default BookingList;
