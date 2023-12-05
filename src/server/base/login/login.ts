import { IUser } from "../../../interfaces";
import { getCompaniesList, postAuthenticate, postAuthenticatedUser, postRefreshTokenForMulticompany, postRevokeToken, usuario } from "../../endpoints";

export interface IPostAuthenticateRequest {
    userName: string;
    password: string;
}

export interface IResponseCompany {
    name: string;
    logo: string;
}

export interface IPostAuthenticateResponse {
    id: number;
    userName: string;
    email: string;
    firstName: string;
    lastName: string;
    roles: string[];
    userToken: string;
    refreshToken: string;
    refreshTokenExpiration: string;
    company: IResponseCompany;
    IsAgent: boolean;
}

export interface IPostRevokeToken {
    token: string;
}

export class LoginAPI implements LoginAPI {
    postAuthenticate(req: IPostAuthenticateRequest): Promise<IUser> {
        return postAuthenticate(req);
    }

    postRevokeToken(): Promise<boolean> {
        return postRevokeToken();
    }

    postAuthenticatedUser(user: usuario): Promise<any> {
        return postAuthenticatedUser(user);
    }
    getCompaniesList(){
        return getCompaniesList();
    }
    postRefreshTokenForMulticompany(){
        return postRefreshTokenForMulticompany();
    }
}


