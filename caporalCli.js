const fs = require("fs");
const colors = require("colors");
const inter = require("./Modele.js");
const vg = require("vega");
const prompt = require("prompt");
const vCardsJS = require("vcards-js");
const vegalite = require("vega-lite");
const cli = require("@caporal/core").default;
const account = require("./account.js");
const menu = require("./menu.js");
const functionsVCard = require("./functionsVCard.js");

var accounts = JSON.parse(fs.readFileSync("./account.json", "utf8"));
cli
  .version("gift-parser-cli")
  .version("0.07")

  // readme
  .command("readme", "Display the README.txt file")
  .action(({ args, option, logger }) => {
    fs.readFile("README.txt", "utf8", function (err, data) {
      if (err) {
        return logger.warn(err);
      } else {
        return logger.info(data);
      }
    });
  })

  //select
  .command("select", "permet de tester le parseur")
  .argument("<file>", "Le fichier GIFT contenant les questions")
  .action(({args,options,logger}) => {
    var Modele = new inter;
    Modele.select(args.file);       
      })

  // createTest
  .command("createTest","Permet de sélectionner les questions pour créer un test")
  .action(async ({ args, options, logger }) => {
    const connected = await account.connectUser(); //Attente d'une réponse (true / false) de connectUser
    if (connected === true) {
      menu.viewFiles();
    }
  })

  //affichage vCard
  .command("vCardInfo", "Affiche les informations du vCard choisi")
  .action(async ({ args, options, logger }) => {
    //creation Fonction Asynchrone
    const isAdmin = await account.connectAdmin(); //Attente d'une réponse (true / false) de connectAdmin
    if (isAdmin === true) {
      functionsVCard.VCardInfo();
    } else {
      return console.log("You don't have permission to do this");
    }
  })

  //Creation vCard
  .command("vcard", "Creer un fichier vCard")
  .action(async ({ args, options, logger }) => {
    //creation Fonction Asynchrone
    const isAdmin = await account.connectAdmin(); //Attente d'une réponse (true / false) de connectAdmin
    if (isAdmin === true) {
      functionsVCard.create();
    } else {
      return console.log("You don't have permission to do this");
    }
    //Creation fichier vCards
  })

  //Creation d'un nouveau compte (Perm Admin Requirement)
  .command("addAccount", "Créer un compte")
  .action(async ({ args, options, logger }) => {
    //creation Fonction Asynchrone
    const isAdmin = await account.connectAdmin(); //Attente d'une réponse (true / false) de connectAdmin
    if (isAdmin === true) {
      account.createAccount();
    } else {
      return console.log("You don't have permission to do this");
    }
  })

  // pass
  .command("pass", "Simuler le passage du test")
  .argument("<file>", "Le fichier GIFT contenant le test")
  .action(({ args, options, logger }) => {
    var Modele = new inter;
    Modele.pass(args.file);
  })

  // verif
  .command("verif", "Permet de vérifier la qualité des données du test")
  .argument("<file>", "Le fichier GIFT contenant le test")
  .action(({ args, options, logger }) => {
    var Modele = new inter;
    Modele.verif(args.file);
  })

  //visualize
  .command(
    "visualize",
    "visualisation de graphique par rapport au type de questions"
  )
  .action(({ args, options, logger }) => {
    var Modele = new inter;
    Modele.visualize();
  })

  //avg
  .command("avg", "Comparaison avec le profil moyen de question")
  .action(({ args, options, logger }) => {
    var Modele = new inter;
    Modele.avg();
  });

cli.run(process.argv.slice(2));
