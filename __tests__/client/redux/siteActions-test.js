import {toggleOpenFlag,openModal,cancelModal,handleChange,saveModal,removeAlertFunc,handleAlertDismiss,removeConfirm} from '../../../src/client/redux/siteActions'
import {TOGGLE_OPEN_FLAG,OPEN_FLAG_MODAL,CLOSE_MODAL,FORM_CHANGE,FORM_SAVE,REMOVE_ALERT,CANCEL_REMOVE,CONFIRM_REMOVE} from '../../../src/client/redux/siteActions'

describe('ACTIONS: toggleOpenFlag',()=>{
    it('Toggles show/hide for flags panel', () => {
        const payload = toggleOpenFlag(1)
        expect(payload).toEqual({type:TOGGLE_OPEN_FLAG,siteKey:1})
    });
    it('Sets open modal flag to true for a given site', () => {
        const payload = openModal(1,"ADD",0)
        expect(payload).toEqual({
      		type:OPEN_FLAG_MODAL,
      		siteKey:1,
          mode:"ADD",
          flagIndex:0
      	})
    });
    it('Sets open modal flag to false for a given site', () => {
        const payload = cancelModal(1,"ADD")
        expect(payload).toEqual({
      		type:CLOSE_MODAL,
      		siteKey:1,
          mode:"ADD"
      	})
    });
    it('Handles form change event', () => {
        const payload = handleChange(1,"flagType","GSTV - Site Visit")
        expect(payload).toEqual({
          type:FORM_CHANGE,
      		siteKey:1,
          name:"flagType",
          value:"GSTV - Site Visit"
      	})
    });
    it('Saves data and closes modal', () => {
        const payload = saveModal(1,"EDIT")
        expect(payload).toEqual({
          type:FORM_SAVE,
      		siteKey:1,
          mode:"EDIT"
      	})
    });
});
