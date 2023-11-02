import { useEffect, useState, useRef, useCallback } from "react";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate, useParams, Link } from "react-router-dom";
import {
  editHomestay,
  getHomestay,
} from "../../../services/homestayManagementService";
import { multipleFilesUpload } from "../../../constant/request";
import defaultGeo from "../../../constant/geolist";
import MapInForm from "../../../components/Map/MapInForm";
const EditHomestay = () => {
  const [files, setFiles] = useState(null);
  const nameInput = useRef();
  const addressInput = useRef();
  // const cityInput = useRef();
  const priceInput = useRef();
  const peopleInput = useRef();
  const poolInput = useRef();
  const descriptionInput = useRef();
  const [cityInput, setCityInput] = useState("Ha Noi");
  const [longitude, setLongitude] = useState(defaultGeo.get("Ha Noi")[0]);
  const [latitude, setLatitude] = useState(defaultGeo.get("Ha Noi")[1]);

  let { id } = useParams();
  const navigate = useNavigate();
  const linkHomestay = `/homestays/${id}`;

  useEffect(() => {
    async function getData() {
      const response = await getHomestay(id);
      if (response.data.homestay) {
        nameInput.current.value = response.data.homestay.name;
        addressInput.current.value = response.data.homestay.address;
        priceInput.current.value = response.data.homestay.price;
        peopleInput.current.value = response.data.homestay.people;
        descriptionInput.current.value = response.data.homestay.description;
        setCityInput(response.data.homestay.city);
        setLongitude(response.data.homestay.longitude);
        setLatitude(response.data.homestay.latitude);
      }
    }
    getData();
  }, []);

  const setLongLat = (longitude, latitude) => {
    setLongitude(longitude);
    setLatitude(latitude);
  };
  console.log({ longitude });

  const handleEdit = async (event) => {
    event.preventDefault();
    const data = {
      name: nameInput.current.value,
      address: addressInput.current.value,
      city: cityInput,
      price: priceInput.current.value,
      people: peopleInput.current.value,
      pool: poolInput.current.value,
      description: descriptionInput.current.value,
      longitude: longitude,
      latitude: latitude,
    };
    const response = await editHomestay(id, data);
    if (response.status >= 400 || !response) {
      toast.error("Something went wrong! Cannot update homestay");
      return;
    }
    if (response.status === 200) {
      toast.success("Update homestay successfully");
    }
    if (files?.length) {
      const formData = new FormData();
      for (let i = 0; i < files.length; i++) {
        formData.append("files", files[i]);
      }
      const url = process.env.REACT_APP_BACK_END + "/homestays/" + id;
      const responseUpload = await multipleFilesUpload(url, formData);
    }
  };

  return (
    <>
      <ToastContainer />
      <div className="container">
        <div className="row">
          <div className="col-md-6 mx-auto">
            <div className="card mt-6" style={{ marginTop: "30px" }}>
              <div
                className="card-header bg-hb text-light"
                style={{ backgroundColor: "#7D9BF6" }}
              >
                <h4> Edit homestay</h4>
              </div>
              <div className="card-body">
                <form onSubmit={handleEdit} enctype="multipart/form-data">
                  <div className="form-group">
                    <label for="name">Name</label>
                    <input
                      style={{ borderRadius: "15px" }}
                      type="text"
                      name="name"
                      className="form-control"
                      ref={nameInput}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label for="address">Address</label>
                    <input
                      style={{ borderRadius: "15px" }}
                      type="text"
                      name="address"
                      className="form-control"
                      ref={addressInput}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label for="city">City</label>
                    <select
                      name="city"
                      className="form-control"
                      id="type"
                      style={{ borderRadius: "15px" }}
                      value={cityInput}
                      onChange={(e) => {
                        setCityInput(e.target.value);
                        setLongitude(defaultGeo.get(e.target.value)[0]);
                        setLatitude(defaultGeo.get(e.target.value)[1]);
                      }}
                    >
                      <option value="Ha Noi">Ha Noi</option>
                      <option value="Ho Chi Minh">Ho Chi Minh</option>
                      <option value="Da Nang">Da Nang</option>
                      <option value="Hue">Hue</option>
                      <option value="Can Tho">Can Tho</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label for="price">Price</label>
                    <input
                      style={{ borderRadius: "15px" }}
                      type="text"
                      name="price"
                      className="form-control"
                      ref={priceInput}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label for="people">People</label>
                    <input
                      style={{ borderRadius: "15px" }}
                      type="number"
                      name="people"
                      className="form-control"
                      ref={peopleInput}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label for="pool">Pool</label>
                    <select
                      name="pool"
                      className="form-control"
                      id="type"
                      style={{ borderRadius: "15px" }}
                      ref={poolInput}
                    >
                      <option value="false">false</option>
                      <option value="true">true</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label for="description">Description</label>
                    <textarea
                      style={{ borderRadius: "15px" }}
                      rows="5"
                      type="description"
                      name="description"
                      className="form-control"
                      ref={descriptionInput}
                      required
                    ></textarea>
                  </div>
                  <input
                    name="image"
                    type="file"
                    multiple
                    onChange={(e) => setFiles(e.target.files)}
                  />
                  <MapInForm
                    longitude={longitude || 105.824}
                    latitude={latitude || 21.03}
                    sendData={setLongLat}
                  />

                  <input
                    type="submit"
                    value="Update"
                    className="btn btn-secondary btn-block mt-4 mb-6"
                  />
                </form>
                <Link
                  to={linkHomestay}
                  className="mt-6 text-center"
                  style={{ marginTop: "50px" }}
                >
                  Go back to homestay
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default EditHomestay;
