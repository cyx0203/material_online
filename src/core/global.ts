export default class global{
    constructor(){

    }

    //存储用户信息
    private static _userInfor:any={};

    private static _appInfor: any = {};

    //[getter]
    public static get userInfor():any{
        return this._userInfor;
    }
    //[setter]
    public static set userInfor(data:any) {
        this._userInfor=data;
    }

    //[getter]
    public static get appInfor(): any {
        return this._appInfor;
    }
    //[setter]
    public static set appInfor(data: any) {
        this._appInfor = data;
    }
}