#[macro_use]
extern crate lazy_static;

use std::io;
use dotenv::dotenv;

use actix_web::{ HttpServer, App };

use crate::modules::{ 
    status::controllers::status, 
    credentials::controllers::credentials,
    post::controllers::post,
    profile::controllers::profile
};

mod modules;
mod services;
mod models;

#[actix_web::main]
async fn main() -> io::Result<()> {
    dotenv().ok();

    HttpServer::new(|| {
        App::new()
            .configure(status)
            .configure(credentials)
            .configure(post)
            .configure(profile)
    })
    .bind("0.0.0.0:8081")?
    .run()
    .await
}
