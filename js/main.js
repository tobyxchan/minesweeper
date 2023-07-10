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
// Function to create the field with all values in place
function loadField() {
     // Assign bombs to squares
    const bombsArray = Array(bombAmount).fill('bomb');
    const emptyArray = Array(width*width - bombAmount).fill('empty');

    // Combining 20 bombs and 80 squares into one array
    const combinedArray = emptyArray.concat(bombsArray);

    // Randomly join the two arrays so the bombs are different
    // every time the field is loaded
    const playableArray = combinedArray.sort(() => Math.random() -0.5);    

    for(let i = 0; i < width*width; i++) {
        const square = document.createElement('div');

        // Every time a square is made, assign a unique ID
        
        // Assign a class to each square based on bomb or not
        square.classList.add(playableArray[i]);

        field.appendChild(square);
        squares.push(square);

        // Event listener in case of click
        square.addEventListener('click', function(event) {
            click(square);
        })
    }

    // Add numbers that correspond to how many adjacent
    // bombs are around each 'empty' square
    for (let i = 0; i < squares.length; i++) {
        let total = 0;

        // If on the edge of field, do not check past edge
        const onLeftEdge = (i % width === 0)
        const onRightEdge = (i % width === width -1)

        if (squares[i].classList.contains('empty')) {
            // +1 means right | -1 means left | -width is up | +width is down
            if (i > 0 && !onLeftEdge && squares[i -1].classList.contains('bomb')) total++;
            if (i > 9 && !onRightEdge && squares[i +1 -width].classList.contains('bomb')) total++;
            if (i > 10 && squares[i - width].classList.contains('bomb')) total ++;
            if (i > 11 && !onLeftEdge && squares[i -1 -width].classList.contains('bomb')) total++;
            if (i < 98 && !onRightEdge && squares [i +1].classList.contains('bomb')) total++;
            if (i < 90 && !onLeftEdge && squares [i -1 +width].classList.contains('bomb')) total++;
            if (i < 88 && !onRightEdge && squares [i +1 +width].classList.contains('bomb')) total++;
            if (i < 89 && squares[i +width].classList.contains('bomb')) total++


            squares[i].setAttribute('data', total);
            console.log(squares[i]);

        }
    }
}
// Invoke function
loadField();



// Function for clicking a square
function click(square) {
    if (square.classList.contains('bomb')) {
        alert('GAME OVER!');
    }
}