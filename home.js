var TopPage = {
  init: function(){
    this.$container = $('#top250')
    this.$content = this.$container.find('.container')
    this.index = 0
    this.isFinish = false
    this.isLoading = false
    this.bind()
    this.start()
  },
  bind: function(){
    var _this = this
    this.$container.scroll(function(){
      if(!_this.isFinish && Common.isToEnd(_this.$container, _this.$content)){
        _this.start()
      }
    })       
  },
  start: function(){
    var _this = this
    this.getData(function(data){
      _this.render(data)
    })
  },
  getData: function(){
    var _this = this
    var index = 0
    $.ajax({
      url: 'http://api.douban.com/v2/movie/top250',
      data: {
        start: index,
        count: 20
      },
      dataType: 'jsonp'
    }).done(function(res){
      console.log(res)
      index += 20
    }).fail(function(){
      console.log('数据异常')
    }).always(function(){
      _this.isLoading = false
      _this.$container.find('.loading').hide()
    })       
  },
  render: function(data){
    var _this = this
    data.subjects.forEach(function(movie){
      _this.$content.append(Common.createNode(movie))
    })
  }
}

var Common = {
  isToEnd: function($viewport, $content){
    return $viewport.height() + $viewport.scrollTop() +10 > $content.height()
  },
  createNode: function(movie){
    var template = `
    <div class="item">
      <a href="#">
        <div class="cover">
          <img src="" alt="">
        </div>
        <div class="detail">
          <h2></h2>
          <div class="extra"><span class="score"></span>分 / <span class="collect"></span>收藏</div>
          <div class="extra"><span class="year"></span> / <span class="type"></span></div>
          <div class="extra">导演: <span class="director"></span></div>
          <div class="extra">主演: <span class="actor"></span></div>
        </div>
      </a>
    </div>`
    var $node = $(template)
    $node.find('.cover img').attr('src', movie.images.medium )
    console.log(movie.images.medium)
    $node.find('.detail h2').text(movie.title)
    $node.find('.score').text(movie.rating.average )
    $node.find('.collect').text(movie.collect_count )
    $node.find('.year').text(movie.year)
    $node.find('.type').text(movie.genres.join(' / '))
    $node.find('.director').text(function(){
      var directorsArr = []
      movie.directors.forEach(function(item){
        directorsArr.push(item.name)
      })
      return directorsArr.join('、')
    })
    $node.find('.actor').text(function(){
      var actorArr = []
      movie.casts.forEach(function(item){
        actorArr.push(item.name)
      })
      return actorArr.join('、')
    })
    return $node
  }
}

var App = {
  init: function(){
    this.bind()
    TopPage.init()
    console.log(1)
  },
  bind: function(){
    $('footer>div').on('click',function(){
      var index = $(this).index()
      $('section').hide().eq(index).fadeIn()
      $(this).addClass('active').siblings().removeClass('active')
    })
    window.ontouchmove = function(e){
      e.preventDefault()
    }
    $('section').each(function(){
      this.ontouchmove = function(e) {
        e.stopPropagation()
      }
    })
  }
}
App.init()
