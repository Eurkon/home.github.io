var iUp = (function () {
  var time = 0,
    duration = 150,
    clean = function () {
      time = 0;
    },
    up = function (element) {
      setTimeout(function () {
        element.classList.add("up");
      }, time);
      time += duration;
    },
    down = function (element) {
      element.classList.remove("up");
    },
    toggle = function (element) {
      setTimeout(function () {
        element.classList.toggle("up");
      }, time);
      time += duration;
    };
  return {
    clean: clean,
    up: up,
    down: down,
    toggle: toggle
  };
})()

function getBingImages (imgUrls) {
  /**
   * 获取Bing壁纸
   * 先使用 GitHub Action 每天获取 Bing 壁纸 URL 并更新 images.json 文件
   * 然后读取 images.json 文件中的数据
   */
  var indexName = 'bing-image-index'
  var index = sessionStorage.getItem(indexName)
  var $panel = document.getElementById('background')
  if (isNaN(index) || index == 7) index = 0
  else index++
  var imgUrl = imgUrls[index]
  var url = 'https://www.bing.com' + imgUrl
  $panel.style.background = `url("${url}") center center no-repeat #666`
  $panel.style.backgroundSize = 'cover'
  sessionStorage.setItem(indexName, index)
}

function decryptEmail (encoded) {
  var address = atob(encoded)
  window.location.href = 'mailto:' + address
}

function getHitokoto () {
  fetch('https://v1.hitokoto.cn')
    .then(function (res) {
      return res.json()
    })
    .then(function (res) {
      document.getElementById('description').innerHTML = res.hitokoto + '<br/> -「<strong>' + res.from + '</strong>」'
    })
}

function resizeFn () {
  if (document.querySelector('#panel').clientHeight < document.querySelector('.panel-main').clientHeight) {
    document.querySelector('#panel').style.overflow = 'auto'
    document.querySelector('#panel').style.alignItems = 'Initial'
  } else {
    document.querySelector('#panel').style.overflow = ''
    document.querySelector('#panel').style.alignItems = ''
  }
}

window.addEventListener('load', event => {
  resizeFn()
  window.addEventListener('resize', resizeFn)
  getHitokoto()

  document.querySelectorAll('.iUp').forEach(function (e) {
    iUp.up(e)
  })

  const $avatar = document.querySelectorAll('.js-avatar')[0]
  $avatar.onload = function () {
    $avatar.classList.add('show')
  }
})
