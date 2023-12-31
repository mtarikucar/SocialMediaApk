import mongoose from "mongoose";
const { Schema, model } = mongoose;

const appModelSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    link: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    variants: [{
        version: String, architecture: String, androidVersion: String, dpi: String, downloadLink: String
    }]
});

const appModel = model('appModel', appModelSchema)
export default appModel
