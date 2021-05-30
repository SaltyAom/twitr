use actix_web::{
    HttpResponse, HttpRequest, 
    cookie::{Cookie, SameSite}, 
    web::{ ServiceConfig, scope, get, post, put, Json }
};

use crate::services::response::{ bridge_error, something_went_wrong };

use super::{
    models::{SignInRequest, SignUpRequest}, 
    services::{add_session, delete_sessions, validate, signup}
};

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

    if let Ok(token) = new_session {
        HttpResponse::Ok()
            .cookie(
                Cookie::build("token", token.to_owned())
                    .path("/")
                    .http_only(true)
                    .same_site(SameSite::Strict)
                    .finish()
            )
            .body("Signed in")
    } else {
        something_went_wrong()
    }
}

async fn request_signup(credentials: Json<SignUpRequest>) -> HttpResponse {
    let sign_request = signup(&credentials).await;

    if let Ok(user) = sign_request {
        if !user.success {
            return bridge_error(user.info)
        }

        HttpResponse::Ok()
            .json(user.data)
    } else {
        something_went_wrong()
    }
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
                    .route("/signup", put().to(request_signup))
                    .route("/signout", get().to(signout))
    );
}
