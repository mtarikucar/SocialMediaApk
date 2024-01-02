import { AppModel } from '../../../models/index.js';
import { errorHelper, logger, getText } from '../../../utils/index.js';

export default async (req, res) => {
    const { id } = req.params;

    try {
        const deletedApp = await AppModel.findOneAndDelete({version : id});

        if (!deletedApp) {
            return res.status(404).json(errorHelper('00102', req, 'Document not found'));
        }

        logger('00103', '', "Document successfully deleted", 'Info', req);
        return res.status(200).json({ message: 'Document successfully deleted' });
    } catch (err) {
        return res.status(500).json(errorHelper('00104', req, err.message));
    }
};
