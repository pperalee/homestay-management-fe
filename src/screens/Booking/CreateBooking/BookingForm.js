import { useNavigate, useParams } from "react-router-dom";
import { getHomestay } from "../../../services/homestayManagementService";
import DatePicker from "react-date-picker";
import Modal from "../../../layout/components/Modal";
import { useRef } from "react";
import "./style.css";
import { useEffect, useState } from "react";
import { book } from "../../../services/booking";
import { toast, ToastContainer } from "react-toastify";
import { getDiscountsByHomestay } from "../../../services/discount";
import format from "date-fns/format";

const BookingForm = () => {
  const { homestayId } = useParams();
  const [homestay, setHomestay] = useState(null);
  //form
  const phone = useRef();
  const email = useRef();
  const people = useRef();
  const [deposit, setDeposit] = useState(0);
  const [money, setMoney] = useState(0);
  const note = useRef();
  const [checkin, setCheckin] = useState(new Date());
  const [checkout, setCheckout] = useState(new Date());
  //discount
  const [showModal, setShowModal] = useState(false);
  const [discountList, setDiscountList] = useState([]);
  const [discount, setDiscount] = useState(null);
  const [discountMoney, setDiscountMoney] = useState(0);

  const navigate = useNavigate();

  useEffect(() => {
    async function getData() {
      const response = await getHomestay(homestayId);
      if (response.status >= 400) {
        return <h5 className="text-center">Cannot find homestay to book</h5>;
      }
      if (response.data.homestay) {
        setHomestay(response.data.homestay);
      }
    }
    getData();
  }, []);
  const formatDate = (date) => {
    const format = `${
      date.getMonth() + 1
    }-${date.getDate()}-${date.getFullYear()}`;
    return new Date(format);
  };

  const numberIncludedDate = (
    checkin,
    checkout,
    discountCheckin,
    discountCheckout
  ) => {
    let result = 0;
    if (
      checkin < discountCheckout &&
      checkin > discountCheckin &&
      checkout > discountCheckout
    ) {
      result = (discountCheckout - checkin) / (60 * 60 * 24 * 1000); //ngoai khoang phai
    } else if (
      checkin < discountCheckin &&
      checkout < discountCheckout &&
      checkout > discountCheckin
    ) {
      result = (checkout - discountCheckin) / (60 * 60 * 24 * 1000); //ngoai khoang trai
    } else if (checkin < discountCheckin && checkout > discountCheckout) {
      result = (discountCheckout - discountCheckin) / (60 * 60 * 24 * 1000); // ngoai khoang ca hai ben
    } else {
      result = (checkout - checkin) / (60 * 60 * 24 * 1000); // trong khoang
    }
    return result;
  };

  useEffect(() => {
    async function getData() {
      const response = await getDiscountsByHomestay(homestayId, {
        params: {
          checkin,
          checkout,
        },
      });
      if (response.data) {
        setDiscountList(response.data.discounts);
      }
    }
    getData();
    var date =
      (formatDate(checkout) - formatDate(checkin)) / (60 * 60 * 24 * 1000);
    let money = (homestay?.price || 0) * date;
    setDiscountMoney(0);
    setDiscount(null);
    setMoney(money);
    setDeposit(money * 0.8);
  }, [checkin, checkout]);

  useEffect(() => {
    console.log({ discount });
    console.log({ money });
    if (discount) {
      const dayDiscount = numberIncludedDate(
        formatDate(checkin),
        formatDate(checkout),
        new Date(discount.checkin),
        new Date(discount.checkout)
      );

      setDiscountMoney(
        (dayDiscount * homestay?.price * discount.percentage) / 100
      );
      setDeposit((money - discountMoney) * 0.8);
    } else {
      setDeposit(money * 0.8);
      setDiscountMoney(0);
    }
  }, [discount]);

  useEffect(() => {
    setDeposit((money - discountMoney) * 0.8);
  }, [money, discountMoney]);

  const handleBooking = async (e) => {
    e.preventDefault();
    const data = {
      phone: phone.current.value,
      email: email.current.value,
      people: people.current.value,
      deposit: deposit,
      note: note.current.value,
      checkin: formatDate(checkin),
      checkout: formatDate(checkout),
      money: money - discountMoney,
      discountMoney: discountMoney,
      discount: discount?._id,
    };

    if (data.checkin >= data.checkout) {
      toast.error("Checkin date must be less than checkout date");
      return;
    }

    const response = await book(homestayId, data);
    if (response.status >= 400) {
      toast.error(
        "Cannot book this homestay! Please check your infomation and homestay availability"
      );
      return;
    }
    if (response.data.booking) {
      toast.success("Booking successfully");
      setTimeout(() => {
        navigate("/bookings/your-bookings");
      }, 1500);
    }
  };

  //modal
  const showModalHandler = () => {
    setShowModal(true);
  };
  const hideModalHandler = () => {
    setShowModal(false);
  };

  const handleAddDiscount = (discount) => {
    setDiscount(discount);
  };
  return (
    <>
      <ToastContainer />
      <div
        class="room-booking ptb-100 white_bg"
        style={{ marginTop: "50px", fontFamily: "inherit" }}
      >
        <div className="container">
          <div style={{ width: "70%", marginLeft: "15%" }}>
            <div class="booking_form">
              <div>
                <h3>Booking Now</h3>
                <p>You shoud deposit 80% of total money</p>
              </div>
              <div class="room-booking-box">
                <form onSubmit={handleBooking}>
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
                        required
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
                        required
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
                        required
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
                      }}
                      ref={note}
                    ></textarea>
                  </div>
                  <div
                    style={{
                      width: "150px",
                      backgroundColor: "#7D9BF6",
                      padding: "6px 10px",
                      borderRadius: "10px",
                      margin: "auto",
                    }}
                    onClick={showModalHandler}
                  >
                    Add discount
                  </div>
                  {discount && (
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
                          Discount: {discount.percentage} %
                        </p>
                        <p className="text-center">
                          {format(new Date(discount.checkin), "dd/MM/yyyy")}{" "}
                          {" => "}
                          {format(new Date(discount.checkout), "dd/MM/yyyy")}
                        </p>
                      </div>
                    </div>
                  )}
                  <div>Money: {money}</div>
                  <div>Discount: {discountMoney}</div>
                  <div>Total after discount: {money - discountMoney}</div>
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
                      Book homestay
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      {showModal && (
        <Modal onClose={hideModalHandler}>
          <form>
            <h5 className="text-center">Discount</h5>
            <div className="form-group">
              {discountList.map((discount, index) => {
                return (
                  <div className="row" style={{ paddingLeft: "35px" }}>
                    <div className="col-md-1" style={{ paddingTop: "45px" }}>
                      <input
                        class="form-check-input"
                        type="radio"
                        id="inlineCheckbox1"
                        name="optradio"
                        value={discount._id}
                        style={{ margin: "auto" }}
                        onChange={() => handleAddDiscount(discount)}
                      />
                    </div>
                    <div
                      className="card"
                      style={{
                        margin: "10px",
                        width: "80%",
                      }}
                    >
                      <p className="text-center">{discount.percentage} %</p>
                      <p className="text-center">
                        {format(new Date(discount.checkin), "dd/MM/yyyy")}{" "}
                        {" => "}
                        {format(new Date(discount.checkout), "dd/MM/yyyy")}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
            <div
              style={{
                margin: "25px auto",
                alignItems: "center",
              }}
            ></div>
          </form>
        </Modal>
      )}
    </>
  );
};
export default BookingForm;
