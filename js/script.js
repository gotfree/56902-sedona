var range = {
  min: 0,
  max: 5000,
  step: 100
}
var form = document.querySelector('.inner-booking-form')
var rangeOutput = document.querySelectorAll('.range-output')
var rangeBar = document.querySelector('.range-bar')
var leverMin = document.querySelector('.range-lever-min')
var leverMax = document.querySelector('.range-lever-max')
var scaleLength = document.querySelector('.range-scale').offsetWidth
form.price[0].step = range.step
form.price[0].step = range.step
form.price[1].max = range.max

var onValuesGetting = function () {
  var valueMin = form.price[0].value
  var valueMax = form.price[1].value
  var leverMinPos = 100 * valueMin / range.max + '%'
  var leverMaxPos = 100 * valueMax / range.max + '%'
  rangeOutput[0].innerHTML = valueMin
  rangeOutput[1].innerHTML = valueMax
  form.price[0].max = valueMax
  form.price[1].min = valueMin
  rangeBar.style.left = leverMinPos
  rangeBar.style.right = 'calc(100% - ' + leverMaxPos + ')'
  leverMin.style.left = 'calc(' + leverMinPos + ' - ' + leverMin.offsetWidth / 2 + 'px)'
  leverMax.style.left = 'calc(' + leverMaxPos + ' - ' + leverMax.offsetWidth / 2 + 'px)'
}

var onLeverGrabbing = function (event) {
  event.preventDefault()
  var isEventTouch = event.type === 'touchstart'
  var eventMove = isEventTouch ? 'touchmove' : 'mousemove'
  var eventEnd = isEventTouch ? 'touchend' : 'mouseup'
  var control = event.target === leverMin ? form.price[0] : form.price[1]
  var moveStart = isEventTouch ? event.changedTouches[0].pageX : event.pageX
  var moveEnd = moveStart
  var initialValue = parseInt(control.value, 10)

  var getNewValue = function () {
    return Math.round((moveEnd - moveStart) * range.max / (range.step * scaleLength)) * range.step + initialValue
  }

  var onLeverMoving = function (event) {
    moveEnd = isEventTouch ? event.changedTouches[0].pageX : event.pageX
    control.value = getNewValue()
    onValuesGetting()
  }

  var onLeverReleasing = function (event) {
    event.preventDefault()
    document.removeEventListener(eventMove, onLeverMoving)
    document.removeEventListener(eventEnd, onLeverReleasing)
  }

  document.addEventListener(eventMove, onLeverMoving)
  document.addEventListener(eventEnd, onLeverReleasing)
}

form.addEventListener('change', onValuesGetting)
leverMin.addEventListener('mousedown', onLeverGrabbing)
leverMax.addEventListener('mousedown', onLeverGrabbing)
leverMin.addEventListener('touchstart', onLeverGrabbing)
leverMax.addEventListener('touchstart', onLeverGrabbing)

onValuesGetting()
