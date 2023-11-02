import { useParams } from "react-router-dom";
import DatePicker from "react-date-picker";
import { useRef } from "react";
import { useEffect, useState } from "react";
import {
  editBook,
  getBooking,
  deleteServiceBooking,
} from "../../../services/booking";
import { toast, ToastContainer } from "react-toastify";
import classes from "../../ManageHomestay/HomestayPage/style.module.css";
import Modal from "../../../layout/components/Modal";
import { Link } from "react-router-dom";
import format from "date-fns/format";

const EditBooking = () => {
  const { id } = useParams();
  const [homestay, setHomestay] = useState(null);
  const [booking, setBooking] = useState(null);
  const [services, setServices] = useState([]); //service of homestay
  const [servicesBooking, setServicesBooking] = useState([]);
  const [serviceMoney, setServiceMoney] = useState(0);

  const phone = useRef();
  const email = useRef();
  const people = useRef();
  const [deposit, setDeposit] = useState(0);
  const note = useRef();
  const status = useRef();
  const [statusR, setStatusR] = useState(null);
  const [checkin, setCheckin] = useState(new Date());
  const [checkout, setCheckout] = useState(new Date());
  const [total, setTotal] = useState(0);

  const serviceBookingId = useRef();
  const serviceBookingQuantity = useRef();

  const [showModal, setShowModal] = useState(false);
  const listBokkingLink = "/bookings/" + homestay?._id;

  const formatDate = (date) => {
    const format = `${
      date.getMonth() + 1
    }-${date.getDate()}-${date.getFullYear()}`;
    return new Date(format);
  };

  //load data
  useEffect(() => {
    async function getData() {
      const response = await getBooking(id);
      if (response.status >= 400) {
        return <h5 className="text-center">Cannot find homestay to book</h5>;
      }
      if (response.data.booking) {
        const booking = response.data.booking;
        setServicesBooking(response.data.servicesBooking);
        setHomestay(booking.homestay);
        setBooking(booking);
        setServices(response.data.services);
        phone.current.value = booking.phone;
        email.current.value = booking.email;
        people.current.value = booking.people;
        note.current.value = booking.note;
        status.current.value = booking.status;
        setDeposit(booking.deposit);
        setCheckin(new Date(booking.checkin));
        setCheckout(new Date(booking.checkout));
        setTotal(booking.money);
        setStatusR(booking.status);
      }
    }
    getData();
  }, []);

  //set total
  useEffect(() => {
    var date =
      (formatDate(checkout) - formatDate(checkin)) / (60 * 60 * 24 * 1000);
    const money = (homestay?.price || 0) * date;
    setTotal(money + serviceMoney);
  }, [checkin, checkout, serviceMoney]);

  const handleEditBooking = async (e) => {
    e.preventDefault();
    const data = {
      homestay: homestay._id,
      phone: phone.current.value,
      email: email.current.value,
      people: people.current.value,
      status: status.current.value,
      deposit: deposit,
      note: note.current.value,
      checkin: formatDate(checkin),
      checkout: formatDate(checkout),
      money: total,
      services: servicesBooking,
    };

    const response = await editBook(id, data);
    if (response.status >= 400) {
      toast.error("Cannot edit this booking! Please check input infomation");
      return;
    }
    if (response.data.booking) {
      toast.success("Edit booking successfully");
    }
  };
  //add service
  const addServiceHandler = (e) => {
    e.preventDefault();
    const tmp = services.find((s) => s._id === serviceBookingId.current.value);
    const quantity = serviceBookingQuantity.current.value;
    const money = tmp.price * quantity;
    const data = {
      _id: "new",
      service: tmp,
      quantity,
      money,
    };
    const hasPreItem = servicesBooking.some(
      (service) => service.service._id === data.service._id
    );
    if (hasPreItem) {
      const newArr = servicesBooking.map((service) => {
        if (service.service._id === data.service._id) {
          service.quantity =
            parseInt(service.quantity) + parseInt(data.quantity);
          service.money = service.quantity * service.service.price;
        }
        return service;
      });
      setServicesBooking(newArr);
    } else {
      setServicesBooking((prev) => [...prev, data]);
    }
    setShowModal(false);
  };

  //remove service
  const removeService = async (serviceId, serviceBookingId) => {
    setServicesBooking((prev) => {
      const arr = prev.filter((service) => service.service._id !== serviceId);
      return arr;
    });
    if (serviceBookingId !== "new") {
      const response = await deleteServiceBooking(serviceBookingId);
    }
  };

  //set service money
  useEffect(() => {
    if (servicesBooking.length) {
      const tmp = servicesBooking.reduce((acc, serviceBooking) => {
        return acc + serviceBooking.money;
      }, 0);
      setServiceMoney(tmp);
    } else {
      setServiceMoney(0);
    }
  }, [servicesBooking]);

  //modal
  const showModalHandler = () => {
    setShowModal(true);
  };
  const hideModalHandler = () => {
    setShowModal(false);
  };
  console.log({ statusR });
  return (
    <>
      <ToastContainer />
      <div
        class="room-booking ptb-100 white_bg"
        style={{ marginTop: "50px", fontFamily: "inherit" }}
      >
        <div className="container">
          <div className="row">
            <div className="col-md-9">
              <div style={{ width: "90%" }}>
                <div class="booking_form">
                  <div>
                    <h3>Booking </h3>
                    <p>Created by: {booking?.user?.name}</p>
                  </div>
                  <div class="room-booking-box">
                    <form onSubmit={handleEditBooking}>
                      <div class="booking-box1 mb-15 fix">
                        <div class="booking-filed">
                          <input
                            type="text"
                            placeholder="Email"
                            style={{
                              width: "100%",
                              marginTop: "20px",
                              padding: "10px",
                              borderRadius: "10px",
                              color: "black",
                            }}
                            ref={email}
                          />
                        </div>
                        <div class="booking-filed">
                          <input
                            type="text"
                            placeholder="Phone"
                            style={{
                              width: "100%",
                              marginTop: "20px",
                              padding: "10px",
                              borderRadius: "10px",
                              color: "black",
                            }}
                            ref={phone}
                          />
                        </div>
                      </div>
                      <div class="booking-box1 mb-15 fix">
                        <div class="booking-filed">
                          <input
                            type="text"
                            placeholder="People"
                            style={{
                              width: "100%",
                              marginTop: "20px",
                              padding: "10px",
                              borderRadius: "10px",
                              color: "black",
                            }}
                            ref={people}
                          />
                        </div>
                        <div class="booking-filed">
                          <input
                            type="Deposit"
                            placeholder="Deposit"
                            style={{
                              width: "100%",
                              marginTop: "20px",
                              padding: "10px",
                              borderRadius: "10px",
                              color: "black",
                            }}
                            value={deposit}
                          />
                        </div>
                      </div>
                      <div class="select-book room  mb-15 fix">
                        <select
                          name="book"
                          style={{
                            width: "100%",
                            marginTop: "20px",
                            padding: "10px",
                            borderRadius: "10px",
                            color: "black",
                          }}
                        >
                          <option value="" selected>
                            Homestay: {homestay?.name}
                          </option>
                        </select>
                      </div>
                      <div class="select-book room  mb-15 fix">
                        {statusR === "requested" && (
                          <select
                            name="status"
                            style={{
                              width: "100%",
                              marginTop: "20px",
                              padding: "10px",
                              borderRadius: "10px",
                              color: "black",
                            }}
                            ref={status}
                          >
                            <option value="requested">Status: Requested</option>
                            <option value="accepted">Status: Accepted</option>
                            <option value="declined">Status: Declined</option>
                          </select>
                        )}
                        {statusR === "accepted" && (
                          <select
                            name="status"
                            style={{
                              width: "100%",
                              marginTop: "20px",
                              padding: "10px",
                              borderRadius: "10px",
                              color: "black",
                            }}
                            ref={status}
                          >
                            <option value="accepted">Status: Accepted</option>
                            <option value="stayed">Status: Stayed</option>
                          </select>
                        )}
                        {statusR === "stayed" && (
                          <select
                            name="status"
                            style={{
                              width: "100%",
                              marginTop: "20px",
                              padding: "10px",
                              borderRadius: "10px",
                              color: "black",
                            }}
                            ref={status}
                          >
                            <option value="stayed">Status: Stayed</option>
                          </select>
                        )}
                        {statusR === "declined" && (
                          <select
                            name="status"
                            style={{
                              width: "100%",
                              marginTop: "20px",
                              padding: "10px",
                              borderRadius: "10px",
                              color: "black",
                            }}
                            ref={status}
                          >
                            <option value="declined">Status: Declined</option>
                          </select>
                        )}
                        {statusR === "reviewed" && (
                          <select
                            name="status"
                            style={{
                              width: "100%",
                              marginTop: "20px",
                              padding: "10px",
                              borderRadius: "10px",
                              color: "black",
                            }}
                            ref={status}
                          >
                            <option value="reviewed">Status: reviewed</option>
                          </select>
                        )}
                        {statusR == null && (
                          <select
                            name="status"
                            style={{
                              width: "100%",
                              marginTop: "20px",
                              padding: "10px",
                              borderRadius: "10px",
                              color: "black",
                            }}
                            ref={status}
                          >
                            <option value="requested">Status: Requested</option>
                            <option value="accepted">Status: Accepted</option>
                            <option value="stayed">Status: Stayed</option>
                            <option value="declined">Status: Declined</option>
                          </select>
                        )}
                      </div>
                      <div class="select-book room  mb-15 fix">
                        <select
                          name="book"
                          style={{
                            width: "100%",
                            marginTop: "20px",
                            padding: "10px",
                            borderRadius: "10px",
                            color: "black",
                          }}
                        >
                          <option value="" selected>
                            Price per day: {homestay?.price || 0}
                          </option>
                        </select>
                      </div>
                      <div class="booking-box2 mb-15 fix">
                        <div
                          style={{
                            marginTop: "15px",
                            borderRadius: "15px",
                            float: "left",
                            width: "50%",
                          }}
                        >
                          <DatePicker
                            className="form-control"
                            placeholder="Arrive Date"
                            onChange={setCheckin}
                            value={checkin}
                          />
                        </div>
                        <div
                          style={{
                            marginTop: "15px",
                            borderRadius: "15px",
                            float: "left",
                            width: "45%",
                            marginLeft: "30px",
                          }}
                        >
                          <DatePicker
                            className="form-control"
                            placeholder="Arrive Date"
                            onChange={setCheckout}
                            value={checkout}
                            popperPlacement="bottom-end"
                          />
                        </div>
                      </div>
                      <div class="booking-comment fix">
                        <textarea
                          placeholder="Note"
                          style={{
                            width: "100%",
                            marginTop: "15px",
                            padding: "10px",
                            borderRadius: "10px",
                            color: "black",
                          }}
                          ref={note}
                        ></textarea>
                      </div>

                      {booking?.discount && (
                        <div
                          class="booking-comment fix"
                          style={{ marginTop: "15px" }}
                        >
                          <div
                            className="card"
                            style={{
                              width: "100%",
                            }}
                          >
                            <p className="text-center">
                              Discount: {booking.discount.percentage} %
                            </p>
                            <p className="text-center">
                              {format(
                                new Date(booking.discount.checkin),
                                "dd/MM/yyyy"
                              )}{" "}
                              {" => "}
                              {format(
                                new Date(booking.discount.checkout),
                                "dd/MM/yyyy"
                              )}
                            </p>
                          </div>
                        </div>
                      )}
                      <h5 style={{ marginTop: "6px" }}>
                        Services: {servicesBooking.length || 0}
                      </h5>
                      {servicesBooking.map((service) => (
                        <div
                          className="card"
                          style={{ marginTop: "10px", padding: "6px" }}
                        >
                          <div className="row">
                            <div className="col-md-6">
                              <p>{service.service.name}</p>
                              <p>Price: {service.service.price} </p>
                            </div>
                            <div
                              className="col-md-3"
                              style={{ margin: "auto 0px" }}
                            >
                              <p>x {service.quantity}</p>
                            </div>
                            <div
                              className="col-md-3"
                              style={{ margin: "auto 0px" }}
                            >
                              <button
                                className="btn-primary btn-block"
                                style={{
                                  borderRadius: "10px",
                                }}
                                onClick={async (e) => {
                                  e.preventDefault();
                                  await removeService(
                                    service.service._id,
                                    service._id
                                  );
                                }}
                              >
                                Delete
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                      <h5 style={{ marginTop: "6px" }}>
                        Services Money: {serviceMoney || 0}
                      </h5>
                      <h5 style={{ marginTop: "6px" }}>Total: {total || 0}</h5>
                      <div
                        style={{
                          margin: "25px auto",
                          alignItems: "center",
                        }}
                      >
                        <button
                          type="submit"
                          style={{
                            padding: "6px 10px",
                            borderRadius: "10px",
                            backgroundColor: "#7D9BF6",
                            color: "white",
                          }}
                        >
                          Update Booking
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-3">
              <Link to={listBokkingLink} style={{ margin: "20px" }}>
                Back to booking list
              </Link>
              {statusR !== "requested" && statusR != null && (
                <button
                  className="btn-primary btn-block"
                  style={{ borderRadius: "10px", padding: "4px" }}
                  onClick={showModalHandler}
                >
                  Add service
                </button>
              )}
            </div>
            {showModal && (
              <Modal onClose={hideModalHandler}>
                {services.length ? (
                  <form onSubmit={addServiceHandler}>
                    <div className="form-group">
                      <label for="name">Service Name</label>
                      <select
                        name="city"
                        class="form-control"
                        id="type"
                        style={{ borderRadius: "15px" }}
                        ref={serviceBookingId}
                      >
                        {services.map((service) => (
                          <option key={service._id} value={service._id}>
                            {service.name}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="form-group">
                      <label for="number">Quantity</label>
                      <input
                        style={{ borderRadius: "15px" }}
                        type="Number"
                        name="number"
                        className="form-control"
                        ref={serviceBookingQuantity}
                        required
                      />
                    </div>
                    <div className={classes.actions}>
                      <button className={classes["button--alt"]}>
                        Add service
                      </button>
                    </div>
                  </form>
                ) : (
                  <p className="text-center">
                    This homestay don't have any service!
                  </p>
                )}
              </Modal>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default EditBooking;
