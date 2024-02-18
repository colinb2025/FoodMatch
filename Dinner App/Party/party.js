let codeGenerated = false;

async function generateCode() {
  try {
    // Attempt to fetch a code from the server
    const response = await fetch('/generateCode', {
      method: 'GET',
    });

    if (response.ok) {
      // Parse the JSON response
      const data = await response.json();

      // Display the generated code on the screen
      const generatedCodeElement = document.getElementById('generatedCode');
      generatedCodeElement.innerText = `${data.code}`;
      codeGenerated = true;
    } else {
      console.error('Failed to fetch code from the server. Generating client-side code.');
      // If fetching from the server fails, generate a random code on the client side
      generateClientCode();
    }
  } catch (error) {
    console.error('Error during code generation:', error);
  }
}

function generateClientCode() {
  // Generate a random code (you might want a more secure method)
  const code = Math.random().toString(36).substring(2, 8).toUpperCase();

  // Display the generated code on the screen
  const generatedCodeElement = document.getElementById('generatedCode');
  generatedCodeElement.innerText = `${code}`;

  codeGenerated = true;
}

function joinParty() {
  const enteredCode = document.getElementById('joinCode').value;

  fetch('/joinParty', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ code: enteredCode }),
  })
    .then(response => response.json())
    .then(data => {
      if (data.success) {
        alert(`Joined party with code: ${enteredCode}`);
      } else {
        alert('Failed to join. Please enter a valid code.');
      }
    })
    .catch(error => console.error('Error:', error));
}

function toggleButtonColor(button, action) {
  // If Party Leader button is already clicked and code is generated, do nothing
  if (action === 'generateCode' && codeGenerated) {
    return;
  }

  // Reset the background color of both buttons
  document.getElementById('partyLeaderButton').classList.remove('clicked');
  document.getElementById('partyMemberButton').classList.remove('clicked');

  // Toggle the clicked class on the clicked button
  button.classList.toggle('clicked');

  // Perform the corresponding action (generateCode or joinParty)
  if (action === 'generateCode') {
    generateCode();
  } else if (action === 'joinParty') {
    joinParty();
  }
}

document.getElementById('joinCode').addEventListener('keyup', function(event) {
  if (event.key === 'Enter') {
    joinParty();
  }
});

function toggleView(view) {
  const partyContent = document.getElementById('partyContent');
  const joinCodeElement = document.getElementById('joinCode');
  const joinedMembersDiv = document.getElementById('joinedMembers');

  if (view === 'partyLeader') {
    generatedCode.style.display = 'block';
    partyContent.style.display = 'block';
    joinCodeElement.style.display = 'none'; // Hide the "Enter Code" input
    generateCode();
    getJoinedMembers();
  } else if (view === 'partyMember') {
    generatedCode.style.display = 'none';
    partyContent.style.display = 'block';
    joinCodeElement.style.display = 'block'; // Show the "Enter Code" input
    getJoinedMembers();
  }
}

async function getJoinedMembers() {
  try {
    const response = await fetch('/getJoinedMembers', {
      method: 'GET',
    });

    if (response.ok) {
      const data = await response.json();
      displayJoinedMembers(data.members);
    } else {
      console.error('Failed to fetch joined members:', response.status);
    }
  } catch (error) {
    console.error('Error fetching joined members:', error);
  }
}

function displayJoinedMembers(members) {
  const joinedMembersList = document.getElementById('joinedMembersList');
  joinedMembersList.innerHTML = '';

  if (members.length === 0) {
    joinedMembersList.innerHTML += '<p>No members joined yet.</p>';
  } else {
    const list = document.createElement('ul');
    members.forEach(member => {
      const listItem = document.createElement('li');
      listItem.innerText = member;
      list.appendChild(listItem);
    });
    joinedMembersList.appendChild(list);
  }
}