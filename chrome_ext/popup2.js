function readTxt(filename, callback){
  //reads the text
  var xhr = new XMLHttpRequest(); // creates new XMLHTTPRequest
  xhr.open('GET', chrome.extension.getURL(filename), true); 
  xhr.onreadystatechange = function(){

    if(xhr.readyState == XMLHttpRequest.DONE && xhr.status == 200){
      //console.log(xhr.responseText);
      
      var textByLine = xhr.responseText.split("\n");//... The content has been read in xhr.responseText
      //return textByLine;
      callback(textByLine);

    }
  }
  xhr.send();

}


function getRandomWord(textByLine){ //given an array called textByLine, picks a random element from the array
  //console.log(textByLine);
  if(Array.isArray(textByLine)){
    var numWords = textByLine.length;
    var random = Math.random();
    var index = random * numWords;

    index = Math.floor(index);

    var word = textByLine[index];

    return word; // returns the word
  }
  else{return "error";}
}

function createSentence(){
  //pieces together sentence
  //var adj1;
  var adjArray = readTxt("./adjectives.txt", function(words) {
   
    adj1 = getRandomWord(words);
    adj2 = getRandomWord(words);

  });

  var nounArray = readTxt("./nounlist.txt", function(words) {
    noun = getRandomWord(words);
    noun2 = getRandomWord(words);
  });

  var verbArray = readTxt("./verbs.txt", function(words){
    verb = getRandomWord(words);
  });


  var letterList = verb.split("");
  console.log(letterList);
  if (letterList[letterList.length-1] == "d" && letterList[letterList.length-2] == "e"){
    console.log("ed checked");
    verb = verb;
  }
  else{
    if (letterList[letterList.length-1] == "h" && letterList[letterList.length-2] == "s"){
    verb = verb + "es";
    }
    if(letterList[letterList.length-1] == "h" && letterList[letterList.length-2] == "c"){
      verb = verb + "es";
    }else{
      verb = verb + "s";
    }
  }
  


  /*
  var noun = "a";
  var verb = "b";
  var adj2 = "c";
  var noun2 = "d";
  */


  
  sentence = "The " + adj1 + " " + noun + " " + verb + " the " + adj2 + " " + noun2 + ".";

  return sentence;
}


document.addEventListener('DOMContentLoaded', () => {

    var sentencePlace = document.getElementById("sentence");


    var randombutton = document.getElementById('ourbutton');
    randombutton.addEventListener('click', () => {

      var sentence = createSentence();
      sentencePlace.innerHTML = sentence;
      
      /*
      var adjArray = readTxt("./adjectives.txt", function(words) {
     

        var adjective = getRandomWord(words);
        sentencePlace.innerHTML = adjective;


      });
      */

    });
  });
