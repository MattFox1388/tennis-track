import { getText } from '@zos/i18n'
import { createWidget, widget, align, event } from '@zos/ui'

Page({
  build() {
    var btn = createWidget(widget.BUTTON, {
      x: 60,
      y: 120,
      w: 200,
      h: 40,
      text: 'Go to Setup',
      // click_func: () => {
      //   push({
      //     url: 'page/setup/index'
      //   })
      // }
    })

    btn.addEventListener(event.CLICK_DOWN, function (info) {
      //Registering event listeners.
      push({
        url: 'page/setup/index'
      })
    })
  }
})
