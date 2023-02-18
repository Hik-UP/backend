interface IComment {
  id: string;
  author: {
    username: string;
    picture: string;
  };
  body: string;
  pictures: string[];
  date: Date;
}

export { IComment };
