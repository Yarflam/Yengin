var packet = new function () {
	/*
		Yengin 1.1.0
		HTML5/Canvas library created by Yarflam
		Copyright 2014 @ Creative Commons [BY:NC:SA]
	*/
	this.store = new function () {
		this.content = new Array();
		this.add = function (id,data) {
			this.content[id] = data; };
		this.get = function (id) {
			return (this.content[id] || this.content[id] == 0 ? this.content[id] : false); };
	};
	/* Canvas Manage */
	this.canvas = function (args) {
		this.cvs = this.getID(args).obj();
		this.ctx = this.cvs.getContext('2d');
		this.dpi = function (x, y) {
			y = (y == 'auto' ? (this.cvs.offsetHeight/this.cvs.offsetWidth)*x : y);
			this.cvs.width = x;this.cvs.height = y; };
		this.size = function (x, y) {
			this.cvs.style.width = x;this.cvs.style.height = y; };
		this.display = function (value) {
			this.domCSS(this.cvs).display(value); };
		this.fullscreen = function () {
			if(this.cvs.requestFullscreen) {
				this.cvs.requestFullscreen();
			} else if(this.cvs.mozRequestFullScreen) {
				this.cvs.mozRequestFullScreen();
			} else if(this.cvs.webkitRequestFullScreen) {
				this.cvs.webkitRequestFullScreen();
			}};
		this.URI = function () {
			return this.cvs.toDataURL("image/png"); };
		this.draw_circle = function (args) {
			// CALL : x, y, radius, color, border, border_color, mode
			this.ctx.beginPath();
			this.ctx.fillStyle = args['color'];
			this.ctx.arc(args['x'],args['y'],args['radius'],0,2*Math.PI,false);
			if(args['mode']) { this.ctx.fill(); } else { this.ctx.stroke(); }
			this.ctx.lineWidth = args['border'];
			this.ctx.strokeStyle = args['border_color'];
			this.ctx.stroke(); };
		this.draw_rect = function (args) {
			// CALL : point_A, point_B, color, border, border_color, mode
			this.ctx.beginPath();
			this.ctx.fillStyle=args['color'];
			this.ctx.rect(args['A'][0],args['A'][1],(args['B'][0]-args['A'][0]),(args['B'][1]-args['A'][1]));
			if(args['mode']) { this.ctx.fill(); } else { this.ctx.stroke(); }
			this.ctx.lineWidth = args['border'];
			this.ctx.strokeStyle = args['border_color'];
			this.ctx.closePath();
			this.ctx.stroke(); };
		this.draw_text = function (args) {
			// CALL : x, y, text, font, color
			this.ctx.font=args['font'];
			this.ctx.fillStyle = args['color'];
			this.ctx.fillText(args['text'], args['x'], args['y']); };
		this.draw_pixel = function (args) {
			// CALL : x, y, color, size
			this.ctx.fillStyle = args['color'];
			this.ctx.fillRect(args['x'], args['y'], args['size'], args['size']); };
		this.draw_polygon = function (args) {
			// CALL : data, color, border, border_color, mode
			this.ctx.beginPath();
			this.ctx.moveTo(args['data'][0][0],args['data'][0][1]);
			this.ctx.fillStyle = args['color'];
			for(var i=1; i < args['data'].length; i++) {
				this.ctx.lineTo(args['data'][i][0],args['data'][i][1]); }
			if(args['mode']) { this.ctx.fill(); } else { this.ctx.stroke(); }
			this.ctx.lineWidth = args['border'];
			this.ctx.strokeStyle = args['border_color'];
			this.ctx.closePath();
			this.ctx.stroke(); };
		this.draw_img = function (args) {
			// CALL : img, x, y, w, h, img_x, img_y, img_w, img_h
			this.ctx.drawImage(args['img'],
				args['img_x'], args['img_y'], args['img_w'], args['img_h'],
				args['x'], args['y'], args['w'], args['h']); };
		this.clear = function () {
			this.ctx.clearRect(0, 0, this.cvs.width, this.cvs.height); };
		this.mousePatch = function (mouse) {
			return {
				'X': this.cvs.width*((mouse['X']-this.cvs.offsetLeft)/this.cvs.offsetWidth),
				'Y': this.cvs.height*((mouse['Y']-this.cvs.offsetTop)/this.cvs.offsetHeight)}; };
		this.layerAdd = function (x, y) {
			if(!this.store.get('storeLayer')) { this.store.add('storeLayer', Array()); }
			var table = this.store.get('storeLayer');
			table[table.length] = {'X':x, 'Y':y};
			this.ctx.translate(x, y);
			this.store.add('storeLayer', table); };
		this.layerClear = function () {
			var table = this.store.get('storeLayer');
			for(var i=0; i < table.length; i++) {
				this.ctx.translate(table[i]['X']*(-1),table[i]['Y']*(-1)); }
			this.store.add('storeLayer', Array()); }
		this.rotAdd = function (deg) {
			if(!this.store.get('storeRot')) { this.store.add('storeRot', Array()); }
			var table = this.store.get('storeRot');
			table[table.length] = deg;
			this.ctx.rotate((deg-180)/(180/Math.PI));
			this.store.add('storeRot', table); };
		this.rotClear = function () {
			var table = this.store.get('storeRot');
			for(var i=0; i < table.length; i++) {
				this.ctx.rotate((360-table[i]-180)/(180/Math.PI)); }
			this.store.add('storeRot', Array()); };
		return this;
	};
	/* Image Store */
	this.getImg = function (args) {
		if(!this.store.get('storeImage')) { this.store.add('storeImage', Array()); }
		var table = this.store.get('storeImage');
		var ID = table.length;
		table[ID] = new Image();
		table[ID].src = args;
		this.store.add('storeImage', table); };
	this.getPackImg = function (args) {
		for(var i=0; i < args.length; i++) { this.getImg(args[i]); }};
	this.loadImg = function () {
		var test = true;
		var table = this.store.get('storeImage');
		for(var i=0; i < table.length; i++) {
			test = (table[i].complete ? test : false); }
		return test; };
	this.objImg = function (args) {
		return this.store.get('storeImage')[args]; };
	/* CSS Manage */
	this.domCSS = function (args) {
		this.elm = args;
		this.position = function (value) {
			this.elm.style.position = value; };
		this.display = function (value) {
			this.elm.style.display = value; };
		this.margin = function (value) {
			this.elm.style.margin = value; };
		this.padding = function (value) {
			this.elm.style.padding = value; };
		this.bgcolor = function (value) {
			this.elm.style.backgroundColor = value; };
		this.WidthHeight = function (value_w, value_h) {
			this.elm.style.width = value_w;
			this.elm.style.height = value_h; };
		this.overflow = function (value) {
			this.elm.style.overflow = value; };
		this.cursor = function (value) {
			this.elm.style.cursor = value; };
		this.location = function (value) {
			if(value['desk'] < 2) { this.elm.style.top = value['y'];
			} else { this.elm.style.bottom = value['y']; }
			if((value['desk']+1)%2 == 1) { this.elm.style.left = value['x'];
			} else { this.elm.style.right = value['x']; }};
		return this; };
	/* Object from TAG */
	this.getTAG = function (args) {
		this.contentTAG = document.getElementsByTagName(args);
		this.getDOM = function (args) {
			this.contentTAG = this.contentTAG[args];
			this.bgcolor = function (value) {
				this.domCSS(this.contentTAG).bgcolor(value); };
			this.addChild = function (args) {
				this.contentTAG.appendChild(args); };
			this.obj = function () { return this.contentTAG; };
			return this;
		};
		this.bgcolor = function (value) {
			for(var i=0; i < this.contentTAG.length; i++) {
				this.domCSS(this.contentTAG[i]).bgcolor(value);
			}
		};
		return this; };
	/* Object from ID */
	this.getID = function (args) {
		this.contentID = document.getElementById(args);
		this.bgcolor = function (value) {
			this.domCSS(this.contentID).bgcolor(value); };
		this.obj = function () { return this.contentID; };
		return this; };
	/* Object in form */
	this.getForm = function (args) {
		this.formID = args;
		this.obj = function (args) {
			return document.forms[this.formID].elements[args]; };
		this.value = function (args) {
			return this.obj(args).value; };
		this.submit = function () {
			document.forms[this.formID].submit(); }
		return this; };
	/* Get JS file */
	this.getJS = function (args , fct) {
		var js = document.createElement('script');
		js.type = 'text/javascript';
		js.src = args;
		if(fct) { js.onload = fct; }
		this.getTAG('head').getDOM(0).addChild(js); };
	/* Page loaded */
	this.ready = function (args) {
		window.onload = args; };
	/* Tools */
	this.random = function (a, b) { return Math.floor(Math.random()*(b-a))+a; };
	this.addConsole = function (value) {
		var table = (this.store.get('storeConsole') ? this.store.get('storeConsole') : new Array());
		table[table.length] = value;
		this.store.add('storeConsole', table); };
	this.getConsole = function () {
		return this.store.get('storeConsole'); };
	this.initFPS = function () {
		this.store.add('storeFPS',{'Last_Date':new Date(), 'value':0});
		this.eventAdd = function () {
			this.eventClockAdd('FPS', function () { document.title = packet.getFPS()+" FPS"; }, 1000);
		};
		return this; };
	this.getFPS = function () {
		var nowDate = new Date();
		var table = this.store.get('storeFPS');
		var loopTime = 1000/(nowDate-table['Last_Date']);
		var loopValue = (table['value']+loopTime)/2;
		this.store.add('storeFPS',{'Last_Date': nowDate, 'value': loopValue});
		return Math.floor(loopValue); };
	this.str_replace = function (content, table, clone) {
		if(clone != 'undefined') {
			for(arg in table) { content = content.replace(new RegExp("\\"+table[arg],"g"), clone); }
		} else {
			for(arg in table) { content = content.replace(new RegExp("\\"+arg,"g"), table[arg]); }
		}
		return content; };
	/* Math */
	this.toCartesien = function (angle) {
		var rad = (angle-180)/(180/Math.PI);
		return [Math.cos(rad), Math.sin(rad)]; };
	this.toPolaire = function (x, y) {
		var coeff = (180/Math.PI);
		x = (Math.acos(x)*coeff)+180;
		y = (Math.asin(y)*coeff)+180;
		return (Math.floor(y) >= 180 ? (x%360) : (360-x)); };
	this.getVectLength = function (a, b) { return Math.sqrt(Math.pow(b[0]-a[0],2)+Math.pow(b[1]-a[1],2)); };
	this.getVectNorm = function (a, b) {
		var vectLength = this.getVectLength(a, b);
		return (vectLength > 0 ? [(b[0]-a[0])/vectLength,(b[1]-a[1])/vectLength] : [0,0]); };
	/* Events */
	this.eventInit = function () {
		if(!this.store.content['storeEvent']) { this.store.content['storeEvent'] = new Array(); }}
	this.eventClockAdd = function (id, fct, timer) {
		this.eventInit();
		this.store.content['storeEvent'][id] = window.setInterval(fct, timer); };
	this.eventMouse = function () {
		this.store.add('Mouse',{'X':0, 'Y':0});
		window.onmousemove = function (e) {
			var mouseX = (e.pageX ? e.pageX : event.x+document.body.scrollLeft);
			var mouseY = (e.pageY ? e.pageY : event.y+document.body.scrollTop);
			packet.store.add('Mouse',{'X':mouseX, 'Y':mouseY});
		}};
	this.eventKeyboard = function () {
		this.store.add('Key', Array());
		window.onkeypress = function (e) {
			var table = packet.store.get('Key');
			table[table.length] = (e.keyCode ? e.keyCode : e.which);
			packet.store.add('Key', table);
		}};
	this.keyGetAll = function () { return this.store.get('Key'); };
	this.keyGetLast = function () {
		table = this.store.get('Key');
		return (table.length > 0 ? table[table.length-1] : false); };
	this.keyClear = function () { this.store.add('Key', Array()); };
	this.eventClear = function (id) {
		window.clearInterval(this.store.content['storeEvent'][id]); };
}