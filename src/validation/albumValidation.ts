import Joi from 'joi';

export const albumSchema = Joi.object({
    album_name: Joi.string().min(3).max(16).required(),
    album_location: Joi.string().min(3).max(16).required(),
    date: Joi.string().required(),
});

export const paramsIdSchema = Joi.object({
    id: Joi.number().min(1).required(),
});
