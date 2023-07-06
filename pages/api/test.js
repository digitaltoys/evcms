/**
 * @swagger
 * /api/test:
 *   get:
 *     description: Returns json
 *     responses:
 *       200:
 *         description: "{ name: 'John Doe' }"
 */
export default function handler(req, res) {
  res.status(200).json({ name: 'John Doe' })
}