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
          alert(
            "Article template created. Template needs to be edited and submitted for moderator approval."
          );
          console.log(res.data);
          history.push(`articles/id=${res.data.data["_id"]}`);
        })
        .catch((err) => {
          if (err.response && (err.response.status === 401 || err.response.status === 400)) {
            alert(err.response.data.error);
          } else  {
            throw Error(err);
          }
          history.push("/");
        });
    };

    getArticle();
  }, []);

  return <div>200</div>;
};

export default CreateArticle;
