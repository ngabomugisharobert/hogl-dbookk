import React, {useEffect} from "react";

import { Form } from "react-bootstrap";
import { toast } from "react-toastify"; 
import { db, auth } from '../services/firebase-config';
import { login, loginWithGoogle } from "../services/AuthService";
import { confirmPasswordReset, getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { signInWithPopup, GoogleAuthProvider, signInWithRedirect } from "firebase/auth";


export default function Home() {


  

  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  const loginWithGoogleHandler = async () => {

    try {
      setLoading(true);
      

      const provider = new GoogleAuthProvider();
      // const auth = getAuth();
      signInWithPopup(auth, provider)
        .then((result) => {
          // This gives you a Google Access Token. You can use it to access the Google API.
          const credential = GoogleAuthProvider.credentialFromResult(result);
          const token = credential.accessToken;
          // The signed-in user info.
          const user = result.user;

          //key email into local storage
          localStorage.setItem("email", user.email);
          
          console.log(user, "user");
          if (user) {
            toast.success("Login Successful");
            setLoading(false);
            window.location.href = "/dashboard";
          }
          // ...
        }).catch((error) => {
          // Handle Errors here.
          const errorCode = error.code;
          const errorMessage = error.message;
          // The email of the user's account used.
          const email = error.customData.email;
          // The AuthCredential type that was used.
          const credential = GoogleAuthProvider.credentialFromError(error);
        });
    } catch (error) {
      setLoading(false);
      toast.error(error.message);
    }
  };

  let handleSubmit = async (e) => {

    e.preventDefault();

    try {
      setLoading(true);
      const user = await login(username, password);
      //key email into local storage
      localStorage.setItem("email", username);
      if (user) {
        setLoading(false);
        toast.success("Login Successful");
        window.location = "/dashboard";
      }
      setLoading(false);
    } catch (ex) {
      setLoading(false);
      if (ex.response && ex.response.status === 401) {
        console.log(ex.response.data);
        toast.error("Invalid username or password");
      }

    }

  };

  return (
    <div className="container">
      <div className="row justify-content-center tw-my-10">
        <div className="col-md-6 col-lg-5 col-sm-8">

          <div className="shadow-sm card rounded-3">
            <div className="px-4 py-3 bg-transparent card-header border-bottom-0">
              <h4>Login</h4>
              <p className="small">Enter your email and password to login.</p>
            </div>
            <div className="px-4 card-body">

              <Form onSubmit={handleSubmit} autoComplete="off" className="tw-mb-5">
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control onChange={event => setUsername(event.target.value)} type="email"
                    required
                    placeholder="Enter email" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control onChange={event => setPassword(event.target.value)} type="password"
                    required
                    placeholder="Password" />
                </Form.Group>
                {/* div for align with flex */}
<div className="d-flex justify-content-between">
  
                <button
                  type="submit" disabled={loading}
                  className="btn btn-primary tw-rounded tw-mt-4">
                  Login
                </button>
        <span>or</span>
                <button
                onClick={loginWithGoogleHandler}
                   disabled={loading}
                  className="btn btn-primary tw-rounded tw-mt-4">
                  Login with Google
                  </button>
                </div>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
