use std::env;

use reqwest::Error;
use serde::{ de::DeserializeOwned, Serialize };

use crate::models::bridge::DatabaseBridgeResponse;

use super::constants::REQUEST;

pub type DatabaseBridgeRequest<T> = Result<DatabaseBridgeResponse<T>, Error>;

pub fn get_bridge(path: &str) -> String {
    env::var("DATABASE_BRIDGE").unwrap() + path
}

pub struct DatabaseBridge {}

impl DatabaseBridge {
    pub async fn get<T: DeserializeOwned>(path: &str) -> DatabaseBridgeRequest<T> {
        let response: DatabaseBridgeResponse<T> = REQUEST
            .get(get_bridge(path))
            .send()
            .await?
            .json()
            .await?;

        Ok(response)
    }

    pub async fn post<T: DeserializeOwned, B: Serialize>(path: &str, body: &B) -> DatabaseBridgeRequest<T> {
        let response: DatabaseBridgeResponse<T> = REQUEST
            .post(get_bridge(path))
            .json(body)
            .send()
            .await?
            .json()
            .await?;

        Ok(response)
    }

    pub async fn put<T: DeserializeOwned, B: Serialize>(path: &str, body: &B) -> DatabaseBridgeRequest<T> {
        let response: DatabaseBridgeResponse<T> = REQUEST
            .put(get_bridge(path))
            .json(body)
            .send()
            .await?
            .json()
            .await?;

        Ok(response)
    }

    pub async fn patch<T: DeserializeOwned, B: Serialize>(path: &str, body: &B) -> DatabaseBridgeRequest<T> {
        let response: DatabaseBridgeResponse<T> = REQUEST
            .patch(get_bridge(path))
            .json(body)
            .send()
            .await?
            .json()
            .await?;

        Ok(response)
    }
}