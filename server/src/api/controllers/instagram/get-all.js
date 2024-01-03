import {AppModel} from '../../../models/index.js';
import {errorHelper, logger, getText} from '../../../utils/index.js';

export default async (req, res) => {
    const app = await AppModel.find().catch(err => {
        return res.status(500).json(errorHelper('00008', req, err.message));
    });

    logger('00200', req.params.id, getText('en', '00200'), 'Info', req);

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


/**
 * @swagger
 * /instagram/:
 *   get:
 *     summary: Retrieve All Apps
 *     description: This endpoint retrieves all apps from the database, including the number of variants each app has.
 *     tags:
 *       - App Management
 *     responses:
 *       "200":
 *         description: Successfully retrieved all apps. Each app includes the count of its variants.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 app:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                       name:
 *                         type: string
 *                       version:
 *                         type: string
 *                       variants:
 *                         type: array
 *                         items:
 *                           type: object
 *                           properties:
 *                             variantId:
 *                               type: string
 *                             androidVersion:
 *                               type: string
 *                             dpi:
 *                               type: string
 *                             additionalProperties:
 *                               type: object
 *                       variantsLength:
 *                         type: integer
 *                         example: 2
 *       "500":
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Result'
 */
