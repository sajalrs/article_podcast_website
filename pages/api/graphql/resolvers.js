export const resolvers = {
    Query: {
      youtubeLinks(_parent, _args, _context, _info) {
        return _context.db
          .collection("youtubelinks")
          .find().toArray()
          .then((data) => {
            return data;
          });
      },
    },
  };
  