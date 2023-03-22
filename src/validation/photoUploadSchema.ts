import Joi from 'joi';

export const photoUploadSchema = Joi.object({
    albumId: Joi.string().min(1).max(10).required(),
    phoneNumbers: Joi.string().min(1).max(100).required(),
    type: Joi.string().min(1).max(20).required(),
});
