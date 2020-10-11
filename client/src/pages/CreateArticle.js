import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";

const CreateArticle = () => {
  const history = useHistory()
  useEffect(() => {
    const getArticle = async () => {
  
      const requestOptions = {
        method: "GET",
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
