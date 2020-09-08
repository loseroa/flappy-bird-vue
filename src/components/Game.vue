<template>
  <div id="PlayScreen">
    <Bird />
    <Pipe />
    <Ground />
    <div class="test"></div>
  </div>
</template>
<script>
import Bird from '../components/Bird'
import Pipe from '../components/Pipe'
import Ground from '../components/Ground'
import { mapGetters, mapActions } from 'vuex'

let birdFlappingLoop
let birdFallingLoop
let collapseCheckLoop
let movePipeLoop
let generatePipeLoop

export default {
  name: 'Game',
  components: { Bird, Pipe, Ground },
  mounted: function () {
    window.addEventListener('keypress', this.handleKeyPress)
    this.startGame()
  },
  computed: {
    ...mapGetters({
      getGameStatus: 'game/getStatus',
      getLeftPosition: 'pipe/getLeftPosition',
      getBirdLocation: 'bird/getLocation',
      getPipesList: 'pipe/getPipesList'
    }),
    isCollapse () {
      let self = this
      let focusPipe = this.getPipesList.filter((pipe, pipeIndex) => {
        let isCollapsedTopPipe =
        self.getBirdLocation.left <= self.getLeftPosition + pipeIndex * 170 + 52 &&
        self.getBirdLocation.left + self.getBirdLocation.width >= self.getLeftPosition + pipeIndex * 170 &&
        self.getBirdLocation.top <= pipe.topHeight + 300 &&
        self.getBirdLocation.top + self.getBirdLocation.height >= pipe.topHeight

        let isCollapsedBottomPipe =
        self.getBirdLocation.left <= self.getLeftPosition + pipeIndex * 170 + 52 &&
        self.getBirdLocation.left + self.getBirdLocation.width >= self.getLeftPosition + pipeIndex * 170 &&
        self.getBirdLocation.top <= pipe.topHeight + 700 &&
        self.getBirdLocation.top + self.getBirdLocation.height >= pipe.topHeight + 400
        return isCollapsedTopPipe && isCollapsedBottomPipe
      })
      return focusPipe.length > 0
    }
  },
  methods: {
    ...mapActions({
      birdFly: 'bird/fly',
      birdFall: 'bird/fall',
      changeGameState: 'game/changeState',
      changeBirdAction: 'bird/changeAction',
      resetPipeState: 'pipe/reset',
      resetBirdState: 'bird/reset',
      movePipe: 'pipe/movePipe',
      generatePipe: 'pipe/generatePipe'
    }),
    handleKeyPress (e) {
      if (e.keyCode === 32) {
        switch (this.getGameStatus) {
          case 'START':
            this.playingGame()
            break
          case 'PLAYING':
            this.birdFly()
            break
          case 'OVER':
            this.startGame()
            break
        }
      }
    },
    startGame () {
      this.changeGameState('START')
      this.resetPipeState()
      this.resetBirdState()
      birdFlappingLoop = setInterval(() => {
        this.changeBirdAction()
      }, 100)
    },
    playingGame () {
      this.changeGameState('PLAYING')
      this.birdFly()
      birdFallingLoop = setInterval(() => {
        this.birdFall()
      }, 200)
      collapseCheckLoop = setInterval(() => {
        if (this.isCollapse) {
          this.overGame()
        }
      }, 100)
      movePipeLoop = setInterval(() => {
        if (this.getGameStatus === 'PLAYING') {
          this.movePipe()
        }
      }, 200)
      generatePipeLoop = setInterval(() => {
        if (this.getGameStatus === 'PLAYING') {
          this.generatePipe()
        }
      }, 2000)
    },
    overGame () {
      this.changeGameState('OVER')
      clearInterval(birdFlappingLoop)
      clearInterval(birdFallingLoop)
      clearInterval(collapseCheckLoop)
      clearInterval(movePipeLoop)
      clearInterval(generatePipeLoop)
    }
  }
}
</script>
<style scoped>
#PlayScreen {
  position: relative;
  width: 288px;
  height: 512px;
  background: url("../assets/sprites/background-day.png");
  margin: auto;
  overflow: hidden;
}
.test {
  position: absolute;
  width: 2px;
  height: 2px;
  background-color: black;
  top: 250px;
  left: 50px;
}
</style>
