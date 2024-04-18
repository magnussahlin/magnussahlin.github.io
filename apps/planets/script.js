paint();

function paint(){
    var c = document.getElementById("myCanvas");
    var ctx = c.getContext("2d");
    iterations = document.getElementById("iter").value;
    smallStep = document.getElementById("smallCirc").value;
    bigStep = document.getElementById("bigCirc").value;

    document.getElementById("iter2").value = iterations;
    document.getElementById("smallCirc2").value = smallStep;
    document.getElementById("bigCirc2").value = bigStep;

    ctx.clearRect(0, 0, 500, 500);
    ctx.strokeStyle = "white";

    for (var i = 1; i <= iterations; i++) {
        ctx.beginPath();
        ctx.moveTo(250+125*Math.cos(i*Math.PI*2*(smallStep/360)), 250+125*Math.sin(i*Math.PI*2*(smallStep/360)));
        ctx.lineTo(250+250*Math.cos(i*Math.PI*2*(bigStep/360)), 250+250*Math.sin(i*Math.PI*2*(bigStep/360)));
        ctx.stroke();
    }
}

function paintText(){
    var c = document.getElementById("myCanvas");
    var ctx = c.getContext("2d");
    iterations = document.getElementById("iter2").value;
    smallStep = document.getElementById("smallCirc2").value;
    bigStep = document.getElementById("bigCirc2").value;

    ctx.clearRect(0, 0, 500, 500);
    ctx.strokeStyle = "white";

    for (var i = 1; i <= iterations; i++) {
        ctx.beginPath();
        ctx.moveTo(250+125*Math.cos(i*Math.PI*2/smallStep), 250+125*Math.sin(i*Math.PI*2/smallStep));
        ctx.lineTo(250+250*Math.cos(i*Math.PI*2/bigStep), 250+250*Math.sin(i*Math.PI*2/bigStep));
        ctx.stroke();
    }
}