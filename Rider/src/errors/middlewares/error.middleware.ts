import { Request, Response } from "express";

export const err404NotFound = (_: Request, res: Response) => {
  return res.status(404).json({
    error: { 
        code: 404, 
        message: "Endpoint not found!" 
    },
  });
};