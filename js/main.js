/*------------ constants ------------*/



/*----- app's state (variables) -----*/
let field = document.querySelector('.field')
let width = 10;
let squares = [];
// Choose how many bombs here - may change later
let bombAmount = 20;

/*---- cached element references ----*/




/*--------- event listeners ---------*/




/*------------ functions ------------*/
// Function to create the field
function loadField() {
     // Assign bombs to squares
    const bombsArray = Array(bombAmount).fill('bomb');
    const emptyArray = Array(width*width - bombAmount).fill('valid')    ;  
    // Combining 20 bombs and 80 squares into one array
    const combinedArray = emptyArray.concat(bombsArray);
    // Randomly join the two arrays so the bombs are different
    // every time the field is loaded
    const playableArray = combinedArray.sort(() => Math.random() -0.5);
    console.log(playableArray);
    

    for(let i = 0; i < width*width; i++) {
        const square = document.createElement('div')
        // Every time a square is made, assign a unique ID
        square.setAttribute('id', i)
        field.appendChild(square)
        squares.push(square)
    }
}
// Invoke function
loadField();