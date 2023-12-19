import {
    getDepartament,
    getPublicTemas,
    GetObject,
    getSearchBaseConocimiento,
    getRegisterTemas
} from '../../endpoints'

export class BaseConocimientoAPI implements BaseConocimientoAPI {
    getDepartament ()
    {
        return getDepartament();
    }

    getPublicTemas(PkDepartment : string)
    {
        return getPublicTemas(PkDepartment);
    }

    getRegisterTemas(PkDepartment : string)
    {
        return getRegisterTemas(PkDepartment);
    }

    getSearchBaseConocimiento(id : string)
    {
        return getSearchBaseConocimiento(id);
    }

    GetObject(key : string)
    {
        return GetObject(key);
    }
}