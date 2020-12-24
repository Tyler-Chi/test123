let board = [];
let foundWinner = false
const heightLimit = 6
let winCondition = 4
let twoPlayer = false
let rowWinCoords = []
let forwardSlashWinCoords = []
let backwardSlashWinCoords = []
let columnWinCoords = []


function makeBoard(columns) {
  for (let i = 0; i < columns; i++) {
    board.push([])
  }
}

function createCell(xCoord, yCoord) {
  let htmlBoard = $('.board')
  let cell = $('<div>').addClass('cell').attr('id', `${xCoord}-${yCoord}`)
  htmlBoard.append(cell)
}

function getCell(xCoord, yCoord) {
  return $(`#${xCoord}-${yCoord}`)
}

function drawBoard(board) {
  let htmlBoard = $('.board')
  let boardCells = $('.board .cell')
    for (let x = 0; x < boardCells.length; x++) {
        boardCells.remove()
    }
  htmlBoard.css({
    'display': 'grid',
    'grid-template-columns': `repeat(${board.length}, 1fr)`,
    'grid-template-rows': `repeat(${heightLimit}, 1fr)`,
    'height': 470,
    'width': 540,
  })
  for (let column = 0; column < heightLimit; column++) {
    for (let row = 0; row < board.length; row++){
      createCell(row, column)
      if (board[row][column] === 1) {
        getCell(row, column).css('background-color', 'red')
      } else if (board[row][column] === 2) {
        getCell(row, column).css('background-color', 'yellow')
      }
    }
  }
}

function checkTie(board) {
  let boardFilled = false
  let occurances = 0
  board.forEach((value) => {
    value.length === heightLimit ? occurances += 1 : occurances = 0
  })
  if (occurances === board.length) {
    boardFilled = true
  }
  return boardFilled
}

function placeChip(player, column) {
  if (!board[column])
    return
  if (board[column].length === heightLimit) {
    return console.log("Sorry this column is full")
  }
  if (!foundWinner) {
    let index = board[column].push(player)
    drawBoard(board)
    //console.log(board)
    console.log("position of placed:", column, index - 1)
    checkWinner(player, column, index, board)
  } else {
    return console.log("WE ALREADY FOUND A WINNER STOP PLAYING")
  }
}

function drawWinner(board, player) {
  let winningCoords = []
  console.log(columnWinCoords)
  if (backwardSlashWinCoords.length === winCondition)
    winningCoords = backwardSlashWinCoords
  else if (rowWinCoords.length === winCondition)
    winningCoords = rowWinCoords
  else if (forwardSlashWinCoords.length === winCondition)
    winningCoords = forwardSlashWinCoords
  else if (columnWinCoords.length === winCondition)
    winningCoords = columnWinCoords
  for (let column = 0; column < heightLimit; column++) {
    for (let row = 0; row < board.length; row++){
      if (board[row][column] === 1) {
        getCell(row, column).css('background-color', 'grey')
      } else if (board[row][column] === 2) {
        getCell(row, column).css('background-color', 'grey')
      }
    }
  }
  for (let x = 0; x < winningCoords.length; x++) {
    let winningPair = winningCoords[x]
    if (player === 1)
      getCell(winningPair[0], winningPair[1]).css('background-color', 'red')

    else if (player === 2)
      getCell(winningPair[0], winningPair[1]).css('background-color', 'yellow')
  }
  const firstPlayer = $('#player-one').val()
  const secondPlayer = $('#player-two').val()
  if (player === 1) {
    if(firstPlayer)
      $('h2').text(`${firstPlayer} has won!`)
    else 
      $('h2').text(`You have won!`)
  } else if (player === 2) {
    if (twoPlayer)
      $('h2').text(`${secondPlayer} has won!`)
    else
      $('h2').text(`Computer has won!`)
  }
}

function checkWinner(player, column, height, board) {
  let winner = "Congratulations player:" + player + " won!!"
  if (checkTie(board)) {
    return $('h2').text(`It's a tie!`)
  } else
  if ( checkBelow(player, column, height, board) 
    || checkRow(player, height, board) 
    || checkSlashDiagonal(player, column, height, board) 
    || checkBackSlashDiagonal(player, column, height, board)) {
      drawWinner(board, player)
      return console.log(winner)
  }
}

//TODO: FIXED
function checkBelow(player, column, height, board) {
  let matchingChips = 0
  let winner = false
  for (let index = 0; index < height; index++) {
    let currentChip = board[column][index]
    //console.log("currentChip", currentChip, "at position" , column, "height", index)
    if (currentChip === player) {
      matchingChips++
      columnWinCoords.push([column, index])
    } else {
      matchingChips = 0
      columnWinCoords = []
    }
    if (matchingChips >= winCondition) {
      winner = true
      foundWinner = true
      console.log('Vertical Win')
      return winner
    }
  }
  return winner
}

function checkSlashDiagonal(player, column, height, board) {
  let winningChips = 0
  height = height - 1
  for (let stackHeight = 0; stackHeight < heightLimit; stackHeight++) {
    let grabNextChip = column + height - stackHeight
    //console.log("SD","grabNextChip", grabNextChip, "stackHeight", stackHeight)
    if (0 <= grabNextChip && grabNextChip < board.length) {
      let currentChip = board[grabNextChip][stackHeight]
      //console.log(currentChip)
      if (currentChip === player) {
        winningChips++
        backwardSlashWinCoords.push([grabNextChip, stackHeight])
      } else {
        winningChips = 0
        backwardSlashWinCoords = []
      }
      if (winningChips >= winCondition) {
        winner = true
        foundWinner = true
        console.log('SDiagonal Win')
        return winner
      }
    }
  }
  return false
}

function checkBackSlashDiagonal(player, column, height, board) {
  let winningChips = 0
  height = height - 1
  let length = (board.length - 1)
  for (let stackHeight = 0; stackHeight < heightLimit; stackHeight++) {
    let grabNextChip = column - height + stackHeight
    //console.log("BSD","grabNextChip", grabNextChip, "stackHeight", stackHeight)
    if (0 <= grabNextChip && grabNextChip <= length) {
      let currentChip = board[grabNextChip][stackHeight]
      //console.log(currentChip)
      if (currentChip === player) {
        winningChips++
        forwardSlashWinCoords.push([grabNextChip, stackHeight])
      } else {
        winningChips = 0
        forwardSlashWinCoords = []
      }
      if (winningChips >= winCondition) {
        winner = true
        foundWinner = true
        console.log('BSDiagonal Win')
        return winner
      }
    }
  }
  return false
}

function checkRow(player, height, board) {
  const length = board.length
  let matchingChips = 0
  let winner = false
  height = height - 1//off by one
  for (let index = 0; index < length; index++) {
    let chipInRow = board[index][height]
    if (chipInRow === player) {
      matchingChips++
      rowWinCoords.push([index, height])
    } else {
      matchingChips = 0
      rowWinCoords = []
    }
    if (matchingChips >= winCondition) {
      winner = true
      foundWinner = true
      console.log('Row Win')
      return winner
    }
  }
  return winner
}

function computerPlacesChip(board, difficulty) {
  if (foundWinner)
    return
  let random = Math.floor(Math.random() * heightLimit)
  if (board[random].length !== heightLimit) {
    if (difficulty === "easy") {
      placeChip(2, random)
    }
  } else {
    computerPlacesChip(board, difficulty)
  }
}

let computerWaiting;
function computerThinking(board, difficulty, time) {
  computerWaiting = setTimeout(() =>  {
    computerPlacesChip(board, difficulty) 
    playerOneGo = true
  }
  , time)
}

function setSinglePlayer() {
  twoPlayer = false
  resetGameBoard()
  $('#player-two').css('display', 'none')
}
function setMultiPlayer() {
  twoPlayer = true
  resetGameBoard()
  clearTimeout(computerWaiting)
  $('#player-two').css('display', 'inline')
}
function resetGameBoard() {
  board = []
  resetWinnersArrays()
  playerOneGo = true
  foundWinner = false
  makeBoard(7)
  drawBoard(board)
  $('h2').text('')
  whoGoesFirst(board, 'easy')
}

function resetWinnersArrays() {
  rowWinCoords = []
  forwardSlashWinCoords = []
  backwardSlashWinCoords = []
  columnWinCoords = []
}

function setNames() {
  const firstPlayer = $('#player-one').val()
  const secondPlayer = $('#player-two').val()
  if (twoPlayer) {
    $('h2').text(`${firstPlayer} VS ${secondPlayer}`).css('text-color', 'black')
  } else {
    $('h2').text(`${firstPlayer} VS Computer`).css('text-color', 'black')
  }
}

function whoGoesFirst(board, difficulty){
  let chance = Math.floor(Math.random() * 2)
  const firstPlayer = $('#player-one').val()
  const secondPlayer = $('#player-two').val()
  if(twoPlayer) {
    if (chance === 1) {
      playerOneGo = false
      if(secondPlayer) {
        alert(secondPlayer + " goes first")
      } else {
        alert("Player Two goes first")
      }
    }
  } else {
    if (chance === 1) {
      playerOneGo = false
      alert("Computer goes first")
      computerThinking(board, 'easy', 3000)
    }
  }
  if(firstPlayer && playerOneGo) {
    alert(firstPlayer + " goes first")
  } else if (playerOneGo) {
    alert("Player One goes first")
  }
}

let playerOneGo = true
makeBoard(7)
drawBoard(board)
$('.reset').click(resetGameBoard)

$('.set-names').click(setNames)

$('input[type=radio]').click(function () {
  let id = $(this).attr('id')
  console.log(id)
  if (id === 'singleplayer') {
      setSinglePlayer()
  } else if (id === 'multiplayer') {
      setMultiPlayer()
  }
})

whoGoesFirst(board, 'easy')

$('.column-button').click(function (){
  console.log(this)
  let column = ($(this).attr('id')) - 1
  if (playerOneGo) {
    placeChip(1, column)
    playerOneGo = false
    if (!twoPlayer) {
      computerThinking(board, 'easy', 1000)
    }
  } else if (twoPlayer) {
    placeChip(2, column)
    playerOneGo = true
  }
  resetWinnersArrays()
})