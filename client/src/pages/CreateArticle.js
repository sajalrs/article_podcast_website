import React, {useEffect } from 'react'

const CreateArticle = () => {
    useEffect(() => {
      const getArticle = async () => {
        const response = await fetch("/create/articles");
        const body = await response.json();
        if (response.status !== 200) throw Error(body.message);
  
        return body;
      };

      getArticle().then((res) => {
        console.log(res);
      })
    }, [])

    return(
      <div>200</div>
    )
  }

export default CreateArticle;