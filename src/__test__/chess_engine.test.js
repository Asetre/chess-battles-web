import * as Chess from '../chess_engine'
import {BoardError} from '../chess_engine_custom_errors'

describe('Board', () => {
  var Board

  //A function to get the board instead of using Board.board
  const board = () => {
    return Board.board
  }

  beforeEach(() => {
    Board = new Chess.Board()
  })

  it('should export a default baord', () => {
    expect(Chess).toMatchSnapshot()
  })

  it('should initialize an empty board and reset the board', () => {
    //Initialize the board
    //The board matrix should now contain 64 null objects 8 inside each row of the matrix with 8 rows in total
    expect(board()).toMatchSnapshot()

    //Reset the board
    Board.board[2][6] = 'test'
    Board.resetBoard()
    expect(board()).toMatchSnapshot()
  })

  it('should be able to get the position of a tile from the baord', () => {
    //Get the first tile from the matrix, the top left corner of the board
    Board.board[0][0] = 'test'
    expect(Board.getPosition([0, 0])).toMatchSnapshot()

    //Attempt to get another position in the board
    Board.board[2][6] = 'another test'
    expect(Board.getPosition('26')).toMatchSnapshot()
  })

  it('should be able to check if a position is valid', () => {
    const invalidCases = ['19', '92', '-24', '88']
    const validCases = ['00', '33', '70', '64']

    //Check positions off board
    let invalidResults = invalidCases.map(position => {
      try {
        return Chess.Board.isOffBoard(position)
      }catch(err) {
        if(err.name === 'Board Error') return true
      }
    }).forEach(result => expect(result).toBeTruthy())

    //Check positions inside the board
    let validResults = validCases.map(position => Chess.Board.isOffBoard(position)).forEach(result => expect(result).toBeFalsy())
  })

  it('should be able to check if a tile is empty', () => {
    const invalidTestCases = ['00', '01', '13']
    const validTestCases = ['22', '43', '55']


    //invalidTestCases.forEach(position)
  })

  it('should be able to convert a position from a string to an array', () => {
    const invalidCases = ['222', '-142', '88834234871431']
    const validCases = ['00', '24', '33']

    invalidCases.forEach(position => {
      try {
        Chess.Board.convertPosition(position)
        throw new Error('Invalid position was succesfully converted')
      }catch(err) {
        expect(err.name).toEqual('Board Error')
      }
    })

    validCases.map(position => Chess.Board.convertPosition(position)).forEach(pos => {
      expect(pos.length).toEqual(2)
      pos.forEach(pos => {
        expect(typeof pos).toEqual('number')
        expect(pos).toBeLessThan(8)
        expect(pos).toBeGreaterThanOrEqual(0)
      })
    })
  })

  it('should convert a position into a number', () => {
    const invalidCases = [[3,3,3], [,], [null,], ['3', 3], [44, 4], [3,], [8, 8]]
    const validCases = [[1,0], [3,3], [7,0]]

    invalidCases.forEach(position => {
      try {
        Chess.Board.positionToNumber(position)
        throw new Error('Invalid case passed ')
      }catch(err) {
        expect(err.name).toEqual('Board Error')
      }
    })

    validCases.forEach(position => {
      const pos = Chess.Board.positionToNumber(position)
      expect(typeof pos).toEqual('number')
      expect(pos >= 0 && pos <= 77)
    })
  })

  it('should convert a position to a string', () => {
    const invalidCases = [['0', 1], [[], 0], [], [{}, 1], '03', [1,2,3,4,5], [-2, 4]]
    const validCases = [[0,0], [4,5], [3,3]]

    invalidCases.forEach(position => {
      try {
        Chess.Board.positionToString(position)
        throw new Error('Invalid case passed')
      }catch(err) {
        expect(err.name).toEqual('Board Error')
      }
    })

    validCases.map(position => Chess.Board.positionToString(position)).forEach(position => {
      expect(typeof position).toEqual('string')
      expect(position.length === 2)
    })
  })

  it('should be able to place a piece on the board', () => {
    const king = new Chess.King(1)
    const invalidCases = [[{}, '22'], [null, [-1, 0]], [null, null]]
    const validCases = [[null, '11'], [king, [1,5]]]

    invalidCases.forEach(testCase => {
      const piece = testCase[0]
      const position = testCase[1]

      try {
        Board.placePiece(piece, position)
        throw new Error('Invalid test case passed')
      }catch(err) {
        expect(err.name).toEqual('Board Error')
      }
    })

    validCases.map(testCase => {
      const piece = testCase[0]
      const position = testCase[1]

      try {
        Board.placePiece(piece, position)
      }catch(err) {
        expect(err).toBeFalsy()
      }
    })
  })

  it('should be able to move a piece on the board', () => {
    //Valid Test case
    const king = new Chess.King(1)
    king.position = '00'
    Board.board[0][0] = king
    expect(board()).toMatchSnapshot()
    Board.movePiece(king, '03')
    expect(board()).toMatchSnapshot()

    //todo: add invalid test case
  })

  it('should be able to find the Kings positions', () => {
    const king = new Chess.King(1)
    const king2 = new Chess.King(0)

    Board.placePiece(king, '00')
    Board.placePiece(king2, '66')
        
  })

})

describe('Chess Pieces Valid Moves', () => {
  describe('King', () => {
    var Board
    //A function to get the board instead of using Board.board
    const board = () => {
      return Board.board
    }

    beforeEach(() => {
      Board = new Chess.Board()
    })

    it('should find the valid moves', () => {
      let King = new Chess.King(1)
      King.position = '33'
      board()[3][3] = King

      expect(King.findValidMoves(Board)).toMatchSnapshot()

      King = new Chess.King(0)
      King.position = '00'
      Board.resetBoard()
      board()[0][0] = King

      expect(King.findValidMoves(Board)).toMatchSnapshot()
    })

    it('should check for collision against enemies', () => {
      let whiteKing = new Chess.King(1)
      let blackKing = new Chess.King(0)

      whiteKing.position = '00'
      blackKing.position = '01'


      board()[0][0] = whiteKing
      board()[0][1] = blackKing

      expect(whiteKing.findValidMoves(Board)).toMatchSnapshot()
      //add more test cases
    })

    it('should check for collision against teamates', () => {
      let whiteKing = new Chess.King(1)
      let anotherWhiteKing = new Chess.King(1)

      whiteKing.position = '00'
      anotherWhiteKing.position = '01'

      board()[0][0] = whiteKing
      board()[0][1] = anotherWhiteKing

      expect(whiteKing.findValidMoves(Board)).toMatchSnapshot()
    })

    it('Should check the moves of conqueror', () => {
      let King = new Chess.King(1, 'Conqueror')
      King.position = '33'
      board()[3][3] = King

      expect(King.findValidMoves(Board)).toMatchSnapshot()

      King = new Chess.King(0, 'Conqueror')
      King.position = '00'
      Board.resetBoard()
      board()[0][0] = King

      expect(King.findValidMoves(Board)).toMatchSnapshot()
    })
  })

  describe('Knight', () => {
    var Board
    //A function to get the board instead of using Board.board
    const board = () => {
      return Board.board
    }

    beforeEach(() => {
      Board = new Chess.Board()
    })

    it('Should find valid moves', () => {
      let Knight = new Chess.Knight(1)
      Knight.position = '33'
      board()[3][3] = Knight

      expect(Knight.findValidMoves(Board)).toMatchSnapshot()

      Knight = new Chess.Knight(0)
      Knight.position = '00'
      Board.resetBoard()
      board()[0][0] = Knight

      expect(Knight.findValidMoves(Board)).toMatchSnapshot()
    })

    it('should check for collision against enemies', () => {
      let whiteKnight = new Chess.Knight(1)
      let blackKnight = new Chess.Knight(0)

      whiteKnight.position = '00'
      blackKnight.position = '12'


      board()[0][0] = whiteKnight
      board()[1][2] = blackKnight

      expect(whiteKnight.findValidMoves(Board)).toMatchSnapshot()
      //add more test cases
    })

    it('should check for collision against teamates', () => {
      let whiteKnight = new Chess.Knight(1)
      let anotherWhiteKnight = new Chess.Knight(1)

      whiteKnight.position = '00'
      anotherWhiteKnight.position = '12'

      board()[0][0] = whiteKnight
      board()[1][2] = anotherWhiteKnight

      expect(whiteKnight.findValidMoves(Board)).toMatchSnapshot()
    })

    it('should check the valid moves of a class of knight', () => {
      let Knight = new Chess.Knight(1, 'Knight')
      Knight.position = '33'
      board()[3][3] = Knight

      expect(Knight.findValidMoves(Board)).toMatchSnapshot()

      Knight = new Chess.Knight(0, 'Knight')
      Knight.position = '00'
      Board.resetBoard()
      board()[0][0] = Knight

      expect(Knight.findValidMoves(Board)).toMatchSnapshot()
    })
  })

  describe('Rook', () => {
    var Board

    const board = () => {
      return Board.board
    }

    beforeEach(() => {
      Board = new Chess.Board()
    })

    it('Should find valid moves', () => {
      let Rook = new Chess.Rook(1)
      Rook.position = '33'
      board()[3][3] = Rook

      expect(Rook.findValidMoves(Board)).toMatchSnapshot()

      Rook = new Chess.Rook(0)
      Rook.position = '00'
      Board.resetBoard()
      board()[0][0] = Rook

      expect(Rook.findValidMoves(Board)).toMatchSnapshot()
    })

    it('should check for collision against enemies', () => {
      let whiteRook = new Chess.Rook(1)
      let blackKnight = new Chess.Rook(0)

      whiteRook.position = '00'
      blackKnight.position = '01'

      board()[0][0] = whiteRook
      board()[0][1] = blackKnight

      expect(whiteRook.findValidMoves(Board)).toMatchSnapshot()
      //add more test cases
    })

    it('should check for collision against teamates', () => {
      let whiteRook = new Chess.Rook(1)
      let anotherWhiteKnight = new Chess.Knight(1)

      whiteRook.position = '00'
      anotherWhiteKnight.position = '10'

      board()[0][0] = whiteRook
      board()[1][0] = anotherWhiteKnight

      expect(whiteRook.findValidMoves(Board)).toMatchSnapshot()
    })

    it('should check the valid moves of a Crusader', () => {
      let Rook = new Chess.Rook(1, 'Crusader')
      Rook.position = '33'
      board()[3][3] = Rook

      expect(Rook.findValidMoves(Board)).toMatchSnapshot()

      Rook = new Chess.Rook(0, 'Crusader')
      Rook.position = '00'
      Board.resetBoard()
      board()[0][0] = Rook

      expect(Rook.findValidMoves(Board)).toMatchSnapshot()
    })
  })

  describe('Bishop', () => {
    var Board

    const board = () => {
      return Board.board
    }

    beforeEach(() => {
      Board = new Chess.Board()
    })

    it('Should find valid moves', () => {
      let Bishop = new Chess.Bishop(1)
      Bishop.position = '33'
      board()[3][3] = Bishop

      expect(Bishop.findValidMoves(Board)).toMatchSnapshot()

      Bishop = new Chess.Bishop(0)
      Bishop.position = '11'
      Board.resetBoard()
      board()[1][1] = Bishop

      expect(Bishop.findValidMoves(Board)).toMatchSnapshot()
    })

    it('should check for collision against enemies', () => {
      let whiteBishop = new Chess.Bishop(1)
      let blackKnight = new Chess.Bishop(0)

      whiteBishop.position = '00'
      blackKnight.position = '22'

      board()[0][0] = whiteBishop
      board()[2][2] = blackKnight

      expect(whiteBishop.findValidMoves(Board)).toMatchSnapshot()
      //add more test cases
    })

    it('should check for collision against teamates', () => {
      let whiteBishop = new Chess.Bishop(1)
      let anotherWhiteKnight = new Chess.Knight(1)

      whiteBishop.position = '00'
      anotherWhiteKnight.position = '11'

      board()[0][0] = whiteBishop
      board()[1][1] = anotherWhiteKnight

      expect(whiteBishop.findValidMoves(Board)).toMatchSnapshot()
    })

    it('should check assasin valid moves', () => {
      let Bishop = new Chess.Bishop(1, 'Assasin')
      Bishop.position = '33'
      board()[3][3] = Bishop

      expect(Bishop.findValidMoves(Board)).toMatchSnapshot()

      Bishop = new Chess.Bishop(0, 'Assasin')
      Bishop.position = '00'
      Board.resetBoard()
      board()[0][0] = Bishop

      expect(Bishop.findValidMoves(Board)).toMatchSnapshot()
    })
  })

  describe('Queen', () => {
    var Board

    const board = () => {
      return Board.board
    }

    beforeEach(() => {
      Board = new Chess.Board()
    })
    it('Should find valid moves', () => {
      let Queen = new Chess.Queen(1)
      Queen.position = '00'
      board()[0][0] = Queen

      expect(Queen.findValidMoves(Board)).toMatchSnapshot()

      Queen = new Chess.Queen(0)
      Queen.position = '11'
      Board.resetBoard()
      board()[1][1] = Queen

      expect(Queen.findValidMoves(Board)).toMatchSnapshot()
    })

    it('should check for collision against enemies', () => {
      let Queen = new Chess.Queen(1)
      let blackKnight = new Chess.Knight(0)
      let anotherBlackKnight = new Chess.Knight(0)

      Queen.position = '00'
      blackKnight.position = '01'
      anotherBlackKnight.position = '11'

      board()[0][0] = Queen
      board()[0][1] = blackKnight
      board()[1][1] = anotherBlackKnight

      expect(Queen.findValidMoves(Board)).toMatchSnapshot()
      //add more test cases
    })

    it('should check for collision against teamates', () => {
      let Queen = new Chess.Queen(1)
      let whiteKnight = new Chess.Knight(1)
      let anotherWhiteKnight = new Chess.Knight(1)

      Queen.position = '00'
      whiteKnight.position = '01'
      anotherWhiteKnight.position = '10'

      board()[0][0] = Queen
      board()[0][1] = whiteKnight
      board()[1][0] = anotherWhiteKnight

      expect(Queen.findValidMoves(Board)).toMatchSnapshot()
    })
  })

  describe('Pawn', () => {
    var Board

    const board = () => {
      return Board.board
    }

    beforeEach(() => {
      Board = new Chess.Board()
    })
    it('Should check valid moves with first move', () => {
      let whitePawn = new Chess.Pawn(1)
      let blackPawn = new Chess.Pawn(0)

      whitePawn.position = '60'
      blackPawn.position = '10'

      board()[6][0] = whitePawn
      board()[1][1] = blackPawn

      expect(whitePawn.findValidMoves(Board)).toMatchSnapshot()
      expect(blackPawn.findValidMoves(Board)).toMatchSnapshot()
    })

    it('Should check valid attacks', () => {
      let whitePawn = new Chess.Pawn(1)
      let anotherWhitePawn = new Chess.Pawn(1)
      let blackPawn = new Chess.Pawn(0)

      whitePawn.position = '22'
      anotherWhitePawn.position = '20'
      blackPawn.position = '11'
      blackPawn.firstMove = false

      board()[2][2] = whitePawn
      board()[2][0] = anotherWhitePawn
      board()[1][1] = blackPawn

      expect(blackPawn.findValidMoves(Board)).toMatchSnapshot()
    })

    it('should check Mercenary valid moves', () => {
      let whitePawn = new Chess.Pawn(1, 'Mercenary')
      let blackPawn = new Chess.Pawn(0, 'Mercenary')

      whitePawn.position = '61'
      blackPawn.position = '11'

      board()[6][1] = whitePawn
      board()[1][1] = blackPawn

      expect(whitePawn.findValidMoves(Board)).toMatchSnapshot()
      expect(blackPawn.findValidMoves(Board)).toMatchSnapshot()
      //need to check collision
    })
    //Add more tests
  })
})
