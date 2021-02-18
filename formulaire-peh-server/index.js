const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const port = 3000;
const db = require('./queries');
const mailer = require('nodemailer');
const fs = require('fs');
const transporter = mailer.createTransport({
  service: 'gmail',
  auth: JSON.parse(fs.readFileSync('log.json'))
});

app.use(express.json({limit: '50mb', extended: true}));
app.use(express.urlencoded({limit: '50mb', extended: true, parameterLimit: 50000}));
app.use(cors());


app.post('/newForm', db.newForm); 

app.post('/sendMail', (req, res) => {
	var mailOptions = {
		from: 'testeurpeh@gmail.com',
		to: req.body.courriel,
		subject: 'Numéro de formulaire PEH',
		text: 
`Bonjour,
Votre numéro de formulaire est le ${req.body.id}.`
	};
	
	transporter.sendMail(mailOptions, (error, info) => {
		if(error){
			console.log(error);
			res.send(204).send(error);
		}else{
			console.log("email sent" + info.response);
			res.status(200).send(`sent mail to ${req.body.courriel}`);
		}
	});
});

app.get('/verifyform/:id/:courriel', db.verifyForm);

app.get('/getPEHPSELCE/:id', db.getPEHPSELCE);

app.patch('/formOrganisme', db.updateOrganisme);

app.get('/formOrganisme/:id', db.getOrganisme);

app.patch('/formDescriptionProjet', db.updateDescriptionProjet);

app.get('/formDescriptionProjet/:id', db.getDescriptionProjet);

app.patch('/formDescriptionPSELCE', db.updateDescriptionPSELCE);

app.get('/formDescriptionPSELCE/:id', db.getDescriptionPSELCE);

app.patch('/formPSELCE', db.updatePSELCE);

app.get('/formPSELCE/:id', db.getPSELCE);

app.patch('/formPartenaires', db.updatePartenaires, (req, res) =>{
	//Create files folder for specific form
	if(!fs.existsSync('files/'+req.body.id)){
		fs.mkdirSync('files/'+req.body.id);
	}
	
	//Write lettresPatentes file in files folder
	if(req.body.fileLettresPatentes != null){
		const fileLettresPatentes = req.body.fileLettresPatentes;
		const datalp = fileLettresPatentes.replace(/^data:.*,/, '');
		
		
		fs.writeFile('files/' + req.body.id + '/lettresPatentes.pdf', datalp, 'base64', (error) => {
			if(error){
				console.log(error);
				res.status(500).send();
			}else{
				res.status(200).send();
			}
		});
		
	}
	
	//Write resolution file in files folder
	if(req.body.fileResolution != null){
		const fileResolution = req.body.fileResolution;
		const datar = fileResolution.replace(/^data:.*,/, '');
		
		fs.writeFile('files/' + req.body.id + '/resolution.pdf', datar, 'base64', (error) => {
			if(error){
				console.log(error);
				res.status(500).send();
			}else{
				res.status(200).send();
			}
		});
	}
});

app.get('/formPartenaires/:id', db.getPartenaires);

app.get('/formPartenaires/:id/documents', (req, res) => {
	//Check files folder for existing documents
	let lp = false;
	let r = false;
	if(fs.existsSync('files/'+req.params.id+'/lettresPatentes.pdf')){
		lp = true;
	}
	if(fs.existsSync('files/'+req.params.id+'/resolution.pdf')){
		r = true;
	}
	res.status(200).send({lettresPatentes : lp, resolution: r});
});

app.patch('/formAdresseLivraison', db.updateAdresseLivraison);

app.get('/formAdresseLivraison/:id', db.getAdresseLivraison);

app.patch('/formAttestation', db.updateAttestation);

app.get('/formAttestation/:id', db.getAttestation);

app.get('/municipalites', db.getMunicipalites);

app.get('/regions', db.getRegions);

app.listen(port, () => {
	console.log(`running on ${port}`);
});

