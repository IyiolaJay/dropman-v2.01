import { Request, Response, NextFunction } from "express";

export const validateRequest =
  (schema: any) => (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(
      req?.body ? req.body : req?.params ? req.params : req.query
    );

    if (error) {
      return res.status(400).json({
        message: error.details[0].message,
      });
    }
    return next();
  };
