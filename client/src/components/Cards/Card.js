const Card = {
    ContentType: Object.freeze({"article-internal":1, "article-external":2, "video-youtube":3, "video-external":4, "audio-internal": 5}),
    formatDate: (dateString) => {
        const date = new Date(dateString);
        const monthNames = [
          "January", "February", "March",
          "April", "May", "June", "July",
          "August", "September", "October",
          "November", "December"
        ];
      
        const day = date.getDate();
        const monthIndex = date.getMonth();
        const year = date.getFullYear();
      
        return day + ' ' + monthNames[monthIndex] + ', ' + year;
      }
}

export default Card;