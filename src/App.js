import "./App.css";
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from "./firebase.Config";
import { useState } from "react";

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
function App() {
  const [users, setUser] = useState({});
  const GoogleProvider = new firebase.auth.GoogleAuthProvider();
  var facebookProvider = new firebase.auth.FacebookAuthProvider();
  var provider = new firebase.auth.GithubAuthProvider();
  const GoogleSignIn = () => {
    console.log("object");
    firebase
      .auth()
      .signInWithPopup(GoogleProvider)
      .then((result) => {
        var credential = result.credential;
        var token = credential.accessToken;
        var user = result.user;
        console.log(user, token);
        setUser(user);
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        var email = error.email;
        var credential = error.credential;
        console.log(errorCode, errorMessage, email, credential);
      });
  };

  const FacebookSignIn = () => {
    firebase
      .auth()
      .signInWithPopup(facebookProvider)
      .then((result) => {
        var credential = result.credential;
        var user = result.user;
        var accessToken = credential.accessToken;
        console.log("fb", user);
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        var email = error.email;
        var credential = error.credential;
        console.log(errorCode, errorMessage, email, credential);
      });
  };
  const ghSignIn = () => {
    firebase
      .auth()
      .signInWithPopup(provider)
      .then((result) => {
        /** @type {firebase.auth.OAuthCredential} */
        var credential = result.credential;

        // This gives you a GitHub Access Token. You can use it to access the GitHub API.
        var token = credential.accessToken;

        // The signed-in user info.
        var user = result.user;
        // ...
        console.log(user);
        setUser(user)
      })
      .catch((error) => {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        // ...
        console.log(errorCode, errorMessage, email, credential);
      });
  };
  return (
    <div className="App">
      <button onClick={GoogleSignIn}>Google SignIn</button> <br /> <br />
      <button onClick={FacebookSignIn}>facebook SignIn</button> <br /> <br />
      <button onClick={ghSignIn}>GitHub SignIn</button> <br /> <br />
      <p>{users.displayName}</p>
      <p>{users.email}</p>
    </div>
  );
}

export default App;
