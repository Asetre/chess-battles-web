import { BoardError } from './chess_engine_custom_errors'

/* ---------------------------------------------------------------------- */
// Game Board Object
/* ---------------------------------------------------------------------- */
export class Board {
    constructor() {
        //The game board represented as a 2d matrix
        this.board = [
            [],
            [],
            [],
            [],
            [],
            [],
            [],
            [],
        ]
        this.initializeBoard()
        this.reversed = false
    }

    //Initializers / Setup
    initializeBoard() {
        this.fillBoardWithEmptyTiles()
    }

    //Check if one or more kings are in check, if true return an array of positions
    kingsPositions() {
        const pos = []
        this.board.forEach((row, rI) => {
            row.forEach((col, cI) => {
                if(col) {
                    col.king && pos.push(`${rI, cI}`)
                }
            })
        })

        return pos.length === 0 ? null : pos
    }

    //Populate the board matrix with empty tiles
    fillBoardWithEmptyTiles() {
        //Each tile is represented as a null object
        //Later the null object will be replaced if or when a peice is placed there
        this.board.forEach(row => {
            //Inside each row we push 8 columns
            for(let i = 0; i < 8; i++)  {
                row.push(null)
            }
        })
        //We check to ensure that the board has properly been initialized
        this.board.forEach(row => {
            //Check that each row has 8 tiles
            if(row.length !== 8) throw new BoardError(`Invalid amount of tiles should be 8, but got ${row.length}`)
            //Check that each tile is a null object
            row.forEach(tile => {
                if(tile !== null) throw new BoardError(`Invalid amount of tiles should be null, but got ${tile}`)
            })
        })
    }

    setUpGame(p1, p2) {
        let bPawns = ['10', '11', '12', '13', '14', '15', '16', '17'].forEach(pos => {
            this.placePiece(new Pawn(0, p2), pos)
        })
        let bK = new King(0, p2)
        this.placePiece(bK, '04')
        let bQ = new Queen(0, p2)
        this.placePiece(bQ, '03')
        let bR1 = new Rook(0, p2)
        this.placePiece(bR1, '00')
        let bR2 = new Rook(0, p2)
        this.placePiece(bR2, '07')
        let bKn1 = new Knight(0, p2)
        this.placePiece(bKn1, '01')
        let bKn2 = new Knight(0, p2)
        this.placePiece(bKn2, '06')
        let bB1 = new Bishop(0, p2)
        this.placePiece(bB1, '02')
        let bB2 = new Bishop(0, p2)
        this.placePiece(bB2,'05')


        let wPawns = ['60', '61', '62', '63', '64', '65', '66', '67'].forEach(pos => {
            this.placePiece(new Pawn(1, p1), pos)
        })
        let wK = new King(1, p1)
        this.placePiece(wK, '74')
        let wQ = new Queen(1, p1)
        this.placePiece(wQ, '73')
        let wR1 = new Rook(1, p1)
        this.placePiece(wR1, '70')
        let wR2 = new Rook(1, p1)
        this.placePiece(wR2, '77')
        let wKn1 = new Knight(1, p1)
        this.placePiece(wKn1, '71')
        let wKn2 = new Knight(1, p1)
        this.placePiece(wKn2, '76')
        let wB1 = new Bishop(1, p1)
        this.placePiece(wB1, '72')
        let wB2 = new Bishop(1, p1)
        this.placePiece(wB2, '75')
    }

    reverseBoard() {
        this.board = this.board.map(row => row.reverse()).reverse()
        this.reversed = true
    }

    //Empty the board matrix
    resetBoard() {
        //Reset the board to default state prior to initialization
        this.board = [
            [],
            [],
            [],
            [],
            [],
            [],
            [],
            [],
        ]
        this.initializeBoard()
    }

    //Gets a tile/location from the board based on a zero based index row and column integer
    getPosition(position) {
        if(!Array.isArray(position)) position = Board.convertPosition(position)
        const row = position[0]
        const column = position[1]

        return this.board[row][column]
    }

    placePiece(piece, position) {
        //Check if the position is offBoard
        //then check if the piece is valid
        if(Board.isOffBoard(position)) throw new BoardError('Invalid position, cannot place piece outside of the board')

        if(!(piece instanceof Piece)) {
            if(piece !== null) throw new BoardError('Invalid piece')
        }
        if(!Array.isArray(position)) position = Board.convertPosition(position)
        if(position.length !== 2) throw new BoardError('Invalid position')

        const row = position[0]
        const column = position[1]

        if(piece) piece.position = Board.positionToString(position)
        this.board[row][column] = piece
    }

    movePiece(piece, position) {
        if(!piece instanceof Piece) throw new BoardError('Invalid piece')
        if(!Array.isArray(position)) position = Board.convertPosition(position)

        //Place the piece into the new position
        //then set the old location as null
        const previousPosition = Board.convertPosition(piece.position)
        //Check if the piece is the same
        if(piece !== this.board[previousPosition[0]][previousPosition[1]]) throw new Error('Invalid piece move')
        this.placePiece(piece, position)
        this.placePiece(null, previousPosition)
        //Update the piece position
        piece.position = Board.positionToString(position)
        if(piece.name.match('Pawn')) piece.firstMove = false
    }

    //Check if the selected row and column has any other pieces in that location
    //Returns a bool
    isTileEmpty(position) {
        //Check if the position is offBoard
        if(Board.isOffBoard(position)) throw new BoardError('Invalid position, cannot check tile outside of the board')
        if(!Array.isArray(position)) position = Board.convertPosition(position)

        return this.getPosition(position) === null ? true : false
    }

    static convertPosition(position, options) {
        const convertMap = {
            0: 7,
            1: 6,
            2: 5,
            3: 4,
            4: 3,
            5: 2,
            6: 1,
            7: 0
        }

        //example position: 12 === [1][2]
        if(Array.isArray(position)) {
            if(position.length !== 2) throw new BoardError('Invalid position')
            position.forEach(pos => {
                if(typeof pos !== 'number') throw new BoardError('Invalid position')
            })
            return position
        }else if(typeof position === 'number') {
            position = position.toString()
        }
        //split the int into two single digit numbers
        position = position.split('')
        if(position.length > 2) throw new BoardError('Invalid position, string length exceeds limit')
        //If the position is a negative number remove the "-" from the position array and add it to the first item
        position = position.map(pos => parseInt(pos, 10))

        if(options) {
            if(options.reversed) position = position.map(pos => convertMap[pos])
            if(options.toString) position = Board.positionToString(position)
        }

        return position
    }

    //Attention!
    //------------------------------------------------
    //This is currenlty not used inside the engine
    //------------------------------------------------
    static positionToNumber(position) {
        //Take the position array and turn it into a number
        //ex: [4, 6] ~> 46
        if(position.length !== 2) throw new BoardError('Position array length must be equal to 2')
        //Check to see that the position is a number
        position.forEach(int => {
            if(typeof int !== 'number') throw new BoardError('the position must be a number')
            if(int > 7 || int < 0) throw new BoardError('the position is outside of the board')
        })
        return position.reduce((acc, curr) => acc+=curr)
    }
    //------------------------------------------------
    //------------------------------------------------

    static positionToString(position) {
        //Convert array to string
        if(position.length !== 2) throw new BoardError('Invalid position')
        if(!Array.isArray(position)) throw new BoardError('Invalid position')
        let row = parseInt(position[0], 10)
        let column = parseInt(position[1], 10)

        if(row > 7 || row < 0) throw new BoardError('Invalid position')
        if(column > 7 || column < 0) throw new BoardError('Invalid position')

        position.forEach(pos => {
            if(typeof pos !== 'number') throw new BoardError('Invalid position')
        })

        return position.join('')
    }

    static isOffBoard(position) {
        if(typeof position === 'string') position = Board.convertPosition(position)
        if(!Array.isArray(position)) throw new BoardError('Invalid position')
        if(position.length > 3) throw new BoardError('Invalid position')

        let row = parseInt(position[0], 10)
        let column = parseInt(position[1], 10)

        if(row > 7 || row < 0) return true
        if(column > 7 || column < 0) return true
        return false
    }

    //Work in progress---------------------------
    //---------------------------
    //---------------------------
    static placePiece(position, piece) {
        //We only place a piece at the selected position, if there is already a piece there we will replace it
        //Check if the position is inside the board before placing a piece
        if(this.isOffBoard(position)) throw BoardError('Cannot place a piece outside of the board')
        position = Board.convertPosition(position)
        const row = position[0]
        const column = position[1]
        //this.board[]
    }
    //---------------------------
    //---------------------------

}
/* ---------------------------------------------------------------------- */
// Pieces
/* ---------------------------------------------------------------------- */
class Piece {
    constructor(team) {
        //1 == white, 0 == black
        this.team = team
        //if type is declared create special moves
        this.type = arguments[1]
        //board index
        this.position = null
        this.possibleMoves = []
    }
    //check if the same team
    isSameTeam(piece) {
        //pieceTeam == 1 or 0
        return this.team === piece.team ? true : false
    }

    findValidMoves(board) {
        this.findPossibleMoves(board)

        let preValidMoves = this.possibleMoves.map(dir => {
            let newDir = []
            if(!Array.isArray(dir)) throw new BoardError('Invalid position')
            for(let i = 0; i < dir.length; i++) {
                let pos = dir[i]
                //we take the possible moves and check to see if they are within the limits of the matrix
                if(!Board.isOffBoard(pos)) {
                    if(board.isTileEmpty(pos)) {
                        newDir.push(Board.positionToString(pos))
                    }
                    else if(!this.isSameTeam(board.getPosition(pos))) {
                        newDir.push(Board.positionToString(pos))
                        return newDir
                    }else if(this.isSameTeam(board.getPosition(pos))) {
                        return newDir
                    }
                }
            }
            return newDir
        })
        return [].concat(...preValidMoves)
    }
}

export class King extends Piece {
    constructor(team, type) {
        super(team, type)
        this.king = true
        this.name = this.team === 1 ? 'White King' : 'Black King'
    }

    findPossibleMoves(board) {
        this.possibleMoves = []
        const position = Board.convertPosition(this.position)
        const row = position[0]
        const column = position[1]

        if(this.type === 'Conqueror') {
            this.possibleMoves.push([[row - 2, column], [row, column + 2], [row + 2, column], [row, column - 2]])
        }
        //the position is a double digit number as a string representing the matrix
        //ex: '14' == [1][4]
        return this.possibleMoves.push([[row, column - 1]],[[row + 1, column + 1]], [[row + 1, column]], [[row + 1, column - 1]], [[row, column + 1]], [[row - 1, column - 1]], [[row - 1, column]], [[row - 1, column + 1]])
    }
}

export class Knight extends Piece {
    constructor(team, type) {
        super(team, type)
        this.name = this.team === 1 ? 'White Knight' : 'Black Knight'
    }

    findPossibleMoves(board) {
        this.possibleMoves = []
        const position = Board.convertPosition(this.position)
        const row = position[0]
        const column = position[1]

        if(this.type === 'Knight') {
            this.possibleMoves.push([[row - 2, column], [row, column + 2], [row + 2, column], [row, column - 2]])
        }

        return this.possibleMoves.push([[row - 2, column + 1]],[[row - 1, column + 2]],[[row + 1, column + 2]],[[row + 2, column + 1]],[[row + 2, column - 1]],[[row + 1, column - 2]],[[row - 1, column - 2]],[[row - 2, column - 1]])
    }
}

export class Rook extends Piece {
    constructor(team, type) {
        super(team, type)
        this.name = this.team === 1 ? 'White Rook' : 'Black Rook'
    }

    findPossibleMoves(board) {
        this.possibleMoves = []
        const position = Board.convertPosition(this.position)
        const row = position[0]
        const column = position[1]
        this.possibleMoves.push([],[],[],[])

        if(this.type === 'Crusader') {
            this.possibleMoves.push([
                [row - 1, column + 1],
                [row + 1, column + 1],
                [row + 1, column - 1],
                [row - 1, column - 1]
            ])
        }
        //North
        for(let i = row - 1; i !==  -1; i--) {
            this.possibleMoves[0].push(
                [i, column]
            )
        }
        //East
        for(let i = column + 1; i < 8; i++) {
            this.possibleMoves[1].push(
                [row, i]
            )
        }
        //South
        for(let i = row + 1; i < 8; i++) {
            this.possibleMoves[2].push(
                [i, column]
            )
        }
        //West
        for(let i = column - 1; i !== -1; i--) {
            this.possibleMoves[3].push(
                [row, i]
            )
        }
    }
}

export class Bishop extends Piece {
    constructor(team, type) {
        super(team, type)
        this.name = this.team === 1 ? 'White Bishop' : 'Black Bishop'
    }

    findPossibleMoves(board) {
        this.possibleMoves = []
        const position = Board.convertPosition(this.position)
        const row = position[0]
        const column = position[1]
        this.possibleMoves.push([],[],[],[])

        //North East
        for(let i = row - 1, j = column + 1; i >= 0 && j < 8; i--, j++) {
            this.possibleMoves[0].push(
                [i, j]
            )
        }
        //South East
        for(let i = row + 1, j = column + 1; i < 8 && j < 8; i++, j++) {
            this.possibleMoves[1].push(
                [i, j]
            )
        }

        //South West
        for(let i = row + 1, j = column - 1; i < 8 && j >= 0; i++, j--) {
            this.possibleMoves[2].push(
                [i, j]
            )

        }

        //North West
        for(let i = row - 1, j = column - 1; i >= 0 && j >= 0; i--, j--) {
            this.possibleMoves[3].push(
                [i, j]
            )
        }

        if(this.type === 'Assasin') {
            this.possibleMoves.push([[row + 3, column], [row - 3, column]])
        }

        return this.possibleMoves
    }
}

export class Queen extends Piece {
    constructor(team, type) {
        super(team, type)
        this.name = this.team === 1 ? 'White Queen' : 'Black Queen'
    }

    findPossibleMoves(board) {
        this.possibleMoves = []
        const position = Board.convertPosition(this.position)
        const row = position[0]
        const column = position[1]
        for(let i = 0; i < 8; i++) {
            this.possibleMoves.push([])
        }

        //North
        for(let i = row - 1; i !==  -1; i--) {
            this.possibleMoves[0].push(
                [i, column]
            )
        }
        //North East
        for(let i = row - 1, j = column + 1; i >= 0 && j < 8; i--, j++) {
            this.possibleMoves[1].push(
                [i, j]
            )
        }
        //East
        for(let i = column + 1; i < 8; i++) {
            this.possibleMoves[2].push(
                [row, i]
            )
        }
        //South East
        for(let i = row + 1, j = column + 1; i < 8 && j < 8; i++, j++) {
            this.possibleMoves[3].push(
                [i, j]
            )
        }
        //South
        for(let i = row + 1; i < 8; i++) {
            this.possibleMoves[4].push(
                [i, column]
            )
        }
        //South West
        for(let i = row + 1, j = column - 1; i < 8 && j >= 0; i++, j--) {
            this.possibleMoves[5].push(
                [i, j]
            )
        }
        //West
        for(let i = column - 1; i !== -1; i--) {
            this.possibleMoves[6].push(
                [row, i]
            )
        }
        //North West
        for(let i = row - 1, j = column - 1; i >= 0 && j >= 0; i--, j--) {
            this.possibleMoves[7].push(
                [i, j]
            )
        }
    }
}

export class Pawn extends Piece {
    constructor(team, type) {
        super(team, type)
        this.firstMove = true
        this.doubleMove = false
        this.team === 1 ? this.name = 'White Pawn' : this.name = 'Black Pawn'
    }

    checkAdjacentTiles(tiles, board) {
        const dir = []
        tiles.map(pos => {
            const piece = board.getPosition(pos)
            if(!Board.isOffBoard(pos)) {
                if(!board.isTileEmpty(pos)) {
                    if(!this.isSameTeam(piece)) {
                        if(piece.name === 'White Pawn' || piece.name === 'Black Pawn') {
                            if(piece.doubleMove) {
                                dir.push(pos)
                            }
                        }
                    }
                }
            }
        })
        return dir.length > 0 ? dir : false
    }

    findPossibleMoves(board) {
        this.possibleMoves = []
        const position = Board.convertPosition(this.position)
        const row = position[0]
        const column = position[1]

        if(this.type === 'Mercenary') {
            let possibleSpecialMove = [[row, column + 1], [row, column - 1]].map(pos => {
                if(!Board.isOffBoard(pos)) {
                    if(board.isTileEmpty(pos)) return pos
                }
            }).filter(Boolean)
            this.possibleMoves.push(possibleSpecialMove)
        }
        /*
        const adjacentTiles = [[row, column + 1], [row, column - 1]].map(pos => {
            if(Board.isOffBoard(pos)) return false
            return pos
        }).filter(Boolean)

        //Check if en Passant is possible
        const checkAdjacentTiles = this.checkAdjacentTiles(adjacentTiles, board)
        if(checkAdjacentTiles) this.possibleMoves.push(checkAdjacentTiles)
        */
        if(this.firstMove) {
            if(this.team === 1) {
                if(board.isTileEmpty([row - 1, column])) {
                    this.possibleMoves.push([[row - 2, column]])
                }
            }else {
                if(board.isTileEmpty([row + 1, column])) {
                    this.possibleMoves.push([[row + 2, column]])
                }
            }
        }
        if(this.team === 1) {
            let possibleAttacks = [[row - 1, column - 1], [row - 1, column + 1]].map(pos => {
                if(!Board.isOffBoard(pos)) {
                    if(!board.isTileEmpty(pos)) {
                        if(!this.isSameTeam(board.getPosition(pos))) {
                            return pos
                        }
                    }
                }
            }).filter(Boolean)
            this.possibleMoves.push(possibleAttacks)
            if(!Board.isOffBoard([row - 1, column])) {
                if(board.isTileEmpty([row - 1, column])) {
                    this.possibleMoves.push([[row - 1, column]])
                }
            }
        }else {
            let possibleAttacks = [[row + 1, column - 1], [row + 1, column + 1]].map(pos => {
                if(!Board.isOffBoard(pos)) {
                    if(!board.isTileEmpty(pos)) {
                        if(!this.isSameTeam(board.getPosition(pos))) {
                            return pos
                        }
                    }
                }
            }).filter(Boolean)
            this.possibleMoves.push(possibleAttacks)
            if(!Board.isOffBoard([row + 1, column])) {
                if(board.isTileEmpty([row + 1, column])) {
                    this.possibleMoves.push([[row + 1, column]])
                }
            }
        }
        return this.possibleMoves
    }
}

var defaultBoard = new Board()

export default defaultBoard
