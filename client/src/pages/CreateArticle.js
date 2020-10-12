import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
const CreateArticle = () => {
  const history = useHistory();
  useEffect(() => {
    const getArticle = async () => {
      axios
        .get("/create/articles")
        .then((res) => {
          alert("Article Created");
          return res.data;
        })
        .catch((err) => {
          if (err.response.status === 401 || err.response.status === 400) {
            alert(err.response.data.error);
          } else if (err.response.status !== 200) {
            throw Error(err);
          }
        });
    };

    getArticle().then((res) => {
      history.push("/");
    });
  }, []);

  return <div>200</div>;
};

export default CreateArticle;
