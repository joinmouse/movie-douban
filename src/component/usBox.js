var UsBox = (function(){
  function usBox() {
    this.index = 0,
    this.isLoading = false,
    this.start()
  }
  usBox.prototype.start = function(){
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
      self.renderData(res)
    }).fail(function(){
      console.log('error...')
    }).always(function(){
      self.isLoading = false
      $('.loading').hide()
    })
  }
  usBox.prototype.renderData = function(data){
    console.log(data.subjects)
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
        $node.find('.cover img').attr('src',movie.subject.images.small)
        //console.log(movie.subject.images.small)
        $node.find('.detail h2').text(movie.subject.title)
        //console.log(movie.title)
        $node.find('.collect').text(movie.subject.collect_count)
        console.log(movie.collect_count)
        $node.find('.year').text(movie.subject.year)
        $node.find('.type').text(movie.subject.genres.join(' / '))
        console.log(movie)
        $node.find('.director').text(function(){
          var directivesArr = []
          movie.subject.directors.forEach(function(item){
            directivesArr.push(item.name)
          })
          return directivesArr.join(' 、')
        })
        $node.find('.actor').text(function(){
          var actorArr = []
          movie.subject.casts.forEach(function(item){
            actorArr.push(item.name)
          })
          return actorArr.join(' 、')
        })
  
        $('#UsBox').append($node)
      })
  }
  $('.main').on('scroll',function(){
    if($('section').eq(0).height()-10 <= $('.main').scrollTop()+$('.main').height()){
      usBox.start()
    }
  })
  return {
    init: function(){
      new usBox()
    }
  }
})()

module.exports = UsBox;
