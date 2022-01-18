var Gift = require('./Gift')

var GiftParser = function(sTokenize, sParsedSymb){
	// The list of gift parsed from the input file.
	this.parsedGift=[];
	this.symb = ["//","{"];
	this.showTokenize = sTokenize;
	this.showParsedSymbols = sParsedSymb;
	this.errorCount = 0;
}

// Parser procedure

// tokenize : tranform the data input into a list
// <eol> = CRLF
GiftParser.prototype.tokenize = function(data){
	var split1 = data.split(" ");
	var terminer = false;
	while (terminer === false) {
    	terminer = true;
    	for (let i = 0; i< split1.length; i++ ) {
        	if (split1[i].includes('\n')) {
            	let splitN = split1[i].split('\n');
            	split1.splice(i, 1, splitN[0]);
            	for (let j = 1; j<splitN.length; j++ ) {
                	split1.splice(i+j, 0, splitN[j]);
            	} 
            	terminer = false;
        	}
        	if (split1[i].includes('\r')) {
            	let splitR = split1[i].split('\r');
            	split1.splice(i, 1, splitR[0]);
            	for (let j = 1; j<splitR.length; j++) {
                	split1.splice(i+j, 0, splitR[j]);
            	}
            	terminer = false;
       		}
        	if (split1[i].includes('::')) {
            	let splitP = split1[i].split('::');
            	split1.splice(i, 1, splitP[0]);
            	for (let j = 1; j<splitP.length; j++) {
                	split1.splice(i+j, 0, splitP[j]);
            	}
            	terminer = false;
        	}
       		if (split1[i] === ''){
            	split1.splice(i, 1);
            	terminer = false;
        	}
    	}
	} 					
	return split1;
}

// parse : analyze data by calling the first non terminal rule of the grammar
GiftParser.prototype.parse = function(data){
	var tData = this.tokenize(data);
	if(this.showTokenize){
		console.log(tData);
	}
	this.listQuestion(tData);
}

// Parser operand

GiftParser.prototype.errMsg = function(msg, input){
	this.errorCount++;
	console.log("Parsing Error ! on "+input+" -- msg : "+msg);
}

// Read and return a symbol from input
GiftParser.prototype.next = function(input){
	var curS = input.shift();
	if(this.showParsedSymbols){
		//console.log(curS);
	}
	return curS
}

// accept : verify if the arg s is part of the language symbols.
GiftParser.prototype.accept = function(s){
	var idx = this.symb.indexOf(s);
	// index 0 exists
	if(idx === -1){
		this.errMsg("symbol "+s+" unknown", [" "]);
		return false;
	}

	return idx;
}



// check : check whether the arg elt is on the head of the list
GiftParser.prototype.check = function(s, input){
	if(this.accept(input[0]) == this.accept(s)){
		return true;	
	}
	return false;
}

// expect : expect the next symbol to be s.
GiftParser.prototype.expect = function(s, input){
	if(s == this.next(input)){
		//console.log("Reckognized! "+s)
		return true;
	}else{
		this.errMsg("symbol "+s+" doesn't match", input);
	}
	return false;
}


// Parser rules

// <listeQuestion> = *(<gift>)
GiftParser.prototype.listQuestion = function(input){
	tabGift =new Array;
	if(this.check("//", input)){
		this.expect("//", input);
		this.gift(input);
	}
	this.parsedGift=tabGift;
}

// base du parser
GiftParser.prototype.gift = function(input){
	
		var args = this.head(input);
		var rFin=this.question(input);
		//console.log("affichage rFin",rFin);
		var g = new Gift(args.comm, args.numero, args.numeroPage, args.typeQuestion, args.numQuestion, args.texte, rFin[2], rFin[1]);
		//this.expect(/[\s]/,input);
		tabGift.push(g);
		//GiftParser.parsedGIFT.push(g);
		var curS = this.next(input);
		if(curS !== undefined){
			this.gift(input);
		
		return true;
	}else{
		return false;
	}

}

// <head> = <comm> <num> <numeroPage> <typeQuestion> <numquestion> <txt>
GiftParser.prototype.head = function(input){
	var comm = this.comm(input);
	var numero = this.num(input);
	var numeroPage = this.numeroPage(input);
	var typeQuestion = this.typeQuestion(input);
	var numQuestion = this.numQuestion(input);
	//this.expect("::",input)
	//var curS = this.next(input);
	var texte = this.txt(input);
	return { comm: comm, numero: numero, numeroPage: numeroPage, typeQuestion: typeQuestion, numQuestion: numQuestion, texte: texte };
}

// <comm> = N*WCHAR
GiftParser.prototype.comm = function(input){
	var curS = this.next(input);
	return curS;
	/*if(matched = curS.match(/(\w+)/i)){
		return matched[0];
	}else{
		this.errMsg("Invalid comm", input);
	}*/
}

// <num> = \w\d
GiftParser.prototype.num = function(input){
	//this.expect("::U",input)
	var curS = this.next(input);
	return curS;/*
	if(matched = curS.match(/(\w\d)/)){
		return matched[0];
	}else{
		this.errMsg("Invalid num", input);
	}*/
}


// <numeroPage> = \w\d
GiftParser.prototype.numeroPage = function(input){
	//this.expect("p",input)
	var curS = this.next(input);
	return curS;
	/*if(matched = curS.match(/(\w\d+)/)){
		return matched[0];
	}else{
		this.errMsg("Invalid numeroPage", input);
	}*/
}

// <typeQuestion> = \w+
GiftParser.prototype.typeQuestion = function(input){
	var curS = this.next(input);
	return curS;
	/*if(matched = curS.match(/[\wàéèêîù']+/i)){
		return matched[0];
	}else{
		this.errMsg("Invalid typeQuestion", input);
	}*/
}

// <numQuestion> = \d"."\d
GiftParser.prototype.numQuestion = function(input){
	var curS = this.next(input);
	return curS;
	/*if(matched = curS.match(/[\w+]/)){
		return matched[0];
	}else{
		this.errMsg("Invalid numQuestion", input);
	}*/
}

// <txt> = \w+
GiftParser.prototype.txt = function(input){
	var curS = this.next(input);
	var chaine ="";
	do{
		chaine+=curS+" ";
		curS = this.next(input);
		//console.log("txt",curS);
	}while(curS!="{");
	//console.log(chaine);
	return chaine;
}

// <question> = "{...}"
GiftParser.prototype.question = function (input){
	//if(this.check("{", input)){
		//this.expect("{", input);
		var curS = this.next(input);
		var rF = new Array();
		var rV = new Array();
		//console.log("test",curS)
		do{
			if (curS==="~"){
				curS=this.next(input);
				var chaine ="";
				do{
					chaine+=curS+" ";
					curS = this.next(input);
					//console.log("~",curS);
					if(curS==="}"){
						break;
					}else if(curS==="~"){
						break;
					}
				}while(curS!="=");
				rF.push(chaine);
			}
			else if (curS==="="){
				curS=this.next(input);
				var chaine ="";
				do{
					chaine+=curS+" ";
					curS = this.next(input);
					//console.log("=",curS);
					if(curS==="}"){
						break;
					}else if(curS==="="){
						break;
					}
				}while(curS!="~");
				rV.push(chaine);
			}
		}while (curS!="}"); 
		var rFin = new Array();
		//console.log(rF);
		rFin[1]=rF;
		rFin[2]=rV;
		return rFin;	
	//}
}
module.exports = GiftParser;