import classes from "../ManageHomestay/HomestayPage/style.module.css";
import Modal from "../../layout/components/Modal";
import DatePicker from "react-date-picker";
import { useEffect, useState } from "react";
import { getListHomestay } from "../../services/homestayManagementService";
import { getCookie } from "../../constant/request";
import {
  createDiscount,
  deactivateDiscount,
  getListDiscount,
} from "../../services/discount";
import { ToastContainer, toast } from "react-toastify";
import DiscountCard from "./DiscountCard";
import NavBottom from "../../layout/components/NavBottom";
const Discount = () => {
  const userid = getCookie("userid");
  const [showModal, setShowModal] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [percentage, setPercentage] = useState(0);
  const [checkin, setCheckin] = useState(new Date());
  const [checkout, setCHeckout] = useState(new Date());
  const [homestays, setHomestays] = useState([]);
  const [homestaysApply, setHomestaysApply] = useState([]);
  const [activeDisounts, setActiveDiscounts] = useState([]);
  const [inactiveDisounts, setInactiveDiscounts] = useState([]);

  useEffect(() => {
    async function getData() {
      const responseDiscount = await getListDiscount();
      if (responseDiscount.status === 200) {
        setActiveDiscounts(responseDiscount.data.activeDiscounts);
        setInactiveDiscounts(responseDiscount.data.inactiveDiscounts);
      }
      const response = await getListHomestay(userid);
      setHomestays(response.data.homestays);
    }
    getData();
  }, []);

  const formatDate = (date) => {
    const format = `${
      date.getMonth() + 1
    }-${date.getDate()}-${date.getFullYear()}`;
    return new Date(format);
  };
  //modal
  const showModalHandler = () => {
    setShowModal(true);
  };
  const hideModalHandler = () => {
    setShowModal(false);
    setHomestaysApply([]);
  };

  const handleOnChange = (id) => {
    if (homestaysApply.includes(id)) {
      const tmp = homestaysApply.filter((item) => item !== id);
      setHomestaysApply(tmp);
    } else {
      homestaysApply.push(id);
    }
  };

  const addDiscountHandler = async (e) => {
    e.preventDefault();
    const data = {
      percentage,
      quantity,
      checkin: formatDate(checkin),
      checkout: formatDate(checkout),
      homestays: homestaysApply,
    };
    if (data.checkin >= data.checkout) {
      toast.error("Checkin date must be less than checkout date");
      return;
    }
    const response = await createDiscount(data);
    if (response.status >= 400) {
      toast.error("Cannot create discount!");
    } else {
      setActiveDiscounts((prev) => [...prev, response.data.discount]);
      toast.success("Create discount successfully!");
      setShowModal(false);
    }
  };

  const handleDeactivate = async (id) => {
    console.log({ id });
    const response = await deactivateDiscount(id);
    if (response.status >= 400) {
      toast.error("Cannot create discount!");
    } else {
      toast.success("Deactivate successfully!");
      const discount = activeDisounts.filter((discount) => discount._id === id);
      setActiveDiscounts((prev) =>
        prev.filter((discount) => discount._id !== id)
      );
      setInactiveDiscounts((prev) => [...prev, ...discount]);
    }
  };
  return (
    <>
      <ToastContainer />
      <div className="container">
        <h2 className="text-center mb-6" style={{ margin: "15px" }}>
          Discounts
        </h2>
        <div className={classes.actions}>
          <button
            className={classes["button--alt"]}
            style={{ marginBottom: "20px" }}
            onClick={(e) => {
              e.preventDefault();
              setShowModal(true);
            }}
          >
            Add discount
          </button>
        </div>
        <p className="text-center">List active discounts</p>
        <div className="row">
          {activeDisounts?.map((discount) => (
            <DiscountCard
              key={discount._id}
              id={discount._id}
              quantity={discount.quantity}
              used={discount.used}
              checkin={discount.checkin}
              checkout={discount.checkout}
              percentage={discount.percentage}
              homestays={discount.homestays}
              active={true}
              onDeactivate={handleDeactivate}
            />
          ))}
        </div>
        <p className="text-center">List inactive discounts</p>
        <div className="row">
          {inactiveDisounts?.map((discount) => (
            <DiscountCard
              key={discount._id}
              id={discount._id}
              quantity={discount.quantity}
              used={discount.used}
              checkin={discount.checkin}
              checkout={discount.checkout}
              percentage={discount.percentage}
              homestays={discount.homestays}
              active={false}
            />
          ))}
        </div>
      </div>
      {showModal && (
        <Modal onClose={hideModalHandler}>
          <form onSubmit={addDiscountHandler}>
            <h5 className="text-center">Discount</h5>
            <div className="form-group">
              <label for="number">Quantity: </label>
              <input
                style={{ borderRadius: "15px" }}
                type="Number"
                name="comment"
                className="form-control"
                min="1"
                onChange={(e) => {
                  e.preventDefault();
                  setQuantity(e.target.value);
                }}
                value={quantity}
                required
              />
            </div>
            <div className="form-group">
              <label for="number">Percentage: </label>
              <input
                style={{ borderRadius: "15px" }}
                type="Number"
                name="comment"
                className="form-control"
                onChange={(e) => {
                  e.preventDefault();
                  setPercentage(e.target.value);
                }}
                value={percentage}
                min="1"
                max="100"
                required
              />
            </div>
            <div className="form-group">
              <label for="number">Homestays: </label>
              {homestays.map((homestay, index) => {
                return (
                  <div className="row" style={{ paddingLeft: "35px" }}>
                    <input
                      class="form-check-input"
                      type="checkbox"
                      id="inlineCheckbox1"
                      value={homestay._id}
                      onChange={() => handleOnChange(homestay._id)}
                    />
                    <label class="form-check-label" for="inlineCheckbox1">
                      {homestay.name}
                    </label>
                  </div>
                );
              })}
            </div>
            <div className="form-group">
              <div className="row" style={{ margin: "5px" }}>
                <div style={{ width: "50%" }}>
                  <label for="number">Start: </label>
                  <DatePicker
                    className="form-control"
                    placeholder="Arrive Date"
                    onChange={setCheckin}
                    value={checkin}
                  />
                </div>
                <div style={{ width: "50%" }}>
                  <label for="number">End: </label>
                  <DatePicker
                    className="form-control"
                    placeholder="Arrive Date"
                    onChange={setCHeckout}
                    value={checkout}
                  />
                </div>
              </div>
            </div>
            <div className={classes.actions}>
              <button className={classes["button--alt"]}>Add discount</button>
            </div>
          </form>
        </Modal>
      )}
    </>
  );
};
export default Discount;
