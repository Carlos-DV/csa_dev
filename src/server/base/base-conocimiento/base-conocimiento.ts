import {
    getDepartament,
    getPublicTemas

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
}