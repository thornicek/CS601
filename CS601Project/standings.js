window.addEventListener('DOMContentLoaded', event =>{
    displayTable();
});
const url = "https://statsapi.web.nhl.com/api/v1/standings/byLeague"
async function MyFetch(url) {
    let response = await fetch(url);
    if (!response.ok) {
        throw new Error(`HTTP error! status : ${reponse.status}`);
    }
    return await response.json();
}
function displayTable(){
    var table = document.getElementById("standings");
    try{
        MyFetch(url).then(json_data => {
            recordsObject = json_data.records[0];
            //console.log(recordsObject);
            teamArray = recordsObject.teamRecords;
            teamArray.forEach(teamObject => {
             var row = createRow(teamObject);
             table.append(row);
             
            });
        });
    }
    catch(exception){

    }
}
function createRow(teamObject){
    var teamName = teamObject.team.name;
    var teamWins = teamObject.leagueRecord.wins;
    var teamLosses = teamObject.leagueRecord.losses;
    var teamOTLoss = teamObject.leagueRecord.ot;
    var teamStreak = teamObject.streak.streakCode;
    var row = document.createElement("tr");
    //repeat for all var
    var col1 = document.createElement("th");
    col1.innerHTML = teamName;
    row.append(col1);

    return row;

}

