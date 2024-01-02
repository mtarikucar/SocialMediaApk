import { AppModel } from '../../../models/index.js';
import { errorHelper, logger, getText } from '../../../utils/index.js';

export default async (req, res) => {
    const { agent } = req.query;

    // Agent bilgisinden gerekli verileri parse et
    const agentRegex = /(\d+\.\d+\.\d+\.\d+\.\d+) Android \((\d+\/\d+); (\d+)dpi; .+; .+; .+; .+; (.+); en_.+; (\d+)\)/;
    const match = agent.match(agentRegex);

    if (!match) {
        return res.status(400).json(errorHelper('00105', req, 'Invalid agent format'));
    }

    const [, versionId, androidVersion, dpi, , variantId] = match;

    try {
        const app = await AppModel.findOne({ 'variants.variantId': variantId });

        if (!app) {
            return res.status(404).json(errorHelper('00032', req, 'Variant not found'));
        }

        const variant = app.variants.find(v => v.variantId === variantId);

        if (!variant) {
            return res.status(404).json(errorHelper('00032', req, 'Variant not found in app'));
        }

        const isCompatible = parseInt(androidVersion.split('/')[0]) >= parseInt(variant.androidVersion) && parseInt(dpi) >= parseInt(variant.dpi);

        if (!isCompatible) {
            return res.status(200).json({ status: 'fail' });
        }

        logger('00108', variantId, getText('en', '00108'), 'Info', req);
        return res.status(200).json({ status: 'success' });

    } catch (err) {
        return res.status(500).json(errorHelper('00109', req, err.message));
    }
};
