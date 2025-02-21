import { log ,px} from '@zos/utils'
import { createWidget, widget , prop, event, align, text_style} from '@zos/ui'

const setupLogger = log.getLogger('setup')

Page({
  build() {
 const typeText = createWidget(widget.TEXT, {
      x: px(0),
      y: px(0),
      w: px(120),
      h: px(180),
      color: 0xffffff,
      align_h: align.CENTER_H,
      align_v: align.CENTER_V,
      text_style: text_style.NONE,
      text: 'Type'
    })

     const serverText = createWidget(widget.TEXT, {
      x: px(110),
      y: px(0),
      w: px(120),
      h: px(180),
      color: 0xffffff,
      align_h: align.CENTER_H,
      align_v: align.CENTER_V,
      text_style: text_style.NONE,
      text: 'Server'
    })

    const tbText= createWidget(widget.TEXT, {
      x: px(45),
      y: px(95),
      w: px(120),
      h: px(180),
      color: 0xffffff,
      align_h: align.CENTER_H,
      align_v: align.CENTER_V,
      text_style: text_style.NONE,
      text: '3rd Set Tb'
    })

    const fullText= createWidget(widget.TEXT, {
      x: px(30),
      y: px(120),
      w: px(120),
      h: px(180),
      color: 0xffffff,
      align_h: align.CENTER_H,
      align_v: align.CENTER_V,
      text_style: text_style.NONE,
      text: 'Full'
    })

    const meText= createWidget(widget.TEXT, {
      x: px(145),
      y: px(95),
      w: px(120),
      h: px(180),
      color: 0xffffff,
      align_h: align.CENTER_H,
      align_v: align.CENTER_V,
      text_style: text_style.NONE,
      text: 'Me'
    })

    const oppText= createWidget(widget.TEXT, {
      x: px(145),
      y: px(123),
      w: px(120),
      h: px(180),
      color: 0xffffff,
      align_h: align.CENTER_H,
      align_v: align.CENTER_V,
      text_style: text_style.NONE,
      text: 'Opp'
    })
    

    const typeRadioGroup = createWidget(widget.RADIO_GROUP, {
      x: px(0),
      y: px(90),
      w: px(160),
      h: px(94),
      unselect_src: 'selected_radio.png',
      select_src: 'unselected_radio.png',
      check_func: (group, index, checked) => {
        setupLogger.log('index', index)
        setupLogger.log('checked', checked)
      }
    })
    const serverRadioGroup = createWidget(widget.RADIO_GROUP, {
      x: px(0),
      y: px(90),
      w: px(160),
      h: px(94),
      unselect_src: 'selected_radio.png',
      select_src: 'unselected_radio.png',
      check_func: (group, index, checked) => {
        setupLogger.log('index', index)
        setupLogger.log('checked', checked)
      }
    })

    const fullBtn= typeRadioGroup.createWidget(widget.STATE_BUTTON, {
      x: px(51),
      y: px(90),
      w: px(16),
      h: px(16)
    })
    const thirdTbBtn= typeRadioGroup.createWidget(widget.STATE_BUTTON, {
      x: px(51),
      y: px(116),
      w: px(16),
      h: px(16)
    })
    const meBtn= serverRadioGroup.createWidget(widget.STATE_BUTTON, {
      x: px(172),
      y: px(90),
      w: px(16),
      h: px(16)
    })
    const oppBtn= serverRadioGroup.createWidget(widget.STATE_BUTTON, {
      x: px(172),
      y: px(116),
      w: px(16),
      h: px(16)
    })

    const img = createWidget(widget.IMG, {
      x: px(100),
      y: px(300),
      src: 'start_button.png'
    })
    img.addEventListener(event.CLICK_DOWN, (info) => {
      setupLogger.log('start button click')
    })

    typeRadioGroup.setProperty(prop.INIT, fullBtn)
    serverRadioGroup.setProperty(prop.INIT, meBtn)
  }
})