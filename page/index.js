import { getText } from '@zos/i18n'
import { createWidget, widget, align } from '@zos/ui'

Page({
  build() {
    createWidget(widget.TEXT, {
      x: 96,
      y: 120,
      w: 128,
      h: 46,
      text: 'Hello World',
      color: 0xffffff,
      text_size: 32,
      align_h: align.CENTER_H,
      align_v: align.CENTER_V
    })
  }
})
