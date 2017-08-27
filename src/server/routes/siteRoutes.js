import express from 'express';
import SiteSchema from '../data/schema'
const router = express.Router();

router.get('/health-check', (req, res) =>
  res.send('OK')
);

router.route('/site').post((req, res)=>{
  const siteObj=new SiteSchema();
  siteObj.name=req.body.name;
  siteObj.address=req.body.address;
  siteObj.flags=[];
  siteObj.save((err)=> {
            if (err)
                res.send(err);
            res.json({ message: 'Site created!' });
        });
}).get((req, res)=> {
        SiteSchema.find((err, sites)=> {
            if (err)
                res.send(err);
            res.json(sites);
        });
    });

export default router;
