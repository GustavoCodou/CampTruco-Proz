const people = ['Alice', 'Bruno', 'Carla', 'Daniel', 'Elena', 'Fabio', 'Gina'];
const unpairedDiv = document.getElementById('unpaired');
const pairedDiv = document.getElementById('paired');
const teamNameInput = document.getElementById('teamNameInput');
const confirmButton = document.getElementById('confirmButton');

let selectedPeople = [];
let selectedPairIndex = null;


function renderUnpaired() {
    unpairedDiv.innerHTML = '<h3>Pessoas sem dupla</h3>';
    people.forEach(person => {
        const personDiv = document.createElement('div');
        personDiv.classList.add('person');
        personDiv.textContent = person;
        personDiv.addEventListener('click', () => selectPerson(person, personDiv));
        unpairedDiv.appendChild(personDiv);
    });
}


function renderPaired() {
    pairedDiv.innerHTML = '<h3>Duplas Formadas</h3>';
    duplas.forEach((pair, index) => {
        const pairDiv = document.createElement('div');
        pairDiv.classList.add('person');
        pairDiv.textContent = pair.name ? `${pair.name} (${pair.members[0]} e ${pair.members[1]})` : `${pair.members[0]} e ${pair.members[1]}`;
        pairDiv.addEventListener('click', () => selectPair(index, pairDiv));
        if (index === selectedPairIndex) pairDiv.classList.add('selected');
        pairedDiv.appendChild(pairDiv);
    });


    teamNameInput.style.display = 'none';
    confirmButton.style.display = 'none';
}

function selectPerson(person, element) {
    if (selectedPeople.includes(person)) {
        selectedPeople = selectedPeople.filter(p => p !== person);
        element.classList.remove('selected');
    } else if (selectedPeople.length < 2) {
        selectedPeople.push(person);
        element.classList.add('selected');
    }
}


function selectPair(index, element) {
    if (index === selectedPairIndex) {
        selectedPairIndex = null;
        element.classList.remove('selected');
    } else {
        selectedPairIndex = index;
        renderPaired();
    }
}


document.getElementById('pairButton').addEventListener('click', () => {
    if (selectedPeople.length === 2) {
        duplas.push({ members: [...selectedPeople], name: '' });
        selectedPeople.forEach(person => people.splice(people.indexOf(person), 1));
        selectedPeople = [];
        renderUnpaired();
        renderPaired();
    }
});


document.getElementById('unpairButton').addEventListener('click', () => {
    if (selectedPairIndex !== null) {
        const pairToRemove = duplas.splice(selectedPairIndex, 1)[0];
        people.push(...pairToRemove.members);
        selectedPairIndex = null;
        renderUnpaired();
        renderPaired();
    }
});


document.getElementById('renameButton').addEventListener('click', () => {
    if (selectedPairIndex !== null) {
        teamNameInput.style.display = 'block';
        confirmButton.style.display = 'block';
    }
});

confirmButton.addEventListener('click', () => {
    if (selectedPairIndex !== null && teamNameInput.value.trim()) {
        duplas[selectedPairIndex].name = teamNameInput.value.trim();
        teamNameInput.value = '';
        selectedPairIndex = null;
        renderPaired();
    }
});


const duplas = [];
renderUnpaired();
renderPaired();