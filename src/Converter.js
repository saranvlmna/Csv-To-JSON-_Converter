const CSVToJSON = require("csvtojson");
const fs = require("fs");

CSVToJSON()
  .fromFile("./csv/ci.csv")
  .then((users) => {
    fs.writeFile(
      "./Data/CSV/CsubINR.json",
      JSON.stringify(users, null, 4),
      (err) => {
        if (err) {
          throw err;
        }
        console.log("File successfully created");
      },
    );
  })
  .catch((err) => {
    console.log(err);
  });
