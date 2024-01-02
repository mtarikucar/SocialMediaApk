import mongoose from "mongoose";
const { Schema, model } = mongoose;

const appModelSchema = new Schema({
    version: {
        type: String,
        required: true
    },
    release_date: {
        type: Date,
        required: true
    },
    variants: [{
        version: String, architecture: String, androidVersion: String, dpi: String, downloadLink: String
    }]
});

const appModel = model('appModel', appModelSchema)
export default appModel
