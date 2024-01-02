import {AppModel} from '../../../models/index.js';
import {errorHelper, logger, getText} from '../../../utils/index.js';

export default async (req, res) => {
    const app = await AppModel.find().catch(err => {
        return res.status(500).json(errorHelper('00088', req, err.message));
    });

    logger('00089', req.params.id, getText('en', '00089'), 'Info', req);

    const modifiedAppData = app.map(appItem => {
        return {
            ...appItem.toObject(), // Assuming appItem is a Mongoose document
            variantsLength: appItem.variants ? appItem.variants.length : 0
        };
    });

    return res.status(200).json({
        app: modifiedAppData
    });
};
