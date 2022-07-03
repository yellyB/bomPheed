import { useState } from "react";
import { authService, firebaseInstance } from "fbase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  GithubAuthProvider,
  signInWithPopup,
} from "firebase/auth";

const Auth = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [newAccount, setNewAccount] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    if (name === "email") setEmail(value);
    if (name === "password") setPassword(value);
  };

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // 페이지 새로고침 방지
    try {
      let data;
      if (newAccount) {
        data = await createUserWithEmailAndPassword(
          authService,
          email,
          password
        );
      } else {
        data = await signInWithEmailAndPassword(authService, email, password);
      }
      console.log(data);
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      }
    }
  };

  const toggleAccount = () => {
    setNewAccount((prev) => !prev);
  };

  const onSocialClick = async (event: React.MouseEvent<HTMLButtonElement>) => {
    const button: HTMLButtonElement = event.currentTarget;
    // console.log(button.name);
    const { name } = button;
    let provider;
    if (name) {
      provider = new GoogleAuthProvider();
    } else {
      provider = new GithubAuthProvider();
    }
    const data = await signInWithPopup(authService, provider);
    console.log(data);
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          name="email"
          type="email"
          placeholder="Email"
          required
          value={email}
          onChange={onChange}
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          required
          value={password}
          onChange={onChange}
        />
        <input type="submit" value={newAccount ? "Create Account" : "Log in"} />
        {error}
      </form>
      <button onClick={toggleAccount}>
        {newAccount ? "Sign In" : "Create Account"}
      </button>
      <div>
        <button onClick={onSocialClick} name="google">
          Continue with Google
        </button>
        <button onClick={onSocialClick} name="github">
          Continue with Github
        </button>
      </div>
    </div>
  );
};

export default Auth;
