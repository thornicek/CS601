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
            teamsArray.forEach(teamObject => {
                //console.log(teamObject.name);
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
                console.log(playerObject.person.fullName);
                // TODO
            });
        });
    } catch(e) {
        // TODO
    }
    
}
