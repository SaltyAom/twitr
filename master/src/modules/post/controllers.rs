use actix_web::{
    HttpRequest, HttpResponse, 
    web::{Json, ServiceConfig, get, patch, put, scope, Path}
};

use crate::services::{
    authority::get_user_id, 
    response::{bridge_error, something_went_wrong, unauthorized}
};

use super::{
    models::{FavoriteData, FavoriteRequest, PostData, PostRequest, RetweetData, RetweetRequest}, 
    services::{create_post, retweet, favorite, find_post}
};

pub async fn create(post: Json<PostData>, request: HttpRequest) -> HttpResponse {
    let id = get_user_id(
        &request
    )
    .await
    .unwrap_or(0);

    if id == 0 {
        return unauthorized()
    }

    let post_request = create_post(
        &PostRequest {
            id,
            content: post.content.to_owned(),
            images: post.images.to_owned()
        }
    ).await;

    if let Ok(post) = post_request {
        if !post.success {
            return bridge_error(post.info)
        }
    
        HttpResponse::Ok()
            .json(post.data)
    } else {
        something_went_wrong()
    }
}

pub async fn retweet_post(post: Json<RetweetData>, request: HttpRequest) -> HttpResponse {
    let id = get_user_id(
        &request
    )
        .await
        .unwrap_or(0);

    if id == 0 {
        return unauthorized()
    }

    let retweet_request = retweet(
        &RetweetRequest {
            userId: id,
            postId: post.postId,
            content: post.content.clone(),
            images: post.images.clone()
        }
    ).await;

    if let Ok(retweet) = retweet_request {
        if !retweet.success {
            return bridge_error(retweet.info)
        }
    
        HttpResponse::Ok()
            .json(retweet.data)
    } else {
        something_went_wrong()
    }
}

pub async fn favorite_post(favorite_data: Json<FavoriteData>, request: HttpRequest) -> HttpResponse {
    let id = get_user_id(
        &request
    )
        .await
        .unwrap_or(0);

    if id == 0 {
        return unauthorized()
    }

    let favorite_request = favorite(
        &FavoriteRequest {
            userId: id,
            postId: favorite_data.postId
        }
    ).await;

    if let Ok(retweet) = favorite_request {
        if !retweet.success {
            return bridge_error(retweet.info)
        }

        HttpResponse::Ok()
            .json(retweet.data)
    } else {
        something_went_wrong()
    }
}

pub async fn get_post(path: Path<u64>) -> HttpResponse {
    let id = path.into_inner();

    let get_post_request = find_post(id).await;

    if let Ok(post) = get_post_request {
        if !post.success {
            return bridge_error(post.info)
        }

        HttpResponse::Ok()
            .json(post.data)
    } else {
        something_went_wrong()
    }
}

pub fn post(config: &mut ServiceConfig) {
    config
        .service(
            scope("/post")
                .route("/{id}", get().to(get_post))
                .route("/create", put().to(create))
                .route("/retweet", put().to(retweet_post))
                .route("/favorite", patch().to(favorite_post))
        );
}