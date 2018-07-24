/*
* Over Style JS - Nick Freese, Copyright 2018
* 
* Basic stylesheet generation and manipulation.
*
*/

var overStyle =  {

	    create: function(object, name){
   
	    	var _this = this;
	    	_this.applyPolyfill();


            if(!_this.styleSheetExists(name)){

	            var style = document.createElement("style");
                style.type = 'text/css';
                style.title = name;
                style.setAttribute('data-styler-id', name);
                style.innerText = _this.processStyleJSON(object);
 
                document.body.appendChild(style);
                var sheet = style.sheet;

            } else {
            	console.warn('Stylesheet already exists.');
            }

	    },

	    processStyleJSON: function(obj, sheet){

	    	var _this = this;
            var cssString = "";
	    	for(var key in obj){
                
                cssString += key + " {";
                for(var rule in obj[key]){
                    if(typeof obj[key][rule] == "string"){
                        cssString += rule + ": " + obj[key][rule] + ";";
                    } else {
                        cssString += _this.processStyleJSON(obj[key]);
                    }
                    
                } 
                cssString += "}";
                
	    	}

	    	return cssString;

	    },

	    getStyleSheetByName: function(name){
	    	var _this = this;
	    	if(document.styleSheets.length > 0){
                for(var  i = 0; i < document.styleSheets.length; i++){
                    if(document.styleSheets[i].title == name){
                        return document.styleSheets[i];
                    }
	    	    }
	    	    return false;
	    	} else {
	    		return false;
	    	}
	    	
	    },

	    getStyleElementByName: function(name){
            var _this = this;
            var sheet = document.querySelectorAll("[data-styler-id="+name+"]");
            if(sheet.length > 0){
                return sheet[0];
            } else {
            	return false;
            }
	    },

	    styleSheetExists: function(name){
	    	var _this = this;
            var sheet = _this.getStyleSheetByName(name);
            if(sheet === false){
                return false;
            } else {
            	return true;
            }
	    },


	    clearStyleSheet: function(name){
            var _this = this;
            if(_this.styleSheetExists(name)){
                var sheet = _this.getStyleSheetByName(name);
                var rules = sheet.cssRules;
                for(var i = rules.length-1; i >= 0; i--){
                    sheet.deleteRule (i);
                }
             
                var styleElem = _this.getStyleElementByName(name);
                styleElem.parentNode.removeChild(styleElem);

                return true;

            } else {
            	return false;
            }

	    },


	    overwrite: function(object, name){
            var _this = this;
            _this.clearStyleSheet(name);
            _this.create(object, name);
            return true;
	    },



	    /*
	    * utils
	    */

        polyfill: false,
	    applyPolyfill: function(){
	    	var _this = this;
	    	if(_this.polyfill === false){
                if (!CSSStyleSheet.prototype.deleteRule) CSSStyleSheet.prototype.deleteRule = CSSStyleSheet.prototype.removeRule;
                _this.polyfill = true;
	    	}
	    },

}



