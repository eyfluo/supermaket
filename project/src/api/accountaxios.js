//引入request.js
import request from "../utils/request"
export function addaccount (url,params) {
    return new Promise((resolve,reject) => {
        request.post(url,params)
        .then(response => {
            resolve(response)
        })
        .catch(err => {
            reject(err)
        })
    })
}