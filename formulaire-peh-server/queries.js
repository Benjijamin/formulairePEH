const Pool = require('pg').Pool;
const pool = new Pool({
	user: 'postgres',
	host: 'localhost',
	database: 'formulairepeh-dev',
	password: 'postgres',
	port: 5432
});

const newForm = (req,res) => {
	pool.query("INSERT INTO FORM (form_descr, form_courrielformulaire) values ('NewForm(DEV)', $1) RETURNING form_id",[req.body.courriel], (error, results) => {
		if(error) {
			console.log(error);
		}
		res.status(201).send(`${results.rows[0].form_id}`);
	});
};

const verifyForm = (req, res) => {
	if(req.params.id != null && req.params.id.match(/^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i)){	
		pool.query(`SELECT * FROM form where form_id = $1 AND form_courrielformulaire = $2`, [req.params.id, req.params.courriel] , (error, results) => {
			if(error){
				console.log(error);
			}
			if( results && results.rows.length ){
				res.status(200).send(results.rows[0].form_id);
			}else{
				res.status(204).send();
			}
		});
	}else{
		res.status(204).send();
	}
};

const getPEHPSELCE = (req,res) => {
	if(req.params.id != null && req.params.id.match(/^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i)){
		pool.query(`SELECT form_estPEH, form_estPSELCE FROM form where form_id = $1`, [req.params.id], (error, results) => {
			if(error){
				console.log(error);
			}
			if(results && results.rows.length){
				res.status(200).send(results.rows[0]);
			}else{
				res.status(204).send();
			}
		});
	}else{
		res.status(204).send();
	}
}

const getOrganisme = (req, res) => {
	if(req.params.id != null && req.params.id.match(/^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i)){
		pool.query ( `SELECT
			form_estPEH as estPEH,
			form_estPSELCE as estPSELCE,
			form_estEte as estEte,
			form_estHiver as estHiver,
			form_nomOrganisme as nomOrganisme,
			form_adresse as adresse,
			form_ville as ville,
			form_codePostal as codePostal,
			form_salutation as salutation,
			form_prenom as prenom,
			form_nom as nom,
			form_titre as titre,
			form_telResidence as telResidence,
			form_telTravail as telTravail,
			form_telTravailPoste as telTravailPoste,
			form_telMobile as telMobile,
			form_courriel as courriel,
			form_NEQ as NEQ,
			form_TVQ as TVQ
			FROM FORM WHERE form_id = $1`, [req.params.id] , (error, results) => {
			if(error){
				console.log(error);
			}
			res.status(200).send(results.rows[0]);
		});
	}else{
		res.status(204).send();
	}
};

const updateOrganisme = (req, res) => {
	
	pool.query(`UPDATE FORM SET 
		form_estPEH = $2,
		form_estPSELCE = $3,
		form_estEte = $4,
		form_estHiver = $5,
		form_nomOrganisme = $6,
		form_adresse = $7,
		form_ville = $8,
		form_codePostal = $9,
		form_salutation = $10,
		form_prenom = $11,
		form_nom = $12,
		form_titre = $13,
		form_telResidence = $14,
		form_telTravail = $15,
		form_telTravailPoste = $16,
		form_telMobile = $17,
		form_courriel = $18,
		form_NEQ = $19,
		form_TVQ = $20
		WHERE form_id = $1`,
		[
		req.body.id,
		req.body.checkGroup.isPEH,
		req.body.checkGroup.isPSELCE,
		req.body.isEte,
		req.body.isHiver,
		req.body.nomOrganisme,
		req.body.adresse,
		req.body.ville,
		req.body.codePostal,
		req.body.salutation,
		req.body.prenom,
		req.body.nom,
		req.body.titre,
		req.body.telResidence,
		req.body.telTravail,
		req.body.telTravailPoste,
		req.body.telMobile,
		req.body.courriel,
		req.body.NEQ,
		req.body.TVQ
		],
		(error, results) => {
			if(error){
				console.log(error);
			}
			res.status(200).send('update successful');
		});
};

const updateDescriptionProjet = (req, res) => {
	let dateActivite = (req.body.dateActivite == 'Invalid date') ? '0000-00-00' : req.body.dateActivite ;
	let autreDate1 = (req.body.autreDate1 == 'Invalid date') ? '0000-00-00' : req.body.autreDate1;
	let autreDate2 = (req.body.autreDate2 == 'Invalid date') ? '0000-00-00' : req.body.autreDate2;
	let autreDate3 = (req.body.autreDate3 == 'Invalid date') ? '0000-00-00' : req.body.autreDate3;
	let dateDu = (req.body.dateDu == 'Invalid date') ? '0000-00-00' : req.body.dateDu;
	let dateAu = (req.body.dateAu == 'Invalid date') ? '0000-00-00' : req.body.dateAu;
	
		pool.query( `UPDATE FORM SET 
			desc_nomPlanEau = $2,
			desc_typePlanEau = $3,
			desc_ville = $4,
			desc_region = $5,
			desc_especePoisson = $6,
			desc_dateActivite = to_date($7,'yyyy-mm-dd'),
			desc_autreDate1 = to_date($8,'yyyy-mm-dd'),
			desc_autreDate2 = to_date($9,'yyyy-mm-dd'),
			desc_autreDate3 = to_date($10,'yyyy-mm-dd'),
			desc_dateDu = to_date($11,'yyyy-mm-dd'),
			desc_dateAu = to_date($12,'yyyy-mm-dd'),
			desc_nbrJeunesVises = $13,
			desc_nbrNouveauxAdeptes = $14,
			desc_jeunes6a8ans = $15,
			desc_jeunes9a12ans = $16,
			desc_jeunes13a17ans = $17,
			desc_milieuUrbain = $18,
			desc_provenanceMoins30000 = $19,
			desc_provenancePlus30000 = $20,
			desc_provenanceMunicipalites = $21,
			desc_structureGratuitPublic = $22,
			desc_structureCampVacances = $23,
			desc_structureClasseScolaire = $24,
			desc_structureGroupeScout = $25,
			desc_structureAutre = $26,
			desc_structureAutreDescr = $27,
			desc_telDiffusion = $28,
			desc_descrFormation = $29,
			desc_descrCompetences = $30,
			desc_descrJournee = $31,
			desc_nbrAdultesSurPlace = $32,
			desc_competencesAdultes = $33,
			desc_equipementPremierSoins = $34,
			desc_vesteFlottaison = $35,
			desc_supervisionConstante = $36,
			desc_descrmesuresSecurite = $37
			WHERE form_id = $1`, [
			req.body.id, 
			req.body.nomPlanEau, 
			req.body.typePlanEau, 
			req.body.ville, 
			req.body.region, 
			req.body.especePoisson, 
			req.body.dateActivite, 
			req.body.autreDate1, 
			req.body.autreDate2, 
			req.body.autreDate3, 
			req.body.dateDu, 
			req.body.dateAu, 
			req.body.nbrJeunesVises,
			req.body.nbrNouveauxAdeptes, 
			req.body.jeunes6a8ans, 
			req.body.jeunes9a12ans, 
			req.body.jeunes13a17ans, 
			req.body.milieuUrbain, 
			req.body.provenanceMoins30000, 
			req.body.provenancePlus30000, 
			req.body.provenanceMunicipalites, 
			req.body.structureGratuitPublic,
			req.body.structureCampVacances, 
			req.body.structureClasseScolaire,
			req.body.structureGroupeScout, 
			req.body.structureAutre, 
			req.body.stuctureAutreDescr, 
			req.body.telDiffusion, 
			req.body.descrFormation, 
			req.body.descrCompetences, 
			req.body.descrJournee,
			req.body.nbrAdultesSurPlace,
			req.body.competencesAdultes,
			req.body.equipementPremierSoins,
			req.body.vesteFlottaison,
			req.body.supervisionConstante,
			req.body.descrMesuresSecurite
			], (error, results) => {
			if(error){
				console.log(error);
			}
			res.status(200).send('update successful');
		});
};

const getDescriptionProjet = (req, res) => {
	if(req.params.id != null && req.params.id.match(/^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i)){
		pool.query(`SELECT 
		desc_nomPlanEau as nomPlanEau,
		desc_typePlanEau as typePlanEau,
		desc_ville as ville,
		desc_region as region,
		desc_especePoisson as especePoisson,
		desc_dateActivite as dateActivite,
		desc_autreDate1 as autreDate1,
		desc_autreDate2 as autreDate2,
		desc_autreDate3 as autreDate3,
		desc_dateDu as dateDu,
		desc_dateAu as dateAu,
		desc_nbrJeunesVises as nbrJeunesVises,
		desc_nbrNouveauxAdeptes as nbrNouveauxAdeptes,
		desc_jeunes6a8ans as jeunes6a8ans,
		desc_jeunes9a12ans as jeunes9a12ans,
		desc_jeunes13a17ans as jeunes13a17ans,
		desc_milieuUrbain as milieuUrbain,
		desc_provenanceMoins30000 as provenanceMoins30000,
		desc_provenancePlus30000 as provenancePlus30000,
		desc_provenanceMunicipalites as provenanceMunicipalites,
		desc_structureGratuitPublic as structureGratuitPublic,
		desc_structureCampVacances as structureCampVacances,
		desc_structureClasseScolaire as structureClasseScolaire,
		desc_structureGroupeScout as structureGroupeScout,
		desc_structureAutre as structureAutre,
		desc_structureAutreDescr as structureAutreDescr,
		desc_telDiffusion as telDiffusion,
		desc_descrFormation as descrFormation,
		desc_descrCompetences as descrCompetences,
		desc_descrJournee as descrJournee,
		desc_nbrAdultesSurPlace as nbrAdultesSurPlace,
		desc_competencesAdultes as competencesAdultes,
		desc_equipementPremierSoins as equipementPremierSoins,
		desc_vesteFlottaison as vesteFlottaison,
		desc_supervisionConstante as supervisionConstante,
		desc_descrMesuresSecurite as descrMesuresSecurite
		FROM form WHERE form_id = $1
		`, [req.params.id], (error, results) => {
			if(error){
				console.log(error);
			}
			res.status(200).send(results.rows[0]);
		});
	}else{
		res.status(204).send();
	}
};

const updateDescriptionPSELCE = (req, res) => {
	let dateActivite = (req.body.dateActivite == 'Invalid date') ? '0000-00-00' : req.body.dateActivite;
	let autreDate1 = (req.body.autreDate1 == 'Invalid date') ? '0000-00-00' : req.body.autreDate1;
	let autreDate2 = (req.body.autreDate2 == 'Invalid date') ? '0000-00-00' : req.body.autreDate2;
	let autreDate3 = (req.body.autreDate3 == 'Invalid date') ? '0000-00-00' : req.body.autreDate3;
	let dateDu = (req.body.dateDu == 'Invalid date') ? '0000-00-00' : req.body.dateDu;
	let dateAu = (req.body.dateAu == 'Invalid date') ? '0000-00-00' : req.body.dateAu;
	
	pool.query(`UPDATE FORM SET
	descPSELCE_dateActivite = to_date($2,'yyyy-mm-dd'),
	descPSELCE_autredate1 = to_date($3,'yyyy-mm-dd'),
	descPSELCE_autredate2 = to_date($4,'yyyy-mm-dd'),
	descPSELCE_autredate3 = to_date($5,'yyyy-mm-dd'),
	descPSELCE_datedu = to_date($6,'yyyy-mm-dd'),
	descPSELCE_dateau = to_date($7,'yyyy-mm-dd'),
	descPSELCE_clientele6a18 = $8,
	descPSELCE_clienteleadulte = $9,
	descPSELCE_nombreParticipants = $10,
	descPSELCE_nombreNouveauxAdeptes = $11,
	descPSELCE_structureScolaire = $12,
	descPSELCE_structureAssociation = $13,
	descPSELCE_structureOuvertPublic = $14,
	descPSELCE_structureAutre = $15,
	descPSELCE_structureAutreDescr = $16
	WHERE form_id = $1`, [
	req.body.id,
	dateActivite,
	autreDate1,
	autreDate2,
	autreDate3,
	dateDu,
	dateAu,
	req.body.clientele6a18,
	req.body.clienteleAdulte,
	req.body.nombreParticipants,
	req.body.nombreNouveauxAdeptes,
	req.body.structureScolaire,
	req.body.structureAssociation,
	req.body.structureOuvertPublic,
	req.body.structureAutre,
	req.body.structureAutreDescr
	], (error, results) => {
		if(error){
			console.log(error);
		}
		res.status(200).send('update successful');
	});
};

const getDescriptionPSELCE = (req, res) => {
	if(req.params.id != null && req.params.id.match(/^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i)){
		pool.query(`SELECT
		descPSELCE_dateActivite as dateactivite,
		descPSELCE_autreDate1 as autredate1,
		descPSELCE_autreDate2 as autredate2,
		descPSELCE_autredate3 as autredate3,
		descPSELCE_datedu as datedu,
		descPSELCE_dateau as dateau,
		descPSELCE_clientele6a18 as clientele6a18,
		descPSELCE_clienteleadulte as clienteleadulte,
		descPSELCE_nombreParticipants as nombreparticipants,
		descPSELCE_nombrenouveauxadeptes as nombrenouveauxadeptes,
		descPSELCE_structurescolaire as structurescolaire,
		descPSELCE_structureassociation as structureassociation,
		descPSELCE_structureouvertpublic as structureouvertpublic,
		descPSELCE_structureautre as structureautre,
		descPSELCE_structureautredescr as structureautredescr
		FROM FORM WHERE form_id = $1`,[req.params.id],(error, results) => {
			if(error){
				console.log(error);
			}
			res.status(200).send(results.rows[0]);
		});
	}else {
		res.status(204).send();
	}
};

const updatePSELCE = (req, res) => {
	let date1 = (req.body.date1 == 'Invalid date') ? '0000-00-00' : req.body.date1;
	let date2 = (req.body.date2 == 'Invalid date') ? '0000-00-00' : req.body.date2;
	let date3 = (req.body.date3 == 'Invalid date') ? '0000-00-00' : req.body.date3;
	let autreDate1 = (req.body.autreDate1 == 'Invalid date') ? '0000-00-00' : req.body.autreDate1;
	let autreDate2 = (req.body.autreDate2 == 'Invalid date') ? '0000-00-00' : req.body.autreDate2;
	let autreDate3 = (req.body.autreDate3 == 'Invalid date') ? '0000-00-00' : req.body.autreDate3;
	let dateDu1 = (req.body.dateDu1 == 'Invalid date') ? '0000-00-00' : req.body.dateDu1;
	let dateAu1 = (req.body.dateAu1 == 'Invalid date') ? '0000-00-00' : req.body.dateAu1;
	let dateDu2 = (req.body.dateDu2 == 'Invalid date') ? '0000-00-00' : req.body.dateDu2;
	let dateAu2 = (req.body.dateAu2 == 'Invalid date') ? '0000-00-00' : req.body.dateAu2;
	
	pool.query(`UPDATE FORM SET
	PSELCE_poisson = $2,
	PSELCE_poissonOmbleFontaine = $3,
	PSELCE_argent = $4,
	PSELCE_argentOmbleFontaine = $5,
	PSELCE_argentTruiteBrune = $6,
	PSELCE_argentTruiteArcEnCiel = $7,
	PSELCE_peuimporte = $8,
	PSELCE_peuImporteOmbleFontaine = $9,
	PSELCE_feteDeLaPeche = $10,
	PSELCE_date1 = to_date($11,'yyyy-mm-dd'),
	PSELCE_date2 = to_date($12,'yyyy-mm-dd'),
	PSELCE_date3 = to_date($13,'yyyy-mm-dd'),
	PSELCE_autreDate1 = to_date($14,'yyyy-mm-dd'),
	PSELCE_autreDate2 = to_date($15,'yyyy-mm-dd'),
	PSELCE_autreDate3 = to_date($16,'yyyy-mm-dd'),
	PSELCE_dateDu1 = to_date($17,'yyyy-mm-dd'),
	PSELCE_dateAu1 = to_date($18,'yyyy-mm-dd'),
	PSELCE_dateDu2 = to_date($19,'yyyy-mm-dd'),
	PSELCE_dateAu2 = to_date($20,'yyyy-mm-dd'),
	PSELCE_rampePonctuelResident = $21,
	PSELCE_rampePonctuelNonResident = $22,
	PSELCE_rampeSaisonnierResident = $23,
	PSELCE_rampeSaisonnierNonResident = $24,
	PSELCE_stationPonctuelResident = $25,
	PSELCE_stationPonctuelNonResident = $26,
	PSELCE_stationSaisonnierResident = $27,
	PSELCE_stationSaisonnierNonResident = $28,
	PSELCE_stationnementPonctuelResident = $29,
	PSELCE_stationnementPonctuelNonResident = $30,
	PSELCE_stationnementSaisonnierResident = $31,
	PSELCE_stationnementSaisonnierNonResident = $32,
	PSELCE_commentaireTarification = $33,
	PSELCE_transportPublic = $34,
	PSELCE_transportPublicDescr = $35,
	PSELCE_servicesAcces = $36,
	PSELCE_servicesAccesDescr = $37,
	PSELCE_contributionOrganisme = $38,
	PSELCE_contributionPSELCE = $39
	WHERE form_id = $1`,[
	req.body.id,
	req.body.poisson,
	req.body.poissonOmbleFontaine,
	req.body.argent,
	req.body.argentOmbleFontaine,
	req.body.argentTruiteBrune,
	req.body.argentTruiteArcEnCiel,
	req.body.peuimporte,
	req.body.peuImporteOmbleFontaine,
	req.body.feteDeLaPeche,
	date1,
	date2,
	date3,
	autreDate1,
	autreDate2,
	autreDate3,
	dateDu1,
	dateAu1,
	dateDu2,
	dateAu2,
	req.body.rampePonctuelResident,
	req.body.rampePonctuelNonResident,
	req.body.rampeSaisonnierResident,
	req.body.rampeSaisonnierNonResident,
	req.body.stationPonctuelResident,
	req.body.stationPonctuelNonResident,
	req.body.stationSaisonnierResident,
	req.body.stationSaisonnierNonResident,
	req.body.stationnementPonctuelResident,
	req.body.stationnementPonctuelNonResident,
	req.body.stationnementSaisonnierResident,
	req.body.stationnementSaisonnierNonResident,
	req.body.commentaireTarification,
	req.body.transportPublic,
	req.body.transportPublicDescr,
	req.body.servicesAcces,
	req.body.servicesAccesDescr,
	req.body.contributionOrganisme,
	req.body.contributionPSELCE
	],(error, results) => {
		if(error){
			console.log(error);
		}
		res.status(200).send('update succesful');
	});
};

const getPSELCE = (req, res) => {
	if (req.params.id != null && req.params.id.match(/^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i)){
		pool.query(`SELECT
		PSELCE_poisson as poisson,
		PSELCE_poissonOmbleFontaine as poissonOmbleFontaine,
		PSELCE_argent as argent,
		PSELCE_argentOmbleFontaine as argentOmbleFontaine,
		PSELCE_argentTruiteBrune as argentTruiteBrune,
		PSELCE_argentTruiteArcEnCiel as argentTruiteArcEnCiel,
		PSELCE_peuimporte as peuimporte,
		PSELCE_peuImporteOmbleFontaine as peuImporteOmbleFontaine,
		PSELCE_feteDeLaPeche as feteDeLaPeche,
		PSELCE_date1 as date1,
		PSELCE_date2 as date2,
		PSELCE_date3 as date3,
		PSELCE_autreDate1 as autreDate1,
		PSELCE_autreDate2 as autreDate2,
		PSELCE_autreDate3 as autreDate3,
		PSELCE_dateDu1 as dateDu1,
		PSELCE_dateAu1 as dateAu1,
		PSELCE_dateDu2 as dateDu2,
		PSELCE_dateAu2 as dateAu2,
		PSELCE_rampePonctuelResident as rampePonctuelResident,
		PSELCE_rampePonctuelNonResident as rampePonctuelNonResident,
		PSELCE_rampeSaisonnierResident as rampeSaisonnierResident,
		PSELCE_rampeSaisonnierNonResident as rampeSaisonnierNonResident,
		PSELCE_stationPonctuelResident as stationPonctuelResident,
		PSELCE_stationPonctuelNonResident as stationPonctuelNonResident,
		PSELCE_stationSaisonnierResident as stationSaisonnierResident,
		PSELCE_stationSaisonnierNonResident as stationSaisonnierNonResident,
		PSELCE_stationnementPonctuelResident as stationnementPonctuelResident,
		PSELCE_stationnementPonctuelNonResident as stationnementPonctuelNonResident,
		PSELCE_stationnementSaisonnierResident as stationnementSaisonnierResident,
		PSELCE_stationnementSaisonnierNonResident as stationnementSaisonnierNonResident,
		PSELCE_commentaireTarification as commentaireTarification,
		PSELCE_transportPublic as transportPublic,
		PSELCE_transportPublicDescr as transportPublicDescr,
		PSELCE_servicesAcces as servicesAcces,
		PSELCE_servicesAccesDescr as servicesAccesDescr,
		PSELCE_contributionOrganisme as contributionOrganisme,
		PSELCE_contributionPSELCE as contributionPSELCE
		FROM FORM WHERE form_id = $1`, [req.params.id], (error, results) => {
			if(error){
				console.log(error);
			}
			res.status(200).send(results.rows[0]);
		});
	}else{
		res.status(204).send();
	}
};

const updatePartenaires = (req, res, next) => {
		pool.query(`UPDATE FORM SET
		prtnr_partenaires = $2,
		prtnr_engagementpartenaires = $3,
		prtnr_lettrespatentes = $4,
		prtnr_resolution = $5,
		prtnr_couvertureassurance = $6,
		prtnr_attestationpselce = $7
		WHERE form_id = $1`, 
		[
		req.body.id,
		req.body.partenaires,
		req.body.engagementPartenaires,
		req.body.lettresPatentes,
		req.body.resolution,
		req.body.couvertureAssurance,
		req.body.attestationPSELCE
		], (error, results) => {
			if(error){
				console.log(error);
			}
			res.status(200).send('update successful');
			next();
		});
};

const getPartenaires = (req, res) => {
	if(req.params.id != null && req.params.id.match(/^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i)){
		pool.query(`SELECT
		prtnr_partenaires as partenaires,
		prtnr_engagementpartenaires as engagementpartenaires,
		prtnr_lettrespatentes as lettrespatentes,
		prtnr_resolution as resolution,
		prtnr_couvertureassurance as couvertureAssurance,
		prtnr_attestationpselce as attestationpselce
		FROM FORM WHERE form_id = $1`, [req.params.id], (error, results) => {
			if(error){
				console.log(error);
			}
			res.status(200).send(results.rows[0]);
		});
	}
	else{
		res.status(204).send();
	}
};

const updateAdresseLivraison = (req, res) => {
	pool.query(`UPDATE FORM SET
	mtrl_materielEntrepot = $2,
	mtrl_regionExpedibus = $3,
	mtrl_villeExpedibus = $4,
	mtrl_pointServiceExpedibus = $5,
	mtrl_adresseExpedibus = $6,
	mtrl_codePostalExpedibus = $7,
	mtrl_telephoneExpedibus = $8,
	mtrl_adresseOrganisme = $9,
	mtrl_adresseHiver = $10,
	mtrl_villeHiver = $11,
	mtrl_codePostalHiver = $12
	WHERE form_id = $1`,
	[
	req.body.id,
	req.body.materielEntrepot,
	req.body.regionExpedibus,
	req.body.villeExpedibus,
	req.body.pointServiceExpedibus,
	req.body.adresseExpedibus,
	req.body.codePostalExpedibus,
	req.body.telephoneExpedibus,
	req.body.adresseOrganisme,
	req.body.adresseHiver,
	req.body.villeHiver,
	req.body.codePostalHiver
	], (error, results) => {
		if(error){
			console.log(error);
		}
		res.status(200).send('update successful');
	});
};

const getAdresseLivraison = (req, res) => {
	if(req.params.id != null && req.params.id.match(/^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i)){
		pool.query(`SELECT
		mtrl_materielEntrepot as materielEntrepot,
		mtrl_regionExpedibus as regionexpedibus,
		mtrl_villeExpedibus as villeexpedibus,
		mtrl_pointServiceExpedibus as pointserviceexpedibus,
		mtrl_adresseExpedibus as adresseexpedibus,
		mtrl_codePostalExpedibus as codePostalExpedibus,
		mtrl_telephoneExpedibus as telephoneExpedibus,
		mtrl_adresseOrganisme as adresseOrganisme,
		mtrl_adresseHiver as adresseHiver,
		mtrl_villeHiver as villeHiver,
		mtrl_codePostalHiver as codePostalHiver
		FROM form WHERE form_id = $1`, [req.params.id], (error, results) => {
			if(error){
				console.log(error);
			}
			res.status(200).send(results.rows[0]);
		});
	}else{
		res.status(204).send();
	}
};

const updateAttestation = (req,res) => {
		pool.query(`UPDATE FORM SET
		sign_signature = $2,
		sign_signaturenom = $3,
		sign_signaturedate = $4
		WHERE form_id = $1`, 
		[
		req.body.id,
		req.body.signature,
		req.body.signatureNom,
		req.body.signatureDate
		], (error,results) => {
			if(error){
				console.log(error);
			}
			res.status(200).send('update successful');
		});
};

const getAttestation = (req,res) => {
	if(req.params.id != null && req.params.id.match(/^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i)){
		pool.query(`SELECT
		sign_signature as signature,
		sign_signaturenom as signaturenom,
		sign_signaturedate as signaturedate
		FROM FORM WHERE form_id = $1`,[req.params.id],(error,results)=>{
			if(error){
				console.log(error);
			}
			res.status(200).send(results.rows[0]);
		});
	}else{
		res.status(204).send();
	}
};

const getMunicipalites = (req, res) => {
	pool.query( 'SELECT id, pmun_nom as name FROM p_municipalite' , (error, results) => {
		if(error){
			console.log(error);
		}
		res.status(200).send(results.rows);
	});
};

const getRegions = (req, res) => {
	pool.query ( 'SELECT id, preg_nom as name FROM p_region' , (error, results) => {
		if(error){
			console.log(error);
		}
		res.status(200).send(results.rows);
	})
};

module.exports = {
	newForm,
	verifyForm,
	getPEHPSELCE,
	getMunicipalites,
	getRegions,
	updateOrganisme,
	getOrganisme,
	updateDescriptionProjet,
	getDescriptionProjet,
	updateDescriptionPSELCE,
	getDescriptionPSELCE,
	updatePSELCE,
	getPSELCE,
	updatePartenaires,
	getPartenaires,
	updateAdresseLivraison,
	getAdresseLivraison,
	updateAttestation,
	getAttestation
}