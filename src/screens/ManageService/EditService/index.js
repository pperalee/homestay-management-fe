import { useNavigate, useParams } from "react-router-dom";
import { useRef, useEffect, useState } from "react";
import { getServiceById } from "../../../services/serviceManagement";
import { toast, ToastContainer } from "react-toastify";
import { editService } from "../../../services/serviceManagement";
const EditService = () => {
  let { id } = useParams();
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const serviceName = useRef();
  const servicePrice = useRef();
  const serviceDescription = useRef();

  const editServiceHandler = async (e) => {
    e.preventDefault();
    const data = {
      name: serviceName.current.value,
      description: serviceDescription.current.value,
      price: servicePrice.current.value,
    };
    const response = await editService(id, data);
    if (response.status >= 400 || !response) {
      toast.error("Cannot edit this service");
      return;
    }
    if (response.status == 200) {
      toast.success("Edit service successfully!");
      setTimeout(() => {
        navigate(`/homestays/${response.data.service?.homestay}`);
      }, 2000);
    }
  };

  useEffect(() => {
    async function getData() {
      const response = await getServiceById(id);
      if (response.data.service) {
        serviceName.current.value = response.data.service.name;
        serviceDescription.current.value = response.data.service.description;
        servicePrice.current.value = response.data.service.price;
      }
      if (response.status >= 400) {
        setError("Cannot find service");
      }
    }
    getData();
  }, []);
  if (error) {
    return (
      <div className="container">
        <p className="text-center">Cannot find service to edit</p>
      </div>
    );
  }
  return (
    <>
      <ToastContainer />
      <div className="container" style={{ marginTop: "40px" }}>
        <div className="row">
          <div className="col-md-6 mx-auto">
            <div className="card mt-6">
              <div
                className="card-header bg-hb text-light"
                style={{ backgroundColor: "#7D9BF6" }}
              >
                <h4> Edit Service</h4>
              </div>
              <div className="card-body">
                <form onSubmit={editServiceHandler}>
                  <div className="form-group">
                    <label htmlFor="name">Service Name</label>
                    <input
                      style={{ borderRadius: "15px" }}
                      type="text"
                      name="name"
                      className="form-control"
                      ref={serviceName}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="price">Price</label>
                    <input
                      style={{ borderRadius: "15px" }}
                      type="number"
                      name="price"
                      className="form-control"
                      ref={servicePrice}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="description">Description</label>
                    <textarea
                      style={{ borderRadius: "15px" }}
                      rows="5"
                      type="description"
                      name="description"
                      class="form-control"
                      ref={serviceDescription}
                      required
                    ></textarea>
                  </div>
                  <input
                    type="submit"
                    value="Edit"
                    className="btn btn-secondary btn-block mt-4"
                  />
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default EditService;
