function Top250() {
  this.index = 0,
  this.isLoading = false,
  this.start()
}
Top250.prototype.start = function(){
  if(this.isLoading) return
  this.isLoading = true
  $('.loading').show()
  var self = this
  $.ajax({
    url: 'http://api.douban.com/v2/movie/top250',
    type: 'GET',
    data: {
      start: self.index,
      count: 20
    },
    dataType: 'jsonp'
  }).done(function(res){
    console.log(res)
    self.setData(res)
    self.index = self.index + 20
  }).fail(function(){
    console.log('error...')
  }).always(function(){
    self.isLoading = false
    $('.loading').hide()
  })
}

Top250.prototype.setData = function(data){
  data.subjects.forEach(function(movie){
    var template = `
      <div class="item">
        <a href="">
          <div class="cover">
            <img src="" alt="">
          </div>
          <div class="detail">
            <h2>霸王别姬</h2>
            <div class="extra">
              <span class="score"></span>分 /
              <span class="collect"></span>收藏
            </div>
            <div class="extra">
              <span class="year"></span> /
              <span class="type"></span>
            </div>
            <div class="director">导演：张艺谋</div>
            <div class="actor">主演：张艺谋 葛优</div>
          </div>
        </a>
      </div>
      `
      var $node = $(template)
      $node.find('.cover img').attr('src',movie.images.small)
      console.log(movie.images.small)
      $node.find('.detail h2').text(movie.title)
      console.log(movie.title)
      $node.find('.score').text(movie.rating.average)
      console.log(movie.rating.average)
      $node.find('.collect').text(movie.collect_count)
      console.log(movie.collect_count)
      $node.find('.year').text(movie.year)
      $node.find('.type').text(movie.genres.join(' / '))
      $node.find('.director').text(function(){
        var directivesArr = []
        movie.directors.forEach(function(item){
          directivesArr.push(item.name)
        })
        return directivesArr.join(' 、')
      })
      $node.find('.actor').text(function(){
        var actorArr = []
        movie.casts.forEach(function(item){
          actorArr.push(item.name)
        })
        return actorArr.join(' 、')
      })

      $('#top250').append($node)
    })
}

function UsBox() {
  this.index = 0,
  this.isLoading = false,
  this.start()
}
UsBox.prototype.start = function(){
  if(this.isLoading) return
  this.isLoading = true
  $('.loading').show()
  var self = this
  $.ajax({
    url: 'http://api.douban.com//v2/movie/us_box',
    type: 'GET',
    dataType: 'jsonp'
  }).done(function(res){
    console.log(res)
    self.setData(res)
  }).fail(function(){
    console.log('error...')
  }).always(function(){
    self.isLoading = false
    $('.loading').hide()
  })
}
UsBox.prototype.setData = function(){
  data.subjects.forEach(function(movie){
    var template = `
      <div class="item">
        <a href="">
          <div class="cover">
            <img src="" alt="">
          </div>
          <div class="detail">
            <h2>霸王别姬</h2>
            <div class="extra">
              <span class="score"></span>分 /
              <span class="collect"></span>收藏
            </div>
            <div class="extra">
              <span class="year"></span> /
              <span class="type"></span>
            </div>
            <div class="director">导演：张艺谋</div>
            <div class="actor">主演：张艺谋 葛优</div>
          </div>
        </a>
      </div>
      `
      var $node = $(template)
      $node.find('.cover img').attr('src',movie.images.small)
      console.log(movie.images.small)
      $node.find('.detail h2').text(movie.title)
      console.log(movie.title)
      $node.find('.score').text(movie.rating.average)
      console.log(movie.rating.average)
      $node.find('.collect').text(movie.collect_count)
      console.log(movie.collect_count)
      $node.find('.year').text(movie.year)
      $node.find('.type').text(movie.genres.join(' / '))
      $node.find('.director').text(function(){
        var directivesArr = []
        movie.directors.forEach(function(item){
          directivesArr.push(item.name)
        })
        return directivesArr.join(' 、')
      })
      $node.find('.actor').text(function(){
        var actorArr = []
        movie.casts.forEach(function(item){
          actorArr.push(item.name)
        })
        return actorArr.join(' 、')
      })

      $('#UsBox').append($node)
    })
}








var top250 = new Top250()
top250.start()

$('.main').on('scroll',function(){
  if($('section').eq(0).height()-10 <= $('.main').scrollTop()+$('.main').height()){
    top250.start()
  }
})

$('footer>div').on('click',function(){
  var index = $(this).index()
  console.log(index)
  $(this).addClass('active').siblings().removeClass('active')
  $('.main>section').hide().eq(index).fadeIn()
})
