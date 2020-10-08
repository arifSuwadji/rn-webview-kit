import pagesTypeAction from './pagesTypeAction';

const initialState = {
    nextPage: '',
    defaultPage: 'Login',
    nextAuthPage: '',
    defaultAuthPage: 'Home',
    timeoutLoading: 500,
    isLoading: true,
    pageTitle: '',
    exitApp: 0,
    slideMenu: '',
    slideKategori: ''
}

const pages = ( state = initialState, action) => {
    switch(action.type){
        case pagesTypeAction.NEXT_PAGE:
            return {
                ...state,
                nextPage: action.nextPage
            }
        case pagesTypeAction.NEXT_AUTH_PAGE:
            return {
                ...state,
                nextAuthPage: action.nextAuthPage
            }
        case pagesTypeAction.TIMEOUT_LOADING:
            return {
                ...state,
                timeoutLoading: action.timeoutLoading
            }
        case pagesTypeAction.IS_LOADING:
            console.log(`is loading action is `, action.isLoading);
            return {
                ...state,
                isLoading: action.isLoading
            }
        case pagesTypeAction.DEFAULT_PAGE:
            return {
                ...state,
                defaultPage: action.defaultPage
            }
        case pagesTypeAction.DEFAULT_AUTH_PAGE:
            return {
                ...state,
                defaultAuthPage: action.defaultAuthPage
            }
        case pagesTypeAction.PAGE_TITLE:
            return {
                ...state,
                pageTitle: action.pageTitle
            }
        case pagesTypeAction.EXIT_APP:
            return {
                ...state,
                exitApp: action.exitApp
            }
        case pagesTypeAction.SLIDE_MENU:
            return {
                ...state,
                slideMenu: action.slideMenu
            }
        case pagesTypeAction.SLIDE_KATEGORI:
            return {
                ...state,
                slideKategori: action.slideKategori
            }
        default:
            return {
                ...state
            }
    }
}

export default pages;