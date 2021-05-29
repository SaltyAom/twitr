use actix_web::HttpResponse;

pub fn something_went_wrong() -> HttpResponse {
    HttpResponse::InternalServerError()
        .body("Something went wrong")
}

pub fn bridge_error(message: Option<String>) -> HttpResponse {
    HttpResponse::InternalServerError()
        .body(message.unwrap_or("Something went wrong".to_owned()))
}

pub fn unauthorized() -> HttpResponse {
    HttpResponse::Unauthorized()
        .body("Unauthorized")
}
