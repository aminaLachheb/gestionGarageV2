import { environment } from "src/environments/environment";

const BASE_URL = `${environment.host}:${environment.port}`;

export const url_config ={
    login: BASE_URL +'/users/login',
    getCurrentUser:BASE_URL+'/users/whoami',
    getUserById: BASE_URL+'/users/id/',
    signup: BASE_URL+'/users/signup',
    resetPassword: BASE_URL+'/users/reset-password/init',
    resetPasswordFinish: BASE_URL+'/users/reset-password/finish',

    getTransactions : BASE_URL + '/ng-transactions',
    postActivite : BASE_URL + '/activites',
    getActivites : BASE_URL + '/activites',

    getDocuments : BASE_URL + '/documents',
    countDocuments : BASE_URL + '/documents/count',
    countSigne: BASE_URL + '/documents/signe',
    countNonSigne: BASE_URL + '/documents/nonsigne',
    signer: BASE_URL + '/post/ng-transactions/',
    postSign: BASE_URL + '/ng-transactions/api/',

    profile: BASE_URL +'/societes',

    users: BASE_URL+'/users',
    voiture: BASE_URL+'/voitures',

}