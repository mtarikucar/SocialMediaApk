import { AppModel } from '../../../models/index.js';
import { errorHelper, logger, getText } from '../../../utils/index.js';

export default async (req, res) => {
    const { id } = req.params;

    try {
        const deletedApp = await AppModel.findOneAndDelete({version : id});

        if (!deletedApp) {
            return res.status(404).json(errorHelper('00404', req, 'Document not found'));
        }

        logger('00200', '', "Document successfully deleted", 'Info', req);
        return res.status(200).json({ message: 'Document successfully deleted' });
    } catch (err) {
        return res.status(500).json(errorHelper('00008', req, err.message));
    }
};

/**
 * @swagger
 * /instagram/delete/{id}:
 *   delete:
 *     summary: Delete App
 *     description: This endpoint deletes an app based on the provided ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the app to delete.
 *     tags:
 *       - App Management
 *     responses:
 *       "200":
 *         description: App deletion successful. Returns a confirmation message.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Document successfully deleted
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
