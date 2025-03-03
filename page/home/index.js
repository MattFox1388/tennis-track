import { createWidget, widget, align, text_style, event } from '@zos/ui'
import { push } from '@zos/router'

Page({
  build() {
    const container = createWidget(widget.CONTAINER, {
      x: 0,
      y: 0,
      w: 320, // Changed to match designWidth from app.json
      h: 320  // Changed to match typical screen dimensions
    })

    var startBtn = createWidget(widget.BUTTON, {
      x: 60,  // Adjusted for smaller screen
      y: 120, // Adjusted for smaller screen
      w: 200, // Adjusted for smaller screen
      h: 40,  // Adjusted for smaller screen
      text: 'Start Match',
    })

    startBtn.addEventListener(event.CLICK_DOWN, function (info) {
      push({
        url: 'page/setup/index'
      })
    })

    var exportBtn = createWidget(widget.BUTTON, {
      x: 60,  // Adjusted for smaller screen
      y: 180, // Adjusted for smaller screen
      w: 200, // Adjusted for smaller screen
      h: 40,  // Adjusted for smaller screen
      text: 'Export Match',
    })

    exportBtn.addEventListener(event.CLICK_DOWN, function (info) {
      // Handle export functionality
    })
  }
})