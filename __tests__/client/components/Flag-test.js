import React from 'react';
import Flag from '../../../src/client/components/Flag'
import renderer from 'react-test-renderer';

//Mock data
const mockFlag={startDate:"2017-01-01",endDate:"2018-01-01",flagType:"GSTV - Unsellable"}
const mockOpenModalFunc=(siteKey,addOrEditFlag,flagIndex)=>{
  console.log("Executing mockOpenModalFunc");
  console.log("siteKey: "+siteKey)
  console.log("addOrEditFlag: "+addOrEditFlag)
  console.log("flagIndex: "+flagIndex)
}
const mockFlagIndex=0
const mockSiteKey=1
const mockRemoveAlertFunc=(siteKey,flagIndex)=>{
  console.log("Executing mockRemoveAlertFunc");
  console.log("siteKey: "+siteKey)
  console.log("flagIndex: "+flagIndex)
}
const mockAddOrEditFlag="ADD"
test('Flag is renderable', () => {

  const component = renderer.create(
    <Flag flag={mockFlag} openModalFunc={mockOpenModalFunc} flagIndex={mockFlagIndex}
    siteKey={mockSiteKey} removeAlertFunc={mockRemoveAlertFunc}/>
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
