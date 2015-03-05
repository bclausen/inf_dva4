var centerx = 0;
var centery = 0;

var interval = 1000 / 30;



//When the window is loading
function initClock() {
	addHourSymbols();
	updateVars();

	updateHands();
	window.setInterval("updateHands()", interval);
}


//Called when the window resizes
function onResize() {
	updateVars();
	updateHands();
}


//----------------------

function addHourSymbols() {
	for (var counter = 1; counter <= 12; counter++) {
		var shape = document.createElementNS("http://www.w3.org/2000/svg", "circle");
		shape.setAttribute("class", "hoursymbol");
		shape.setAttribute("id", "hoursymbol" + counter);
		shape.setAttribute("r", "3");
		clockgraphics.appendChild(shape);
	}

}


//----------------------


//Updates all necessary variables and attributes, depending on the window size
function updateVars() {
	centerx = 95;
	centery = 95;
	clockgraphics.setAttribute("transform", "translate(" + centerx + "," + centery + ") rotate(180)");

	//Background
	var clocksize = 85;
	var circlestrokewidth = clocksize * 0.05; 

	background.setAttribute("r", clocksize);
	background.style["stroke-width"] = circlestrokewidth;
	center.setAttribute("r", clocksize * 0.05);
	center.style["stroke-width"] = circlestrokewidth * 0.25;


	//Hands
	updateHandVars(clocksize);


	//Hour points
	updateHourSymbolVars(clocksize);
}


//Updates the vars / attributes of the hands only
function updateHandVars(clocksize) {
	var widths = {hour: clocksize / 10, min: clocksize / 10 * 0.6, sec: clocksize / 10 * 0.15};
	var heights = {hour: clocksize * 0.6, min: clocksize * 0.8, sec: clocksize * 0.85};

	handhours.setAttribute("height", heights.hour);
	handmins.setAttribute("height", heights.min);
	handsecs.setAttribute("height", heights.sec);

	handhours.setAttribute("ry", heights.hour / 2);
	handmins.setAttribute("ry", heights.min / 2);
	handsecs.setAttribute("ry", heights.sec / 2);


	handhours.setAttribute("width", widths.hour);
	handmins.setAttribute("width", widths.min);
	handsecs.setAttribute("width", widths.sec);

	handhours.setAttribute("x", -widths.hour / 2);
	handmins.setAttribute("x", -widths.min / 2);
	handsecs.setAttribute("x", -widths.sec / 2);

	handhours.setAttribute("rx", widths.hour);
	handmins.setAttribute("rx", widths.min);
	handsecs.setAttribute("rx", widths.sec);

	handhours.style["stroke-width"] = widths.hour * 0.1;
	handmins.style["stroke-width"] = widths.min * 0.1;
	handsecs.style["stroke-width"] = widths.sec * 0.05;
}


//Updates the attributes of the hour symbols
function updateHourSymbolVars(clocksize) {
	for (var counter = 1; counter <=12; counter++) {
		var sym = document.getElementById("hoursymbol" + counter.toString());

		var angle = counter * 30 * (Math.PI / 180);
		var pt = {x: 0.9 * clocksize * Math.cos(angle), y: 0.9 * clocksize * Math.sin(angle)};

		sym.setAttribute("cx", pt.x);
		sym.setAttribute("cy", pt.y);
		sym.setAttribute("r", clocksize * 0.02);
		sym.style["stroke-width"] = clocksize * 0.02 * 0.3
	}
}








//Updates all hands, depending on the current time
function updateHands() {

	var time = new Date();

	var hours = time.getHours();
	var mins = time.getMinutes();
	var secs = time.getSeconds();
	var msecs = time.getMilliseconds();

	var anglehours = (hours + mins / 60 + secs / 3600) * 30;
	handhours.setAttribute("transform", "rotate(" + anglehours + ")");


	var anglemins = (mins + secs / 60) * 6;
	handmins.setAttribute("transform", "rotate(" + anglemins + ")");


	var anglesecs = (secs + msecs / 1000) * 6; 
	handsecs.setAttribute("transform", "rotate(" + anglesecs + ")");


}




