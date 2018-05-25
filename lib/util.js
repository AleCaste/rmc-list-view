"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getOffsetTop = getOffsetTop;
exports._event = _event;
exports.throttle = throttle;
exports.__throttle = __throttle;
exports.setTransform = setTransform;
exports.setTransformOrigin = setTransformOrigin;
function getOffsetTop(elem) {
  var offsetTop = 0;
  /* eslint no-cond-assign: 0 */
  do {
    if (!isNaN(elem.offsetTop)) {
      offsetTop += elem.offsetTop;
    }
  } while (elem = elem.offsetParent);
  return offsetTop;
}

function _event(e) {
  if (e.touches && e.touches.length) {
    return e.touches[0];
  }
  if (e.changedTouches && e.changedTouches.length) {
    return e.changedTouches[0];
  }
  return e;
}

function throttle(fn, delay) {
  var delayFlag = true;
  var firstInvoke = true;
  // console.log('exec once');
  return function _throttle(e) {
    if (delayFlag) {
      delayFlag = false;
      setTimeout(function () {
        delayFlag = true;
        // console.log('exec delay time');
        fn(e);
      }, delay);
      if (firstInvoke) {
        // console.log('first invoke');
        fn(e);
        firstInvoke = false;
      }
    }
  };
}

function __throttle(func, wait, options) {
  var context, args, result;
  var timeout = null;
  var previous = 0;
  if (!options) options = {};
  var later = function later() {
    previous = options.leading === false ? 0 : Date.now();
    timeout = null;
    result = func.apply(context, args);
    if (!timeout) context = args = null;
  };
  return function () {
    var now = Date.now();
    if (!previous && options.leading === false) previous = now;
    var remaining = wait - (now - previous);
    context = this;
    args = arguments;
    if (remaining <= 0 || remaining > wait) {
      if (timeout) {
        clearTimeout(timeout);
        timeout = null;
      }
      previous = now;
      result = func.apply(context, args);
      if (!timeout) context = args = null;
    } else if (!timeout && options.trailing !== false) {
      timeout = setTimeout(later, remaining);
    }
    return result;
  };
};

function setTransform(nodeStyle, value) {
  nodeStyle.transform = value;
  nodeStyle.webkitTransform = value;
  nodeStyle.MozTransform = value;
}

function setTransformOrigin(nodeStyle, value) {
  nodeStyle.transformOrigin = value;
  nodeStyle.webkitTransformOrigin = value;
  nodeStyle.MozTransformOrigin = value;
}