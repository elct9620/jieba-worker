use worker::*;
use jieba_rs::Jieba;

#[event(fetch)]
async fn fetch(
    _req: Request,
    _env: Env,
    _ctx: Context,
) -> Result<Response> {
    console_error_panic_hook::set_once();

    let jieba = Jieba::new();
    let tokens = jieba.cut("中文分詞處理正常", false);
    Response::ok(
        format!("Tokens: {:?}", tokens)
    )
}
