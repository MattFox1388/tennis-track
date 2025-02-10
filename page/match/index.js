import { createWidget, widget, align, text_style } from '@zos/ui'
import { messageBuilder } from '@zos/message'
import { getGestureDetector } from '@zos/interaction'

Page({
  state: {
    matchState: null
  },

  build() {
    const container = createWidget(widget.CONTAINER, {
      x: 0,
      y: 0,
      w: 480,
      h: 480
    })

    // Score display
    this.scoreWidgets = {
      oppLeft: createWidget(widget.TEXT, {
        x: 120,
        y: 160,
        w: 100,
        h: 40,
        text: '0',
        align_h: align.CENTER_H
      }),
      oppRight: createWidget(widget.TEXT, {
        x: 260,
        y: 160,
        w: 100,
        h: 40,
        text: '0',
        align_h: align.CENTER_H
      }),
      meLeft: createWidget(widget.TEXT, {
        x: 120,
        y: 280,
        w: 100,
        h: 40,
        text: '0',
        align_h: align.CENTER_H
      }),
      meRight: createWidget(widget.TEXT, {
        x: 260,
        y: 280,
        w: 100,
        h: 40,
        text: '0',
        align_h: align.CENTER_H
      })
    }

    // Swipe indicators
    const arrows = [
      { x: 240, y: 80, rotation: 0 },   // Up
      { x: 240, y: 400, rotation: 180 }, // Down
      { x: 80, y: 240, rotation: 270 },  // Left
      { x: 400, y: 240, rotation: 90 }   // Right
    ]

    arrows.forEach(({ x, y, rotation }) => {
      createWidget(widget.IMG, {
        x: x - 20,
        y: y - 20,
        src: '/assets/arrow.png', // Arrow image should be placed in assets folder
        angle: rotation
      })
    })

    // Setup gesture detection
    const detector = getGestureDetector()
    detector.onGesture(({ direction }) => {
      messageBuilder.request({
        action: 'POINT_SCORED',
        params: { direction }
      }).then((state) => {
        this.updateScore(state)
      })
    })
  },

  updateScore(state) {
    const currentSet = state.sets[state.currentSet]
    
    this.scoreWidgets.oppLeft.setProperty(widget.TEXT, {
      text: currentSet.opponent.toString()
    })
    this.scoreWidgets.oppRight.setProperty(widget.TEXT, {
      text: state.currentGame.opponent
    })
    this.scoreWidgets.meLeft.setProperty(widget.TEXT, {
      text: currentSet.me.toString()
    })
    this.scoreWidgets.meRight.setProperty(widget.TEXT, {
      text: state.currentGame.me
    })
  }
}) 