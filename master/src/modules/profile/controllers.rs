use actix_web::{
    HttpResponse, HttpRequest,
    web::{ Json, ServiceConfig, Path, scope, get, patch }
};

use crate::services::{
    authority::get_user_id,
    response::{bridge_error, something_went_wrong, unauthorized}
};

use super::{
    models::{ FollowRequest, FollowBody }, 
    services::{follow, followed_by_pagination, following_pagination, get_profile_detail, post_pagination}
};

pub async fn get_profile(path: Path<u64>) -> HttpResponse {
    let id = path.into_inner();

    let profile_request = get_profile_detail(id).await;

    if let Ok(profile) = profile_request {
        if !profile.success {
            return bridge_error(profile.info)
        }

        HttpResponse::Ok()
            .json(profile.data)
    } else {
        something_went_wrong()
    }
}

pub async fn request_follow(request: HttpRequest, body: Json<FollowRequest>) -> HttpResponse {
    let id = get_user_id(
        &request
    )
    .await
    .unwrap_or(0);

    if id == 0 {
        return unauthorized()
    }

    let follow_request = follow(
        &FollowBody {
            from: id,
            to: body.to
        }
    ).await;

    if let Ok(follow) = follow_request {
        if !follow.success {
            return bridge_error(follow.info)
        }

        HttpResponse::Ok()
            .json(follow.data)
    } else {
        something_went_wrong()
    }
}

pub async fn get_post_pagination(path: Path<(u64, u64)>) -> HttpResponse {
    let (id, pagination) = path.into_inner();

    let get_posts_request = post_pagination(id, pagination).await;

    if let Ok(posts) = get_posts_request {
        if !posts.success {
            return bridge_error(posts.info)
        }

        HttpResponse::Ok()
            .json(posts.data)
    } else {
        something_went_wrong()
    }
}

pub async fn get_following_pagination(path: Path<(u64, u64)>) -> HttpResponse {
    let (id, pagination) = path.into_inner();

    let get_posts_request = following_pagination(id, pagination).await;

    if let Ok(posts) = get_posts_request {
        if !posts.success {
            return bridge_error(posts.info)
        }

        HttpResponse::Ok()
            .json(posts.data)
    } else {
        something_went_wrong()
    }
}

pub async fn get_followed_by_pagination(path: Path<(u64, u64)>) -> HttpResponse {
    let (id, pagination) = path.into_inner();

    let get_posts_request = followed_by_pagination(id, pagination).await;

    if let Ok(posts) = get_posts_request {
        if !posts.success {
            return bridge_error(posts.info)
        }

        HttpResponse::Ok()
            .json(posts.data)
    } else {
        something_went_wrong()
    }
}

pub fn profile(config: &mut ServiceConfig) {
    config.service(
        scope("/profile")
            .route("/{id}", get().to(get_profile))
            .route("/follow", patch().to(request_follow))
            .route("/{id}/post/{pagination}", get().to(get_post_pagination))
            .route("/{id}/following/{pagination}", get().to(get_following_pagination))
            .route("/{id}/followedBy/{pagination}", get().to(get_followed_by_pagination))
    );
}