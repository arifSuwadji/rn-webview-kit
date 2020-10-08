import { combineReducers } from 'redux';
import user from './user';
import server from './server';
import icons from './icons';
import pages from './pages';

const reducers = combineReducers({
    user,
    server,
    icons,
    pages
});

export default reducers;