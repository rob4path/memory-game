function changeSet() {
    
    $("#createInput").html(" ")
    let selectBox = document.getElementById("selectBox");
    let selectedSet = selectBox.options[selectBox.selectedIndex].value;
    // set card array to the chosen one
    switch (selectedSet) {
        case "fast":
            cardArray = cardArrayFAST;
            break;
        case "proverbs":
            cardArray = cardArrayProverbs;
            break;
        case "test":
        default:
            cardArray = cardArrayTest;
            break;
    }
    showCardArrayVerses(cardArray);
}

function showCardArrayVerses(array) {
    for (const verse of array) {
      if (verse.text === verse.reference) {
        continue;
      }
      const {textInput, referenceInput} = addVerse('createInput');
      // const result = addVerse()
      // const textInput = result.textInput
      // const referenceInput = result.referenceInput

      textInput.value = verse.text
      referenceInput.value = verse.reference
      
    }
  }

function addVerse(divId = 'createInput') {
    const inputDiv = document.getElementById(divId)

    const createDiv = document.createElement("div")
    createDiv.className = "newText"
    inputDiv.appendChild(createDiv)

    const takeR = document.createElement("INPUT")
    takeR.setAttribute("type", "text");
    takeR.placeholder = "Enter reference"
    takeR.className = "newReference"

    const takeT = document.createElement("INPUT")
    takeT.setAttribute("type", "text");
    takeT.placeholder = "Enter text"
    takeT.className = "newText"

    createDiv.appendChild(takeR)
    createDiv.appendChild(takeT)

    $("#pushVerseBtn").show(500)

    return { textInput: takeT, referenceInput: takeR };
    // const takeReference = document.getElementById("reference").value;
    // const takeText = document.getElementById("text").value;
} // TODO make textholders for every verse you add so you can add, modify, delete every text
// TODO user can create new array


function pushVerses() {
    let selectBox = document.getElementById("selectBox");
    let selectedValue = selectBox.options[selectBox.selectedIndex].value;
    switch (selectedValue) {
        case "fast":
            cardArrayFAST = [];
            break;
        case "proverbs":
            cardArrayProverbs = [];
            break;
        case "test":
        default:
            cardArrayTest = [];
            break;
    }
    
    
    const kidsList = $("#createInput").children()
    for (const verse of kidsList) {

        takeReference = verse.childNodes[0].value
        takeText = verse.childNodes[1].value

        const newReference = {
            reference: takeReference,
            text: takeReference,
        };
        const newVerse = {
            reference: takeReference,
            text: takeText,
        };

        // set card array to the chosen one
        switch (selectedValue) {
            case "fast":
                cardArrayFAST.push(newReference);
                cardArrayFAST.push(newVerse);
                break;
            case "proverbs":
                cardArrayProverbs.push(newReference);
                cardArrayProverbs.push(newVerse);
                break;
            case "test":
                cardArrayTest.push(newReference);
                cardArrayTest.push(newVerse);
                break;
            case "mySet1":
            case "mySet2":
            default:
                cardArrayTest.push(newReference);
                cardArrayTest.push(newVerse);
                break;
        }

        
        // serviceAddVerse(newReference, newVerse)

    }
    switch (selectedValue) {
        case "fast":
            cardArray = cardArrayFAST
            break;
        case "proverbs":
            cardArray = cardArrayProverbs
            break;
        case "test":
        default:
            cardArray = cardArrayTest
            break;
    }
    console.log(cardArray);

}



function serviceAddVerse(reference, verse) {
    $.post('https://rob4path2.herokuapp.com/api/verses',   // url
        {
            reference: reference,
            verse: verse
        }, // data to be submitted
        function (data, status, jqXHR) {  // success callback
            console.log({ data })
            console.log({ status })
            console.log({ jqXHR })
            if ($("#email").val() === "bcrrobby@gmail.com") {
                console.log("CONGRATS FOR VLAAAAAD")
            }
        },
        "application/json"
    ).done(function (message) {
        console.log(message)

    }).fail(function (xhr, status, error) {

        console.log(JSON.parse(xhr.responseText))
        console.log(JSON.parse(xhr.responseText).message)
        console.log(xhr.responseText.message)
        console.log(status)

    })

}
