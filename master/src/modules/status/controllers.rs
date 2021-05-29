use actix_web::{ web::{ get, ServiceConfig, scope }, Responder };

async fn check() -> impl Responder {
    "Working"
}

pub fn status(config: &mut ServiceConfig) {
    config.service(
        scope("/status")
            .route("/", get().to(check))
    );
}