import express from 'express';
import SiteSchema from '../data/schema'
const router = express.Router();
const options = { multi: false }
router.route('/flag').post((req, res)=>{
  const siteKey=req.body.siteKey;
  const flag={
    startDate:req.body.startDate,
    endDate:req.body.endDate,
    flagType:req.body.flagType
  }

  SiteSchema.update({_id:siteKey},{ $push: { flags: flag } },options,(err,numUpdated)=>{
    if (err)
        res.send(err);
    if (numUpdated){
      res.json(flag);
    }else{
      res.json({ message: 'Site not found' });
    }
  })
});
router.route('/flag/:siteKey/:flagIndex').put((req, res) =>{
  const siteKey=req.params.siteKey;
  const flag={
    startDate:req.body.startDate,
    endDate:req.body.endDate,
    flagType:req.body.flagType
  }
  const flagIndex=req.params.flagIndex
  SiteSchema.find({_id:siteKey},(err,sites)=>{
    const site=sites[0]
    if(site.flags.lengh<flagIndex){
      res.json({ message: 'Invalid flag index' });
    }else{
      site.flags[flagIndex]=flag;
      site.save((err)=>{
        if(err){
          res.json(err);
        }
        res.json(flag);
      })
    }
  })
})
.delete((req, res) =>{
  const siteKey=req.params.siteKey;
  const flagIndex=req.params.flagIndex;
  SiteSchema.find({_id:siteKey},(err,sites)=>{
    const site=sites[0]
    if(site.flags.lengh<flagIndex){
      res.json({ message: 'Invalid flag index' });
    }else{
      site.flags.splice(flagIndex,1)
      site.save((err)=>{
        if(err){
          res.json(err);
        }
        res.json({ message: 'Flag Deleted' });
      })
    }
  })
})
export default router;
