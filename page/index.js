import { getText } from '@zos/i18n'
import { push } from '@zos/router'
import { createWidget, widget, align, event } from '@zos/ui'
import { log ,px} from '@zos/utils'

const pageLogger = log.getLogger('page/index')

Page({
  build() {
    pageLogger.log('build index page')
    var btn = createWidget(widget.BUTTON, {
      x: px(60),
      y: px(120),
      w: px(200),
      h: px(40),
      text: 'Go to Setup',
    })

    btn.addEventListener(event.CLICK_DOWN, function (info) {
      pageLogger.log('go to setup page2')
      push({
        url: 'page/setup/index'
      })
    })
  }
})
