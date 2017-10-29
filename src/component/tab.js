var Tab = (function(){
  function tab(tabs,panels){
    this.$tabs = tabs   //$('footer>.item')
    this.$panels = panels
    this.bind()
  }
  tab.prototype.bind = function(){
    var self = this
    this.$tabs.on('click',function(){
      var index = $(this).index()
      $(this).addClass('active').siblings().removeClass('active')
      self.$panels.hide().eq(index).fadeIn()
    })
  }
  return {
    init: function(tabs,panels){
      new tab(tabs,panels)
    }
  }
})()

module.exports = Tab
