var Tank = Tank || {};

(function(context) {
  (function($) {

    context.cols = 20,
    context.rows = 15,

    context.my_tank = null,
    context.pos_x = 0,
    context.pos_y = 0,
    context.direction = 'north',

    context.west_key  = 37,
    context.north_key = 38,
    context.east_key  = 39,
    context.south_key = 40,

    context.battle_field = null,

    context.init = function() {
      // alert('Welcopme');
      context.createBattleField();
      context.createMyTank();
      context.deployMyTank();
      context.trackMyTankMovement();
    },

    context.createBattleField = function() {
      var wrapper = '';
      for(y=0; y < context.rows; y++) {
        wrapper = '';
        for(x=0; x < context.cols; x++) {
          wrapper += '<td id="c_'+ x +'_'+ y +'"></td>';
        }
        $('<tr>' + wrapper + '</tr>').appendTo('table');
        context.battle_field = $('table');
      }
    },

    context.createMyTank = function() {
      context.my_tank = Math.floor(Math.random()*100) + '_' + Math.floor(Math.random()*20);
      return context.my_tank;
    },

    context.randomBattleFieldPosition = function() {
        context.pos_x = Math.floor(Math.random() * context.cols);
        context.pos_y = Math.floor(Math.random() * context.rows);
    },

    context.deployMyTank = function() {
      context.randomBattleFieldPosition();
      context.plotOnBattleField(context.my_tank, context.pos_x, context.pos_y, context.direction);
      PS.setupPublishTank(context.my_tank, context.pos_x, context.pos_y, context.direction);
    },

    context.plotOnBattleField = function(tank_id, x, y, direction) {
      var current_pos = context.battle_field.find('td.' + tank_id);
      current_pos.removeClass(tank_id)
                 .removeClass('tank')
                 .removeClass('west')
                 .removeClass('north')
                 .removeClass('east')
                 .removeClass('south');
      context.battle_field.find('tr:eq('+ y +')').find('td:eq(' + x + ')').addClass(tank_id).addClass('tank ' + direction);
    },

    context.trackMyTankMovement = function() {
      $(document).keypress(function(e) {
        context.keyStrokeAction(e.keyCode);
      });

      $('body').live('keydown', function(e) {
        if(e.which != 13) {
          context.keyStrokeAction(e.which);
        }
      });
    },

    context.keyStrokeAction = function(key_code) {
      if(key_code == 13) {
        context.explodeArea();
      }

      if(key_code >= context.west_key && key_code <= context.south_key) {
        if(key_code == context.west_key) {
          context.direction = 'west';
          context.pos_x = (context.pos_x > 0) ? context.pos_x - 1 : context.pos_x
        } else if(key_code == context.north_key) {
          context.direction = 'north';
          context.pos_y = (context.pos_y > 0) ? context.pos_y - 1 : context.pos_y
        } else if(key_code == context.east_key) {
          context.direction = 'east';
          context.pos_x = (context.pos_x < context.cols - 1) ? context.pos_x + 1 : context.pos_x
        } else if(key_code == context.south_key) {
          context.direction = 'south';
          context.pos_y = (context.pos_y < context.rows - 1) ? context.pos_y + 1 : context.pos_y
        }

        context.plotOnBattleField(context.my_tank, context.pos_x, context.pos_y, context.direction);
        PS.setupPublishTank(context.my_tank, context.pos_x, context.pos_y, context.direction);
      }
    },

    context.explodeArea = function() {
      console.log('kaboom');
      var p_x = context.pos_x,
          p_y = context.pos_y,
          tanks_hit = 0;


      for(y=p_y-2; y<p_y+3; y++) {
        for(x=p_x-2; x<p_x+3; x++) {
          var cell = context.battle_field.find('#c_'+x+'_'+y);
          cell.addClass('explode');
          if(cell.hasClass('tank')) {
            tanks_hit++;
          }
        }
      }
      context.battle_field.find('#c_'+p_x+'_'+p_y).removeClass('explode');

      if(tanks_hit > 1) {
        alert('You hit somebody');
      }


      setTimeout(function(){
        for(y=p_y-2; y<p_y+3; y++) {
          for(x=p_x-2; x<p_x+3; x++) {
            context.battle_field.find('#c_'+x+'_'+y).removeClass('explode');
          }
        }
      }, 100);

    }

  })(jQuery);
})(Tank);

jQuery(document).ready(function(){
  Tank.init();
});


// Faye should be accepting the following options
// tank_id
// x axis
// y axis
// direction

