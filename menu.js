const fs = require("fs");
const prompt = require("prompt");

let allGifts = [];
let allQuestions = [];
let finalQuestions = [];
let addedQuestionsIndex = [];

const viewFiles = () => {
  addedQuestionsIndex = [];
  allQuestions = [];
  allGifts = [];
  fs.readdir("./SujetB_data/", "utf8", function (err, data) {
    if (err) {
      console.log("Dossier introuvable");
    }

    console.log("Liste des fichiers gift: \n");
    data.forEach((file) => {
      allGifts.push(file);
      console.log(allGifts.length - 1 + "   " + file.split(".")[0]);
    });

    fileSelect();
  });
};

const fileSelect = () => {
  prompt.start();
  prompt.get(
    [
      {
        name: "fileIndex",
        required: true,
        description: `Index Du fichier à séléctionner = (0 / ${
          allGifts.length - 1
        }) or "create" to end`,
      },
    ],
    (err, result) => {
      if (result.fileIndex >= 0 && result.fileIndex <= allGifts.length - 1) {
        console.log("Fichier Selectionné : " + allGifts[result.fileIndex]);
        allQuestions = fs
          .readFileSync("./SujetB_data/" + allGifts[result.fileIndex], "utf8")
          .split(/\n\n/g);

        allQuestions.forEach((question) => {
          console.log(
            `\n============Question ${allQuestions.indexOf(
              question
            )}============  \n\n` +
              question +
              `\n===================================  \n\n`
          );
        });
        questionSelect();
      } else if (result.fileIndex === "create") {
        return createFinalFile();
      } else {
        console.log("Fichier Inexistant");
        viewFiles();
      }
    }
  );
};

const questionSelect = () => {
  prompt.start();
  prompt.get(
    [
      {
        name: "questionIndex",
        required: true,
        description: `Index de la question à séléctionner = (0 / ${
          allQuestions.length - 1
        }) or "exit" to return to the file select`,
      },
    ],
    (err, result) => {
      if (
        result.questionIndex >= 0 &&
        result.questionIndex <= allQuestions.length - 1 &&
        !addedQuestionsIndex.includes(result.questionIndex)
      ) {
        addedQuestionsIndex.push(result.questionIndex);
        finalQuestions.push(allQuestions[result.questionIndex]);
        questionSelect();
      } else if (result.questionIndex === "exit") {
        viewFiles();
        return console.log("Returning to the File Select");
      } else {
        console.log("Question Inexistante ou déjà selectionnée");
        questionSelect();
      }
    }
  );
};

const createFinalFile = () => {
    console.log("Final Questions created in nouveau_test.gift ");
  fs.writeFileSync("nouveau_test.gift", finalQuestions.join("\n\n"), (err) => {
    
    if (err) throw err;
  });
};

exports.viewFiles = viewFiles;
