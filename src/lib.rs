use worker::*;
use wasm_bindgen::prelude::wasm_bindgen;
use jieba_rs::Jieba;

#[event(fetch)]
async fn fetch(
    _req: Request,
    _env: Env,
    _ctx: Context,
) -> Result<Response> {
    console_error_panic_hook::set_once();

    Response::ok("Jieba Worker is running!")
}

#[wasm_bindgen]
pub async fn cut(text: String) -> Vec<String> {
    console_error_panic_hook::set_once();

    let jieba = Jieba::new();
    let tokens = jieba.cut(&text, false);
    tokens.iter().map(|s| s.to_string()).collect()
}
