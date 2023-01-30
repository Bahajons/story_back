const mongoose = require('mongoose')
const Joi = require('Joi')

const newSchema = new mongoose.Schema({
    head_title: {
        type: String,
    },
    title: {
        type: String
    },
    descr: {
        type: String
    },
    full_descr: {
        type: String
    },
    data_news: {
        type: Date,
        default: Date()
    }
})

const News = mongoose.model('News', newSchema)


function validateNews(news) {

    let schema = Joi.object({
        head_title: Joi.string().required(),
        title: Joi.string().required(),
        descr: Joi.string().required(),
        full_descr: Joi.string()
    })
    return schema.validate(news);
}


exports.validateNews = validateNews
exports.News = News