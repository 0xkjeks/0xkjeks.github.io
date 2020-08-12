function start(num) //num: number of players
{
    var numFas = Math.round(num / 2) - 1;
    var numLib = num - numFas;

    localStorage.setItem("libs", numLib);
    localStorage.setItem("fascs", numFas);

    window.location = "role.html";
}

var status = 0;
var player = 0;
var totalPlayers = 0;
var roles = [];

const LIBERAL = 0;
const FASCIST = 1;
const HITLER = 2;

function next()
{
    if(player > 0 || status > 0)
    {
        document.getElementById("sBtn").disabled = true;
        setTimeout(() => { document.getElementById("sBtn").disabled = false; }, 1000);
    }

    if(status == 0)
    {
        if(player == 0)
        {
            var liberals = Number(localStorage.getItem("libs"));
            var fascists = Number(localStorage.getItem("fascs"));

            totalPlayers = liberals + fascists;

            for(i = 0; i < liberals; i++) roles.push(LIBERAL);
            for(i = 0; i < fascists; i++) roles.push((i == 0)? HITLER : FASCIST);

            shuffle(roles);

            if(totalPlayers > 6)
            {
                if(Math.random() < 0.01)
                    for(i = 0; i < totalPlayers; i++) roles[i] = HITLER;
            }
        }
        
        nextPlayerReady();
    }
    else
    {
        showRole();
        status -= 2;
        player++;
    }
}

function nextPlayerReady()
{
    if(player == totalPlayers)
    {
        document.getElementById("picture").style.display = "none";
        document.getElementById("info").innerHTML = "Ferdig!";
        document.getElementById("sBtn").style.display = "none";
    }
    else
    {
        document.getElementById("picture").style.display = "none";
        document.getElementById("info").innerHTML = "Spiller #" + Number(player + 1);
        document.getElementById("sBtn").innerHTML = "Se rolle"
    }
}

function showRole()
{
    var resURL = "res/";
    var role = "";
    switch(roles[player])
    {
        case HITLER:
                role = "Hitler";
            break;
        case FASCIST:
                role = "Fascist" 
            break;
        case LIBERAL:
                role = "Liberal"
            break;

        default:
                role += "Liberal"
            break;
    }

    resURL += role + ".png"

    document.getElementById("picture").style.backgroundImage = "URL("+resURL+")";
    document.getElementById("picture").style.display = "inline";
    document.getElementById("info").innerHTML = "Din rolle er <b>" + role + "</b>";
    document.getElementById("sBtn").innerHTML = "Neste";
}

//Fisher-Yates shuffle algorithm
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;
    while (0 !== currentIndex) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
  
    return array;
  }