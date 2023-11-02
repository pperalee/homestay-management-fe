import "../../assets/css/all.css";
import "../../assets/css/style.css";
import "../../assets/css/bootstrap.css";
import "../../assets/css/chart.css";
import "../../assets/css/lightbox.min.css";
import classes from "./style.module.css";

import React, { useState } from "react";
import { Facebook, Globe, Linkedin, Lock, Twitter, User } from "react-feather";
import { useNavigate } from "react-router-dom";
import { LoginContextProvider, useLoginContext } from "./context";
import { ToastContainer } from "react-toastify";

const LoginImpl = () => {
  const navigate = useNavigate();
  const { handleSignup, handleLogin } = useLoginContext();
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [role, setRole] = useState("visitor");
  const [signInWanted, setSignInWanted] = useState(true);

  return (
    <>
      <ToastContainer />
      <div className={classes["container1"]}>
        <div className={classes["forms-container"]}>
          <div className={classes["signin-signup"]}>
            {signInWanted ? (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleLogin(username, password);
                }}
                className={classes["sign-in-form"]}
                style={{ alignItems: "center" }}
              >
                <h2 className={classes["title"]}>Sign in</h2>
                <div className={classes["input-field"]}>
                  <User style={{ placeSelf: "center" }} />
                  <input
                    type="text"
                    placeholder="Username"
                    onChange={(e) => setUsername(e.target.value)}
                    value={username}
                    required
                  />
                </div>
                <div className={classes["input-field"]}>
                  <Lock style={{ placeSelf: "center" }} />
                  <input
                    type="password"
                    placeholder="Password"
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                    required
                  />
                </div>
                <input
                  type="submit"
                  value="Login"
                  className={`${classes["btn"]} solid`}
                />
              </form>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSignup(username, name, password, phone, email, role);
                }}
                className={classes["sign-up-form"]}
                style={{ alignItems: "center" }}
              >
                <h2 className={classes["title"]}>Sign up</h2>
                <div className={classes["input-field"]}>
                  <i className="fas fa-user"></i>
                  <input
                    type="text"
                    placeholder="Username"
                    onChange={(e) => setUsername(e.target.value)}
                    value={username}
                    required
                  />
                </div>
                <div className={classes["input-field"]}>
                  <i className="fas fa-user"></i>
                  <input
                    type="text"
                    placeholder="Name"
                    onChange={(e) => setName(e.target.value)}
                    value={name}
                    required
                  />
                </div>
                <div className={classes["input-field"]}>
                  <i className="fas fa-envelope"></i>
                  <input
                    type="email"
                    placeholder="Email"
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                    required
                  />
                </div>
                <div className={classes["input-field"]}>
                  <i className="fas fa-lock"></i>
                  <input
                    type="password"
                    placeholder="Password"
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                    required
                  />
                </div>
                <div className={classes["input-field"]}>
                  <i className="fas fa-phone"></i>
                  <input
                    type="text"
                    placeholder="Phone"
                    onChange={(e) => setPhone(e.target.value)}
                    value={phone}
                    required
                  />
                </div>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    checked={role === "homestay owner"}
                    onChange={(e) => setRole("homestay owner")}
                  />
                  <label className="form-check-label" for="flexRadioDefault1">
                    Homestay Owner
                  </label>
                </div>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    checked={role === "visitor"}
                    onChange={(e) => setRole("visitor")}
                  />
                  <label className="form-check-label" for="flexRadioDefault2">
                    Visitor
                  </label>
                </div>
                <input
                  type="submit"
                  className={classes["btn"]}
                  value="Sign up"
                />
              </form>
            )}
          </div>
        </div>

        <div className={classes["panels-container"]}>
          {signInWanted ? (
            <div className={`${classes["panel"]} ${classes["left-panel"]}`}>
              <div className={classes["content"]}>
                <h3>New here ?</h3>
                <p>Sign iupLumi homestay to start booking!</p>
                <button
                  className={`${classes["btn"]} ${classes["transparent"]}`}
                  id="sign-up-btn"
                  onClick={(e) => setSignInWanted(false)}
                >
                  Sign up
                </button>
              </div>
              <img src="img/log.svg" className="image" alt="" />
            </div>
          ) : (
            <div className={`${classes["panel"]} ${classes["left-panel"]}`}>
              <div className={classes["content"]}>
                <h3>One of us ?</h3>
                <p>Sign in Lumi homestay to start booking!</p>
                <button
                  className={`${classes["btn"]} ${classes["transparent"]}`}
                  id="sign-up-btn"
                  onClick={(e) => setSignInWanted(true)}
                >
                  Sign in
                </button>
              </div>
              <img src="img/log.svg" className="image" alt="" />
            </div>
            // <div className={`${classes["panel"]} ${classes["left-panel"]}`}>
            //   <div className={classes["content"]}>
            //     <h3>One of us ?</h3>
            //     <p>Sign in Lumi homestay!</p>
            //     <button
            //       className={`${classes["btn"]} ${classes["transparent"]}`}
            //       id="sign-in-btn"
            //       onClick={(e) => setSignInWanted(true)}
            //     >
            //       Sign in
            //     </button>
            //   </div>
            // </div>
          )}
        </div>
      </div>
    </>
  );
};
const Login = () => (
  <LoginContextProvider>
    <LoginImpl />
  </LoginContextProvider>
);
export default Login;
