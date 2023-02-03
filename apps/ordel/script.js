var index = 0;
var letter_list = ['-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-'];
var color_list = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

document.addEventListener('keydown', new_letter);

function updateColors() {
    for (let i = 0; i < color_list.length; i++) {
        const element = document.getElementById(i);
        if (color_list[i] == 0) {
            element.style.backgroundColor = "#334155";
        } else if (color_list[i] == 1) {
            element.style.backgroundColor = "#6d28d9";
        } else {
            element.style.backgroundColor = "#16a34a";
        }
    }
}

function clearRight() {
    return;
    document.getElementById("right").innerHTML = "";
}

function changeColor(id) {
    color_list[id] = color_list[id] + 1;
    if (color_list[id] > 2) {
        color_list[id] = 0
    }
    updateColors();
    console.log(color_list);
    updateRules();
}

function updateLetter(index, letter) {
    letter_list[index] = letter;
    console.log(letter_list);
    updateRules();
}

function updateRules() {
    document.getElementById("color-element").innerHTML = color_list;
    document.getElementById("letter-element").innerHTML = letter_list;
}

function addRule(index, color) {
    return 0;
}

function letterClicked(id) {
    changeColor(id);
}

function decrease_index() {
    if (index == 0) {
        return;
    } else {
        index--;
    }
}

function increase_index() {
    if (index ==  5 * 6) {
        return;
    } else {
        index++;
    }
}

function new_letter(e) {
    if (e.keyCode == 8) {
        decrease_index();
        document.getElementById(index).innerHTML = index;
        updateLetter(index, '-');
        return;
    } else {
        if (index == 30) {
            return;
        } else if (e.keyCode == 221) {
            document.getElementById(index).innerHTML = 'å';
        } else if (e.keyCode == 222) {
            document.getElementById(index).innerHTML = 'ä';
        } else if (e.keyCode == 192) {
            document.getElementById(index).innerHTML = 'ö';
        } else if (e.keyCode < 65 || e.keyCode > 90) {
            return;
        } else {
            document.getElementById(index).innerHTML = String.fromCharCode(e.keyCode).toLowerCase();
        }
        updateLetter(index, document.getElementById(index).innerHTML);
        increase_index();
    }
}