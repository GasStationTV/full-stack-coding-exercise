import SiteSchema from '../data/schema'
import fs from 'fs';
export function seedSampleData(parsedConfig){
  if(parsedConfig.seedDataOnStartup){
    const seedDataFilePath=parsedConfig.seedDataFilePath;
    const parsedData = JSON.parse(fs.readFileSync(seedDataFilePath, 'UTF-8'));
    SiteSchema.remove({}, (err,removed)=>{
      if(err){
        console.log('Failed to truncate schema: '+err)
      }
      else {
        console.log(removed.n+" records removed")
        SiteSchema.resetCount((err,nextCount)=>{
          if(err){
            console.log('Failed to reset ID counter');
          }else{
            for(let document of parsedData){
              const siteObj=new SiteSchema();
              siteObj.name=document.name;
              siteObj.address=document.address;
              siteObj.flags=[];
              siteObj.save((err)=> {
                        if (err){
                          console.log(err)
                        }else{
                          console.log("Record inserted: "+document.name);
                        }
                        return;
                    });
            }
          }
          return;
        })

      }
      return;
    })
  }
}
