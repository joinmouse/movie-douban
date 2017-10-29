var Common = require("./common.js");

var Top250 = (function(){

    function top250(){
        this.$target = $('#top250');
        this.$content = this.$target.find('.container');
        this.index = 0;
        this.isLoading = false;
        this.isFinish = false;
        this.bind();
        this.start();
    }

    top250.prototype = {
        bind: function(){
            var _this = this;
            this.$target.scroll(function(){
                 if(!_this.isFinish && Common.isToBottom(_this.$target,_this.$content) ){
                    _this.start();
                 }
            })
        },

        start: function(){
             var _this = this;
            this.getData(function(data){
               _this.render(data); 
            })
        },

        getData: function(callback){
            var _this = this;
            if(_this.isLoading) return; 
            _this.isLoading = true ;
            _this.$target.find('.loading').show();
            $.ajax({
              url: '//api.douban.com/v2/movie/top250',
              dataType: 'jsonp',
              data:{
                start: _this.index||0
              }  
            }).done(function(ret){
              console.log(ret)
              _this.index += 20;
              if(_this.index >= ret.total){
                  _this.isFinish = true;
              }
              // this.appendHtml(ret);
              callback&&callback(ret);     
            }).fail(function(){
              console.log('数据异常!')
            }).always(function(){
              _this.isLoading = false;  
              _this.$target.find('.loading').hide();
            })
        },
    
        render: function(data){
            var _this = this;
            data.subjects.forEach(function(movie) {
                _this.$content.append(Common.createNode(movie));
            });
        } 
    }

    return {
        init: function(){
            new top250()
        }
    }

})()

module.exports = Top250








/*面向对象单页面实现
var Top250 = (function(){
  function top250() {
    this.index = 0,
    this.isLoading = false,
    this.start()
  }
  top250.prototype.start = function(){
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
      self.renderData(res)
      self.index = self.index + 20
    }).fail(function(){
      console.log('error...')
    }).always(function(){
      self.isLoading = false
      $('.loading').hide()
    })
  }
  top250.prototype.renderData = function(data){
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
        //console.log(movie.images.small)
        $node.find('.detail h2').text(movie.title)
        //console.log(movie.title)
        $node.find('.score').text(movie.rating.average)
        //console.log(movie.rating.average)
        $node.find('.collect').text(movie.collect_count)
        //console.log(movie.collect_count)
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
  return {
    init: function(){
      new top250()
    }
  }
})()

module.exports = Top250
*/