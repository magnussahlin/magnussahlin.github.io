var snake_list = [[5,5]];
var food_point = [99,99];
var x_direction = 0;
var y_direction = 1;
var game_over = false;
var map = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
];
var board = document.getElementById("game");

function is_colliding(new_point) {
    var some_collision = false;
    for (let i = 0; i < snake_list.length - 1; i++) {
        var snake_point = snake_list[i];
        if (new_point[0] == snake_point[0] && new_point[1] == snake_point[1]) {
            some_collision = true;
        }
    }
    return some_collision;
}

function get_new_point() {
    while(true) {
        var try_point = [Math.floor(Math.random() * 11), Math.floor(Math.random() * 11)];
        if (!is_colliding(try_point)) {
            return try_point;
        }
    }
}

function update_snake() {
    var new_pos = [wrap(snake_list[0][0] + y_direction), wrap(snake_list[0][1] + x_direction)];
    if (is_colliding(new_pos)) {
        console.log("GAME OVER - Score: " + snake_list.length);
        game_over = true;
        clearTimeout(timer);
    } else {
        var hit_food = false;
        if (JSON.stringify(new_pos) == JSON.stringify(food_point)) {
            snake_list.push([99,99]);
            document.getElementById("score").innerHTML = snake_list.length;
            hit_food = true;
        }
        for (let snake_index = snake_list.length - 1; snake_index > 0; snake_index--) {
            snake_list[snake_index][0] = snake_list[snake_index - 1][0];
            snake_list[snake_index][1] = snake_list[snake_index - 1][1];
        }
        snake_list[0][0] = wrap(snake_list[0][0] + y_direction);
        snake_list[0][1] = wrap(snake_list[0][1] + x_direction);
        if (hit_food) {
            food_point = get_new_point();
        }
    }
}

function update_map() {
    for (let i = 0; i < map.length; i++) {
        for (let j = 0; j < map[i].length; j++) {
            map[i][j] = 0;
        }
    }
    snake_list.forEach(coordinates => {
        map[coordinates[0]][coordinates[1]] = 1;
    });
    map[food_point[0]][food_point[1]] = 2;
}

function wrap(number) {
    if (number == -1) {
        return 10;
    }
    if (number == 11) {
        return 0;
    }
    return number;
}

function create_map() {
    for (let i = 0; i < map.length; i++) {
        for (let j = 0; j < map[0].length; j++) {
            board.innerHTML += '<div id="id' + i + j + '" class="square"></div>';
        }
    }
}

function paint() {
    for (let y = 0; y < map.length; y++) {
        for (let x = 0; x < map[y].length; x++) {
            document.getElementById('id' + y + '' + '' + x + '').style.backgroundColor = "rgb(223, 223, 233)";
            if (map[y][x] == 1) {
                document.getElementById('id' + y + '' + '' + x + '').style.backgroundColor = "black";
            }
            if (map[y][x] == 2) {
                document.getElementById('id' + y + '' + '' + x + '').style.backgroundColor = "rgb(93, 180, 93)";
            }
        }
    }
}

function up(button = true) {
    if (button) {enter()}
    if (snake_list.length == 1 || !(wrap(snake_list[0][0] - 1) == snake_list[1][0] && snake_list[0][1] == snake_list[1][1])) {
        x_direction = 0;
        y_direction = -1;
    }
}

function left(button = true) {
    if (button) {enter()};
    if (snake_list.length == 1 || !(snake_list[0][0] == snake_list[1][0] && wrap(snake_list[0][1] - 1) == snake_list[1][1])) {
        x_direction = -1;
        y_direction = 0;
    }
}

function right(button = true) {
    if (button) {enter()};
    if (snake_list.length == 1 || !(snake_list[0][0] == snake_list[1][0] && wrap(snake_list[0][1] + 1) == snake_list[1][1])) {
        x_direction = 1;
        y_direction = 0;
    }
}

function down(button = true) {
    if (button) {enter()};
    if (snake_list.length == 1 || !(wrap(snake_list[0][0] + 1) == snake_list[1][0] && snake_list[0][1] == snake_list[1][1])) {
        x_direction = 0;
        y_direction = 1;
    }
}

function enter() {
    if (game_over) {
        x_direction = 0;
        y_direction = 1;
        food_point = get_new_point();
        snake_list = [[5,5]];
        game_over = false;
        document.getElementById("score").innerHTML = "1";
        tick();
        timer = setInterval(tick, 100);
    }
}

document.addEventListener('keydown', press)
function press(e){
    if (e.keyCode === 38 || e.keyCode === 87) { // Up
        up(false);
    }
    if (e.keyCode === 37 || e.keyCode === 65) { // Left
        left(false);
    }
    if (e.keyCode === 40 || e.keyCode === 83) { // Down
        down(false);
    }
    if (e.keyCode === 39 || e.keyCode === 68) { // Right
        right(false);
    }
    if (e.keyCode === 32 || e.keyCode === 13) { // Space / Enter
        enter();
    }
}

function tick() {
    update_snake();
    update_map();
    paint();
}

create_map();
food_point = get_new_point();
update_map();
paint();

var timer = setInterval(tick, 100);