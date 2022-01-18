const fs = require("fs");
const prompt = require("prompt");
const vCardsJS = require("vcards-js");

let allVCards = [];

const create = () => {
  console.log("Creating Vcard");

  prompt.start();
  prompt.get(
    [
      {
        name: "Prenom",
        required: true,
      },
      {
        name: "Nom",
        required: true,
      },
      {
        name: "Telephone",
        required: true,
      },
      {
        name: "Email",
        required: true,
      },
      {
        name: "Id",
        required: true,
        description: "ID (admin / user)"
      },
      {
        name: "Rue",
        required: true,
      },
      {
        name: "Ville",
        required: true,
      },
      {
        name: "Region",
        required: true,
      },
      {
        name: "Code_postal",
        required: true,
      },
    ],
    function (err, result) {
      var vCard = vCardsJS();
      //set properties
      vCard.firstName = result.Prenom;
      vCard.lastName = result.Nom;
      vCard.homePhone = result.Telephone;
      vCard.uid = result.Id == "admin" ? "admin" : "user",
      vCard.email = result.Email;
      vCard.homeAddress.street = result.Rue;
      vCard.homeAddress.city = result.Ville;
      vCard.homeAddress.stateProvince = result.Region;
      vCard.homeAddress.postalCode = result.Code_postal;

      //save to file
      vCard.saveToFile("./vCards/" + result.Prenom + "_" + result.Nom + ".vcf");

      //get as formatted string
    }
  );
};

const VCardInfo = () => {
  allVCards = [];
  fs.readdir("./vCards/", "utf8", function (err, data) {
    if (err) {
      console.log("Dossier introuvable");
    }

    console.log("\n\nListe des fichiers vCards: ");

    data.forEach((file) => {
      allVCards.push(file);
      console.log(allVCards.length - 1 + "    " + file.split(".")[0]);
    });

    prompt.start();
    prompt.get(
      [
        {
          name: "vcardIndex",
          required: true,
          description: `Index Du fichier à séléctionner = (0 / ${
            allVCards.length - 1
          }) or "exit" to end`,
        },
      ],
      (err, result) => {
        if (
          result.vcardIndex >= 0 &&
          result.vcardIndex <= allVCards.length - 1
        ) {
          console.log("Fichier Selectionné : " + allVCards[result.vcardIndex]);

          vCardParse(result.vcardIndex);
        } else if (result.vcardIndex === "exit") {
          return console.log("Exiting...");
        } else {
          console.log("Fichier Inexistant");
          VCardInfo();
        }
      }
    );
  });
};

const vCardParse = (id) => {
  const vCardContenu = fs.readFileSync("./vCards/" + allVCards[id], "utf8").split(';').join(":").split(":").join('\r').split('\r');
  console.log("\nPrénom : " + vCardContenu[10])
  console.log("Nom : "+ vCardContenu[9])
  console.log("ID : "+ vCardContenu[16])
  console.log("Email : "+ vCardContenu[20])
  console.log("Téléphone : "+ vCardContenu[23])
  console.log(`Adresse : ${vCardContenu[29]}, ${vCardContenu[32]} ${vCardContenu[30]}, ${vCardContenu[31]}`)
};

exports.VCardInfo = VCardInfo;
exports.create = create;
