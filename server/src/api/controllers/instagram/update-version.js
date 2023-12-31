import { AppModel } from '../../../models/index.js';
import { errorHelper, logger, getText } from '../../../utils/index.js';

export default async (req, res) => {
    const { id } = req.params;
    const updateData = req.body;

    if (!updateData || Object.keys(updateData).length === 0) {
        return res.status(400).json(errorHelper('00098', req, 'No update data provided'));
    }

    try {
        const updatedApp = await AppModel.findByIdAndUpdate(id, updateData, { new: true });

        if (!updatedApp) {
            return res.status(404).json(errorHelper('00099', req, 'Document not found'));
        }

        logger('00100', id, getText('en', '00100'), 'Info', req);
        return res.status(200).json(updatedApp);
    } catch (err) {
        return res.status(500).json(errorHelper('00101', req, err.message));
    }
};
