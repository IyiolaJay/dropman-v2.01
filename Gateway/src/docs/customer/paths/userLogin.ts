/**
 * @openapi
 * /api/v2/customers/login:
 *   post:
 *     tags:
 *       - Authentication
 *     summary: User login
 *     operationId:loginUser
 *     requestBody:
 *        required: true
 *        content:
 *           application/json:
 *               schema:
 *                  $ref: '#/components/schemas/userLogin'
 *     responses:
 *        "200":
 *           description: Request successful
 *
 *
 *
 *
 */
