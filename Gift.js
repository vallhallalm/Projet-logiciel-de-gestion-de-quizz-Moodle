var Gift = function (comm, n, pN, tQ, nQ, txt, rV, rF) {
  this.Commentaire = comm;
  this.numero = n;
  this.pageNumber = pN;
  this.typeQuestion = tQ;
  this.numQuestion = nQ;
  this.texte = txt;
  this.repV = rV;
  this.repF = rF;
}

Gift.prototype.egalite = function (Gift2) {
  if (this.Commentaire === Gift2.Commentaire & this.numero === Gift2.numero & this.pageNumber === Gift2.pageNumber & this.typeQuestion === Gift2.typeQuestion & this.numQuestion === Gift2.numQuestion & this.texte === Gift2.texte & this.repF === Gift2.repF & this.repV === Gift2.repV) {
    return true;
  } else {
    return false;
  }
}

Gift.prototype.affichage = function (Gift) {
  console.log("Question : ", Gift.texte);
  console.log("Bonne réponse : ", Gift.repV);
  console.log("Mauvaise réponse : ", Gift.repF);
}

Gift.prototype.ecriture= function(Gift){
	var file = new ActiveXObject("Scripting.FileSystemObject");
	var a = file.OpentextFile("./data_test.gift",true);
	a.WriteLine("//", Gift.Commentaire);
	a.WriteLine("::U", Gift.numero," p", Gift.pageNumber," ", Gift.typeQuestion," ", Gift.numQuestion,"::", Gift.texte," {");
	let i=0;
	let j=Math.floor(Math.random() * Gift.repF.length());
	for (i=0;i<=j;i++){
		a.WriteLine("~", Gift.repF[i]);
	}
	let b;
	for (b=0;b<=Gift.repV.length();b++){
		a.WriteLine("=", Gift.repV[b]);
	}
	for (i=j;i<=Gift.repF.length();i++){
		a.WriteLine("~", Gift.repF[i]);
	}
	a.WriteLine("}");
	a.Close();
}

Gift.prototype.ecriture = function (Gift) {
  var file = new ActiveXObject("Scripting.FileSystemObject");
  var a = file.OpentextFile("./data_test.gift", true);
  a.WriteLine("//", Gift.Commentaire);
  a.WriteLine("::", Gift.numero, Gift.pageNumber, " ", Gift.typeQuestion, " ", Gift.numQuestion, "::", Gift.texte, " {");
  let i = 0;
  let j = Math.floor(Math.random() * Gift.repF.length());
  for (i = 0; i <= j; i++) {
    a.WriteLine("~", Gift.repF[i]);
  }
  let b;
  for (b = 0; b <= Gift.repV.length(); b++) {
    a.WriteLine("=", Gift.repV[b]);
  }
  for (i = j; i <= Gift.repF.length(); i++) {
    a.WriteLine("~", Gift.repF[i]);
  }
  a.WriteLine("}");
  a.Close();
}

module.exports = Gift;