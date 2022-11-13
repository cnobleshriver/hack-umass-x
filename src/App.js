import React from "react";
import TypewriterComponent from "typewriter-effect";

function App() {
  const data = require("./words_dictionary.json");
  let wordArr = Object.keys(data);
  let easyWords = wordArr.filter(x => x.length <= 5);
  let mediumWords = wordArr.filter(x => x.length <= 8)
  let hardWords = wordArr.filter(x => x.length >= 10);
  let inputArr = new Array(50).fill("");



  function selectWords(wordArr) {
    let returnArr = [];
    let indTracker = new Set();
    while (returnArr.length < 10) {
      let indVal = Math.floor(Math.random() * wordArr.length);
      if (!indTracker.has(indVal)) {
        returnArr.push(wordArr[indVal]);
      }
      indTracker.add(indVal);
    }
    return returnArr;
  }

  let index = 0;


  function populateArray(arr) {
    return arr.map(wordObj);
  }

  function wordObj(x) {
    return {word: x, isCorrect: false, k: 0};
  }

  function handleKeyPress(e) {
    let key = e.key;
    let obj = words[index];
    let corKey = obj.word.charAt(obj.k);
     if (key === " " && obj.k >=0) {
        if (obj.k === 0){
          return;
        }
       ++index;
       return;
    }
    inputArr[index] = inputArr[index].concat(key)
    console.log(key);
    console.log(corKey === key);
    console.log("keyPress: " + index);
    console.log(inputArr);
    obj.k += 1;
  }

  function handleKeyDown(e) {
    let obj = words[index];
    if (e.key === 'Backspace' && obj.k > 0) {
      --obj.k;
      inputArr[index] = inputArr[index].slice(0,-1);
      console.log("keyDown: " + index)
      console.log(inputArr);
    }
  }

  function arrToString(arr) {
    return arr.join(" ");
  }

  let ezWords = selectWords(easyWords);
  let words = populateArray(ezWords);
  let tempString = arrToString(ezWords);

  function valUntilK(k, index){
    let returnVal = true;
    for (let i =0; i<=k; ++i){
      if (inputArr[index].chartAt(i) !== words[index].word.charAt(i)){
        returnVal = false;
      }
    }
    return returnVal;
  }

  return (
    <div>
      <h1><TypewriterComponent
        onInit={(typewriter) =>
          typewriter.typeString("funkytype").start()
        }
      />
      </h1>
      <p>{tempString}</p>
      <p>{"" + index + "/" + 50}</p>
      <input type="text" onKeyPress={(e) => handleKeyPress(e)} onKeyDown={(e) => handleKeyDown(e)} />
    </div>
  )
}

export default App;
