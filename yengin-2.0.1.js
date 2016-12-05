var yengin = (function () {
	/*
	*	Yengin 2.0.1
	*	HTML5/Canvas and Entity Component System
	*	Library programmed by Yarflam
	*
	*	Creative Commons - BY:NC:SA - 2015
	*/

	var self = {};

	/*
	*	@details_ord : return char code from string
	*	@details_chr : return string from char code
	*	@details_isset: exist variable
	*	@details_istype: type of variable
	*	@details_getFctName: return the function's name
	*	@details_deepCopy: copy all data from object
	*	@details_shallowCopy: same of deepCopy without function
	*/

	self.ord = function (value) {
		return value.charCodeAt(0);
	};

	self.chr = function (value) {
		return String.fromCharCode(value);
	};

	self.isset = function (obj) {
		return (obj !== undefined ? true : false);
	};

	self.istype = function (obj, type) {
		return (self.isset(obj) && obj.constructor.name == type ? true : false);
	};

	self.getFctName = function (fct) {
		var raw = fct.toString();
		return raw.split(self.chr(32))[1];
	};

	self.deepCopy = function (oldObj) {
		var newObj = oldObj;
		if(self.isset(oldObj)) {
			if(self.istype(oldObj, "Object")) {
				newObj = {};
				for(var property in oldObj) {
					newObj[property] = self.deepCopy(oldObj[property]);
				}
			} else if(self.istype(oldObj, "Array")) {
				newObj = [];
				for(var i=0; i < oldObj.length; i++) {
					newObj[i] = self.deepCopy(oldObj[i]);
				}
			}
		}
		return newObj;
	};

	self.shallowCopy = function (oldObj, newObj) {
		var newObj = newObj || {};
		for(var property in oldObj) {
			if(self.istype(oldObj[property], "Function")) {
				newObj[property] = oldObj[property];
			}
		}
		return newObj;
	};

	/*
	*	External Request :: GET
	*	url: /?name1=value1&name2=value2
	*/

	self._GET = (function () {
		var obj = {};
		var url = window.location.href;
		var focus = url.indexOf('?');
		if(focus >= 0) {
			var segm = url.substring(focus+1);
			var params = segm.split('&');
			for(var i=0; i < params.length; i++) {
				var data = params[i].split('=');
				if(data.length == 2) {
					obj[data[0]] = data[1];
				}
			}
		}
		return obj;
	})();

	/*
	*	External Request :: TAG
	*	url: /#tag
	*/

	self._TAG = (function () {
		var url = window.location.href;
		var focus = url.indexOf('#');
		return (focus >= 0 ? url.substring(focus+1) : "");
	})();

	/*
	*	Storage
	*
	*	@call_memory: set(), get(), clearMemory()
	*	@call_stack: push(), pop(), clearStack()
	*/
	self.store = (function () {
		this._data = {};
		this._stack = {};
		/* MEMORY */
		this.set = function (base, id, value) {
			if(!self.isset(this._data[base])) { this._data[base] = {}; }
			this._data[base][id] = value;
			return this; };
		this.get = function (base, id) {
			if(self.isset(this._data[base])) {
				if(self.isset(this._data[base][id])) {
					return this._data[base][id];
				} else { return false; }
			} else { return false; }};
		this.clearMemory = function (base) {
			delete this._data[base];
			return this; };
		/* STACK */
		this.push = function (base, value) {
			if(!self.isset(this._stack[base])) { this._stack[base] = []; }
			this._stack[base].push(value);
			return this; };
		this.pop = function (base) {
			if(self.isset(this._stack[base])) {
				var id = this._stack[base].length-1;
				if(id >= 0) {
					var value = this._stack[base][id];
					this._stack[base].pop();
					return value;
				} else { return false; }
			} else { return false; }};
		this.clearStack = function (base) {
			delete this._stack[base];
			return this; };
		return this;
	})();

	/*
	*	Session Storage
	*
	*	@call: set(), get(), remove(), clear()
	*/
	self.localStore = (function () {
		var obj = {};
		obj.set = function (id, value) {
			sessionStorage.setItem(id, value);
			return this; };
		obj.get = function (id) {
			return sessionStorage[id]; };
		obj.remove = function (id) {
			sessionStorage.removeItem(id);
			return this; };
		obj.clear = function () {
			sessionStorage.clear();
			return this; };
		return obj;
	})();

	/*
	*	DOM Manager
	*
	*	@call: eq(), css(), html(), append(), parent()
	*/
	self.getObj = function (selector) {
		/* USE AN OBJECT OR SELECT IT */
		if(self.istype(selector, 'String')) {
			var obj = document.querySelectorAll(selector);
			obj._selector = selector;
		} else {
			var obj = self.toNodeList(selector);
			obj._selector = undefined;
		}
		/* USE OBJECT */
		obj.eq = function (id) {
			id = (self.isset(id) ? id : 0);
			if(self.isset(this[id])) {
				var obj = this[id];
				obj._legacy = self.shallowCopy(this, {});
			} else { return this; }
			/* METHODS */
			obj.css = function (args, value) {
				if(self.isset(value)) {
					this.style[args] = value;
					return this;
				} else if(self.istype(args, "Object")) {
					for(var property in args) {
						this.css(property, args[property]); }
					return this;
				} else if(self.istype(args, "String")) {
					return this.style[args];
				}};
			obj.getPosition = function () {
				var position = {};
				position.x = this.offsetLeft;
				position.y = this.offsetTop;
				return position; };
			obj.getClass = function () {
				if(this.className.length) {
					return this.className.split(self.chr(32));
				} else { return new Array(); }};
			obj.setClass = function (args) {
				if(self.istype(args, "Array")) {
					this.className = args.join(self.chr(32)); }
				return this; };
			obj.addClass = function (name) {
				var listClass = this.getClass();
				var position = listClass.indexOf(name);
				if(self.isset(name) && position < 0) {
					listClass.push(name);
					this.setClass(listClass); }
				return this; };
			obj.hasClass = function (name) {
				return (this.getClass().indexOf(name) >= 0); };
			obj.removeClass = function (name) {
				var listClass = this.getClass();
				var position = listClass.indexOf(name);
				if(self.isset(name) && position >= 0) {
					listClass.splice(position, 1);
					this.setClass(listClass); }
				return this; };
			obj.val = function (content) {
				if(self.isset(content)) {
					this.value = content;
					return this;
				} else {
					return this.value;
				}};
			obj.html = function (content) {
				if(self.isset(content)) {
					this.innerHTML = content;
					return this;
				} else {
					return this.innerHTML;
				}};
			obj.append = function (content) {
				if(self.isset(content)) {
					this.innerHTML += content;
				} return this; };
			obj.addChild = function (content) {
				if(self.isset(content)) {
					this.appendChild(content);
				} return this; };
			obj.child = function (selector) {
				if(self.isset(selector)) {
					var node = self.shallowCopy(this._legacy, this.querySelectorAll(selector));
					return (node.length == 1 ? node.eq(0) : node);
				} else {
					return self.shallowCopy(this._legacy, this.childNodes);
				}};
			obj.attr = function (attrib, value) {
				if(self.isset(attrib)) {
					if(self.isset(value)) {
						this.setAttribute(attrib, value);
						return this;
					} else { return this.getAttribute(attrib); }
				} else { return this; }};
			obj.data = function (attrib, value) {
				if(self.isset(attrib)) {
					if(self.isset(value)) {
						return this.attr('data-'+attrib, value);
					} else { return this.attr('data-'+attrib); }
				} else { return this; }};
			obj.parent = function (n) {
				var listParent = [];
				var nextParent = this.parentNode;
				while(nextParent !== null) {
					listParent.push(nextParent);
					var nextParent = nextParent.parentNode; }
				if(listParent.length) {
					if(self.isset(n) && ((n-1) > 0 && (n-1) < listParent.length)) {
						return self.getObj(listParent[n-1]);
					} else { return self.getObj(listParent[0]); }
				} else { return this; }};
			obj.remove = function () {
				this.parentNode.removeChild(this); };
			obj.fullscreen = function () {
				if(this.requestFullscreen) {
					this.requestFullscreen();
				} else if(this.mozRequestFullScreen) {
					this.mozRequestFullScreen();
				} else if(this.webkitRequestFullScreen) {
					this.webkitRequestFullScreen();
				}};
			obj.addEvent = function (evt, fct) {
				return self.addEvent(evt, this, fct); };
			obj.remEvent = function (evt, fct) {
				return self.addEvent(evt, this, fct); };
			obj.catchKeys = function (fct, mode) {
				return self.catchKeys(this, fct, mode); };
			obj.catchMouse = function (fct) {
				return self.catchMouse(this, fct); };
			obj.eq = function () { return this; };
			return obj;
		};
		obj.css = function (args, value) {
			var handle = [];
			for(var i=0; i < this.length; i++) {
				handle.push(this.eq(i).css(args, value)); }
			if(self.istype(args, "Object") || self.isset(value)) {
				return this;
			} return handle; };
		obj.addClass = function (name) {
			for(var i=0; i < this.length; i++) {
				this.eq(i).addClass(name); }
			return this; };
		obj.removeClass = function (name) {
			for(var i=0; i < this.length; i++) {
				this.eq(i).removeClass(name); }
			return this; };
		obj.val = function (content) {
			var handle = [];
			for(var i=0; i < this.length; i++) {
				handle.push(this.eq(i).val(content)); }
			if(self.isset(content)) { return this; } else { return handle; }};
		obj.html = function (content) {
			var handle = [];
			for(var i=0; i < this.length; i++) {
				handle.push(this.eq(i).html(content)); }
			if(self.isset(content)) { return this; } else { return handle; }};
		obj.append = function (content) {
			if(self.isset(content)) {
				for(var i=0; i < this.length; i++) {
					this.eq(i).append(content); }
			} return this; };
		obj.parent = function () {
			return this.eq(0).parent(); };
		obj.remove = function () {
			for(var i=0; i < this.length; i++) {
				this.eq(i).remove(); }};
		obj.addEvent = function (evt, fct) {
			return self.addEvent(evt, this, fct); };
		obj.remEvent = function (evt, fct) {
			return self.addEvent(evt, this, fct); };
		return (obj.length == 1 ? obj.eq() : obj);
	};

	self.getObjId = function (id) { return this.getObj("#"+id); };
	self.getObjTag = function (id) { return this.getObj("."+id); };
	self.getNewObj = function (type) { return this.getObj(document.createElement(type)); };

	self.toNodeList = function (obj) {
		var nodeList;
		if(!obj.parentNode) {
			var _temp = document.createDocumentFragment();
			_temp.appendChild(obj);
			nodeList = _temp.childNodes;
		} else {
			obj.setAttribute('wrapNodeList','');
			nodeList = obj.parentNode.querySelectorAll('[wrapNodeList]');
			obj.removeAttribute('wrapNodeList');
		}
		return nodeList;
	};

	/*
	*	Loop Manager
	*/
	self.each = function (obj, fct) {
		for(var key in obj) {
			if(fct.length == 1) {
				fct(obj[key]);
			} else if(fct.length == 2) {
				fct(key, obj[key]);
			}
		}
	};

	/*
	*	JS Manager
	*
	*	@details: Import Script
	*/
	self.getJs = function (args, fct, waitAll) {
		waitAll = (self.isset(waitAll) && waitAll ? true : false);
		args = (self.istype(args, "Array") ? args : [args]);
		if(waitAll) {
			var pProgress = 0;
			var pFct = function () {
				if(pProgress < args.length-1) {
					pProgress++;
				} else { fct(); }
			};
			/* Import Scripts */
			for(var i=0; i < args.length; i++) {
				var obj = this.getNewObj('script');
				obj.type = "text/javascript";
				obj.src = args[i];
				obj.onload = pFct;
				this.getObj('head').addChild(obj);
			}
		} else {
			/* Import Scripts */
			for(var i=0; i < args.length; i++) {
				var obj = this.getNewObj('script');
				obj.type = "text/javascript";
				obj.src = args[i];
				if(fct) { obj.onload = fct; }
				this.getObj('head').addChild(obj);
			}
		}
		return this;
	};

	/*
	*	JSON Manager
	*/
	self.jsonParse = function (content) {
		try { return JSON.parse(content);
		} catch(e) { return {}; }
	};

	/*
	*	Events Manager
	*
	*	@details: New Event
	*/

	self.ready = function (fct) { return this.addEvent("load", window, fct); };

	self.addEvent = function (evt, obj, fct) {
		var self = this;
		if(self.istype(obj, "NodeList")) {
			for(var i=0; i < obj.length; i++) {
				this.addEvent(evt, obj[i], fct); }
		} else {
			/* ADD EVENT */
			if(obj.addEventListener) {
				obj.addEventListener(evt, fct, false);
			} else if(obj.attachEvent) {
				obj.attachEvent("on"+evt, fct);
			} else {
				obj[evt] = fct;
			}
		}
		return obj;
	};

	self.remEvent = function (evt, obj, fct) {
		var self = this;
		if(self.istype(obj, "NodeList")) {
			for(var i=0; i < obj.length; i++) {
				this.remEvent(evt, obj[i], fct); }
		} else {
			/* REMOVE EVENT */
			if(obj.removeEventListener) {
				obj.removeEventListener(evt, fct);
			} else if(obj.detachEvent) {
				obj.detachEvent("on"+evt, fct);
			} else {
				obj[evt] = false;
			}
		}
		return obj;
	};

	self.callEvent = function (evt, obj, data) {
		var handle = new CustomEvent(evt, {detail: data});
		obj.dispatchEvent(handle);
	};

	self.simulateClick = function (obj) {
		var evt = document.createEvent("MouseEvents");
		evt.initEvent("click", true, true);
		obj.dispatchEvent(evt);
	};

	self.catchKeys = function (obj, fct, mode) {
		var evt = (mode == true ? 'keyup' : 'keydown');
		this.addEvent(evt, obj, function (e) {
			this.key = (e.keyCode ? e.keyCode : e.which);
			if(self.isset(fct)) { fct(this.key); }
		});
		return obj;
	};

	self.catchMouse = function (obj, fct) {
		obj.lastMouse = {};
		obj.mouse = {'x': false, 'y': false};
		this.addEvent('mousemove', obj, function (e) {
			this.lastMouse = {'x': this.mouse.x, 'y': this.mouse.y};
			var frame = this.getBoundingClientRect();
			this.mouse.x = (self.isset(e.pageX) ? e.pageX : event.x)-this.scrollLeft-frame.left;
			this.mouse.y = (self.isset(e.pageY) ? e.pageY : event.y)-this.scrollTop-frame.top;
			if(self.isset(fct)) { fct(this.mouse); }
		});
		return obj;
	};

	self.catchDragScroll = function (obj, fct) {
		var self = this;
		if(!self.isset(obj.mouse)) { this.catchMouse(obj); }
		this.addEvent('mousedown', obj, function () {
			self.addEvent('mousemove', this, fct); });
		this.addEvent('mouseup', obj, function () {
			self.remEvent('mousemove', this, fct); });
		return obj;
	};

	self.wait = function (fct, timer, repeat) {
		if(self.isset(repeat) && repeat == true) {
			return window.setInterval(fct, timer);
		} else {
			return window.setTimeout(fct, timer);
		}
	};
	self.stopWait = function (obj) { clearInterval(obj); };

	self.stopEvent = function (e) { e.preventDefault(); };
	self.clearEvent = function (e) { e.stopPropagation(); };

	/*
	*	AJAX Manager
	*/
	self.ajax = function (args) {
		/* PLUGIN */
		if(window.XMLHttpRequest) {
			var xhr = new window.XMLHttpRequest(); } else {
			var xhr = new ActiveXObject("Microsoft.XMLHTTP"); }
		this.addEvent('readystatechange', xhr, function () {
			if(xhr.readyState == 4) {
				if((xhr.status == 200)&&(args.success !== undefined)) {
					args.success(xhr.responseText);
				} else if(args.error !== undefined) {
					args.error(xhr.status, xhr.responseText);
				}
			}
		});
		/* PREPARE */
		var url = args.url;
		var queryData = this.getObjURI(args.data);
		/* SEND */
		if(args.method.toUpperCase() == "POST") {
			xhr.open("POST", url, true);
			xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded");
			xhr.send(queryData);
		} else {
			url += (url.indexOf('?') >= 0 ? "&" : "?")+queryData;
			xhr.open("GET", url, true);
			xhr.send();
		}
	};

	self.getObjURI = function (obj) {
		var URI = new String();
		for(var attrib in obj) { URI += attrib+"="+encodeURIComponent(obj[attrib])+"&"; }
		return URI.substring(0, URI.length-1);
	};

	/*
	*	Canvas Manager
	*/
	self.canvas = function (selector) {
		var obj = this.getObj(selector);
		obj.ctx = obj.getContext('2d');
		obj.hashResize = 0;
		obj.factCtx = 0;
		obj.size = function (x, y) {
			this.css('width', x);this.css('height', y);
			return this; };
		obj.autoResize = function (fact) {
			obj.dpp('auto', 'auto', fact);
			self.addEvent('resize', window, function () {
				obj.dpp('auto','auto', fact);
				obj.hashResize = self.getTime();
			}); };
		obj.catchResize = function (fct) {
			if(obj.hashResize >= self.getTime()-1000) {
				obj.hashResize = 0;
				fct(obj.getDpp());
			}};
		obj.dpp = function (x,y,fact) {
			obj.factCtx = fact;
			var ratio = (this.offsetHeight/this.offsetWidth);
			x = (x == 'auto' ? this.parentNode.offsetWidth : x);
			y = (y == 'auto' ? x*ratio : y);
			if(self.isset(fact)) {
				this.width = x*fact;this.height = y*fact;
			} else { this.width = x;this.height = y; }
			return this; };
		obj.getDpp = function () {
			return {'x': this.width, 'y': this.height}; };
		obj.getURI = function () {
			return this.toDataURL("image/png"); };
		obj.drawCircle = function (args) {
			/*
			*	@args: x, y, radius, color, border, borderColor,
					shadow*, shadowColor*, startArc*, endArc*, mode
			*	@return: this
			*/
			var startArc = (self.isset(args.startArc) ? args.startArc : 0);
			var endArc = (self.isset(args.endArc) ? args.endArc : 2*Math.PI);
			this.ctx.beginPath();
			this.ctx.fillStyle = args.color;
			this.ctx.lineWidth = args.border;
			this.ctx.strokeStyle = args.borderColor;
			if(self.isset(args.shadow)) { this.ctx.shadowBlur = args.shadow; }
			if(self.isset(args.shadowColor)) { this.ctx.shadowColor = args.shadowColor; }
			this.ctx.arc(args.x, args.y, args.radius, startArc, endArc, false);
			if(args.mode) { this.ctx.fill(); } else { this.ctx.stroke(); }
			this.ctx.stroke();
			this.ctx.closePath();
			return this; };
		obj.drawRect = function (args) {
			/*
			*	@args: A (Array), B (Array), color, border, borderColor, mode
			*	@example(A|B): [0,0]
			*	@return: this
			*/
			this.ctx.beginPath();
			this.ctx.fillStyle = args.color;
			this.ctx.rect(args.A[0], args.A[1], args.B[0]-args.A[0], args.B[1]-args.A[1]);
			if(args.mode) { this.ctx.fill(); } else { this.ctx.stroke(); }
			this.ctx.lineWidth = args.border;
			this.ctx.strokeStyle = args.borderColor;
			this.ctx.stroke();
			this.ctx.closePath();
			return this; };
		obj.drawRoundRect = function (args) {
			/*
			*	@args: A (Array), B (Array), color, border, borderColor, borderRadius, mode
			*	@example(A|B): [0,0]
			*	@return: this
			*/
			var radius = args.borderRadius;
			this.ctx.beginPath();
			this.ctx.moveTo(args.A[0]+radius, args.A[1]);
			this.ctx.fillStyle = args.color;
			this.ctx.lineTo(args.B[0]-radius, args.A[1]);
			this.ctx.quadraticCurveTo(args.B[0], args.A[1], args.B[0], args.A[1]+radius);
			this.ctx.lineTo(args.B[0], args.B[1]-radius);
			this.ctx.quadraticCurveTo(args.B[0], args.B[1], args.B[0]-radius, args.B[1]);
			this.ctx.lineTo(args.A[0]+radius, args.B[1]);
			this.ctx.quadraticCurveTo(args.A[0], args.B[1], args.A[0], args.B[1]-radius);
			this.ctx.lineTo(args.A[0], args.A[1]+radius);
			this.ctx.quadraticCurveTo(args.A[0], args.A[1], args.A[0]+radius, args.A[1]);
			if(args.mode) { this.ctx.fill(); } else { this.ctx.stroke(); }
			this.ctx.lineWidth = args.border;
			this.ctx.strokeStyle = args.borderColor;
			this.ctx.stroke();
			this.ctx.closePath();
			return this; };
		obj.drawPolygon = function (args) {
			/*
			*	@args: data (Array), color, border, borderColor, mode
			*	@example(data): [[0,0], [5,0], [5,5]]
			*	@return: this
			*/
			this.ctx.beginPath();
			this.ctx.moveTo(args.data[0][0], args.data[0][1]);
			this.ctx.fillStyle = args.color;
			for(var i=1; i < args.data.length; i++) {
				this.ctx.lineTo(args.data[i][0], args.data[i][1]); }
			if(args.mode) { this.ctx.fill(); } else { this.ctx.stroke(); }
			this.ctx.lineWidth = args.border;
			this.ctx.strokeStyle = args.borderColor;
			this.ctx.stroke();
			this.ctx.closePath();
			return this; };
		obj.drawText = function (args) {
			/*
			*	@args: x, y, text, font, color
			*	@example(font): "normal 12pt Calibri"
			*	@return: this
			*/
			this.ctx.font = args.font;
			this.ctx.fillStyle = args.color;
			this.ctx.fillText(args.text, args.x, args.y);
			return this; };
		obj.drawPixel = function (args) {
			/*
			*	@args: x, y, color, size
			*	@return: this
			*/
			this.ctx.fillStyle = args.color;
			this.ctx.fillRect(args.x, args.y, args.size, args.size);
			return this; };
		obj.drawImage = function (args) {
			/*
			*	@args: src, img(x, y, w, h), cvs(x, y, w, h)
			*	@return: this
			*/
			var img = args.img;
			var cvs = args.cvs;
			this.ctx.drawImage(args.src,
				img.x, img.y, img.w, img.h,
				cvs.x, cvs.y, cvs.w, cvs.h );
			return this; };
		obj.clear = function (args) {
			if(self.isset(args)) {
				this.ctx.clearRect(args.A[0], args.A[1], args.B[0], args.B[1]);
			} else {
				this.ctx.clearRect(0, 0, this.width, this.height);
			}
			return this; };
		return obj;
	};

	/*
	*	Entity Component System
	*/
	self.ECS = function () {
		var obj = {};
		obj._components = {};
		/* Create a component - private method */
		var __createComponent__ = function (nameComponent) {
			if(!self.isset(obj._components[nameComponent])) {
				var component = {};
				component._name = nameComponent;
				component._entities = {};
				component._properties = [];
				component.count = function () {
					var nbEntities = 0;
					for(entity in component._entities) {
						nbEntities++; }
					return nbEntities; };
				component.addEntity = function (entity) {
					component._entities[entity()] = []; };
				component.addProperty = function (nameProperty) {
					component._properties.push(nameProperty); };
				obj._components[nameComponent] = component;
			}
		};
		/* Assign a component - private method  */
		var __getComponent__ = function (nameComponent) {
			if(!self.isset(obj._components[nameComponent])) {
				__createComponent__(nameComponent); }
			return obj._components[nameComponent];
		};
		/* Create an entity */
		obj.create = function () {
			var entity = {};
			entity._id = obj._components._list.count();
			entity.__build__ = function () {
				var clone = entity.getId;
				for(attr in entity) { clone[attr] = entity[attr]; }
				entity = clone; };
			entity.getId = function () { return entity._id; };
			entity.addComponent = function (nameComponent) {
				__getComponent__(nameComponent).addEntity(entity); };
			/* Build it */
			entity.__build__();
			/* Add the entity */
			obj._components._list.addEntity(entity);
			return entity;
		};
		/* Add a property on component */
		obj.addProperty = function (nameComponent, nameProperty) {
			__getComponent__(nameComponent).addProperty(nameProperty); };
		/* Create a basic component */
		__createComponent__('_list');
		return obj;
	};

	/*
	*	Cookies Manager
	*/
	self.cookie = function (cookieId) {
		var obj = {};
		obj._id = cookieId;
		obj._year = 365*24*60*60*1000;
		obj._domain = "/";
		obj.set = function (args) {
			/*
			*	Add or edit the cookie
			*	@args: value, expire, domain
			*/
			var now = new Date();
			var year = now.getTime()+this._year;
			var expire = (!self.isset(args.expire) ? year : args.expire);
			var domain = (!self.isset(args.domain) ? this._domain : args.domain);
			var cookie = [];
			now.setTime(expire);
			cookie.push(this._id)
			cookie.push("="+args.value+";");
			cookie.push("expires="+now.toGMTString()+";");
			cookie.push("path="+domain);
			document.cookie = cookie.join('');
			return this; };
		obj.get = function () {
			/* Return the value of cookie */
			var myCook = false;
			var listCook = document.cookie.split(';');
			for(var i in listCook) {
				var cookie = listCook[i].split('=');
				if(cookie[0].replace(/ /g,'') == this._id) {
					myCook = cookie[1];
				}
			}
			return myCook; };
		obj.remove = function () {
			/* Delete the cookie */
			this.set({'value': null, 'expire': -1});
			return this; };
		return obj;
	};

	/*
	*	Extrapolations, vectors, matrix
	*/
	self.vector2D = function (a, b) {
		var obj = {};
		obj._a = a;
		obj._b = b;
		obj.getLength = function () {
			var lenX = Math.pow(this._b[0]-this._a[0], 2);
			var lenY = Math.pow(this._b[1]-this._a[1], 2);
			return Math.sqrt(lenX+lenY); };
		obj.getNorm = function () {
			var vectLength = this.getLength();
			if(vectLength) {
				return [
					(this._b[0]-this._a[0])/vectLength,
					(this._b[1]-this._a[1])/vectLength ]
			} else { return [0, 0]; }
		};
		return obj;
	};

	self.toRadian = function (angle) {
		return (angle-180)/(180/Math.PI); };
	self.toAngle = function (angle) {
		return (angle*(180/Math.PI))+180; };
	self.toCartesien = function (angle) {
		var rad = self.toRadian(angle);
		return [Math.cos(rad), Math.sin(rad)]; };
	self.toPolaire = function (x, y) {
		var x = self.toAngle(Math.acos(x));
		var y = self.toAngle(Math.asin(y));
		return (Math.floor(y) >= 180 ? (x%360) : (360-x)); };

	/*
	*	COLOR
	*/
	self.decToHexColor = function (table, markCSS) {
		var hexColor = (markCSS !== false ? "#" : "");
		for(var i=0; i < table.length && i < 3; i++) {
			var hex = table[i].toString(16).toUpperCase();
			hexColor += (hex.length == 2 ? "" : "0")+hex; }
		return hexColor;
	};

	self.divideColor = function (dust) {
		var handle = [];
		var table = this.randIntTable(3, 0, 256);
		for(var i=0; i < 3; i++) {
			handle[i] = (table[i] < dust ? table[i] : dust);
			dust -= handle[i]; }
		return handle;
	};

	/*
	*	Tools
	*/
	self.getTime = function () { var d = new Date();return d.getTime(); };
	self.randInt = function (a, b) { return Math.floor(Math.random()*(b-a))+a; };
	self.randIntTable = function (n, a, b) {
		var table = [];
		for(var i=0; i < n; i++) {
			table.push(this.randInt(a,b)); }
		return table;
	};

	self.newDoubleArray = function (x,y) {
		var table = new Array(x);
		for(var i=0; i < x; i++) {
			table[i] = new Array(y); }
		return table;
	};

	return self.shallowCopy(self, self.getObj);
})();