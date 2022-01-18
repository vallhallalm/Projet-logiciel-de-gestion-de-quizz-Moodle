var giftParser = require("./GiftParser");
var Gift = require("./Gift");
const fs = require ('fs');
const { Console } = require('console');
var inquirer = require('inquirer');
const { strictEqual } = require('assert');
var Modele = function (test) {
  this.etat = test;
};

// fonction select : permet de sélectionner un fichier et affiche les questions contenues dedans
Modele.prototype.select = function (input) {
	let Parser=new giftParser(false,false);
	fs.readFile(input, function(err, data){
		if(err){
			console.log("Erreur",err);
		}		
		var output = Parser.parse(data.toString());
		var listQuestion = Parser.parsedGift;
	
  console.log(listQuestion);
  //listQuestion.foreach(Gift.affichage());
	})
};


// fonction group : permet de sélectionner des questions et de les mettre dans un fichier GIFT
Modele.prototype.group = function (input) {
  Modele.prototype.select(input);
  const index = null;
  while (index != "#") {
    index = prompt(
      "Entrez le numéro de la question choisit ou # si vous avez fini :"
    );
    if (index != "#") {
      Gift.ecriture(Parser.parsedGift[index]);
    }
  }
};

// fonction pass : permet de faire passer le test selon un fichier gift rentré en argument

Modele.prototype.pass = function (input) {
function randomize(tab) {
    var i, j, tmp;
    for (i = tab.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        tmp = tab[i];
        tab[i] = tab[j];
        tab[j] = tmp;
    }
    return tab;
}

let questions = [];
let repVrai = [];
let Parser=new giftParser(false,false);
fs.readFile(input, function(err, data){
	if(err){
		console.log("Erreur",err);
	}		
	var output = Parser.parse(data.toString());
	var listQuestion = Parser.parsedGift;
	let repUser;
	for (let i = 0; i<listQuestion.length; i++) {
		var choix = listQuestion[i].repV + listQuestion[i].repF;
		choix = choix.split('.');
		
			for (let j = 0; j+1<choix.length; j++) {
				if (choix[j][0] === ' ') {
					choix[j] = choix[j].slice(1, choix[j].length);
				}
				if (choix[j][0] === ',') {
					choix[j] = choix[j].slice(1, choix[j].length);
				}							
		}
		choix.pop();
		repVrai.push(choix[0]);
		choix = randomize(choix);
		let question = {
			type: 'list',
			name: listQuestion[i].Commentaire,
			message: listQuestion[i].texte,
			choices: choix,
			}
			questions.push(question);			
		}
		inquirer
			.prompt(questions)
			.then(answers => {
				let compteurNote = 0;
				let i = 0;
				for (let key of Object.keys(answers)) {
					let value = answers[key];
						if (repVrai[i] === value) {
							compteurNote++
							console.log(listQuestion[i].Commentaire + " : " + value + " Vrai");
						}
						else {
							console.log(listQuestion[i].Commentaire + " : " + value + " Faux");
							console.log("La bonne réponse était " + listQuestion[i].repV);
						}
						i++;
						console.log(i);
						console.log("Note : " +compteurNote);				
					
					console.log("Vous avez obtenu la note de " + compteurNote + " / " + i);
					}
			})
	})
};

// fonction verif : permet de vérifier dans un fichier gift rentré en argument qu'il y a bien entre 15 et 20 questions différentes

Modele.prototype.verif = function (input) {
  let Parser=new giftParser(false,false);
fs.readFile(input, function(err, data){
	if(err){
		console.log("Erreur",err);
	}		
	var output = Parser.parse(data.toString());
	var listQuestion = Parser.parsedGift;

  let i = 0;
  let j = 0;
  let result = true;
  for (i = 0; i <= listQuestion.length; i++) {
    for (j = i + 1; j <= listQuestion.length - 1; j++) {
		if (listQuestion[i].Commentaire === listQuestion[j].Commentaire && listQuestion[i].numero === listQuestion[j].numero && listQuestion[i].pageNumber === listQuestion[j].pageNumber && listQuestion[i].typeQuestion === listQuestion[j].typeQuestion && listQuestion[i].numQuestion === listQuestion[j].numQuestion && listQuestion[i].texte === listQuestion[j].texte ) {
			result = false;
		  }
    }
  }
  if (listQuestion.length < 15 || listQuestion.length > 20) {
    result = false;
  }
  if (result === false) {
    console.log("La vérification a échouée, fichier d'examen non valide.");
	console.log("Il faut entre 15 et 20 questions différentes !");
  } else {
    console.log("La vérification a réussi, fichier d'examen valide.");
  }
})
}

// fonction visualize : fonction non développée

Modele.prototype.visualize = function () {
  console.log("La fonction n'est pas développée.")
};

// fonction avg : fonction non développée

Modele.prototype.avg = function () {
  console.log("La fonction n'est pas développée.")
};

module.exports = Modele;
