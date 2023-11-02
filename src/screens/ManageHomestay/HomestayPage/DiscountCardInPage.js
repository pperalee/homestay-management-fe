import { format } from "date-fns";
const DiscountCardInPage = (props) => {
  return (
    <>
      <div className="card mb-3">
        <div className="card listing-preview">
          <div style={{ backgroundColor: "rgba(172, 180, 231,0.5)" }}>
            <div className="listing-heading text-center">
              <h4 style={{ marginTop: "10px" }}>{props.percentage}%</h4>
            </div>
          </div>
          <div className="card-body">
            <div>
              <p className="text-center">
                {format(new Date(props.checkin), "dd/MM")}
                {" => "}
                {format(new Date(props.checkout), "dd/MM")}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default DiscountCardInPage;
