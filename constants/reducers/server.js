const initialState = {
    host: 'http://my.web.id/',
}

const server = (state = initialState, action) => {
    switch(action.type){
        default:
            return {
            ...state
        }
    }
}
export default server;