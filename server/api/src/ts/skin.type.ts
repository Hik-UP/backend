interface INewSkin {
  name: string;
  description: string;
  pictures: string[];
  model: string;
}

interface ISkin {
  id: string;
  name: string;
  description: string;
  pictures: string[];
  model: string;
}

export { INewSkin, ISkin };
