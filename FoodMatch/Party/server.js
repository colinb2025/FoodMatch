const express = require('express');
const app = express();
const port = 3000;

let partyCode = '';
let joinedMembers = [];

app.use(express.static('public')); // Assuming your HTML and CSS are in a 'public' folder

app.get('/createParty', (req, res) => {
  // Generate a random code
  partyCode = generateCode();
  res.json({ code: partyCode });
});

app.post('/joinParty/:code/:name', (req, res) => {
  const enteredCode = req.params.code;
  const memberName = req.params.name;

  if (enteredCode === partyCode) {
    joinedMembers.push(memberName);
    res.json({ success: true, members: joinedMembers });
  } else {
    res.json({ success: false, error: 'Invalid party code' });
  }
});

function generateCode() {
  return Math.random().toString(36).substring(2, 8).toUpperCase();
}

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
