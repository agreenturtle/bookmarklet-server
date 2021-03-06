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
          document.querySelector("#wsb_overlay").hidden = false;
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

      var aA = document.querySelectorAll("#wsb_overlay > div > div > button");
      for (var i = 0; i < aA.length; i++) {
        aA[i].addEventListener("click", function (e) {
          _this2.overlay.turn_buttons_off();
          e.target.className = "wsb-btn-on";
          _this2.mappings.active_mapping = e.target.id;
          if (_this2.mappings.active_mapping != "Traffic Cop") document.querySelector("#wsb_overlay").hidden = true;else _this2.mappings.traffic_cop();
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
            e.target.classList.add("wsb_hover_highlight");
          };
          e.target.onmouseout = function (e) {
            if (e.target.classList) e.target.classList.remove("wsb_hover_highlight");
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
          e.target.classList.add("wsb_hover_highlight");

          window.setTimeout(function (e) {
            e.target.classList.remove("wsb_hover_highlight");
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
          }
        }
      });
    }
  }, {
    key: "isDescendant",
    value: function isDescendant(child) {
      if (child.id != "wsb_overlay") {
        var node = child.parentNode;
        while (node != null) {
          if (node.id == "wsb_overlay") {
            return true;
          }
          node = node.parentNode;
        }
        return false;
      } else {
        return true;
      }
    }
  }]);

  return Controller;
}();

var Overlay = function () {
  function Overlay() {
    _classCallCheck(this, Overlay);

    this.buttons = ["Name", "Price", "Image", "Sku", "Category", "Brand", "Cart Value", "Cart Quantity", "Cart Sku"];
    this.active_mapping = 0;
    this.children = [];
    this.style_obj = {
      ".wsb-btn-div": "position: absolute; top:20px; left:140px",
      ".wsb-btn-off": "background-color:#EEEEEE!important; border : 2px outset buttonface!important; padding: 2px 6px 3px!important; font-family:Arial, Helvetica Neue, Helvetica, sans-serif;!important; font-size: 15px!important; color: black!important;font-weight: normal!important;text-transform: none!important;letter-spacing: 0px!important; border-radius:0px!important",
      ".wsb-btn-on": "background-color:#AAAAAA!important; border: 2px outset buttonface!important; padding: 2px 6px 3px!important; font-family:Arial, Helvetica Neue, Helvetica, sans-serif;!important; font-size: 15px!important; color: black!important;font-weight: normal!important;text-transform: none!important;letter-spacing: 0px!important; border-radius:0px!important",
      ".wsb-textbox": "position:absolute; top:65px; left: 140px; height:100px; width:80%; border: 2px solid #b2b1ad; padding:10px; background: rgba(0,0,0,1); font-family:Arial, Helvetica Neue, Helvetica, sans-serif;!important; font-size: 15px!important; color: lime!important;font-weight: normal!important;text-transform: none!important;letter-spacing: 0px!important;",
      ".wsb-frame": "border-top: 1px solid #000000; background-color: rgba(0,100,0,0.9); position: fixed; bottom: 0px; left: 0px; height:200px; width:100%; z-index: 2147483647",
      ".wsb-img": "position: absolute; top: 50px; left: 12px; max-height:86px; width:105px; height: auto; width: auto",
      ".wsb-img-div": "position: absolute; border-right: 1px solid #000000; top: 0px; left: 0px; height: 200px; width: 102px; background-color: rgba(238, 238, 238, 1.0)",
      ".wsb_hover_highlight": "background-color: #bcd5eb !important;outline: 2px solid #5166bb !important;"
    };
    this.create_overlay();
  }

  _createClass(Overlay, [{
    key: "create_overlay",
    value: function create_overlay() {
      var style = document.createElement("style");
      style.textContent = this.create_css();
      document.querySelector("body").appendChild(style);

      var frame = document.createElement("div");
      frame.className = "wsb-frame";
      frame.id = "wsb_overlay";

      var container = document.createElement("div");
      container.className = "wsb_overlay";

      var br = document.createElement("br");
      container.appendChild(br);

      var image_div = document.createElement("div");
      image_div.className = "wsb-img-div";
      container.appendChild(image_div);

      var image = document.createElement("img");
      image.src = "http://vignette1.wikia.nocookie.net/farmville/images/d/df/Baby_Turtle-icon.png/revision/latest";
      image.className = "wsb-img";
      container.appendChild(image);

      var div = document.createElement("div");
      div.className = "wsb-btn-div";
      container.appendChild(div);

      for (var i = 0; i < this.buttons.length; i++) {
        this.create_multiple_buttons(this.buttons[i]);
      }

      this.append_multiple_buttons(div, this.children);

      var textbox = document.createElement("textarea");
      textbox.className = "wsb-textbox";
      textbox.setAttribute("readonly", true);
      textbox.id = "bookmarklet_output";
      container.appendChild(textbox);

      frame.appendChild(container);
      document.querySelector("body").appendChild(frame);
    }
  }, {
    key: "create_css",
    value: function create_css() {
      var _this5 = this;

      var css_code = "";
      Object.keys(this.style_obj).forEach(function (key) {
        css_code += key + "{" + _this5.style_obj[key] + "} ";
      });
      return css_code;
    }
  }, {
    key: "create_multiple_buttons",
    value: function create_multiple_buttons(text) {
      var btn = document.createElement("button");
      btn.href = "#";
      btn.textContent = text;
      btn.id = text;
      if (text == this.buttons[0]) btn.className = "wsb-btn-on";else btn.className = "wsb-btn-off";
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
      var aA = document.querySelectorAll("#wsb_overlay > div > div > button");
      for (var i = 0; i < aA.length; i++) {
        aA[i].className = "wsb-btn-off";
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
      document.querySelector("#wsb_overlay").hidden = false;
      var output_el = document.querySelector("#bookmarklet_output");
      var output = "";
      var mapping_output = void 0;
      try {
        mapping_output = eval(m);
      } catch (e) {
        mapping_output = "Error: Invalid Mapping";
      };
      output_el.innerHTML = "* Mapping output: >>" + mapping_output + "<<* Mappping code: " + m;
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
      e.target.classList.add("wsbMouseOn");
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
          mapping = 'Error: Unable to calculate mapping';
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
  }]);

  return Mapping;
}();

if (!window.wsb_bookmarklet) {
  window.wsb_bookmarklet = 1;
  var wsb_overlay = new Controller();
}