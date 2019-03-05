const company = require('../models/db/company.js')

module.exports = function(app) {

    app.get('/', (req, res) => {
      res.redirect('/profile');
    });
    
 
    app.get('/profile', (req, res) => {
      res.render('profile', {
        title: 'companyCURD'
      })
    });


    app.get('/api/company', (req, res) => {
        company.getAll((err, data) => {
          if(err) {
            console.log(err);
            res.send('error');
          } else {
            res.send(data);
          }
        })
    });



    app.get('/api/company/:company', (req, res) => {
      company.getCompany(req.params.company, (err, data) => {
        if(err) {
          console.log(err);
          res.send('err');
        } else {
          res.send(data)
        }
      })
    });

    app.get('/company/:company', (req, res) => {
      res.render('company', {
        title: 'CompanyCURD',
      })
    });

    app.put('/api/company', (req, res) => {
      company.updateOne(JSON.parse(req.body.data), (err) => {
        if(err) {
          console.log(err);
          res.send('error');
        }
        else 
          res.send('success');
      })
    });

    app.post('/api/company', (req, res) => {
      new company({
        name: JSON.parse(req.body.data).name,
        city: JSON.parse(req.body.data).city,
        area: JSON.parse(req.body.data).area,
        address: JSON.parse(req.body.data).address,
        phone: JSON.parse(req.body.data).phone,
        serviceItem: JSON.parse(req.body.data).serviceItem
      }).save((err) => {
        if(err) {
          console.log(err);
          res.send('error');
        } else {
          console.log('success');
          res.send('success');
        }
      })
    });

    app.delete('/api/company/:company', (req, res) => {
      company.removeOne(req.params.company, (err) => {
        if(err) {
          console.log(err);
          res.send('error');
        } else {
          res.send('success');
        }
      })
    });

}