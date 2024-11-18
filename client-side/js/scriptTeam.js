const players = [];
const teams = [];
const divSemTime = document.getElementById('semTime');
const divTeams = document.getElementById('teams');
const inputNomeTime = document.getElementById('inputNomeTime');
const confirmar = document.getElementById('confirmar');

const playersSelected = [];
let teamIndexSelected = null;

async function buscarSemTime() {
    try {
        const response = await fetch('http://localhost:3001/api/teams/SemTime');
        const playersWithoutTeam = await response.json();
        console.log(playersWithoutTeam)
        renderSemTimes(playersWithoutTeam);
    } catch (erro) {
        console.error("Erro ao buscar dados das APIs:", erro);
    }
}

async function buscarTimes() {
    try {
        const response = await fetch('http://localhost:3001/api/teams/ComTimes');
        if (!response.ok) throw new Error('Erro ao buscar times do banco de dados.');
        const teamsFromDB = await response.json();

        teams.length = 0;
        teamsFromDB.forEach(team => {
            teams.push({
                nome: team.name,
                members: [
                    { id: team.id, username: team.username || 'Unknown' },
                    { id: team.id, username: team.username || 'Unknown' },
                ]
            });
        });

        renderTimes();
    } catch (erro) {
        console.error("Erro ao buscar dados das APIs:", erro);
    }
}


async function salvarTimeNoBanco(team) {
    try {
        const response = await fetch('http://localhost:3001/api/teams', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: team.nome,
                player1_id: team.members[0].id,
                player2_id: team.members[1].id,
            }),
        });

        if (!response.ok) throw new Error('Erro ao salvar o time no banco.');
        const data = await response.json();
        console.log('Time salvo com sucesso:', data);
        return true;
    } catch (erro) {
        console.error('Erro ao salvar time:', erro);
        return false;
    }
}

function renderSemTimes(players) {
    divSemTime.innerHTML = '<h3>Players without a team</h3>';
    players.forEach(player => {
        const divPlayer = document.createElement('div');
        divPlayer.classList.add('player');
        divPlayer.textContent = player.username;
        divPlayer.addEventListener('click', () => selecionarPlayer(player, divPlayer));
        divSemTime.appendChild(divPlayer);
    });
}

function renderTimes() {
    divTeams.innerHTML = '<h3>Formed Teams</h3>';
    teams.forEach((team, index) => {
        const divTeam = document.createElement('div');
        divTeam.classList.add('teams');
        const player1 = team.members[0]?.username || 'Unknown';
        const player2 = team.members[1]?.username || 'Unknown';
        divTeam.textContent = team.nome ? `${team.nome} (${player1} e ${player2})` : `${player1} e ${player2}`;
        divTeam.addEventListener('click', () => selecionarTeam(index, divTeam));
        if (index === teamIndexSelected) divTeam.classList.add('selected');
        divTeams.appendChild(divTeam);
    });

    inputNomeTime.style.display = 'none';
    confirmar.style.display = 'none';
}

function selecionarPlayer(player, element) {
    if (playersSelected.includes(player)) {
        playersSelected = playersSelected.filter(p => p !== player);
        element.classList.remove('selected');
    } else if (playersSelected.length < 2) {
        playersSelected.push(player);
        element.classList.add('selected');
    }
}

function selecionarTeam(index, element) {
    if (index === teamIndexSelected) {
        teamIndexSelected = null;
        element.classList.remove('selected');
    } else {
        teamIndexSelected = index;
        renderTimes();
    }
}

document.getElementById('formarTime').addEventListener('click', async () => {
    if (playersSelected.length === 2) {
        const teamName = prompt('Digite um nome para o time:');
        if (!teamName) {
            alert('Você precisa digitar um nome para o time!');
            return;
        }

        const newTeam = {
            nome: teamName,
            members: [...playersSelected],
        };

        const salvo = await salvarTimeNoBanco({
            nome: newTeam.nome,
            members: playersSelected,
        });

        if (salvo) {
            teams.push(newTeam);
            playersSelected.forEach(player => {
                const index = players.findIndex(p => p.id === player.id);
                if (index !== -1) players.splice(index, 1);
            });
            playersSelected.length = 0;
            buscarSemTime();
            renderTimes();
        }
    }
});

document.getElementById('desfazerTime').addEventListener('click', () => {
    if (teamIndexSelected !== null) {
        const removedTeam = teams.splice(teamIndexSelected, 1)[0];
        players.push(...removedTeam.members);
        teamIndexSelected = null;
        renderTimes();
        buscarSemTime();
    }
});

document.getElementById('renomearTime').addEventListener('click', () => {
    if (teamIndexSelected !== null) {
        inputNomeTime.style.display = 'block';
        confirmar.style.display = 'block';
    }
});

confirmar.addEventListener('click', () => {
    if (teamIndexSelected !== null && inputNomeTime.value.trim()) {
        teams[teamIndexSelected].nome = inputNomeTime.value.trim();
        inputNomeTime.value = '';
        teamIndexSelected = null;
        renderTimes();
    }
});

buscarSemTime();
buscarTimes();