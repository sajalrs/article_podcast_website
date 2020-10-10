import React from "react";
import Page from "../../components/Page/Page";
import styles from "../../components/Page/Page.module.css";
const SignUp = (props) => {
  const contents = <div>
      <form>
          <label>Name: <input type="text" /></label>
          <label>Email: <input type="email" /></label>
          <label>Password: <input type="password" /></label>
      </form>
  </div>;

  return <Page sidebarFixTopOffset={0} mainPane={contents} />;
};

export default SignUp;
