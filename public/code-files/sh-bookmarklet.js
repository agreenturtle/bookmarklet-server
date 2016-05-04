"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Controller = function () {
  function Controller() {
    _classCallCheck(this, Controller);

    this.overlay = new Overlay();
    this.mappings = new Mapping();
    this.initialize();
  }

  _createClass(Controller, [{
    key: "initialize",
    value: function initialize() {
      this.keystroke();
      this.button_click();
      this.click_action();
      /*this.mouse_movement();*/
    }
  }, {
    key: "keystroke",
    value: function keystroke() {
      var _this = this;

      window.addEventListener("keydown", function (e) {
        var ENTER_KEY = 13;
        var C_KEY = 67;
        if (e.which == C_KEY) {
          document.querySelector("#sh_overlay").hidden = false;
        } else if (e.which == ENTER_KEY) {
          if (_this.mappings.active_mapping == "Price") {
            _this.mappings.output_price_mapping();
          }
        }
      });
    }
  }, {
    key: "button_click",
    value: function button_click() {
      var _this2 = this;

      var aA = document.querySelectorAll("#sh_overlay > div > div > button");
      for (var i = 0; i < aA.length; i++) {
        aA[i].addEventListener("click", function (e) {
          _this2.overlay.turn_buttons_off();
          e.target.style = _this2.overlay.BUTTON_ON_STYLE;
          _this2.mappings.active_mapping = e.target.id;
          if (_this2.mappings.active_mapping != "Traffic Cop") document.querySelector("#sh_overlay").hidden = true;else _this2.mappings.traffic_cop();
        });
      }
    }
  }, {
    key: "mouse_movement",
    value: function mouse_movement() {
      var _this3 = this;

      window.onmouseover = function (e) {
        if (!_this3.isDescendant(e.target)) {
          e.preventDefault();
          e.stopImmediatePropagation();
          e.target.onmouseenter = function (e) {
            e.target.classList.add("sh_hover_highlight");
          };
          e.target.onmouseout = function (e) {
            if (e.target.classList) e.target.classList.remove("sh_hover_highlight");
          };
        }
      };
    }
  }, {
    key: "click_action",
    value: function click_action() {
      var _this4 = this;

      document.addEventListener("click", function (e) {
        if (!_this4.isDescendant(e.target)) {
          e.preventDefault();
          e.stopImmediatePropagation();
          e.target.classList.add("sh_hover_highlight");

          window.setTimeout(function (e) {
            e.target.classList.remove("sh_hover_highlight");
          }, 5000, e);

          switch (_this4.mappings.active_mapping) {
            case "Name":
              _this4.mappings.product_name(e);
              break;
            case "Price":
              _this4.mappings.product_price(e);
              break;
            case "Image":
              _this4.mappings.product_image(e);
              break;
            case "Sku":
              _this4.mappings.product_sku(e);
              break;
            case "Category":
              _this4.mappings.product_category(e);
              break;
            case "Brand":
              _this4.mappings.product_brand(e);
              break;
            case "Cart Value":
              _this4.mappings.cart_value(e);
              break;
            case "Cart Quantity":
              _this4.mappings.cart_quantity(e);
              break;
            case "Cart Sku":
              _this4.mappings.cart_sku(e);
              break;
            case "Phantom":
              _this4.mappings.phantom_pixel(e);
              break;
          }
        }
      });
    }
  }, {
    key: "isDescendant",
    value: function isDescendant(child) {
      if (child.id != "sh_overlay") {
        var node = child.parentNode;
        while (node != null) {
          if (node.id == "sh_overlay") {
            return true;
          }
          node = node.parentNode;
        }
        return false;
      } else {
        return true;
      }
    }
  }, {
    key: "replaceHTML",
    value: function replaceHTML() {
      //var orig_body=document.querySelector("body"); console.log("Orig_Body.length=",orig_body.length); var temp=orig_body; var aA=[]; for(var i=0;i<orig_body.children.length;i++){aA.push(orig_body.removeChild(orig_body.children[i]))}; console.log("aA: ",aA.length); var clone_body=[]; for(var i=0;i<aA.length;i++){clone_body.push(aA[i].cloneNode(true))} for(var i=0;i<clone_body.length;i++){console.log(i);try{orig_body.appendChild(clone_body[i])}catch(e){console.log(e)}}
    }
  }]);

  return Controller;
}();

var Overlay = function () {
  function Overlay() {
    _classCallCheck(this, Overlay);

    this.buttons = ["Name", "Price", "Image", "Sku", "Category", "Brand", "Cart Value", "Cart Quantity", "Cart Sku", "Phantom", "Traffic Cop"];
    this.active_mapping = 0;
    this.children = [];

    this.BUTTON_DIV_STYLE = "position: absolute; top:20px; left:140px";
    this.BUTTON_OFF_STYLE = "background-color:#EEEEEE!important; border : 2px outset buttonface!important; padding: 2px 6px 3px!important; font-family:Arial, Helvetica Neue, Helvetica, sans-serif;!important; font-size: 15px!important; color: black!important;font-weight: normal!important;text-transform: none!important;letter-spacing: 0px!important; border-radius:0px!important";
    this.BUTTON_ON_STYLE = "background-color:#AAAAAA!important; border: 2px outset buttonface!important; padding: 2px 6px 3px!important; font-family:Arial, Helvetica Neue, Helvetica, sans-serif;!important; font-size: 15px!important; color: black!important;font-weight: normal!important;text-transform: none!important;letter-spacing: 0px!important; border-radius:0px!important";
    this.TEXTBOX_STYLE = "position:absolute; top:65px; left: 140px; height:100px; width:80%; border: 2px solid #b2b1ad; padding:10px; background: rgba(0,0,0,1); font-family:Arial, Helvetica Neue, Helvetica, sans-serif;!important; font-size: 15px!important; color: lime!important;font-weight: normal!important;text-transform: none!important;letter-spacing: 0px!important;";
    this.FRAME_STYLE = "border-top: 1px solid #000000; background-color: rgba(178,35,39,0.9); position: fixed; bottom: 0px; left: 0px; height:200px; width:100%; z-index: 2147483647";
    this.IMAGE_STYLE = "position: absolute; top: 50px; left: 15px; max-height:86px; width:105px; height: auto; width: auto";
    this.IMAGE_DIV_STYLE = "position: absolute; border-right: 1px solid #000000; top: 0px; left: 0px; height: 200px; width: 102px; background-color: rgba(238, 238, 238, 1.0)";
    this.create_overlay();
  }

  _createClass(Overlay, [{
    key: "create_overlay",
    value: function create_overlay() {
      var frame = document.createElement("div");
      frame.style = this.FRAME_STYLE;
      frame.id = "sh_overlay";

      var container = document.createElement("div");
      container.className = "sh_container";

      var br = document.createElement("br");
      container.appendChild(br);

      var image_div = document.createElement("div");
      image_div.style = this.IMAGE_DIV_STYLE;
      container.appendChild(image_div);

      var image = document.createElement("img");
      image.src = "http://ui.steelhouse.com/images/steelhouse-logo.png";
      image.style = this.IMAGE_STYLE;
      container.appendChild(image);

      var div = document.createElement("div");
      div.style = this.BUTTON_DIV_STYLE;
      container.appendChild(div);

      for (var i = 0; i < this.buttons.length; i++) {
        this.create_multiple_buttons(this.buttons[i]);
      }

      this.append_multiple_buttons(div, this.children);

      var textbox = document.createElement("textarea");
      textbox.style = this.TEXTBOX_STYLE;
      textbox.setAttribute("readonly", true);
      textbox.id = "bookmarklet_output";
      container.appendChild(textbox);

      var style = document.createElement("style");
      style.textContent = ".sh_hover_highlight{background-color: #bcd5eb !important;outline: 2px solid #5166bb !important;}";
      document.querySelector("body").appendChild(style);

      frame.appendChild(container);
      document.querySelector("body").appendChild(frame);
    }
  }, {
    key: "create_multiple_buttons",
    value: function create_multiple_buttons(text) {
      var btn = document.createElement("button");
      btn.href = "#";
      btn.textContent = text;
      btn.id = text;
      if (text == this.buttons[0]) btn.style = this.BUTTON_ON_STYLE;else btn.style = this.BUTTON_OFF_STYLE;
      this.children.push(btn);
    }
  }, {
    key: "append_multiple_buttons",
    value: function append_multiple_buttons(p, c) {
      for (var i = 0; i < c.length; i++) {
        p.appendChild(c[i]);
      }
    }
  }, {
    key: "turn_buttons_off",
    value: function turn_buttons_off() {
      var aA = document.querySelectorAll("#sh_overlay > div > div > button");
      for (var i = 0; i < aA.length; i++) {
        aA[i].style = this.BUTTON_OFF_STYLE;
      }
    }
  }]);

  return Overlay;
}();

var Mapping = function () {
  function Mapping() {
    _classCallCheck(this, Mapping);

    this.price_selectors = [];
    this.active_mapping = 0;
  }

  _createClass(Mapping, [{
    key: "css_path",
    value: function css_path(el, filter) {
      var path = [];
      while (el.nodeType === Node.ELEMENT_NODE) {
        var selector = el.nodeName.toLowerCase();
        if (el.id && !/[0-9]+/.exec(el.id)) {
          selector += "#" + el.id;
          path.unshift(selector);
          break;
        } else {
          var sib = el,
              nth = 1;
          while (sib = sib.previousElementSibling) {
            if (sib.nodeName.toLowerCase() == selector) nth++;
          }
          if (nth != 1) selector += ":nth-of-type(" + nth + ")";
        }
        path.unshift(selector);
        el = el.parentNode;
      }
      if (filter) {
        path = this.filter_path_for_category(path);
      }
      return path.join(" > ");
    }
  }, {
    key: "filter_path_for_category",
    value: function filter_path_for_category(path) {
      var index = -1;
      for (var i = 0; i < path.length; i++) {
        if (path[i].indexOf("tr") > -1) index = i;
      }
      if (index != -1) {
        path[index] = path[index].split(":")[0];
      } else {
        index = -1;
        for (var _i = 0; _i < path.length; _i++) {
          if (path[_i].indexOf("li") > -1) index = _i;
        }
        if (index != -1) {
          path[index] = path[index].split(":")[0];
        } else {
          path[path.length - 1] = path[path.length - 1].split(":")[0];
        }
      }
      return path;
    }
  }, {
    key: "output",
    value: function output(m, e) {
      document.querySelector("#sh_overlay").hidden = false;
      var output_el = document.querySelector("#bookmarklet_output");
      var output = "";
      var mapping_output = void 0;
      try {
        mapping_output = eval(m);
      } catch (e) {
        mapping_output = "Error: Invalid Mapping";
      };
      output_el.innerHTML = "* Mapping output: >>" + mapping_output + "<<\n\n* Mappping code: \n" + m;
    }
  }, {
    key: "product_name",
    value: function product_name(e) {
      var mapping = 'var name=document.querySelector("' + this.css_path(e.target) + '").textContent.replace("#","No.").trim(); name;';
      this.output(mapping, e);
    }
  }, {
    key: "product_price",
    value: function product_price(e) {
      e.target.classList.add("shMouseOn");
      this.price_selectors.push(this.css_path(e.target).toString());
    }
  }, {
    key: "output_price_mapping",
    value: function output_price_mapping() {
      var selectors = "";
      for (var i = 0; i < this.price_selectors.length; i++) {
        selectors += ',"' + this.price_selectors[i] + '"';
      }
      selectors = selectors.substring(1, selectors.length);
      var mapping = 'var price=null; var selectors=[' + selectors + ']; for(var i=0;i<selectors.length;i++){if(document.querySelector(selectors[i])){var cprice=/[0-9.,]+/.exec(document.querySelector(selectors[i]).textContent)[0].replace(/[,]/g,""); if(!price || parseFloat(price) > parseFloat(cprice)){price=cprice}}} price;';
      this.output(mapping);
      this.price_selectors = [];
    }
  }, {
    key: "product_image",
    value: function product_image(e) {
      var mapping = "";
      if (e.target.tagName == "IMG") {
        mapping = 'var img=document.querySelector("' + this.css_path(e.target) + '").src; img;';
      } else if (e.target.tagName == "DIV" && e.target.style["background-image"]) {
        mapping = 'var img=document.querySelector("' + this.css_path(e.target) + '").style["background-image"].split("(")[1].split(")")[0]; img=img.substring(1,img.length-1); img;';
      } else if (e.target.tagName == "DIV" && e.target.style["backgroundImage"]) {
        mapping = 'var img=document.querySelector("' + this.css_path(e.target) + '").style["backgroundImage"].split("(")[1].split(")")[0]; img=img.substring(1,img.length-1); img;';
      } else {
        mapping = this.search_for_image_element(e);
        if (!mapping) {
          mapping = 'Error: unable to do mapping';
        }
      }

      this.output(mapping, e);
    }
  }, {
    key: "search_for_image_element",
    value: function search_for_image_element(e) {
      var parent = e.target.parentNode;
      var siblings = parent.children;
      var mapping = void 0;
      for (var i = 0; i < siblings.length; i++) {
        if (siblings[i].tagName == "IMG") {
          mapping = 'var img=document.querySelector("' + this.css_path(siblings[i]) + '").src; img;';
          break;
        } else if (e.target.tagName == "DIV" && e.target.style["background-image"]) {
          mapping = 'var img=document.querySelector("' + this.css_path(e.target) + '").style["background-image"].split("(")[1].split(")")[0]; img=img.substring(1,img.length-1); img;';
          break;
        } else if (e.target.tagName == "DIV" && e.target.style["backgroundImage"]) {
          mapping = 'var img=document.querySelector("' + this.css_path(e.target) + '").style["backgroundImage"].split("(")[1].split(")")[0]; img=img.substring(1,img.length-1); img;';
          break;
        }
      }
      return mapping;
    }
  }, {
    key: "product_sku",
    value: function product_sku(e) {
      var mapping = 'var sku=document.querySelector("' + this.css_path(e.target) + '").textContent.replace("#",""); var sku_filter=["Sku","SKU","Model#","Model #","Model","Item #","Item#","Item No.","Item No","Item","Style #","Style No.","Style No","Style"]; for(var i=0;i<sku_filter.length;i++){sku=sku.replace(sku_filter[i],"").trim()} if(sku.indexOf(":")>-1){sku=sku.split(":")[1]} sku;';
      this.output(mapping, e);
    }
  }, {
    key: "product_category",
    value: function product_category(e) {
      var mapping = 'var cat=""; var aA=document.querySelectorAll("' + this.css_path(e.target, true) + '"); for(var i=0;i<aA.length;i++){cat+=","+aA[i].textContent.trim();} cat.substring(1,cat.length);';
      this.output(mapping, e);
    }
  }, {
    key: "product_brand",
    value: function product_brand(e) {
      var mapping = 'var brand=document.querySelector("' + this.css_path(e.target) + '").textContent.replace("#","No.").trim(); brand;';
      this.output(mapping, e);
    }
  }, {
    key: "cart_value",
    value: function cart_value(e) {
      var mapping = 'var c_amt=/[0-9.,]+/.exec(document.querySelector("' + this.css_path(e.target) + '").textContent)[0]; c_amt;';
      this.output(mapping, e);
    }
  }, {
    key: "cart_quantity",
    value: function cart_quantity(e) {
      var mapping = 'var c_quan=/[0-9.,]+/.exec(document.querySelector("' + this.css_path(e.target) + '").textContent)[0]; c_quan;';
      this.output(mapping, e);
    }
  }, {
    key: "cart_sku",
    value: function cart_sku(e) {
      var mapping = 'var c_sku=""; var aA=document.querySelectorAll("' + this.css_path(e.target, true) + '"); for(var i=0;i<aA.length;i++){c_sku+=","+aA[i].textContent.replace(":","").trim();} c_sku=c_sku.substring(1,c_sku.length); var sku_filter=["Sku","SKU","Model#","Model #","Model","Item #","Item#","Item No.","Item No","Item","Style #","Style No.","Style No","Style"]; for(var i=0;i<sku_filter.length;i++){var find=sku_filter[i]+" "; var regex=new RegExp(find,"g");c_sku=c_sku.replace(regex,""); find=sku_filter[i]; regex=new RegExp(find,"g"); c_sku=c_sku.replace(regex,"").trim()} c_sku;';
      this.output(mapping, e);
    }
  }, {
    key: "phantom_pixel",
    value: function phantom_pixel(e) {
      var mapping = 'function sh_tpx(aid){(function(){"use strict";var e=null,b="4.0.0",n=aid,additional="",t,r,i;try{t=top.document.referer!==""?encodeURIComponent(top.document.referrer.substring(0,2048)):""}catch(o){t=document.referrer!==null?document.referrer.toString().substring(0,2048):""}try{r=window&&window.top&&document.location&&window.top.location===document.location?document.location:window&&window.top&&window.top.location&&""!==window.top.location?window.top.location:document.location}catch(u){r=document.location}try{i=parent.location.href!==""?encodeURIComponent(parent.location.href.toString().substring(0,2048)):""}catch(a){try{i=r!==null?encodeURIComponent(r.toString().substring(0,2048)):""}catch(f){i=""}}var l,c=document.createElement("script"),h=null,p=document.getElementsByTagName("script"),d=Number(p.length)-1,v=document.getElementsByTagName("script")[d];if(typeof l==="undefined"){l=Math.floor(Math.random()*1e17)}h="dx.steelhousemedia.com/spx?"+"dxver="+b+"&shaid="+n+"&tdr="+t+"&plh="+i+"&cb="+l+additional;c.type="text/javascript";c.src=("https:"===document.location.protocol?"https://":"http://")+h;v.parentNode.insertBefore(c,v)})()}; document.querySelector("' + this.css_path(e.target) + '").addEventListener("click", function(){sh_tpx("AID")}); var blank=null; blank;';
      this.output(mapping);
    }
  }, {
    key: "traffic_cop",
    value: function traffic_cop() {
      var mapping = 'function sh_tpx(aid){(function(){"use strict";var e=null,b="4.0.0",n=aid,additional="",t,r,i;try{t=top.document.referer!==""?encodeURIComponent(top.document.referrer.substring(0,2048)):""}catch(o){t=document.referrer!==null?document.referrer.toString().substring(0,2048):""}try{r=window&&window.top&&document.location&&window.top.location===document.location?document.location:window&&window.top&&window.top.location&&""!==window.top.location?window.top.location:document.location}catch(u){r=document.location}try{i=parent.location.href!==""?encodeURIComponent(parent.location.href.toString().substring(0,2048)):""}catch(a){try{i=r!==null?encodeURIComponent(r.toString().substring(0,2048)):""}catch(f){i=""}}var l,c=document.createElement("script"),h=null,p=document.getElementsByTagName("script"),d=Number(p.length)-1,v=document.getElementsByTagName("script")[d];if(typeof l==="undefined"){l=Math.floor(Math.random()*1e17)}h="dx.steelhousemedia.com/spx?"+"dxver="+b+"&shaid="+n+"&tdr="+t+"&plh="+i+"&cb="+l+additional;c.type="text/javascript";c.src=("https:"===document.location.protocol?"https://":"http://")+h;v.parentNode.insertBefore(c,v)})()}; function sh_cpx(aid){(function(){var x=null,p,q,m,o=aid,l="",i="",c="",k="",g="",j="",u="",shadditional="";try{p=top.document.referer!==""?encodeURIComponent(top.document.referrer.substring(0,512)):""}catch(n){p=document.referrer!==null?document.referrer.toString().substring(0,512):""}try{q=window&&window.top&&document.location&&window.top.location===document.location?document.location:window&&window.top&&window.top.location&&""!==window.top.location?window.top.location:document.location}catch(b){q=document.location}try{m=parent.location.href!==""?encodeURIComponent(parent.location.href.toString().substring(0,512)):""}catch(z){try{m=q!==null?encodeURIComponent(q.toString().substring(0,512)):""}catch(h){m=""}}var A,y=document.createElement("script"),w=null,v=document.getElementsByTagName("script"),t=Number(v.length)-1,r=document.getElementsByTagName("script")[t];if(typeof A==="undefined"){A=Math.floor(Math.random()*100000000000000000)}w="dx.steelhousemedia.com/spx?conv=1&shaid="+o+"&tdr="+p+"&plh="+m+"&cb="+A+"&shoid="+l+"&shoamt="+i+"&shocur="+c+"&shopid="+k+"&shoq="+g+"&shoup="+j+"&shpil="+u+shadditional;y.type="text/javascript";y.src=("https:"===document.location.protocol?"https://":"http://")+w;r.parentNode.insertBefore(y,r)}());} sh_tpx("AID"); sh_tpx("AID2"); if(window.location.href.indexOf("URL")>-1){sh_cpx("AID")} var blank=null; blank;';
      this.output(mapping);
    }
  }]);

  return Mapping;
}();

if (!window.sh_bookmarklet) {
  window.sh_bookmarklet = 1;
  var sh_overlay = new Controller();
}