import {
    getDepartament,
    getPublicTemas,
    GetObject,
    getSearchBaseConocimiento
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

    getSearchBaseConocimiento(id : string)
    {
        return getSearchBaseConocimiento(id);
    }

    GetObject(key : string)
    {
        return GetObject(key);
    }
}