var Common = require('./common.js')

var Search = (function(){
    function search(){
        this.$target = $('#search');
        this.$content = this.$target.find('.container');
        this.keyword = '';
        this.bind();
    }

    search.prototype = {
        bind: function(){
            var _this = this;
            this.$target.find('.button').click(function(){
                _this.keyword = _this.$target.find('input').val();
                _this.start();
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
            _this.$target.find('.loading').show();
            $.ajax({
              url: '//api.douban.com/v2/movie/search',
              dataType: 'jsonp',
              data: {
                  q: _this.keyword
              }
            }).done(function(ret){
              console.log(ret)
              // this.appendHtml(ret);
              callback&&callback(ret);     
            }).fail(function(){
              console.log('数据异常!')
            }).always(function(){
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
            new search()
        }
    }
})()

module.exports = Search