const express = require("express");
const app = express();

const port = 4578;

app.listen(port, () => {
  console.log(`Server is running on port ${"http://localhost:" + port}`);
});
