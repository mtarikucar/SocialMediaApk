import { AppModel } from '../../../models/index.js';
import { errorHelper, logger, getText } from '../../../utils/index.js';

export default async (req, res) => {
    const { id } = req.params;
    const updateData = req.body;

    if (!updateData || Object.keys(updateData).length === 0) {
        return res.status(400).json(errorHelper('00098', req, 'No update data provided'));
    }

    try {
        const updatedApp = await AppModel.findOneAndUpdate({version : id}, updateData, { new: true });

        if (!updatedApp) {
            return res.status(404).json(errorHelper('00099', req, 'Document not found'));
        }

        logger('00100', id, getText('en', '00100'), 'Info', req);
        return res.status(200).json(updatedApp);
    } catch (err) {
        return res.status(500).json(errorHelper('00101', req, err.message));
    }
};



/**
 * @swagger
 * /app/update/{id}:
 *   put:
 *     summary: Update App Details
 *     description: This endpoint updates the details of a specific app based on the provided ID and update data in the request body.
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The version ID of the app to update.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             description: The update data for the app.
 *             example:
 *               title: "Updated App Title"
 *               description: "Updated description of the app"
 *     tags:
 *       - App Management
 *     responses:
 *       "200":
 *         description: Successfully updated the app. Returns the updated app data.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                 title:
 *                   type: string
 *                 description:
 *                   type: string
 *                 variants:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       variantId:
 *                         type: string
 *                       androidVersion:
 *                         type: string
 *                       dpi:
 *                         type: string
 *                       additionalProperties:
 *                         type: object
 *       "400":
 *         description: No update data provided.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Result'
 *       "404":
 *         description: App not found.
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

