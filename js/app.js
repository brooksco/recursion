$(document).foundation();

// Firebase reference for users
var ref = new Firebase("https://recursionvar.firebaseio.com/responses");

// Add event listener for form
var form = document.getElementById("responseForm");

if (form.addEventListener) {
    form.addEventListener("submit", processForm, false);  //Modern browsers

} else if (form.attachEvent) {
    form.attachEvent('onsubmit', processForm);            //Old IE
}

var width = 600;
var height = 600;
var size = 500;

var translateX = 0;
var translateY = 0;

function sierpinski(Ax, Ay, Bx, By, Cx, Cy, d, ctx) {
	if(d > 0) {
		var pointAx = (Bx + Cx) / 2;
		var pointAy = (By + Cy) / 2;

		var pointBx = (Ax + Cx) / 2;
		var pointBy = (Ay + Cy) / 2;

		var pointCx = (Ax + Bx) / 2;
		var pointCy = (Ay + By) / 2;

		var d2 = d-1;
		sierpinski(Ax,Ay,pointBx,pointBy,pointCx,pointCy,d2,ctx);
		sierpinski(pointCx,pointCy,pointAx,pointAy,Bx,By,d2,ctx);
		sierpinski(pointBx,pointBy,pointAx,pointAy,Cx,Cy,d2,ctx);
	}
	else {
		ctx.moveTo(Ax,Ay);
		ctx.lineTo(Bx,By);
		ctx.lineTo(Cx,Cy);
		ctx.lineTo(Ax,Ay);
	}
}


function drawSierpinski(ctx, width, height, size, deep) {
	var midPointX = width / 2;
	var midPointY = height / 2;

	var deep = deep;

	var ri = (size/6) * Math.sqrt(3);
	var ru = (size/3) * Math.sqrt(3);

	var pointAx = midPointX-(size/2);
	var pointAy = midPointY+ri;

	var pointBx = midPointX+(size/2);
	var pointBy = midPointY+ri;

	var pointCx = midPointX;
	var pointCy = midPointY-ru;

	sierpinski(pointAx,pointAy,pointBx,pointBy,pointCx,pointCy,deep,ctx);
}   

var ctx = document.getElementById("sierpinskiCanvas").getContext("2d");
var canvas = document.getElementById("sierpinskiCanvas");


// translateX = -100;
// translateY = 100;

var runSierpinski = true;
var depth = 7;



// var width = window.innerWidth / 2;

var width = document.getElementById('left').offsetWidth;
var height = window.innerHeight;
canvas.width  = width;
canvas.height = height - 20;

window.onresize = function(event) {
	// width = window.innerWidth / 2;
	width = document.getElementById('left').offsetWidth;
	height = window.innerHeight;
	canvas.width  = width;
	canvas.height = height - 20;
};

function sLoop() {

	var color = generateColor();

	for (var i = 1; i <= depth; i++) {
		setTimeout(function(x) { 
			return function() { 
				ctx.beginPath();
				drawSierpinski(ctx, width, height, width / 1.5, x);
				ctx.fillStyle = '#ffffff';
				ctx.fill();
				ctx.strokeStyle = color;
				ctx.lineWidth = 1;
				ctx.stroke();

				if (x == depth) {
					runSierpinski = true;
				}

			}; 
		}(i), 1000*i);
	}
}

function generateColor(ranges) {

	if (!ranges) {
		ranges = [
		[150,256],
		[0, 190],
		[0, 30]
		];
	}

	var g = function() {
        //select random range and remove
        var range = ranges.splice(Math.floor(Math.random()*ranges.length), 1)[0];
        //pick a random number from within the range
        return Math.floor(Math.random() * (range[1] - range[0])) + range[0];
    }
    return "rgb(" + g() + "," + g() + "," + g() +")";
};


        $(document).ready(function() {
        	runSierpinski = false;
        	sLoop();


        	setInterval(function() {

        		if (runSierpinski) {
        			runSierpinski = false;
        			sLoop();
        		}

        	}, 4000);

// For dev'ing
        	// $("#right6").addClass("hidden");
        	// $("#right7").removeClass("hidden");
        	// $("#introScreen").addClass("hidden");
        	// $("#triangleScreen").removeClass("hidden");

// Next buttons
$("#next1").on("click", function() {
	$("#introScreen").addClass("hidden");
	$("#triangleScreen").removeClass("hidden");
	$("#right1").removeClass("hidden");
	// $("#p1n2").show();
});

$("#next2").on("click", function() {
	$("#right1").addClass("hidden");
	$("#right2").removeClass("hidden");

	// $("#p1n2").hide();
	// $("#p2n3").show();
});

$("#next3").on("click", function() {
	$("#right2").addClass("hidden");
	$("#right3").removeClass("hidden");

	// $("#p2n3").hide();
	// $("#p3n4").show();
});


$("#next4").on("click", function() {
	$("#right3").addClass("hidden");
	$("#right4").removeClass("hidden");

	// $("#p3n4").hide();
	// $("#p4n5").show();
});


$("#next5").on("click", function() {
	$("#right4").addClass("hidden");
	$("#right5").removeClass("hidden");

	// $("#p4n5").hide();
	// $("#p5n6").show();
});

$("#next6").on("click", function() {
	$("#right5").addClass("hidden");
	$("#right6").removeClass("hidden");

	// $("#p5n6").hide();
	// $("#p6n7").show();
});

$("#next7").on("click", function() {
	$("#right6").addClass("hidden");
	$("#right7").removeClass("hidden");

	// $("#p6n7").hide();


	// $("#triangleScreen").addClass("hidden");
	// $("#testScreen").removeClass("hidden");
});


// Previous buttons
$("#prev1").on("click", function() {
	$("#introScreen").removeClass("hidden");
	$("#triangleScreen").addClass("hidden");
	$("#right1").addClass("hidden");

	// $("#p1n2").hide();
});

$("#prev2").on("click", function() {
	$("#right1").removeClass("hidden");
	$("#right2").addClass("hidden");

	// $("#p1n2").show();
	// $("#p2n3").hide();
});

$("#prev3").on("click", function() {
	$("#right2").removeClass("hidden");
	$("#right3").addClass("hidden");

	// $("#p2n3").show();
	// $("#p3n4").hide();
});


$("#prev4").on("click", function() {
	$("#right3").removeClass("hidden");
	$("#right4").addClass("hidden");

	// $("#p3n4").show();
	// $("#p4n5").hide();
});


$("#prev5").on("click", function() {
	$("#right4").removeClass("hidden");
	$("#right5").addClass("hidden");

	// $("#p4n5").show();
	// $("#p5n6").hide();
});

$("#prev6").on("click", function() {
	$("#right5").removeClass("hidden");
	$("#right6").addClass("hidden");

	// $("#p5n6").show();
	// $("#p6n7").hide();
});

});



// For dev'ing
// $("#explainRecursion").val("explain");
// $("#explainPizza").val("pizza");
// $("#explainSierpinski").val("triangle");
// $("#explainCS").val("CS");
// $("#age").val("25");
// $("#thoughtsComments").val("some thoughts");


function processForm(e) {
	e.preventDefault();

	showLoader(true);

	var time = getFormattedDate();
	var explainRecursion = $("#explainRecursion").val();
	var explainPizza = $("#explainPizza").val();
	var explainSierpinski = $("#explainSierpinski").val();
	var explainCS = $("#explainCS").val();
	var csKnowledge = $("input[name='csKnowledge']:checked").val();
	var age = $("#age").val();
	var thoughtsComments = $("#thoughtsComments").val();


	ref.push({
		time: time,
		explainRecursion: explainRecursion,
		explainPizza: explainPizza,
		explainSierpinski: explainSierpinski,
		explainCS: explainCS,
		csKnowledge: csKnowledge,
		age: age,
		thoughtsComments: thoughtsComments
	}, function() {
		$("#thanksModal").foundation("open");
		showLoader(false);

		setTimeout(function(){
			$("#thanksModal").foundation("close");
			window.scrollTo(0, 0);
			location.reload();
		}, 4000);
	});


}

// Show/hide submit button changes and other loading/submitting elements
function showLoader(bool) {
	if (bool == true) {
		$("#formSubmit").addClass("disabled");
		$(".loader").removeClass("hide");
		$("#formSubmit").attr("value", "");

	} else {
		$(".loader").addClass("hide");
		$("#formSubmit").removeClass("disabled");
		$("#formSubmit").attr("value", "Submit");
	}
}

// Format date
function getFormattedDate() {
	var date = new Date();

	var month = date.getMonth() + 1;
	var day = date.getDate();
	var hour = date.getHours();
	var min = date.getMinutes();
	var sec = date.getSeconds();

	month = (month < 10 ? "0" : "") + month;
	day = (day < 10 ? "0" : "") + day;
	hour = (hour < 10 ? "0" : "") + hour;
	min = (min < 10 ? "0" : "") + min;
	sec = (sec < 10 ? "0" : "") + sec;

	var str = date.getFullYear() + "-" + month + "-" + day + " " +  hour + ":" + min + ":" + sec;

	return str;
}
