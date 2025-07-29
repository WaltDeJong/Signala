import Joi from 'joi';

export const loginSchema = Joi.object({
  username: Joi.string().alphanum().min(3).max(30).required(),
  password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
});

export const validate_data_point_schema = (data) => {
    const schema = Joi.object({
        value: Joi.number().required(),
        timestamp: Joi.date().iso().required(),
    });

    return schema.validate(data);
}
