import styled from 'styled-components'

export const StyledGameBoard = styled.div`
box-sizing: border-box;
width: 100%;
height: 100vh;
padding: 100px;
background-color: #e0e0e0;

.board-container {
  width: 600px;
  grid-area: board;
}

.game-board-container {
  display: grid;
  width: 1400px;
  grid-template-areas:
  "board infoPanel";
}

.game-info-panel {
  grid-area: infoPanel
  display: grid;
  grid-template-areas:
  "p1 vs p2"
  "quit quit quit";

  .player-one{
    grid-area: p1;
  }

  .player-two{
    grid-area: p2;
  }

  .player-vs {
    grid-area: vs;
  }

  .btn-quit {
    grid-area: quit;
    background-color: red;
    color: white;
    width: 300px;
    height: 40px;
  }
}
`