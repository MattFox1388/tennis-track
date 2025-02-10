import { createWidget, widget, align } from '@zos/ui'
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
      change_func: (index) => {
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
      change_func: (index) => {
        this.state.server = index === 0 ? 'me' : 'opp'
      }
    })

    // Start button
    createWidget(widget.BUTTON, {
      x: 120,
      y: 360,
      w: 240,
      h: 60,
      text: 'Start Match',
      click_func: () => {
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
      }
    })
  }
}) 