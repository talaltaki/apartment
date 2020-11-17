import React, { useContext } from "react";
import "./Login.css";
import { useHistory, useLocation } from "react-router-dom";
import firebase from "firebase/app";
import { firebaseConfig } from "./firebase.config";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import SignUp from "../SignUp/SignUp";
import LoginInput from "../LoginInput/LoginInput";
import { handleFBSignIn } from "../LoginManagement/LoginManagement";
import { AllContext } from "../../../App";

const Login = () => {
  const history = useHistory();
  const location = useLocation();
  let { from } = location.state || { from: { pathname: "/" } };
  const [signedUser, setSignedUser] = useContext(AllContext);

  if (firebase.apps.length === 0) {
    firebase.initializeApp(firebaseConfig);
  }

  const handleGoogleSignIn = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase
      .auth()
      .signInWithPopup(provider)
      .then((result) => {
        const {
          displayName,
          email,
          photoURL,
          uid,
          emailVerified,
        } = result.user;
        const loggedUser = {
          name: displayName,
          email,
          img: photoURL,
          isNew: false,
          uid,
          emailVerified,
        };
        setSignedUser(loggedUser);
        if (emailVerified) {
          history.replace(from);
        }
      })
      .catch((error) => {
        console.log(error);
        setSignedUser({
          ...signedUser,
          googleError: error.message,
          error: error.message,
        });
      });
  };

  const toggler = () => {
    setSignedUser({
      ...signedUser,
      isNew: !signedUser.isNew,
      error: "",
      loginError: "",
      fbError: "",
      googleError: "",
      githubError: "",
      passwordState: "",
    });
  };

  return (
    <div className="login-main">
      <div className="row m-0 d-flex justify-content-center align-items-center pt-5">
        <div className="col-5">
          {signedUser.isNew ? (
            <SignUp toggler={toggler} />
          ) : (
            <LoginInput toggler={toggler} />
          )}
        </div>
        <div className="col-3">
          <div className="auto-login text-center">
            <p>Or</p>
            <h3>{signedUser.isNew ? "Sign up" : "Login"} with:</h3>
            {/* <button onClick={handleGoogleSignIn}>
              <FontAwesomeIcon icon={["fab", "google"]} />
            </button> */}
            <div
              onClick={handleGoogleSignIn}
              style={{ cursor: "pointer", borderRadius: "50px" }}
              className="d-flex border ml-2"
            >
              <img
                className="mt-2 ml-1"
                style={{ width: "30px", height: "30px" }}
                src="https://i.ibb.co/nsxgvmJ/Group-573.png"
                alt=""
              />
              <p className="ml-4 mt-2">Continue with Google</p>
            </div>
            <div
              onClick={() => handleFBSignIn(signedUser, setSignedUser)}
              style={{ cursor: "pointer", borderRadius: "50px" }}
              className="d-flex border ml-2 mt-3"
            >
              <img
                className="mt-2 ml-1"
                style={{ width: "30px", height: "30px" }}
                src="https://i.ibb.co/X79pN89/Group-2.png"
                alt=""
              />
              <p className="ml-4 mt-2">Continue with Facebook</p>
            </div>
            {/* <button onClick={() => handleFBSignIn(signedUser, setSignedUser)}>
              <FontAwesomeIcon icon={["fab", "facebook"]} />
            </button> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
