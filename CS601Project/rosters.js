// constants for HTML element IDs and static endpoints
const dropdownID = "teamsDropdown";
const allTeamsEP = "https://statsapi.web.nhl.com/api/v1/teams";

// functions for non-static endpoints

function getRosterURL(id) {
    return `https://statsapi.web.nhl.com/api/v1/teams/${id}/roster`;
}



window.addEventListener('DOMContentLoaded', event => {
    let dropdown = document.getElementById(dropdownID);
    populateDropdown(dropdown);
    $(`#${dropdownID}`).on("change", displayRoster);
});

function populateDropdown(dropdown) {
    try {
        MyFetch(allTeamsEP).then(json_data => {
            //console.log(json_data);
            teamsArray = json_data.teams;
            console.log(teamsArray);
            teamsArray.sort((a, b) => (a.name > b.name ? 1 : -1));
            console.log(teamsArray);
            teamsArray.forEach(teamObject => {
                var option = document.createElement("option");
                option.innerHTML = teamObject.name;
                option.setAttribute('id', `team${teamObject.id}`);
                option.setAttribute('class', 'dropdown-item');
                dropdown.append(option);
            });
        });
    } catch(e) {
        // TODO
    }

}

async function MyFetch(url) {
    let response = await fetch(url);
    if (!response.ok) {
        throw new Error(`HTTP error! status : ${reponse.status}`);
    }
    return await response.json();
}

function displayRoster() {
    //console.log("displayRoster entered");
    var teamName = $("select option:selected").val();
    console.log(teamName);
    var teamElementID = $("select option:selected").attr("id");
    var teamID = teamElementID.substring(4);
    //console.log(teamName);
    //console.log(teamID);
    document.getElementById("teamTitle").innerHTML = `${teamName}`;
    url = getRosterURL(teamID);
    console.log(url);
    try {
        MyFetch(url).then(json_data => {
            playerArray = json_data.roster;
            playerArray.forEach(playerObject => {
                var playerUrl = playerObject.person.link;
                var playerUrl = 'https://statsapi.web.nhl.com' + playerUrl;
                //console.log(playerUrl);
                MyFetch(playerUrl).then(json_data => {
                    detailedPlayerObject = json_data.people[0];
                    playerCard = createPlayerCard(detailedPlayerObject);
                    var type = detailedPlayerObject.primaryPosition.type;
                    if (type == "Forward") {
                        var forwardSection = document.getElementById("forwards");
                        forwardSection.append(playerCard);
                    }
                    else if (type == "Defenseman") {
                        var defenseSection = document.getElementById("defensemen");
                        defenseSection.append(playerCard);
                    }
                    else if (type == "Goalie") {
                        var goalieSection = document.getElementById("goalies");
                        goalieSection.append(playerCard);
                    }
                    
                });
            });
        });
    } catch(e) {
        // TODO
    }
    
}

function createPlayerCard(detailedPlayerObject)
{
    var fullName = detailedPlayerObject.fullName;
    var jerseyNumber = detailedPlayerObject.primaryNumber;
    var age = detailedPlayerObject.currentAge;
    var country = detailedPlayerObject.birthCountry;
    var height = detailedPlayerObject.height;
    var weight = detailedPlayerObject.weight;
    var position = detailedPlayerObject.primaryPosition.name;
    var team = detailedPlayerObject.currentTeam.name;
    team = team.toLowerCase();
    team = team.replace(/\s/g, "");
    
    var playerCard = document.createElement("article");
    playerCard.classList.add("menuItems");
    playerCard.classList.add("playercard");
    playerCard.classList.add(team);
    var cardTitle = document.createElement("h3");
    cardTitle.classList.add("cardTitle");
    cardTitle.innerHTML = fullName;
    var cardJersey = document.createElement("p");
    cardJersey.classList.add("cardinfo");
    cardJersey.innerHTML = `<span class="property">Jersey:&nbsp;</span>${jerseyNumber}`;

    playerCard.append(cardTitle);
    playerCard.append(cardJersey);

    return playerCard;
}