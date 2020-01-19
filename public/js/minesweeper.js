// Test Funcs
// See Inspect Element's Console Log Output

getGameXML();


getNewGame('\
    <request>\
    <rows>3</rows>\
    <cols>3</cols>\
    <mines>3</mines>\
    </request>');

var game_title;
var game_id;
var levels;
var time;
var clickCount = 0;
var interval;
var flagCount = 0;
var win = false;


function start(){
    var modal = document.createElement("div");
    modal.className = "modal";
    modal.id = "alert-modal";

    var modalContent = document.createElement("div");
    modalContent.className = "modal-content";

    var name = document.createElement("input");
    name.className = "field";
    name.id = "name";
    name.placeholder = "Enter your name";

    var ok = document.createElement("button");
    ok.innerHTML = "OK";


    modalContent.appendChild(name);
    modalContent.appendChild(ok);
    modal.appendChild(modalContent);

    document.body.appendChild(modal);


    var windo = document.createElement("div");
    windo.className = "window";

    var titleBar = document.createElement("div");
    titleBar.className = "title-bar";

    var gameTitle = document.createElement("span");
    gameTitle.id = "game-title";
    gameTitle.innerHTML = "Minesweeper Online - Beginner!";

    titleBar.appendChild(gameTitle);

    var temp = document.createElement("span");

    var btn = document.createElement("span");
    btn.className = "btn";
    btn.id = "btn-minimize";
    btn.innerHTML = "&minus;";

    var btn2 = document.createElement("span");
    btn2.className = "btn";
    btn2.id = "btn-close";
    btn2.innerHTML = "&times;";

    temp.appendChild(btn);
    temp.appendChild(btn2);

    titleBar.appendChild(temp);

    windo.appendChild(titleBar);

    var top = document.createElement("div");
    top.className = "top";


    var counter = document.createElement("span");
    counter.className = "counter";
    counter.innerHTML = "123";

    var smile = document.createElement("span");
    smile.className = "smile";

    var counter2 = document.createElement("span");
    counter2.className = "counter";
    counter2.innerHTML = "000";

    top.appendChild(counter);
    top.appendChild(smile);
    top.appendChild(counter2);

    windo.appendChild(top);

    var grid = document.createElement("div");
    grid.className = "grid";

    // var c = [];
    // var i;
    // for(i = 1 ; i < 82 ; i++){
    // 	c.push("span");
    // 	c[i-1].id = "c"+ i ;
    // 	c[i-1].className = "active";
    // }

    //grid.appendChild(c);
    windo.appendChild(grid);


    document.body.appendChild(windo);




    getGameXML(function (xml_str){
//TODO: xml_str is string response from server, parse and use it
        var parser;
        var xmlDoc;
        parser = new DOMParser();
        xmlDoc = parser.parseFromString(xml_str,"text/xml");
        // document.getElementById("game-title").innerHTML = xmlDoc.getElementsByTagName("game")[0].getAttribute("title") + " - " + xmlDoc.getElementsByTagName("level")[0].getAttribute("title");
        //    var a = xmlDoc.getElementsByTagName("game")[0].getAttribute("title");
        // console.log(a);
        // var col, row;
        // rowN = xmlDoc.getElementsByTagName("rows")[0].childNodes[0].nodeValue;
        // colN = xmlDoc.getElementsByTagName("cols")[0].childNodes[0].nodeValue;
        // console.log(colN);
        // var grd = document.getElementsByClassName("grid")[0];

        // for(i = 1 ; i <= rowN ; i++){
        // 	//var row = document.createElement("div");
        // 	for(j = 1 ; j <= colN ; j++){
        // 		var cell = document.createElement("span");
        // 		//cell.className = "active";
        // 		cell.id = "c" + parseInt((i-1)*colN + j);
        // 		grd.appendChild(cell);
        // 	}
        // 	//grd.appendChild(row);
        // }
        game_title = xmlDoc.getElementsByTagName("game")[0].getAttribute("title");
        game_id = xmlDoc.getElementsByTagName("game")[0].getAttribute("id");
        time = xmlDoc.getElementsByTagName("time")[0].childNodes[0].nodeValue;
        levels = [
            {
                id: xmlDoc.getElementsByTagName("level")[0].getAttribute("id"),
                title : xmlDoc.getElementsByTagName("level")[0].getAttribute("title"),
                timer : xmlDoc.getElementsByTagName("level")[0].getAttribute("timer"),
                rows: xmlDoc.getElementsByTagName("rows")[0].childNodes[0].nodeValue,
                cols: xmlDoc.getElementsByTagName("cols")[0].childNodes[0].nodeValue,
                mines: xmlDoc.getElementsByTagName("mines")[0].childNodes[0].nodeValue,
            },
        ];

    });

//document.getElementsByClassName("smile").addEventListener(function );
    newGame();

    getName();

}




Element.prototype.setAttributes = function (attrs) {
    for (var idx in attrs) {
        if (idx === 'html') {
            this.innerHTML = attrs[idx];
        } else {
            this.setAttribute(idx, attrs[idx]);
        }
    }
};


function erasePrevGameBoard() {
    document.getElementsByClassName('grid')[0].innerHTML = "";
}

function newGame() {

    //pak mikonim safaro

    erasePrevGameBoard();
    var initXML = '\
    <request>\
    <rows>'+ levels[0].rows+'</rows>\
    <cols>'+ levels[0].cols+'</cols>\
    <mines>'+ levels[0].mines+'</mines>\
    </request>\
';
    getNewGame(initXML, function (xmlStr) {
        var xmlNode = new DOMParser().parseFromString(xmlStr, 'text/xml');
        var xsltProcessor = new XSLTProcessor();
        xsltProcessor.importStylesheet(makeXSL());
        var resultDocument = xsltProcessor.transformToFragment(xmlNode, document);
        console.log(resultDocument);
        document.getElementsByClassName("grid")[0].appendChild(resultDocument);
    });
}

function makeXSL() {
// This XSL Should Convert level.xml to
// appreciate DOM elements for #grid.
    var tmp =  '\
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform">\
    <xsl:template match="/">\
        <xsl:for-each select="//col">\
            <span>\
                <xsl:attribute name="id">c<xsl:value-of select="( ../@row - 1 )* 9 + ./@col"></xsl:value-of>\
                </xsl:attribute>\
                <xsl:attribute name="data-value">\
                    <xsl:if test="./@mine = \'true\'">mine</xsl:if>\
                </xsl:attribute>\
            </span>\
        </xsl:for-each>\
    </xsl:template>\
</xsl:stylesheet>\
';

    var pars =  new DOMParser().parseFromString(tmp, 'text/xml');
    return pars;
}

function getName(){

    core();
    document.getElementsByClassName("field")[0].onkeypress = function (event, element){
        //debugger;
        var inputValue = event.which;
        // allow letters and whitespaces only.
        if(!(inputValue >= 65 && inputValue <= 120) && (inputValue != 32 && inputValue != 0)) {
            event.preventDefault();
        };
    }
    document.getElementsByTagName("button")[0].addEventListener("click", submitName);

}

// function check(event, element){
//                                 //debugger;
//                                 var inputValue = event.which;
//                                 // allow letters and whitespaces only.
//                                 if(!(inputValue >= 65 && inputValue <= 120) && (inputValue != 32 && inputValue != 0)) {
//                                         event.preventDefault();
//                                 }
//                         }

function submitName(){

    document.getElementsByClassName("modal")[0].style.visibility = "hidden";
    action();
}

function action(){
    var r = levels[0].rows, c = levels[0].cols;
    clickCount = 0;
    var currTime = 0;

    document.getElementsByClassName("smile")[0].setAttribute("data-value" , "normal");
    document.getElementsByClassName("smile")[0].onmouseover = function(){
        if(!win)
            this.setAttribute("data-value" , "hover");
    }

    document.getElementsByClassName("smile")[0].onmouseout = function(){
        if(!win)
            this.setAttribute("data-value" , "normal");
    }
    document.getElementsByClassName("smile")[0].onclick = function(){
        newGame();
        getName();
        action();
    }
    setLeftCounter();
    //document.getElementsByTagName("body")[0].oncontextmenu = "return false";
    for(i = 1 ; i <= r*c ; i++){
        //document.getElementById('c' + i).className = "revealed";
        document.getElementById('c' + i).addEventListener("click" , revealOnClick);
        document.getElementById('c' + i).addEventListener("contextmenu" , putFlag);

    }
}

function setLeftCounter(){
    var counterL = document.getElementsByClassName("counter")[0];
    var meghdaresh = levels[0].mines - flagCount;
    if(meghdaresh < 0)
        counterL.innerHTML = "000";
    else if(meghdaresh/10 < 1)
        counterL.innerHTML = "00" + meghdaresh;
    else if(meghdaresh/10 < 10)
        counterL.innerHTML = "0" + meghdaresh;
    else
        counterL.innerHTML = meghdaresh;
}

function timerStart(){
    var timerL = document.getElementsByClassName("counter")[1];
    var currTime = 0;
    interval = window.setInterval(function(){
            if(currTime/10 < 1)
                timerL.innerHTML = "00" + currTime;
            else if(currTime/10 < 10)
                timerL.innerHTML = "0" + currTime;
            else
                timerL.innerHTML = currTime;
            currTime++;
            if(currTime > time)
                gameOver();
        }
        , 1000);
}

function noTimer(){
    var timerL = document.getElementsByClassName("counter")[1];

    if(clickCount/10 < 1)
        timerL.innerHTML = "00" + clickCount;
    else if(meghdaresh/10 < 10)
        timerL.innerHTML = "0" + clickCount;
    else if(meghdaresh/10 < 100)
        timerL.innerHTML = clickCount;
    else
        timerL.innerHTML = "999";
}

function gameOver(){
    alert("Game Over my Friend, the Game is Over");
    clearInterval(interval);
    var r = levels[0].rows, c = levels[0].cols;
    for(i = 1 ; i <= r*c ; i++){
        document.getElementById('c' + i).removeEventListener("click" , revealOnClick);
        document.getElementById('c' + i).removeEventListener("contextmenu" , putFlag);
    }
    document.getElementsByClassName("smile")[0].setAttribute("data-value" , "hover");
    document.getElementsByClassName("counter")[1].innerHTML = "000";
    clickCount = 0;
    flagCount = 0;
}

function winner(){
    alert("Dude!!!! How did you win????? :)))))");
    clearInterval(interval);
    var r = levels[0].rows, c = levels[0].cols;
    for(var i = 1 ; i <= r*c ; i++){
        document.getElementById('c' + i).removeEventListener("click" , revealOnClick);
        document.getElementById('c' + i).removeEventListener("contextmenu" , putFlag);
    }
    document.getElementsByClassName("smile")[0].setAttribute("data-value" , "win");
    document.getElementsByClassName("counter")[1].innerHTML = "000";
    clickCount = 0;
    flagCount = 0;
}

function revealOnClick(){
    if(this.className != "flag"){
        clickCount++;
        if (clickCount == 1 && levels[0].timer == "true")
            timerStart();
        else if(levels[0].timer != "true")
            noTimer();
        this.className = "revealed";
        if(this.getAttribute("data-value") == "mine")
            gameOver();

        howToReveal(this.id);
        win = isWon();
        if(win)
            winner();
    }
}

function putFlag(){
    event.preventDefault();
    if(this.className != "revealed" && this.className != "flag"){
        this.className = "flag";
        flagCount++;
        setLeftCounter();

    }
    else if(this.className != "revealed" && this.className == "flag"){
        this.className = "";
        flagCount--;
        setLeftCounter();
    }
}


function core(){
    var r = levels[0].rows, c = levels[0].cols;
    for(var i = 1 ; i <= r*c ; i++){
        var value = 0;
        //var o = 10;
        console.log(document.getElementById('c0'));
        //debugger;
        if(document.getElementById('c' + parseInt(i).toString()).getAttribute("data-value") == "mine")
            continue;
        //left
        if(i-1 > 0 && i%9 != 1)
            if(document.getElementById('c' + parseInt(i-1)).getAttribute("data-value") == "mine")
                value++;
        //right
        if(i+1 <= r*c && i%9 != 0)
            if(document.getElementById('c' + parseInt(i+1)).getAttribute("data-value") == "mine")
                value++;
        //up
        if(i-9 > 0 && i > 9)
            if(document.getElementById('c' + parseInt(i-9)).getAttribute("data-value") == "mine")
                value++;
        //down
        if(i+9 <= r*c && i < 73)
            if(document.getElementById('c' + parseInt(i+9)).getAttribute("data-value") == "mine")
                value++;
        //down-left
        if(i+8 <= r*c && i < 73 && i%9 != 1)
            if(document.getElementById('c' + parseInt(i+8)).getAttribute("data-value") == "mine")
                value++;
        //down-right
        if(i+10 <= r*c && i < 73 && i%9 != 0)
            if(document.getElementById('c' + parseInt(i+10)).getAttribute("data-value") == "mine")
                value++;
        //up-right
        if(i-8 > 0 && i > 9 && i%9 != 0)
            if(document.getElementById('c' + parseInt(i-8)).getAttribute("data-value") == "mine")
                value++;
        //up-left
        if(i-10 > 0 && i > 9 && i%9 != 1)
            if(document.getElementById('c' + parseInt(i-10)).getAttribute("data-value") == "mine")
                value++;

        document.getElementById('c' + i).setAttribute("data-value" , value.toString());
    }
}

function howToReveal(id){
//debugger;
    var r = levels[0].rows, c = levels[0].cols;
    var i = parseInt(id.match(/[-]?\d+/));
    //age khodam addad boodam
    if(document.getElementById(id).getAttribute("data-value") != "0"){
        document.getElementById(id).className = "revealed";
        return;
    }
    //left
    if(i-1 > 0 && i%9 != 1)
        if(document.getElementById('c' + parseInt(i-1)).getAttribute("data-value") != "mine" && document.getElementById('c' + parseInt(i-1)).className != "revealed"){
            document.getElementById('c' + parseInt(i-1)).className = "revealed";
            if(document.getElementById('c' + parseInt(i-1)).getAttribute("data-value") == "0")
                howToReveal("c" + parseInt(i-1));
        }
    //right
    if(i+1 <= r*c && i%9 != 0)
        if(document.getElementById('c' + parseInt(i+1)).getAttribute("data-value") != "mine" && document.getElementById('c' + parseInt(i+1)).className != "revealed"){
            document.getElementById('c' + parseInt(i+1)).className = "revealed";
            if(document.getElementById('c' + parseInt(i+1)).getAttribute("data-value") == "0")
                howToReveal("c" + parseInt(i+1));
        }
    //up
    if(i-9 > 0 && i > 9)
        if(document.getElementById('c' + parseInt(i-9)).getAttribute("data-value") != "mine" && document.getElementById('c' + parseInt(i-9)).className != "revealed"){
            document.getElementById('c' + parseInt(i-9)).className = "revealed";
            if(document.getElementById('c' + parseInt(i-9)).getAttribute("data-value") == "0")
                howToReveal("c" + parseInt(i-9));
        }
    //down
    if(i+9 <= r*c && i < 73)
        if(document.getElementById('c' + parseInt(i+9)).getAttribute("data-value") != "mine" && document.getElementById('c' + parseInt(i+9)).className != "revealed"){
            document.getElementById('c' + parseInt(i+9)).className = "revealed";
            if(document.getElementById('c' + parseInt(i+9)).getAttribute("data-value") == "0")
                howToReveal("c" + parseInt(i+9));
        }
    //down-left
    if(i+8 <= r*c && i < 73 && i%9 != 1)
        if(document.getElementById('c' + parseInt(i+8)).getAttribute("data-value") != "mine" && document.getElementById('c' + parseInt(i+8)).className != "revealed"){
            document.getElementById('c' + parseInt(i+8)).className = "revealed";
            if(document.getElementById('c' + parseInt(i+8)).getAttribute("data-value") == "0")
                howToReveal("c" + parseInt(i+8));
        }
    //down-right
    if(i+10 <= r*c && i < 73 && i%9 != 0)
        if(document.getElementById('c' + parseInt(i+10)).getAttribute("data-value") != "mine" && document.getElementById('c' + parseInt(i+10)).className != "revealed"){
            document.getElementById('c' + parseInt(i+10)).className = "revealed";
            if(document.getElementById('c' + parseInt(i+10)).getAttribute("data-value") == "0")
                howToReveal("c" + parseInt(i+10));
        }
    //up-right
    if(i-8 > 0 && i > 9 && i%9 != 0)
        if(document.getElementById('c' + parseInt(i-8)).getAttribute("data-value") != "mine" && document.getElementById('c' + parseInt(i-8)).className != "revealed"){
            document.getElementById('c' + parseInt(i-8)).className = "revealed";
            if(document.getElementById('c' + parseInt(i-8)).getAttribute("data-value") == "0")
                howToReveal("c" + parseInt(i-8));
        }
    //up-left
    if(i-10 > 0 && i > 9 && i%9 != 1)
        if(document.getElementById('c' + parseInt(i-10)).getAttribute("data-value") != "mine" && document.getElementById('c' + parseInt(i-10)).className != "revealed"){
            document.getElementById('c' + parseInt(i-10)).className = "revealed";
            if(document.getElementById('c' + parseInt(i-10)).getAttribute("data-value") == "0")
                howToReveal("c" + parseInt(i-10));
        }
}

function isWon(){
    var r = levels[0].rows, c = levels[0].cols;

    if(levels[0].mines != flagCount)
        return false;

    for(i = 1 ; i <= r*c ; i++){
        if(document.getElementById('c' + i).className != "revealed" && document.getElementById('c' + i).className != "flag")
            return false;
    }
    return true;
}


window.onload = start;



























