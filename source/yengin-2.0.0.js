var yengin = (function () {
	/*
	*	Yengin 2.0.0
	*	HTML5/Canvas and Entity Component System
	*	Library programmed by Yarflam
	*
	*	Creative Commons - BY:NC:SA - 2015
	*/

	/*
	*	Prototype extends
	*
	*	@details_isset: exist variable
	*	@details_istype: type of variable
	*	@details_deepCopy: copy all data from object
	*	@details_shallowCopy: same of deepCopy without function
	*/
	this.isset = function (obj) {
		return (obj !== undefined ? true : false);
	};

	this.istype = function (obj, type) {
		return (isset(obj) && typeof obj == type ? true : false);
	};

	this.deepCopy = function (oldObj) {
		var newObj = oldObj;
		if(isset(oldObj) && istype(oldObj, "object")) {
			newObj = {};
			for(var property in oldObj) {
				newObj[property] = deepCopy(oldObj[property]);
			}
		}
		return newObj;
	};

	this.shallowCopy = function (oldObj, newObj) {
		newObj = (isset(newObj) ? newObj : {});
		for(var property in oldObj) {
			if(istype(oldObj[property], "function")) {
				newObj[property] = oldObj[property];
			}
		}
		return newObj;
	};

	/*
	*	External Request :: GET
	*	url: /?name1=value1&name2=value2
	*/

	this._GET = (function () {
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

	this._TAG = (function () {
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
	this.store = (function () {
		this._data = {};
		this._stack = {};
		/* MEMORY */
		this.set = function (base, id, value) {
			if(!isset(this._data[base])) { this._data[base] = {}; }
			this._data[base][id] = value;
			return this; };
		this.get = function (base, id) {
			if(isset(this._data[base])) {
				if(isset(this._data[base][id])) {
					return this._data[base][id];
				} else { return false; }
			} else { return false; }};
		this.clearMemory = function (base) {
			delete this._data[base];
			return this; };
		/* STACK */
		this.push = function (base, value) {
			if(!isset(this._stack[base])) { this._stack[base] = []; }
			this._stack[base].push(value);
			return this; };
		this.pop = function (base) {
			if(isset(this._stack[base])) {
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
	this.localStore = (function () {
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
	this.getObj = function (selector) {
		var obj = document.querySelectorAll(selector);
		obj._selector = selector;
		/* USE OBJECT */
		obj.eq = function (id) {
			var obj = this[(isset(id) ? id : 0)];
			obj._legacy = shallowCopy(this, {});
			/* METHODS */
			obj.css = function (args, value) {
				if(isset(value)) {
					this.style[args] = value;
					return this;
				} else if(istype(args, "object")) {
					for(var property in args) {
						this.css(property, args[property]); }
					return this;
				} else if(istype(args, "string")) {
					return this.style[args];
				}
			};
			obj.html = function (content) {
				if(isset(content)) {
					this.innerHTML = content;
					return this;
				} else {
					return this.innerHTML;
				}};
			obj.append = function (content) {
				if(isset(content)) {
					this.innerHTML += content;
				} return this; };
			obj.addChild = function (content) {
				if(isset(content)) {
					this.appendChild(content);
				} return this; };
			obj.child = function (id) {
				if(isset(id)) {
					return shallowCopy(this._legacy, this.querySelectorAll(id));
				} else {
					return shallowCopy(this._legacy, this.childNodes);
				}};
			obj.parent = function () {
				return shallowCopy(this, this.parentNode); };
			obj.fullscreen = function () {
				if(this.requestFullscreen) {
					this.requestFullscreen();
				} else if(this.mozRequestFullScreen) {
					this.mozRequestFullScreen();
				} else if(this.webkitRequestFullScreen) {
					this.webkitRequestFullScreen();
				}};
			return obj;
		};
		obj.css = function (args, value) {
			var handle = [];
			for(var i=0; i < this.length; i++) {
				handle.push(this.eq(i).css(args, value)); }
			if(istype(args, "object") || isset(value)) {
				return this;
			} return handle; };
		obj.html = function (content) {
			var handle = [];
			for(var i=0; i < this.length; i++) {
				handle.push(this.eq(i).html(content)); }
			if(isset(content)) { return this; } else { return handle; }};
		obj.append = function (content) {
			if(isset(content)) {
				for(var i=0; i < this.length; i++) {
					this.eq(i).append(content); }
			} return this; };
		obj.parent = function () {
			return this.eq(0).parent(); };
		return (obj.length == 1 ? obj.eq() : obj);
	};

	this.getObjId = function (id) { return this.getObj("#"+id); };
	this.getObjTag = function (id) { return this.getObj("."+id); };
	this.getNewObj = function (type) { return document.createElement(type); }

	/*
	*	JS Manager
	*
	*	@details: Import Script
	*/
	this.getJs = function (args, fct) {
		var args = (istype(args, "object") ? args : [args]);
		for(var i=0; i < args.length; i++) {
			var obj = this.getNewObj('script');
			obj.type = "text/javascript";
			obj.src = args[i];
			if(fct) { obj.onload = fct; } // -:dev
			this.getObj('head').addChild(obj); }
		return this;
	};

	/*
	*	Events Manager
	*
	*	@details: New Event
	*/
	this.addEvent = function (evt, obj, fct) {
		if(obj.addEventListener) {
			obj.addEventListener(evt, fct, false);
		} else if(obj.attachEvent) {
			obj.attachEvent("on"+evt, fct);
		} else {
			obj[evt] = fct;
		}
		return this;
	};
	
	this.ready = function (fct) { return this.addEvent("load", window, fct); };

	/*
	*	AJAX Manager
	*/
	this.ajax = function (args) {
		var obj = {};
		obj._params = {};
		obj._xhr = (function () {
			if(window.XMLHttpRequest) {
				return new window.XMLHttpRequest();
			} else {
				return new ActiveXObject("Microsoft.XMLHTTP");
			}
		})();
		return obj;
	}; // -: debug

	/*
	*	Canvas Manager
	*/
	this.canvas = function (id) {
		var obj = this.getObjId(id);
		obj.ctx = obj.getContext('2d');
		obj.dpp = function (x, y) {
			var ratio = (this.offsetHeight/this.offsetWidth);
			y = (y == 'auto' ? ratio*x : y);
			this.width = x;this.height = y;
			return this; };
		obj.size = function (x, y) {
			this.css('width', x);this.css('height', y);
			return this; };
		obj.getURI = function () {
			return this.toDataURL("image/png"); };
		obj.drawCircle = function (args) {
			/*
			*	@args: x, y, radius, color, border, border_color, startArc*, endArc*, mode
			*	@return: this
			*/
			var startArc = (isset(args.startArc) ? args.startArc : 0);
			var endArc = (isset(args.endArc) ? args.endArc : 2*Math.PI);
			this.ctx.beginPath();
			this.ctx.fillStyle = args.color;
			this.ctx.arc(args.x, args.y, args.radius, startArc, endArc, false);
			if(args.mode) { this.ctx.fill(); } else { this.ctx.stroke(); }
			this.ctx.lineWidth = args.border;
			this.ctx.strokeStyle = args.borderColor;
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
		obj.clear = function () {
			this.ctx.clearRect(0, 0, this.width, this.height);
			return this; };
		return obj;
	};

	/*
	*	Entity Component System
	*/
	this.newECS = function () {
		var obj = {};
		obj._models = {};
		obj._entities = {};
		obj._components = {};
		/*
		*	MODELS :: Entity
		*/
		obj.addEntity = function (id) {
			var entity = {};
			entity._id = id;
			entity._data = {};
			entity.getId = function () { return this._id; };
			/* Entity :: ADD COMPONENT */
			entity._pushComponent = function (component) {
				var componentId = component.getId();
				var listAttr = component.getAttr();
				for(name in listAttr) {
					this._data[name] = {
						'static': {
							'component': componentId,
							'default': 1 },
						'value': listAttr[name],
						'name': name
					};
				}};
			entity._dropComponent = function (component) {
				var componentId = component.getId();
				var listAttr = component.getAttr();
				for(name in this._data) {
					var attr = this._data[name];
					if(attr.static.default == 1) {
						if(attr.static.component == componentId) {
							delete this._data[name];
						}
					}
				}
			};
			/* Entity :: SETTERS AND GETTERS */
			entity.setAttr = function (attr, value, domain) {
				if(istype(attr, 'object')) {
					for(name in attr) { this.setAttr(name, attr[name], value); }
				} else {
					value = (!isset(value) ? "" : value);
					if(isset(this._data[attr])) {
						this._data[attr].value = value;
					} else {
						var domain = (!isset(domain) ? this._id : domain);
						this._data[attr] = {
							'static': {
								'component': domain,
								'default': 0 },
							'value': value,
							'name': attr
						};
					}
				}
				return this; };
			entity.getAttr = function (attr) {
				if(isset(attr)) {
					if(isset(this._data[attr])) {
						return this._data[attr].value;
					} else { return false; }
				} else { return this._data; }};
			this._entities[id] = entity;
			return entity;
		};
		/*
		*	MODELS :: Components
		*/
		obj.addComponent = function (id) {
			var component = {};
			component._id = id;
			component._data = {};
			component.getId = function () { return this._id; };
			/* Components :: SETTERS AND GETTERS */
			component.setAttr = function (attr, value) {
				if(istype(attr, 'object')) {
					for(name in attr) { this.setAttr(name, attr[name]); }
				} else {
					value = (!isset(value) ? "" : value);
					this._data[attr] = value;
				}
				return this; };
			component.getAttr = function (attr) {
				if(isset(attr)) {
					if(isset(this._data[attr])) {
						return this._data[attr];
					} else { return false; }
				} else { return this._data; }};
			this._components[id] = component;
			return component;
		};
		/*
		*	MANAGE COMPONENTS
		*/
		obj.pushComponent = function (componentId, entityId) {
			var testAssign = this.testAssign(componentId, entityId);
			if(isset(this._components[componentId])
			&& isset(this._entities[entityId])
			&& testAssign < 2) {
				var component = this._components[componentId];
				var entity = this._entities[entityId];
				entity._pushComponent(component);
				if(testAssign < 1) { this._models[componentId] = []; }
				this._models[componentId].push(entityId);
				return this;
			} else { return false; }
		};
		obj.dropComponent = function (componentId, entityId) {
			var testAssign = this.testAssign(componentId, entityId);
			if(isset(this._components[componentId])
			&& isset(this._entities[entityId])
			&& testAssign == 2) {
				var component = this._components[componentId];
				var entity = this._entities[entityId];
				entity._dropComponent(component);
				var modelId = this._models[componentId].indexOf(entityId);
				delete this._models[componentId][modelId];
				if(this._models[componentId].length) {
					delete this._models[componentId]; }
				return this;
			} else { return false; }
		};
		/*
		*	GETTERS
		*/
		obj.getEntity = function (entityId) {
			if(isset(this._entities[entityId])) {
				return this._entities[entityId];
			} else { return false; }};
		obj.getComponent = function (componentId) {
			if(isset(this._components[componentId])) {
				return this._components[componentId];
			} else { return false; }};
		/* REMOVE */
		obj.removeEntity = function (entityId) {
			if(isset(this._entities[entityId])) {
				delete this._entities[entityId];
				return this;
			} else { return false; }};
		obj.removeComponent = function (componentId) {
			if(isset(this._components[componentId])) {
				if(isset(this._models[componentId])) {
					var listEntities = this._models[componentId];
					for(var i=0; i < listEntities.length; i++) {
						this.dropComponent(componentId, listEntities[i]); }}
				delete this._components[componentId];
				return this;
			} else { return false; }};
		/*
		*	LIST
		*/
		obj.listEntity = function () {};
		obj.listComponent = function () {};
		/*
		*	ACTION
		*/
		obj.entegrity = function () {};
		obj.testAssign = function (componentId, entityId) {
			var testComponent = isset(this._models[componentId]);
			if(testComponent) {
				return (this._models[componentId].indexOf(entityId) >= 0 ? 2 : 1);
			} else { return 0; }
		};
		return obj;
	};

	/*
	*	Cookies Manager
	*/
	this.cookie = function (cookieId) {
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
			var expire = (!isset(args.expire) ? year : args.expire);
			var domain = (!isset(args.domain) ? this._domain : args.domain);
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
				if(cookie[0] == this._id) {
					myCook = cookie[1];break;
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
	this.vector2D = function (a, b) {
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

	this.toRadian = function (angle) {
		return (angle-180)/(180/Math.PI); };
	this.toAngle = function (angle) {
		return (angle*(180/Math.PI))+180; };
	this.toCartesien = function (angle) {
		var rad = this.toRadian(angle);
		return [Math.cos(rad), Math.sin(rad)]; };
	this.toPolaire = function (x, y) {
		var x = toAngle(Math.acos(x));
		var y = toAngle(Math.asin(y));
		return (Math.floor(y) >= 180 ? (x%360) : (360-x)); };

	/*
	*	Tools
	*/
	this.randInt = function (a, b) { return Math.floor(Math.random()*(b-a))+a; };

	return this;
})();