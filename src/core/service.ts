import axios from 'axios';

/**
 * AXIOS-POST
 * @param tradeCode [string]……交易接口
 * @param params [object]……交易参数
 * @param scallback [function]……交易成功回调
 * @param fcallback [function]……交易异常回调
 */
const ReqPost = (
    tradeCode: string,
    params: any,
    scallback: Function,
    fcallback: Function
) => {
    console.log(`[AXIOS::POST] TradeCode:${tradeCode}`);
    console.log(`[AXIOS::POST] Prams:`, params);
    axios.post(tradeCode, params, {
    }).then((res: any) => {
        console.log(`[AXIOS::POST] Res:`, res.data);
        scallback(res.data);
    }).catch((error: any) => {
        fcallback(error);
        console.error('[Trade Error]');
        console.log(error);
    });
}

/**
 * AXIOS-GET
 * @param tradeCode [string]……交易接口
 * @param scallback [function]……交易成功回调
 * @param fcallback [function]……交易异常回调
 */
const ReqGet = (
    tradeCode: string,
    scallback: Function,
    fcallback: Function
) => {
    console.log(`[AXIOS::GET] TradeCode:${tradeCode}`);
    axios.get(tradeCode,{}).then((res: any) => {
        console.log(`[AXIOS::GET] Res:`, res.data);
        scallback(res.data);
    }).catch((error: any) => {
        fcallback(error);
        console.error('[Trade Error]');
        console.log(error);
    });
}

export { ReqPost,ReqGet }