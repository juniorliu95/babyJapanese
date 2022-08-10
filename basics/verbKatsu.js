//functions for verb transformation exercise
var katsuAns = {"masu":"", "type":"", "ans":""}
var scoreboard = {"correct":0, "total":0}

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  };

function getKanaPairsSub(table, x, y){
    // get the katsuyou pairs for one table
    // console.log(x, y)
    let temp = document.getElementById(table);
    //get masu type word
    katsuAns["masu"] = temp.getElementsByTagName("tr")[x+1].getElementsByTagName("td")[0].innerHTML;
    //get verb type
    katsuAns["type"] = temp.getElementsByTagName("tr")[0].getElementsByTagName("th")[y+1].innerHTML;
    //get verb ans
    temp = temp.getElementsByTagName("tr")[x+1]; // first row are titles
    // console.log(temp);
    katsuAns["ans"] = temp.getElementsByTagName("td")[y+1].innerHTML;

    return;
};

function getKatsuPairs(x, y){
    if (x == 0 || x==10 || x==13){
      return -1;
    } else {
      getKanaPairsSub("verbTable", x, y);
      return 1;
    };
};

function katsuAnki(){
    document.getElementById("katsu-question").innerHTML = "";
    document.getElementById("katsu-answer").innerHTML = "";
    document.getElementById("katsu-correct").innerHTML = ""

    katsuAns["masu"] = "";
    katsuAns["ans"] = "";

    document.getElementById("katsu-answer").value = "";

    // get available place
    let mark = -1;
    while (mark == -1){
      let x = getRandomInt(15);
      let y = getRandomInt(8);
      mark = getKatsuPairs(x, y);
    };
    // console.log(katsuAns)
    // print question
    document.getElementById("katsu-question").innerHTML = katsuAns["masu"] + " の " + katsuAns["type"] + " は?"

    scoreboard["total"] += 1
};

function showKatsuAnkiAns(){
  if (document.getElementById("katsu-question").innerHTML == ""){
    return;
  };
  if (document.getElementById("katsu-correct").innerHTML != ""){
    return;
  };

  let myAns = document.getElementById("katsu-answer").value
  if (myAns == ""){
    window.alert("Please enter your answer!")
  };

  document.getElementById("katsu-correct").innerHTML = katsuAns["ans"];
  if (myAns == katsuAns["ans"]){
    document.getElementById("katsu-correct").style.color = "green";
    scoreboard["correct"] += 1
  } else {
    document.getElementById("katsu-correct").style.color = "red";
  }
  document.getElementById("katsu-count").innerHTML = scoreboard["correct"].toString() + "/" + scoreboard["total"].toString();

};