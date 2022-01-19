var Gift = require('../Gift')
var giftParser = require("../GiftParser");

describe("Program Semantic testing of GIFT", function(){
	
	beforeAll(function() {

		this.g = new Gift("question1", "U9", "p94", "Listening", "4.1", "Max says that top sportspeople usually believe their success is due to", ["hard work."], ["good fortune.","raw talent."]);

	});
	
	it("can parse a GIFT file", function(){
		var Parser = new giftParser;
		fs.readFile('../data_npmtest.gift', function(err, data){
        	Parser.parse(data);  
      	});
      	var gift=Parser.parsedGift[0];
		expect(gift).toEqual(this.g);		
	});
	
	it("can compare two gift", function(){
		var g2 = new Gift("question1", "U9", "p94", "Listening", "4.1", "Max says that top sportspeople usually believe their success is due to", ["hard work."], ["good fortune.","raw talent."]);
		var result = this.g.egalite(g2);
		expect(result).toEqual(true);
		g2=("question1", "U10", "p94", "Listening", "4.1", "Max says that top sportspeople usually believe their success is due to", ["hard work."], ["good fortune.","raw talent."]);
		var result = this.g.egalite(g2);
		expect(result).toEqual(false);
	});
	