const fs = require('fs');
const prompt = require('prompt-sync')({ sigint: true });
const tat = require('./resultat.json')


console.log(`Frågeformulär - MENY

1. Starta formuläret
A. Avsluta programmet:`);


const choice = prompt('Välj en handling: ');

switch (choice) {
  case "A":
    console.log("Du valde att avsluta programmet");
    break;

  case "1":
    const namn = prompt('Vad heter du: ');
    let hScore = {
      hund: 0,
      katt: 0,
      kanin: 0,
      fisk: 0,
    };

    try {
      const jsonString = fs.readFileSync('frågor.json', 'utf-8');
      frågor = JSON.parse(jsonString);
    } catch (err) {
      console.error("Error reading or parsing the JSON file:", err);
      process.exit(1);
    }

    for (let i = 0; i < frågor.length; i++) {
      let { svar, question } = frågor[i];
      let { ja, nej } = svar;
      const userSvar = prompt(`Fråga ${i + 1}: ${question}`);


      if (userSvar === "ja") {
        hScore.hund += ja.hund;
        hScore.katt += ja.katt;
        hScore.kanin += ja.kanin;
        hScore.fisk += ja.fisk;
      } else if (userSvar === "nej") {
        hScore.hund += nej.hund;
        hScore.katt += nej.katt;
        hScore.kanin += nej.kanin;
        hScore.fisk += nej.fisk;
      } else {
        console.log("Felaktigt svar. Ange 'ja' eller 'nej'.");
        i--;
      }
    }


    tat[0].count += 1;
    tat[0].date = new Date();
    tat[0].name = namn;
    let total = hScore.hund + hScore.katt + hScore.kanin + hScore.fisk;
    tat[0].score.hund = (hScore.hund / total * 100).toFixed(2);
    tat[0].score.katt = (hScore.katt / total * 100).toFixed(2);
    tat[0].score.kanin = (hScore.kanin / total * 100).toFixed(2);
    tat[0].score.fisk = (hScore.fisk / total * 100).toFixed(2);




    console.log('Dina resultat har nu sparats');
    fs.writeFile('./resultat.json', JSON.stringify(tat, null, 2), (err) => {
      if (err) {
        console.error("Error writing to the JSON file:", err);
        process.exit(1);
      }
    });

    console.log("Resultat:");
    console.log("Hund: " + tat[0].score.hund);
    console.log("Katt: " + tat[0].score.katt);
    console.log("Kanin: " + tat[0].score.kanin);
    console.log("Fisk: " + tat[0].score.fisk);
    var numArray = [{ djur: "Hund: ", poang: tat[0].score.hund }, { djur: "Katt: ", poang: tat[0].score.katt }, { djur: "Kanin: ", poang: tat[0].score.kanin }, { djur: "Fisk: ", poang: tat[0].score.fisk }];
    numArray.sort((a, b) => b.poang - a.poang);
    console.log(numArray);

    break;



  default:
    console.log("Ogiltigt val. Välj '1' för att starta eller 'A' för att avsluta programmet.");
}
