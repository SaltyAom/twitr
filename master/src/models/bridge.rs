use serde::{ Serialize, Deserialize };

#[derive(Deserialize, Serialize)]
pub struct DatabaseBridgeResponse<T> {
    pub success: bool,
    pub info: Option<String>,
    pub data: Option<T>
}
