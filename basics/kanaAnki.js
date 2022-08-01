// function for questions of kana recognition

var kanaAns = {"hira":"", "kata":"", "eiji":""}

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  };

function getKanaPairsSub(table, x, y){
    // get the kana pairs for one table
    console.log(x, y)
    var temp = document.getElementById(table);
    temp = temp.getElementsByTagName("tr")[x+1]; // first row are titles
    console.log(temp);
    res = temp.getElementsByTagName("td")[y].innerHTML;
    return res;
};

function getKanaPairs(x, y){
    // get the hirakana, katakana, and eiji at (x, y)
    let hira = getKanaPairsSub("hirakana-table", x, y);
    if (hira == "　") {
        return -1;
    } else {
        kanaAns["hira"] += hira;
        kanaAns["kata"] += getKanaPairsSub("katakana-table", x, y);
        kanaAns["eiji"] += getKanaPairsSub("eiji-table", x, y) + " ";
    }
    return 1;

}

function kanaAnki(){
    // get the katakana, katakana, and eiji for a random state

    document.getElementById("anki-question").innerHTML = "";
    document.getElementById("anki-answer").innerHTML = "";
    // first define the length of practice
    let l = 0;
    while (l == 0) {
        l = getRandomInt(10);
    }

    for (let i=0;i!=l;i++){
        let mark = -1;
        while (mark == -1){
            let x = getRandomInt(11);
            let y = getRandomInt(5);
            mark = getKanaPairs(x, y);
        }

        // add a hirakana or katakana
        if (getRandomInt(2)==1)
        {
            document.getElementById("anki-question").innerHTML +=  kanaAns["hira"][i];
        } else {
            document.getElementById("anki-question").innerHTML +=  kanaAns["kata"][i];
        };

            
    };
    
};

function showKanaAnkiAns(){
    // show answer for kana anki
    if (document.getElementById("anki-answer").innerHTML == ""){
        document.getElementById("anki-answer").innerHTML = kanaAns["eiji"];
        for (key in kanaAns) {
            kanaAns[key] = "";
        };
    }
    
};