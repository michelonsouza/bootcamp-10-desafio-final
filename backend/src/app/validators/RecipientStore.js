import * as Yup from 'yup';

export default async (req, res, next) => {
  try {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      street: Yup.string().required(),
      number: Yup.number().required(),
      state: Yup.string()
        .min(2)
        .max(2)
        .required(),
      city: Yup.string().required(),
      zipcode: Yup.string()
        .min(8)
        .max(9)
        .required(),
      complement: Yup.string(),
    });

    await schema.validate(req.body, { abortEarly: false });

    return next();
  } catch ({ errors }) {
    return res.format({ type: 'validation', errors }, 400);
  }
};
