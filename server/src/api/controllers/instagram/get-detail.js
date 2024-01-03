import {AppModel} from '../../../models/index.js';
import {errorHelper, logger, getText} from '../../../utils/index.js';

export default async (req, res) => {
    const app = await AppModel.find({version: req.body.version}).select("variants").catch(err => {
        return res.status(500).json(errorHelper('00088', req, err.message));
    });

    logger('00089', req.params.id, getText('en', '00089'), 'Info', req);
    return res.status(200).json({
        app
    });
}


/**
 * @swagger
 * /instagram/detail:
 *   post:
 *     summary: Retrieve Specific App Details
 *     description: This endpoint retrieves details of a specific app based on the provided title in the request body.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               version:
 *                 type: string
 *                 description: The title of the app to retrieve details for.
 *                 example: "Example App version"
 *     tags:
 *       - App Management
 *     responses:
 *       "200":
 *         description: Successfully retrieved the details of the specified app. Returns the app data, including its variants.
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
 *                       title:
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
 *       "500":
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Result'
 */
