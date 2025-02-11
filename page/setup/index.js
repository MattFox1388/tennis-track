import { createWidget, widget, align, event } from '@zos/ui'
import { push } from '@zos/router'
import { messageBuilder } from '@zos/message'

Page({
  state: {
    format: 'full',
    server: 'me'
  },

  build() {
    const container = createWidget(widget.CONTAINER, {
      x: 0,
      y: 0,
      w: 480,
      h: 480
    })

    // Format selector
    createWidget(widget.RADIO_GROUP, {
      x: 60,
      y: 100,
      w: 360,
      h: 100,
      select_index: 0,
      options: ['Full Match', '3rd Set Tiebreak'],
      check_func: (group, index, checked) => {
        this.state.format = index === 0 ? 'full' : '3rd_breaker'
      }
    })

    // Server selector
    createWidget(widget.RADIO_GROUP, {
      x: 60,
      y: 220,
      w: 360,
      h: 100,
      select_index: 0,
      options: ['Me', 'Opponent'],
      check_func: (group, index, checked) => {
        this.state.server = index === 0 ? 'me' : 'opp'
      }
    })

    // Start button
    var btn = createWidget(widget.BUTTON, {
      x: 120,
      y: 360,
      w: 240,
      h: 60,
      text: 'Start Match',
    })

    btn.addEventListener(event.CLICK_DOWN, function (info) {
      messageBuilder.request({
        action: 'START_MATCH',
        params: {
          format: this.state.format,
          server: this.state.server
        }
      }).then(() => {
        push({
          url: 'page/match/index'
        })
      })
    })
  }
}) 