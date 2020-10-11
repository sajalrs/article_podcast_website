import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import {useSelector} from "react-redux";

const CreateArticle = () => {
  const jwtToken = useSelector(state => state.jwtToken.token)
  const history = useHistory()
  useEffect(() => {
    const getArticle = async () => {
  
      const requestOptions = {
        method: "GET",
        headers: { "Auth-Token": jwtToken }
      };

      const response = await fetch("/create/articles", requestOptions);
      const body = await response.json();
      if (response.status === 401) {
        alert(body.error);
      } else if (response.status !== 200) {
        throw Error(body.message);
      }
      return body;
    };

    getArticle().then((res) => {
  
      history.push('/');
    
    });
  }, []);

  return <div>200</div>;
};

export default CreateArticle;
