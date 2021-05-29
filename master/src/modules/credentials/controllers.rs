use actix_web::{HttpResponse, HttpRequest, cookie::{Cookie, SameSite}, web::{ ServiceConfig, scope, get, post, Json }};

use crate::services::response::{ bridge_error, something_went_wrong };

use super::services::{add_session, delete_sessions, validate};

use super::models::SignInRequest;

async fn signin(user: Json<SignInRequest>, request: HttpRequest) -> HttpResponse {
    let request_token = request.cookie("token");

    if request_token.is_some() {
        return HttpResponse::BadRequest()
            .body("Already signed in")
    }

    let user_request = validate(&user).await;

    if let Err(error) = user_request {
        return HttpResponse::InternalServerError()
            .body(error.to_string())
    }

    let user = user_request.unwrap();

    if !user.success || user.data.is_none() {
        return bridge_error(user.info)
    }

    let new_session = add_session(user.data.unwrap().id).await;

    if new_session.is_err() {
        return something_went_wrong()
    }

    let token = new_session.unwrap();

    HttpResponse::Ok()
        .cookie(
            Cookie::build("token", token.to_owned())
                .path("/")
                .http_only(true)
                .same_site(SameSite::Strict)
                .finish()
        )
        .body("Signed in")
}

async fn signout(request: HttpRequest) -> HttpResponse {
    let request_token = request.cookie("token");

    if request_token.is_none() {
        return HttpResponse::Unauthorized()
            .body("Not logged in")
    }

    let token = request_token.unwrap();

    let off = delete_sessions(token.value()).await;

    if off.is_err() {
        return HttpResponse::InternalServerError()
            .body("Something went wrong")
    }

    HttpResponse::Ok()
        .del_cookie(&token)
        .body("Signed out")
}

pub fn credentials(config: &mut ServiceConfig) {
    config.service(
        scope("/user")
                    .route("/signin", post().to(signin))
                    .route("/signout", get().to(signout))
    );
}
