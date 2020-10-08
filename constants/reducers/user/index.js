import userTypeAction from './userTypeAction';

const initialState = {
    fkRwId: "",
    idUser: 0,
    namaUser: '',
    hpUser: '',
    emailUser: '',
    alamatUser: '',
    passwordUser: '',
    konfPasswordUser: '',
    saldoUser: 0,
    tokenUser: '',
    isLoged: 0,
    latitudeRegister: null,
    longtitudeRegister: null,
    latitudeDinamis: null,
    longtitudeDinamis:null,
    location: null,
}

const user = (state = initialState, action) => {
    switch (action.type) {
        case userTypeAction.FK_RW_ID:
            return {
                ...state,
                fkRwId: action.fkRwId
            }
        case userTypeAction.ID_USER:
            return {
                ...state,
                idUser: action.idUser
            }
        case userTypeAction.NAMA_USER:
            return {
                ...state,
                namaUser: action.namaUser
            }
        case userTypeAction.HP_USER:
            return {
                ...state,
                hpUser: action.hpUser
            }
        case userTypeAction.EMAIL_USER:
            return {
                ...state,
                emailUser: action.emailUser
            }
        case userTypeAction.ALAMAT_USER:
            return {
                ...state,
                alamatUser: action.alamatUser
            }
        case userTypeAction.PASSWORD_USER:
            return {
                ...state,
                passwordUser: action.passwordUser
            }
        case userTypeAction.KONF_PASSWORD_USER:
            return {
                ...state,
                konfPasswordUser: action.konfPasswordUser
            }
        case userTypeAction.TOKEN_USER:
            return {
                ...state,
                tokenUser: action.tokenUser
            }
        case userTypeAction.IS_LOGED:
            return {
                ...state,
                isLoged: action.isLoged
            }
        case userTypeAction.LATITUDE_REGISTER:
            return {
                ...state,
                latitudeRegister: action.latitudeRegister
            }
        case userTypeAction.LONGTITUDE_REGISTER:
            return {
                ...state,
                longtitudeRegister: action.longtitudeRegister
            }
        case userTypeAction.LATITUDE_DINAMIS:
            return {
                ...state,
                latitudeDinamis: action.latitudeDinamis
            }
        case userTypeAction.LONGTITUDE_DINAMIS:
            return {
                ...state,
                longtitudeDinamis: action.longtitudeDinamis
            }
        case userTypeAction.LOCATION:
            return {
                ...state,
                location: action.location
            }
        default:
            return {
                ...state
            }
    }
}

export default user;