import Joi from 'joi';

interface DetailsRequestBody {
  id: string;
  roles: string[];
  weight: number;
  tall: number;
  sex: 'M' | 'F';
  age: number;
}

interface DetailsTrails {
  id: string;
  latitude: number;
  longitude: number;
  duration: number;
}

export const validateDetailsUser = (body: DetailsRequestBody) => {
  const schema = Joi.object({
    id: Joi.string().required(),
    roles: Joi.array().required(),
    weight: Joi.number().required(),
    tall: Joi.number().required(),
    sex: Joi.string().required(),
    age: Joi.number().required()
  });

  return schema.validate(body);
};

export const validateDetailsTrails = (body: DetailsTrails) => {
  const schema = Joi.object({
    id: Joi.string().required(),
    latitude: Joi.number().required(),
    longitude: Joi.number().required(),
    duration: Joi.number().required()
  });

  return schema.validate(body);
};
