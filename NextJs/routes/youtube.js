const express = require("express");
const router = express.Router();
const YoutubeLink = require("../models/YoutubeLinks");


router.get("/", async (req, res) => {
  const query = YoutubeLink.find({}).sort('-date');
  await query.exec((err, data) => {
    if(err){
      res.send(err);
    } else {
      res.send({"items": data});
    }
  } )


 
     
    
})


// router.get("/edit", (req,res) => {
//   YoutubeLink.find({}, (err, data) => {
//     if(err){
//       res.send(err)
//     } else {
//       data.forEach((element, index) => {
//          fetch(`https://www.googleapis.com/youtube/v3/videos?part=id%2Csnippet&id=${element["id"]}&key=${process.env.YOUTUBE_API}`)
//           .then(response => response.json())
//            .then(data => {
//              const title = data["items"][0]["snippet"]["title"]
//              const date = data["items"][0]["snippet"]["publishedAt"]
//              console.log(`title: ${title}`)
//              console.log(`date: ${date}`)
//         element.title = title;
//         element.date = date;
//         element.save((error, returned) => {
//           if(error){
//             res.send(err);
//           }else {
//             console.log(returned);
//           }
//         })
//             })
           
  
//       })
//       res.send("success");
//     }
//   })
// })


module.exports = router;