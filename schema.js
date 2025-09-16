const Joi=require("joi");
const { model } = require("mongoose");
const review = require("./models/review");

module.exports.listingSchema=Joi.object({
    listing:Joi.object({
        title:Joi.string().required(),
        description:Joi.string().required(),
        price:Joi.number().required().min(0),
        location:Joi.string().required(),
        country:Joi.string().required(),
        image:Joi.string().allow("",null),
        category: Joi.string().valid(
        "trending",
        "rooms",
        "iconic-cities",
        "mountains",
        "castles",
        "amazing-pools",
        "camping",
        "farms",
        "arctic",
        "domes",
        "boats"
    ).required()
    }).required(),
});


module.exports.reviewSchema=Joi.object({
    review:Joi.object({
        rating:Joi.number().required().min(1).max(5),
        comment:Joi.string().required(),
    }).required(),
});