/*----- app's state (variables) -----*/
let field = document.querySelector('.field')
let width = 10;
let squares = [];
// Choose how many bombs here - may change later
let bombAmount = 15;
let gameOver = false;
let flags = 0;



/*--------- event listeners ---------*/
const resetBtn = document.querySelector('button');




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
        square.setAttribute('id', i);
        // Assign a class to each square based on bomb or not
        square.classList.add(playableArray[i]);

        field.appendChild(square);
        squares.push(square);

        // Click function event listener
        square.addEventListener('click', function(event) {
            click(square);
        })

        // Right click to add flags using context menu
        square.oncontextmenu = function(event) {
          event.preventDefault();
          placeFlag(square);
        }
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
// Invoking function
loadField();



// Function for clicking a square
function click(square) {
    let currentId = square.id;
    // Break function if game is over or square is already checked
    if (gameOver) return;
    if (square.classList.contains('checked') || square.classList.contains('flagged')) return;

    if (square.classList.contains('bomb')) {
        alert('GAME OVER!');
        gameOver = true;
    } else {
        // Get the number of adjacent bombs from the 'total'
        let total = square.getAttribute('data');
        // If no bombs, add the 'checked' class
        if (total != 0) {
            square.classList.add('checked');
            square.innerHTML = total;
            return;
        }
        checkSquare(square, currentId);
    }
    // At the end, mark as checked
    square.classList.add('checked');
}




// Function to check squares around clicked square
function checkSquare(square, currentId) {
    // Check if is on the left or right edge of the field
    const onLeftEdge = (currentId % width === 0);
    const onRightEdge = (currentId % width === width - 1);

    // Ensure 0 bomb squares are cleared slightly after click
    setTimeout(() => {
        // Using recursion to keep checking for 0 bomb squares after click
        if (currentId > 0 && !onLeftEdge) {
            const newId = squares[parseInt(currentId) -1].id
            const newSquare = document.getElementById(newId)
            click(newSquare)
          }
          if (currentId > 9 && !onRightEdge) {
            const newId = squares[parseInt(currentId) +1 -width].id
            const newSquare = document.getElementById(newId)
            click(newSquare)
          }
          if (currentId > 10) {
            const newId = squares[parseInt(currentId -width)].id
            const newSquare = document.getElementById(newId)
            click(newSquare)
          }
          if (currentId > 11 && !onLeftEdge) {
            const newId = squares[parseInt(currentId) -1 -width].id
            const newSquare = document.getElementById(newId)
            click(newSquare)
          }
          if (currentId < 98 && !onRightEdge) {
            const newId = squares[parseInt(currentId)+1].id
            const newSquare = document.getElementById(newId)
            click(newSquare)
          }
          if (currentId < 90 && !onLeftEdge) {
            const newId = squares[parseInt(currentId) -1 +width].id
            const newSquare = document.getElementById(newId)
            click(newSquare)
          }
          if (currentId < 88 && !onRightEdge) {
            const newId = squares[parseInt(currentId) +1 +width].id
            const newSquare = document.getElementById(newId)
            click(newSquare)
          }
          if (currentId < 89) {
            const newId = squares[parseInt(currentId) +width].id
            const newSquare = document.getElementById(newId)
            click(newSquare)
          }
    // Adding 10ms of time
    }, 10)
}


// Adding flag function
function placeFlag(square) {
  if (gameOver) return;
  if (!square.classList.contains('checked') && (flags < bombAmount)) {
    if (!square.classList.contains('flag')) {
      square.classList.add('flag');
      square.innerHTML = '❌ ';
      flags++;
      winCheck();
    } else {
      square.classList.remove('flag');
      square.innerHTML = '';
      flags --;
    }
  }
}



// Win condition checking
function winCheck() {
  let matches = 0;
  for (let i = 0; i < squares.length; i++) {
    if (squares[i].classList.contains('flag') && squares[i].classList.contains('bomb')) {
      matches ++
    }
    if (matches === bombAmount) {
      alert('YOU WIN! CONGRATULATIONS!');
      gameOver = true;
    }
  }
}