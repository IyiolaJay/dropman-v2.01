/**
 * @openapi
 * /api/v2/customers/create:
 *   post:
 *     tags:
 *       - Authentication
 *     summary: Create a new user
 *     operationId: createNewCustomer
 *     requestBody:
 *        required: true
 *        content:
 *           application/json:
 *               schema:
 *                  $ref: '#/components/schemas/createCustomer'
 *     responses:
 *        "201":
 *           description: Request successful
 *
 *
 *
 *
 */
