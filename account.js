const prompt = require("prompt");
var fs = require("fs");

var accounts = JSON.parse(fs.readFileSync("./account.json", "utf8"));

const createAccount = () => {
  console.log("Creating new account...");

  prompt.start();
  prompt.get(
    [
      {
        name: "Username",
        required: true,
      },
      {
        name: "Password",
        hidden: true,
        replace: "*",
        required: true,
      },
      {
        name: "id",
        required: true,
        description: "id: (admin / user)",
      },
    ],

    function (err, result) {
      accounts.push({
        username: result.Username,
        password: result.Password,
        id: result.id == "admin" ? "admin" : "user",
      });
      fs.writeFileSync(
        "account.json",
        JSON.stringify(accounts, null, 2),
        (err) => {
          if (err) throw err;
          console.log("Account created");
        }
      );
    }
  );
};

const connectUser = () => {
  console.log("Trying to Connect");

  return new Promise((resolve) => {
    //Nouvelle Promesse qui return true / false
    prompt.get(
      [
        {
          name: "Username",
          required: true,
        },
        {
          name: "Password",
          hidden: true,
          replace: "*",
          required: true,
        },
      ],
      (err, result) => {
        //Check if username exists in json
        let indexAccount = accounts.findIndex(
          (account) => account.username == result.Username
        );
        if (indexAccount === -1) {
          console.log("Error username not recognized");
          return resolve(false); //Resolve la promise False dans tout les cas ou la connexion n'est pas autorisée
        }

        //Check if password matches + existing id
        if (accounts[indexAccount].password === result.Password) {
          if (accounts[indexAccount].id === "user") {
            console.log("Connecté en tant que User");
            return resolve(true); //Resolve la promise True dans tout les cas ou la connexion est autorisée
          } else if (accounts[indexAccount].id === "admin") {
            console.log("Connecté en tant que Admin");
            return resolve(true); //Resolve la promise True dans tout les cas ou la connexion est autorisée
          } else {
            console.error("id undefined wtf did you do");
            return resolve(false); //Resolve la promise False dans tout les cas ou la connexion n'est pas autorisée
          }
        } else {
          console.log("Mauvais Mot de passe");
          return resolve(false); //Resolve la promise False dans tout les cas ou la connexion n'est pas autorisée
        }
      }
    );
  });
};
const connectAdmin = () => {
  console.log("Trying to Connect");

  return new Promise((resolve) => {
    prompt.get(
      [
        {
          name: "Username",
          required: true,
        },
        {
          name: "Password",
          hidden: true,
          replace: "*",
          required: true,
        },
      ],
      (err, result) => {
        //Check if username exists in json
        let indexAccount = accounts.findIndex(
          (account) => account.username == result.Username
        );
        if (indexAccount === -1) {
          console.log("Error username not recognized");
          return resolve(false); //Resolve la promise False dans tout les cas ou la connexion n'est pas autorisée
        }

        //Check if password matches + admin perms
        if (accounts[indexAccount].password === result.Password) {
          if (accounts[indexAccount].id === "admin") {
            console.log("Connecté en tant que Admin");
            return resolve(true); //Resolve la promise True dans tout les cas ou la connexion est autorisée
          } else {
            console.log("Vous n'êtes pas admin");
            return resolve(false); //Resolve la promise False dans tout les cas ou la connexion n'est pas autorisée
          }
        } else {
          console.log("Mauvais Mot de passe");
          return resolve(false); //Resolve la promise False dans tout les cas ou la connexion n'est pas autorisée
        }
      }
    );
  });
};

exports.connectUser = connectUser; // exportation de la fonction connectUser pour l'utilisation dans le fichier caporalCli
exports.connectAdmin = connectAdmin; // exportation de la fonction connectAdmin pour l'utilisation dans le fichier caporalCli
exports.createAccount = createAccount; // exportation de la fonction createAccountpour l'utilisation dans le fichier caporalCli
