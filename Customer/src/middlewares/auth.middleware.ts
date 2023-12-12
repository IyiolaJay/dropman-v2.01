import { Request, Response, NextFunction } from "express";
import { ErrInvalidUserToken, getErrorMessage } from "../errors";
import { verifyAuthToken } from "../services/security/token.service";
import { ITokenData } from "../services/security/types";


const _getAuthToken = (req: Request) => {
  const authHeader = req.get("Authorization");
  if (!authHeader || authHeader.split(" ")[0] !== "Bearer" ) {
    throw ErrInvalidUserToken;
  }
  return authHeader.split(" ")[1];
};

export const authenticateUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userToken = _getAuthToken(req);
    const decodedToken : ITokenData = await verifyAuthToken(
      userToken as string
    );
    
    res.locals.user = {
        _id : decodedToken._id,
        publicId : decodedToken.publicId,
    };

    next();
  } catch (error : any) {
    const err = getErrorMessage(error);
    res.status(err.code).json({
        error : err
    })
  }
};
