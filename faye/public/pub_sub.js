var PS = PS || {};

(function(context) {
  (function($) {

    context.host = '10.0.1.21',
    context.port = '8080',
    context.tank = null,

    context.init = function() {
      context.setupSubscribeTank();
    },

    context.setupSubscribeTank = function() {
      context.tank = new Faye.Client('http://'+ context.host +':'+ context.port +'/');
      context.tank.subscribe('/tanks', function(t) {
        Tank.plotOnBattleField(t.tank_id, t.x, t.y, t.direction);
      });
    }

    context.setupPublishTank = function(tank_id, x, y, direction) {
      context.tank.publish('/tanks', {tank_id: tank_id, x: x, y: y, direction: direction});
    }

  })(jQuery);
})(PS);

jQuery(document).ready(function(){
  PS.init();
});

