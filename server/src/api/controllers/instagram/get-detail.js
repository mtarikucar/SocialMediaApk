import {AppModel} from '../../../models/index.js';
import {errorHelper, logger, getText} from '../../../utils/index.js';

export default async (req, res) => {
    const app = await AppModel.find({title: req.body.title}).select("variants").catch(err => {
        return res.status(500).json(errorHelper('00088', req, err.message));
    });

    logger('00089', req.params.id, getText('en', '00089'), 'Info', req);
    return res.status(200).json({
        app
    });
}



