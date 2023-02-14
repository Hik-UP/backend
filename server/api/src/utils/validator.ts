import Joi from 'joi';

interface DetailsRequestBody {
  lat: string;
  long: string;
  weight: string;
  hoursActivity: string;
  tall: string;
  sex: 'M' | 'F';
  age: string;
}

export const validateDetailsRequestBody = (body: DetailsRequestBody) => {
  const schema = Joi.object({
    lat: Joi.string().required(),
    long: Joi.string().required(),
    weight: Joi.string().required(),
    hoursActivity: Joi.string().required(),
    tall: Joi.string().required(),
    sex: Joi.string().required(),
    age: Joi.string().required()
  });

  return schema.validate(body);
};
