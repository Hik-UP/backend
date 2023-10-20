import { ISkinOwner } from './user.type';

interface INewSkin {
  name: string;
  description: string;
  pictures: string[];
  model: string;
  price: number;
}

interface ISkin {
  id: string;
  name: string;
  description: string;
  pictures: string[];
  model: string;
  price: number;
  owners: ISkinOwner[];
}

export { INewSkin, ISkin };
