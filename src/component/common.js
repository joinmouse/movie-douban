var Common = {
	
		createNode: function(movie){
			var tpl =`<div class="subject">
	        <div class="movie-pic">
	          <a href="" target="">
	              <img src="http://img7.doubanio.com/view/movie_poster_cover/spst/public/p480747492.webp" alt="">
	          </a>
	        </div>
	        <div class="movie-info">
	           <div class="movie-name">
	               <a href="" class="movie-name-text">肖申克的救赎</a>
	               <span>(1994)</span>
	           </div>
	           <div class="movie-directors">
	               <span class="p1">导演:</span>
	               <span class="directors">弗兰克·德拉邦特</span>
	           </div>
	           <div class="casts">
	               <span class="p1">主演:</span>
	               <span class="acts">蒂姆·罗宾斯 / 摩根·弗里曼 / 鲍勃·冈顿</span>
	           </div>
	           <div class="type">
	               <span class="p1">类型:</span>
	               <span class="genres">犯罪 / 剧情</span>
	           </div>
	           <div class="collect-count">
	               <span class="p1">收藏人数:</span>
	               <span class="count">1142014</span>
	           </div>
	           <div class="score">
	               <span class="p1">评分:</span>
	               <span class="number">9.2</span>
	           </div>
	        </div>
	      </div>`;
		    var $node = $(tpl);
		    $node.find('.movie-pic img').attr('src',movie.images.medium)
		    $node.find('.movie-pic a').attr('href',movie.alt)
		    $node.find('.movie-name .movie-name-text').text(movie.title)
		    $node.find('.movie-name .movie-name-text').attr('href',movie.alt)
		    $node.find('.movie-name span').text(`(${movie.year})`)
		    $node.find('.movie-directors .directors').text(function(item){
		      var directArr = []
		      movie.directors.forEach(function(item){
		          directArr.push(item.name)
		      })
		      return directArr.join(' / ')
		    })
			  $node.find('.collect-count .count').text(movie.collect_count)
			  $node.find('.score .number').text(movie.rating.average)
			  $node.find('.type .genres').text(movie.genres.join(' / '));
			  $node.find('.casts .acts').text(function(){
			      var actArr = []
			      movie.casts.forEach(function(item){
			         actArr.push(item.name)
			      })
			      return actArr.join(' / ')
			  })

				return $node;
	  },

	  isToBottom: function($ct,$content){
	  	 return $ct.height() + $ct.scrollTop() +10 > $content.height();
	  }
}

module.exports = Common;
