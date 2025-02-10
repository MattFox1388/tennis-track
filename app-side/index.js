import { MessageBuilder } from '@zos/message'
import { log } from '@zos/utils'

// Match state constants
const MATCH_FORMAT = {
  FULL: 'full',
  THIRD_BREAKER: '3rd_breaker'
}

const SERVE = {
  ME: 'me',
  OPPONENT: 'opp'
}

const POINT_SCORES = ['0', '15', '30', '40', 'Ad']

// Add this constant for tiebreaker scoring
const TIEBREAKER_POINTS = {
  ME: 'me_points',
  OPPONENT: 'opp_points'
}

// Initialize match state
let matchState = {
  format: MATCH_FORMAT.FULL,
  initialServer: SERVE.ME,
  currentServer: SERVE.ME,
  sets: [
    { me: 0, opponent: 0, games: [] },
    { me: 0, opponent: 0, games: [] },
    { me: 0, opponent: 0, games: [] }
  ],
  currentSet: 0,
  currentGame: {
    me: '0',
    opponent: '0',
    deuce: false,
    isTiebreaker: false,
    tiebreakerPoints: {
      me: 0,
      opponent: 0
    }
  },
  matchHistory: []
}

const messageBuilder = new MessageBuilder()

// Handle messages from the device side
AppSideService({
  onInit() {
    log('app-side onInit')
  },

  onRun() {
    log('app-side onRun')
  },

  onDestroy() {
    log('app-side onDestroy')
  },

  onMessage(request) {
    const { action, params } = request;
    
    switch (action) {
      case 'START_MATCH':
        matchState = initializeMatch(params.format, params.server)
        return matchState
        
      case 'POINT_SCORED':
        updateScore(params.direction)
        return matchState
        
      case 'EXPORT_MATCH':
        return exportMatch()
        
      default:
        return {}
    }
  }
})

function initializeMatch(format, server) {
  return {
    format,
    initialServer: server,
    currentServer: server,
    sets: [
      { me: 0, opponent: 0, games: [] },
      { me: 0, opponent: 0, games: [] },
      { me: 0, opponent: 0, games: [] }
    ],
    currentSet: 0,
    currentGame: {
      me: '0',
      opponent: '0',
      deuce: false,
      isTiebreaker: false,
      tiebreakerPoints: {
        me: 0,
        opponent: 0
      }
    },
    matchHistory: []
  }
}

function updateScore(direction) {
  switch (direction) {
    case 'UP':
      addPoint('opponent')
      break
    case 'DOWN':
      addPoint('me')
      break
    case 'LEFT':
      // Fault - point to returner
      addPoint(matchState.currentServer === SERVE.ME ? 'opponent' : 'me')
      break
    case 'RIGHT':
      // Service winner - point to server
      addPoint(matchState.currentServer === SERVE.ME ? 'me' : 'opponent')
      break
  }
}

function addPoint(player) {
  const game = matchState.currentGame
  const otherPlayer = player === 'me' ? 'opponent' : 'me'
  
  if (game.isTiebreaker) {
    // Handle tiebreaker scoring
    game.tiebreakerPoints[player]++
    
    // Update display scores
    game[player] = game.tiebreakerPoints[player].toString()
    game[otherPlayer] = game.tiebreakerPoints[otherPlayer].toString()
    
    // Check for tiebreaker win
    if (game.tiebreakerPoints[player] >= 7 && 
        game.tiebreakerPoints[player] - game.tiebreakerPoints[otherPlayer] >= 2) {
      winGame(player)
    }
    return
  }

  // Handle deuce scoring
  if (game.deuce) {
    if (game[player] === 'Ad') {
      // Win game
      winGame(player)
    } else if (game[otherPlayer] === 'Ad') {
      // Back to deuce
      game.me = 'Du'
      game.opponent = 'Du'
    } else {
      // Get advantage
      game[player] = 'Ad'
      game[otherPlayer] = 'Du'
    }
    return
  }

  // Regular scoring
  const currentScore = POINT_SCORES.indexOf(game[player])
  const otherScore = POINT_SCORES.indexOf(game[otherPlayer])

  if (currentScore === 3 && otherScore < 3) {
    // Win game
    winGame(player)
  } else if (currentScore === 3 && otherScore === 3) {
    // Enter deuce
    game.deuce = true
    game.me = 'Du'
    game.opponent = 'Du'
  } else {
    // Regular point
    game[player] = POINT_SCORES[currentScore + 1]
  }
}

function winGame(player) {
  const currentSet = matchState.sets[matchState.currentSet]
  currentSet[player]++
  
  // Record game in history
  currentSet.games.push({
    winner: player,
    finalScore: { ...matchState.currentGame }
  })

  // Check if we need to start a tiebreaker
  if (currentSet.me === 6 && currentSet.opponent === 6 && 
      !(matchState.currentSet === 2 && matchState.format === MATCH_FORMAT.THIRD_BREAKER)) {
    // Start tiebreaker
    matchState.currentGame = {
      me: '0',
      opponent: '0',
      deuce: false,
      isTiebreaker: true,
      tiebreakerPoints: {
        me: 0,
        opponent: 0
      }
    }
    return
  }

  // Check for set win
  if (isSetWon(currentSet, player)) {
    if (isMatchWon()) {
      // Match is over
      matchState.matchHistory.push({
        format: matchState.format,
        sets: matchState.sets,
        winner: player
      })
    } else {
      // Move to next set
      matchState.currentSet++
    }
  }

  // Reset game score
  matchState.currentGame = {
    me: '0',
    opponent: '0',
    deuce: false,
    isTiebreaker: false,
    tiebreakerPoints: {
      me: 0,
      opponent: 0
    }
  }

  // Switch server
  matchState.currentServer = 
    matchState.currentServer === SERVE.ME ? SERVE.OPPONENT : SERVE.ME
}

function isSetWon(set, player) {
  const playerGames = set[player]
  const otherGames = set[player === 'me' ? 'opponent' : 'me']

  if (matchState.currentSet === 2 && matchState.format === MATCH_FORMAT.THIRD_BREAKER) {
    // Third set tiebreaker
    return playerGames >= 7 && playerGames - otherGames >= 2
  }

  // Regular set with possible tiebreaker
  if (playerGames === 7 && otherGames === 6) {
    // Won by tiebreaker
    return true
  }
  if (playerGames === 6 && otherGames < 5) {
    // Won by regular games
    return true
  }
  return false
}

function isMatchWon() {
  let mySets = 0
  let oppSets = 0

  for (let i = 0; i <= matchState.currentSet; i++) {
    if (matchState.sets[i].me > matchState.sets[i].opponent) {
      mySets++
    } else if (matchState.sets[i].opponent > matchState.sets[i].me) {
      oppSets++
    }
  }

  return mySets === 2 || oppSets === 2
}

function exportMatch() {
  return matchState.matchHistory
}
