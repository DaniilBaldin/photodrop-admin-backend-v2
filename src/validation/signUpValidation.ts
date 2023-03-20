import Joi from 'joi';

export const signUpSchema = Joi.object({
    login: Joi.string().min(3).max(16).required(),
    password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{6,20}$')).required().messages({
        'string.pattern.base': 'Password must be between 6 and 20 characters and contain letters or numbers only.',
    }),
});
