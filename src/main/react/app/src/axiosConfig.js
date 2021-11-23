import axios from "axios";
import createAuthRefreshInterceptor from "axios-auth-refresh";

axios.defaults.baseURL = `http://localhost:8080/api`;
axios.defaults.timeout = 10000;

const refreshAuthLogic = (failedRequest) =>
    axios.create().post('/auth/refreshtoken',{refreshToken: localStorage.getItem("refreshToken")}, ).then(tokenRefreshResponse => {
        localStorage.setItem("jwtToken", tokenRefreshResponse.data.accessToken);
        failedRequest.response.config.headers['Authorization'] = 'Bearer ' + tokenRefreshResponse.data.accessToken;
        return Promise.resolve();
    }).catch( () => {
        localStorage.setItem('errorMessage', 'Session expired.');
        localStorage.removeItem("jwtToken");
        localStorage.removeItem("refreshToken");
        document.location.href = "/login";
    });

createAuthRefreshInterceptor(axios, refreshAuthLogic);

const requestHandler = (request) => {
    const jwtToken = localStorage.getItem("jwtToken");
    if (jwtToken) request.headers.Authorization = `Bearer ${jwtToken}`;
    request.headers.common["Access-Control-Allow-Origin"] = "*";
    request.headers["Content-Type"] = "application/json";
    return request;
};


const responseHandler = (response) => {
    return response;
};

const errorHandler = async (error) => {
    console.log(JSON.stringify(error))
    if(error.message !== "Request failed with status code 409"){
        localStorage.setItem('errorMessage', 'Internal server error.');
        localStorage.removeItem("jwtToken");
        localStorage.removeItem("refreshToken");
        document.location.href = "/";
    }

    return error;
};

axios.interceptors.request.use(
    (request) => requestHandler(request),
    (error) => errorHandler(error)
);

axios.interceptors.response.use(
    (response) => responseHandler(response),
    (error) => errorHandler(error)
);
