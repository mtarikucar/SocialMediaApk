import { AppModel } from '../../../models/index.js';
import { errorHelper, logger, getText } from '../../../utils/index.js';

export default async (req, res) => {
    const { agent } = req.query;


    const agentRegex = /(Instagram .*?\d+\.\d+\.\d+\.\d+\.\d+) Android \((\d+\/\d+); (\d+)dpi; .+; .+; .+; .+; .+; .+; (\d+)\)/;
    const match = agent.match(agentRegex);

    if (!match) {
        return res.status(400).json(errorHelper('0033', req, 'Invalid agent format'));
    }

    const [, versionId, androidVersion, dpi, variantId] = match;

    try {
        const app = await AppModel.findOne({ version: versionId });

        if (!app) {
            return res.status(404).json(errorHelper('00404', req, 'version not found'));
        }

        const variant = app.variants.find(v => v.version === variantId);

        if (!variant) {
            return res.status(404).json(errorHelper('00404', req, 'Variant not found in app'));
        }

        const isCompatible = parseInt(androidVersion.split('/')[0]) >= parseInt(variant.androidVersion) && parseInt(dpi) >= parseInt(variant.dpi);

        if (!isCompatible) {
            return res.status(200).json({ status: 'fail' });
        }

        logger('00200', variantId, getText('en', '00200'), 'Info', req);
        return res.status(200).json({ status: 'success' });

    } catch (err) {
        return res.status(500).json(errorHelper('00008', req, err.message));
    }
};

/**
 * @swagger
 * /instagram/compare:
 *   get:
 *     summary: Check App Compatibility
 *     description: This endpoint checks if an app variant is compatible with the user's device based on the provided agent string.
 *     parameters:
 *       - in: query
 *         name: agent
 *         schema:
 *           type: string
 *         required: true
 *         description: User agent string containing device and app information.
 *     tags:
 *       - Compatibility
 *     responses:
 *       "200":
 *         description: Compatibility check successful. Returns whether the app variant is compatible or not.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Result'
 *       "400":
 *         description: Invalid agent format.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Result'
 *       "404":
 *         description: App variant not found.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Result'
 *       "500":
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Result'
 */
