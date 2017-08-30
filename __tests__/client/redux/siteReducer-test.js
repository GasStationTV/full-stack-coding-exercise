import {sitesReducer} from '../../../src/client/redux/sitesReducer'

describe('REDUCER: SITE REDUCER',()=>{
    it('It intiates blank site list', () => {
        const newState = sitesReducer({},{type:'INIT'})
        expect(newState).toEqual({})
    });
    it('It will load sites from action generator', () => {
        const sites={1:{},2:{}}
        const newState = sitesReducer({},{type:'LOAD_SITES_SUCESS',sites:sites})
        expect(newState).toEqual({1:{},2:{}})
    });
});
