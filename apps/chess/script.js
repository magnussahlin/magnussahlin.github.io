var timer = setInterval(tick,10);

var b_time = 5*60*1000;
var w_time = 5*60*1000;

black_active = false;
white_active = false;
game_ended = false;

var black_text = document.getElementById('black_text');
var white_text = document.getElementById('white_text');
var black_button = document.getElementById('black');
var white_button = document.getElementById('white');

function tick() {
	if (game_ended == false) {
		if (black_active) {
			b_time-=10;
		}
		if (white_active) {
			w_time-=10;
		}
		if (b_time <= 0 || w_time <= 0) {
			game_ended = true;
			clearInterval(timer);
		}
		update_text();
	}
}

function update_text() {
	black_text.innerHTML = to_mmss(b_time);
	white_text.innerHTML = to_mmss(w_time);
}

function to_mmss(milli)
{
      var milliseconds = milli % 1000;
      var seconds = Math.floor((milli / 1000) % 60);
      var minutes = Math.floor((milli / (60 * 1000)) % 60);

      return ("0" + minutes).slice(-2) + ":" + ("0" + seconds).slice(-2);
}

function black_press() {
	if (game_ended == false) {
		black_active = false;
		white_active = true;
		black_button.style["transform"] = "scale(0.85)";
		white_button.style["transform"] = "scale(0.95)";
		black_button.style["color"] = "gray";
		white_button.style["color"] = "black";
	}
}

function white_press() {
	if (game_ended == false) {
		white_active = false;
		black_active = true;
		black_button.style["transform"] = "scale(0.95)";
		white_button.style["transform"] = "scale(0.85)";
		black_button.style["color"] = "black";
		white_button.style["color"] = "gray";
	}
}