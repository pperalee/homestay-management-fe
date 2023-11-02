import DatePicker from "react-date-picker";
import { useRef, useState, useCallback, useEffect } from "react";
import { search } from "../../services/booking";
import { toast, ToastContainer } from "react-toastify";
import HomestayInSearch from "../../components/HomestayInSearch/homestayInSearch";
import { formatDate } from "../../constant/custom";
import NavBottom from "../../layout/components/NavBottom";

const Home = () => {
  const [checkin, setCheckin] = useState(new Date());
  const [checkout, setCheckout] = useState(new Date());
  const [homestays, setHomestays] = useState([]);
  const city = useRef();
  const price = useRef();

  const searchHandler = async (e) => {
    e.preventDefault();
    const data = {
      checkin: formatDate(checkin),
      checkout: formatDate(checkout),
      city: city.current.value,
      price: price.current.value,
    };

    if (data.checkin >= data.checkout) {
      toast.error("Checkin date must be less than checkout date");
      return;
    }

    const response = await search(data);
    if (response.status >= 400) {
      toast.error("Some thing went wrong, cannot find homestays!");
      return;
    }
    if (response.data.homestays) {
      setHomestays(response.data.homestays);
    }
  };

  const list = homestays.map((homestay) => {
    return (
      <HomestayInSearch
        key={homestay._id}
        id={homestay._id}
        name={homestay.name}
        address={homestay.address}
        price={homestay.price}
        people={homestay.people}
        pool={homestay.pool}
      />
    );
  });
  return (
    <>
      <ToastContainer />
      <section id="showcase">
        <div className="container" style={{ marginBottom: "80px !important" }}>
          <div className="home-search p-5 text-center">
            <div className="overlay p-5">
              <h1 className="display-4 mb-4">Lumi Homestay</h1>
              <div className="search">
                <form onSubmit={searchHandler}>
                  <div className="form-row">
                    <label className="col-sm-1 col-form-label">City</label>
                    <div className="col-md-5 mb-3">
                      <label className="sr-only">City</label>
                      <select
                        name="city"
                        className="form-control"
                        id="city"
                        ref={city}
                      >
                        <option value="Ha Noi">Ha Noi</option>
                        <option value="Ho Chi Minh">Ho Chi Minh</option>
                        <option value="Da Nang">Da Nang</option>
                        <option value="Hue">Hue</option>
                        <option value="Can Tho">Can Tho</option>
                      </select>
                    </div>
                    <label className="col-sm-1 col-form-label">Max price</label>
                    <div className="col-md-5 mb-3">
                      <select
                        name="price"
                        className="form-control"
                        id="price"
                        ref={price}
                      >
                        <option value="1000000">1,000,000</option>
                        <option value="2000000">2,000,000</option>
                        <option value="3000000">3,000,000</option>
                        <option value="5000000">5,000,000</option>
                      </select>
                    </div>
                  </div>
                  <div className="form-row">
                    <label for="date" class="col-sm-1 col-form-label">
                      Check in
                    </label>
                    <div className="col-md-5 mb-3">
                      <div className="input-group date" id="datepicker1">
                        <DatePicker
                          className="form-control"
                          onChange={setCheckin}
                          value={checkin}
                        />
                      </div>
                    </div>
                    <label for="date" class="col-sm-1 col-form-label">
                      Check out
                    </label>
                    <div className="col-md-5 mb-34">
                      <div className="input-group date" id="datepicker2">
                        {/* <input
                          type="text"
                          id="checkout"
                          name="checkout"
                          class="form-control"
                        /> */}
                        <DatePicker
                          className="form-control"
                          onChange={setCheckout}
                          value={checkout}
                        />
                      </div>
                    </div>
                  </div>
                  <button
                    className="btn btn-secondary btn-block mt-4"
                    type="submit"
                  >
                    Submit form
                  </button>
                </form>
              </div>
            </div>
          </div>
          <h1>Homestays</h1>
          {list}
        </div>
      </section>
      <NavBottom />
    </>
  );
};
export default Home;
