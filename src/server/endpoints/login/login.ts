import { IUser } from "../../../interfaces";
import { clientAxios, loginAxiosInstance } from "../../axios";
import { IPostAuthenticateRequest, IPostAuthenticateResponse } from "../../base";
import { clone, delayResponse, encrypted, error } from "../../utils";

export interface IPostAuthenticatedUser {
    id: number;
    userName: string;
    email: string;
    firstName: string;
    lastName: string;
    roles: string[];
    userToken: string;
    refreshTokenExpiration: string;
}

export interface usuario {
    userName: string;
    password: string;
}

export const postAuthenticate = async (req: IPostAuthenticateRequest): Promise<IUser> => {
    const company = localStorage.getItem("compañia")
    function companyAssign() { if (company) { return company } else { return "ancona" } }
    let tenant = {
        headers: {
            compania: companyAssign(),
        }
    }
    const response = await loginAxiosInstance.post(`/v2/cuenta/iniciar-sesion`, req, tenant);
    // console.log(response.data.data.id);
    const content = await response.data;

    if (content.succeeded) {
        let isPasswordExpiringSoon = content.message.startsWith("Su contraseña está");

        const url = `/user/${response.data.data.id}`;
        const { data } = await clientAxios(url);
        const { succeeded, result, message } = data;

        if(succeeded) {
            if(isPasswordExpiringSoon) {
                localStorage.setItem("PASS_EXPIRE", content.message);
              }
              const dataTransform: IPostAuthenticateResponse = content.data;
              console.log(dataTransform);
              localStorage.setItem("ANC_SECURE_UUID", dataTransform.userToken);
              localStorage.setItem("ANC_RF", dataTransform.refreshToken);
              localStorage.setItem("ANC_AUTH_EX_AT", dataTransform.refreshTokenExpiration);
              localStorage.setItem("userFirstName", dataTransform.firstName);
              localStorage.setItem("userLastName", dataTransform.lastName);
              localStorage.setItem("userID", dataTransform.id.toString());
              localStorage.setItem("email", dataTransform.email);
              localStorage.setItem("roles", dataTransform.roles[0]);
              localStorage.setItem("companyLogo", dataTransform.company.logo.toString());
              localStorage.setItem("companyName", dataTransform.company.name.toString());
              localStorage.setItem("fkPermission", result.fkPermission);
              localStorage.setItem('departments', JSON.stringify(result.department));
              localStorage.setItem("userName", dataTransform.userName);

            console.log(result);
              const user: IUser = {
                  id: dataTransform.id,
                  userName: dataTransform.userName,
                  email: dataTransform.email,
                  firstName: dataTransform.firstName,
                  lastName: dataTransform.lastName,
                  departament: result.department,
                  fkPermission: result.fkPermission,
              };
              return delayResponse(Promise.resolve(clone(user)));
        } else {
            return delayResponse(Promise.resolve(clone(content)));
        }

    } else if (content.succeeded === false) {
        return delayResponse(Promise.resolve(clone(content)));
    } else {
        return delayResponse(() => error(clone(response)))
    }
};

export async function postRevokeToken(): Promise<boolean> {
    const response = await clientAxios.post(`/v2/cuenta/eliminar-token`);
    const content = await response.data;
    const { data } = content;

    if (content.succeeded) {
        return delayResponse(Promise.resolve(data as boolean));
    } else {
        return delayResponse(() => error(clone(content.Message)))
    }
}

export async function postAuthenticatedUser(user: usuario) {
    const response = await clientAxios.post(`account/authenticate`, user);
    const content = await response.data;

    if (content) {
        return delayResponse(Promise.resolve(clone(content)));
    } else {
        return delayResponse(() => error(clone(content.Message)));
    }
}

// multicompañia
export async function getCompaniesList() {
    const response = await clientAxios.get(`v2/sistema/usuario/compania`);
    const content = await response.data;

    if (content) {
        return delayResponse(Promise.resolve(clone(content)));
    } else {
        return delayResponse(() => error(clone(content.Message)));
    }
}


export async function postRefreshTokenForMulticompany() {
    const companyId = localStorage.getItem("compañia");
        let refreshTokenHeader = {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("ANC_SECURE_UUID")}`,
                compania: companyId ? companyId : "company",
            }
        }
    const response = await loginAxiosInstance.post('/v2/cuenta/actualizar-token', { token: localStorage.getItem('ANC_RF')}, refreshTokenHeader);
    const content = await response.data;

    if (content.succeeded) {
        let isPasswordExpiringSoon = content.message.startsWith("Su contraseña está");

        if(isPasswordExpiringSoon) {
          localStorage.setItem("PASS_EXPIRE", content.message);
        }

        const data: IPostAuthenticateResponse = content.data;
        localStorage.setItem("ANC_SECURE_UUID", data.userToken);
        localStorage.setItem("ANC_RF", data.refreshToken);
        localStorage.setItem("ANC_AUTH_EX_AT", data.refreshTokenExpiration);

        const encryptedUserFirstName = encrypted(data.firstName)
        const encryptedUserLastName = encrypted(data.lastName)
        localStorage.setItem("userFirstName", encryptedUserFirstName);
        localStorage.setItem("userLastName", encryptedUserLastName);
        localStorage.setItem("userID", data.id.toString());
        localStorage.setItem("companyLogo", data.company.logo.toString());
        localStorage.setItem("companyName", data.company.name.toString());

        const user: IUser = {
            id: data.id,
            userName: encrypted(data.userName),
            email: encrypted(data.email),
            firstName: encrypted(data.firstName),
            lastName: encrypted(data.lastName),
            fkPermission: data.fkPermission,
        };

        return delayResponse(Promise.resolve(clone(user)));
    } else {
        return delayResponse(() => error(clone(content)));
    }
}