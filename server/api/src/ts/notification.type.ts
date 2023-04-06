interface INewNotification {
  receiverId: string;
  title: string;
  body: string;
}

interface INotification {
  id: string;
  title: string;
  body: string;
  read: boolean;
  date: Date;
}

export { INewNotification, INotification };
