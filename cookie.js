var cookie = (function(cookie) {
	var self = cookie;

	self.get = function(name) {
		var matches = document.cookie.match(new RegExp(
		  "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
		));
		return matches ? decodeURIComponent(matches[1]) : false;
	};

	// props - объект с свойствами cookie (expires, path, domain, secure)
	self.set = function(name, value, props) {
		props = props || {};
		var exp = props.expires || 30; // by default 30 days
		if (typeof exp == "number" && exp) {
			var d = new Date();
			d.setTime(d.getTime() + exp * 60 *1000); // в минутах
			exp = props.expires = d;
		}
		if (exp && exp.toUTCString) { props.expires = exp.toUTCString(); }
		if (!props.domain) props.domain = "." + document.location.hostname;
		if (!props.path) props.path = "/";

		value = encodeURIComponent(value);
		var updatedCookie = name + "=" + value;
		for(var propName in props){
			updatedCookie += "; " + propName;
			var propValue = props[propName];
			if(propValue !== true){ updatedCookie += "=" + propValue; }
		}
		document.cookie = updatedCookie;
		return true;
	};

	self.delete = function(name) {
	  self.set(name, "", { expires: -1, path: "/", domain: "." + document.location.hostname });
	};


	return self;

}(cookie || {}));
