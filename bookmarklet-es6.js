class Controller{
  constructor(){
    this.overlay = new Overlay();
    this.mappings = new Mapping();
    this.initialize();
  }

  initialize(){
    this.keystroke();
    this.button_click();
    this.click_action();
    /*this.mouse_movement();*/
  }

  keystroke(){
    window.addEventListener("keydown", (e) => {
      let ENTER_KEY = 13;
      let C_KEY = 67;
      if(e.which == C_KEY){
        document.querySelector("#wsb_overlay").hidden=false;
      }
      else if(e.which == ENTER_KEY){
        if(this.mappings.active_mapping == "Price"){
          this.mappings.output_price_mapping();
        }
      }
    });
  }

  button_click(){
    let aA = document.querySelectorAll("#wsb_overlay > div > div > button");
    for(let i=0;i < aA.length; i++){
      aA[i].addEventListener("click", (e) => {
        this.overlay.turn_buttons_off();
        e.target.style = this.overlay.BUTTON_ON_STYLE;
        this.mappings.active_mapping = e.target.id;
        if(this.mappings.active_mapping != "Traffic Cop")
          document.querySelector("#wsb_overlay").hidden=true;
        else
          this.mappings.traffic_cop();
      });
    }
  }

  mouse_movement(){
    window.onmouseover = (e) => {
      if(!this.isDescendant(e.target)){
        e.preventDefault();
        e.stopImmediatePropagation();
        e.target.onmouseenter = (e) => {
          e.target.classList.add("wsb_hover_highlight");
        }
        e.target.onmouseout = (e) => {
          if(e.target.classList)
            e.target.classList.remove("wsb_hover_highlight");
        }
      }
    }
  }

  click_action(){
    document.addEventListener("click",(e) => {
      if(!this.isDescendant(e.target)){
        e.preventDefault();
        e.stopImmediatePropagation();
        e.target.classList.add("wsb_hover_highlight");

        window.setTimeout( (e)=>{
          e.target.classList.remove("wsb_hover_highlight");
        }, 5000, e);

        switch (this.mappings.active_mapping){
          case "Name":
            this.mappings.product_name(e);
            break;
          case "Price":
            this.mappings.product_price(e);
            break;
          case "Image":
            this.mappings.product_image(e);
            break;
          case "Sku":
            this.mappings.product_sku(e);
            break;
          case "Category":
            this.mappings.product_category(e);
            break;
          case "Brand":
            this.mappings.product_brand(e);
            break;
          case "Cart Value":
            this.mappings.cart_value(e);
            break;
          case "Cart Quantity":
            this.mappings.cart_quantity(e);
            break;
          case "Cart Sku":
            this.mappings.cart_sku(e);
            break;
        }
      }
    });
  }

  isDescendant(child) {
    if(child.id != "wsb_overlay"){
      let node = child.parentNode;
      while (node != null) {
        if (node.id == "wsb_overlay") {
          return true;
        }
        node = node.parentNode;
      }
      return false;
    }
    else{
      return true;
    }
  }
}

class Overlay {
  constructor(){
    this.buttons = ["Name", "Price", "Image", "Sku", "Category", "Brand", "Cart Value", "Cart Quantity", "Cart Sku"];
    this.active_mapping = 0;
    this.children = [];
    this.style_obj = {
      ".wsb-btn-div":"position: absolute; top:20px; left:140px",
      ".wsb-btn-off":"background-color:#EEEEEE!important; border : 2px outset buttonface!important; padding: 2px 6px 3px!important; font-family:Arial, Helvetica Neue, Helvetica, sans-serif;!important; font-size: 15px!important; color: black!important;font-weight: normal!important;text-transform: none!important;letter-spacing: 0px!important; border-radius:0px!important",
      ".wsb-btn-on":"background-color:#AAAAAA!important; border: 2px outset buttonface!important; padding: 2px 6px 3px!important; font-family:Arial, Helvetica Neue, Helvetica, sans-serif;!important; font-size: 15px!important; color: black!important;font-weight: normal!important;text-transform: none!important;letter-spacing: 0px!important; border-radius:0px!important",
      ".wsb-textbox":"position:absolute; top:65px; left: 140px; height:100px; width:80%; border: 2px solid #b2b1ad; padding:10px; background: rgba(0,0,0,1); font-family:Arial, Helvetica Neue, Helvetica, sans-serif;!important; font-size: 15px!important; color: lime!important;font-weight: normal!important;text-transform: none!important;letter-spacing: 0px!important;",
      ".wsb-frame":"border-top: 1px solid #000000; background-color: rgba(178,35,39,0.9); position: fixed; bottom: 0px; left: 0px; height:200px; width:100%; z-index: 2147483647",
      ".wsb-img":"position: absolute; top: 50px; left: 12px; max-height:86px; width:105px; height: auto; width: auto",
      ".wsb-img-div":"position: absolute; border-right: 1px solid #000000; top: 0px; left: 0px; height: 200px; width: 102px; background-color: rgba(238, 238, 238, 1.0)",
      ".wsb_hover_highlight":"background-color: #bcd5eb !important;outline: 2px solid #5166bb !important;"
    }
    this.create_overlay()
  }

  create_overlay(){
    let style = document.createElement("style");
    style.textContent = this.create_css();
    document.querySelector("body").appendChild(style);

    let frame = document.createElement("div");
    frame.className = "wsb-frame";
    frame.id = "wsb_overlay";

    let container = document.createElement("div");
    container.className = "wsb_overlay"

    let br = document.createElement("br");
    container.appendChild(br);

    let image_div = document.createElement("div");
    image_div.className = "wsb-img-div";
    container.appendChild(image_div);

    let image = document.createElement("img");
    image.src = "http://vignette1.wikia.nocookie.net/b__/images/4/4d/Tribal_Turtle_Icon.png/revision/latest?cb=20130119070150&path-prefix=bloons";
    image.className = "wsb-img";
    container.appendChild(image);

    let div = document.createElement("div");
    div.className = "wsb-btn-div";
    container.appendChild(div);

    for(let i=0;i < this.buttons.length; i++){
      this.create_multiple_buttons(this.buttons[i]);
    }

    this.append_multiple_buttons(div, this.children);

    let textbox = document.createElement("textarea");
    textbox.className = "wsb-textbox";
    textbox.setAttribute("readonly",true);
    textbox.id = "bookmarklet_output";
    container.appendChild(textbox);

    frame.appendChild(container);
    document.querySelector("body").appendChild(frame);
  }

  create_css() {
    let css_code = "";
    Object.keys(this.style_obj).forEach((key)=>{
      css_code += key + "{" + this.style_obj[key] + "} ";
    });
    return css_code;
  }

  create_multiple_buttons(text){
      let btn = document.createElement("button");
      btn.href="#";
      btn.textContent = text;
      btn.id = text;
      if(text == this.buttons[0])
        btn.className = "wsb-btn-on";
      else
        btn.className = "wsb-btn-off";
      this.children.push(btn);
    }

    append_multiple_buttons(p, c){
      for(let i=0; i < c.length; i++){
        p.appendChild(c[i]);
      }
    }

    turn_buttons_off(){
      let aA = document.querySelectorAll("#wsb_overlay > div > div > button");
      for(let i=0; i < aA.length; i++){
        aA[i].className = "wsb-btn-off";
      }
    }
}

class Mapping{
  constructor(){
    this.price_selectors = [];
    this.active_mapping = 0;
  }

  css_path(el, filter){
    let path = [];
    while (el.nodeType === Node.ELEMENT_NODE) {
      let selector = el.nodeName.toLowerCase();
      if (el.id && !/[0-9]+/.exec(el.id)) {
        selector += "#" + el.id;
        path.unshift(selector);
        break;
      } else {
        let sib = el, nth = 1;
        while (sib = sib.previousElementSibling) {
          if (sib.nodeName.toLowerCase() == selector)
            nth++;
        }
        if (nth != 1)
          selector += ":nth-of-type("+nth+")";
      }
      path.unshift(selector);
      el = el.parentNode;
    }
    if(filter){
      path = this.filter_path_for_category(path);
    }
    return path.join(" > ");
  }

  filter_path_for_category(path){
    let index=-1;
    for(let i=0;i<path.length;i++){
      if(path[i].indexOf("tr")>-1)
        index=i;
    }
    if(index != -1){
      path[index] = path[index].split(":")[0];
    }
    else{
      index = -1;
      for(let i=0;i<path.length;i++){
        if(path[i].indexOf("li")>-1)
          index=i;
      }
      if(index != -1){
        path[index] = path[index].split(":")[0];
      }
      else{
        path[path.length-1] = path[path.length-1].split(":")[0];
      }
    }
    return path;
  }

  output(m, e){
    document.querySelector("#wsb_overlay").hidden=false;
    let output_el = document.querySelector("#bookmarklet_output");
    let output = "";
    let mapping_output;
    try{mapping_output = eval(m)}catch(e){mapping_output = "Error: Invalid Mapping"};
    output_el.innerHTML = "* Mapping output: >>" + mapping_output + "<<\n\n* Mappping code: \n" + m;
  }

  product_name(e){
    let mapping = 'var name=document.querySelector("'+ this.css_path(e.target) + '").textContent.replace("#","No.").trim(); name;';
    this.output(mapping, e);
  }

  product_price(e){
    e.target.classList.add("wsbMouseOn");
    this.price_selectors.push(this.css_path(e.target).toString());
  }

  output_price_mapping(){
    let selectors = "";
    for(let i = 0; i < this.price_selectors.length; i++){
      selectors += ',"' + this.price_selectors[i] + '"';
    }
    selectors = selectors.substring(1, selectors.length);
    let mapping = 'var price=null; var selectors=[' + selectors + ']; for(var i=0;i<selectors.length;i++){if(document.querySelector(selectors[i])){var cprice=/[0-9.,]+/.exec(document.querySelector(selectors[i]).textContent)[0].replace(/[,]/g,""); if(!price || parseFloat(price) > parseFloat(cprice)){price=cprice}}} price;';
    this.output(mapping);
    this.price_selectors=[];
  }

  product_image(e){
    let mapping="";
    if(e.target.tagName=="IMG"){
      mapping = 'var img=document.querySelector("' + this.css_path(e.target) + '").src; img;';
    }
    else if(e.target.tagName == "DIV" && e.target.style["background-image"]){
      mapping = 'var img=document.querySelector("' + this.css_path(e.target) + '").style["background-image"].split("(")[1].split(")")[0]; img=img.substring(1,img.length-1); img;';
    }
    else if(e.target.tagName == "DIV" && e.target.style["backgroundImage"]){
      mapping = 'var img=document.querySelector("' + this.css_path(e.target) + '").style["backgroundImage"].split("(")[1].split(")")[0]; img=img.substring(1,img.length-1); img;';
    }
    else{
      mapping = this.search_for_image_element(e);
      if(!mapping){
        mapping = 'var img2=document.querySelector("' + this.css_path(e.target) + '").src; img2;';
      }
    }

    this.output(mapping, e);
  }

  search_for_image_element(e){
    var parent = e.target.parentNode;
    var siblings = parent.children;
    let mapping;
    for(var i=0; i<siblings.length; i++){
      if(siblings[i].tagName=="IMG"){
        mapping = 'var img=document.querySelector("' + this.css_path(siblings[i]) + '").src; img;';
        break;
      }
      else if(e.target.tagName == "DIV" && e.target.style["background-image"]){
        mapping = 'var img=document.querySelector("' + this.css_path(e.target) + '").style["background-image"].split("(")[1].split(")")[0]; img=img.substring(1,img.length-1); img;';
        break;
      }
      else if(e.target.tagName == "DIV" && e.target.style["backgroundImage"]){
        mapping = 'var img=document.querySelector("' + this.css_path(e.target) + '").style["backgroundImage"].split("(")[1].split(")")[0]; img=img.substring(1,img.length-1); img;';
        break;
      }
    }
    return mapping;
  }

  product_sku(e){
    let mapping = 'var sku=document.querySelector("'+ this.css_path(e.target) + '").textContent.replace("#",""); var sku_filter=["Sku","SKU","Model#","Model #","Model","Item #","Item#","Item No.","Item No","Item","Style #","Style No.","Style No","Style"]; for(var i=0;i<sku_filter.length;i++){sku=sku.replace(sku_filter[i],"").trim()} if(sku.indexOf(":")>-1){sku=sku.split(":")[1]} sku;';
    this.output(mapping, e);
  }

  product_category(e){
    let mapping = 'var cat=""; var aA=document.querySelectorAll("' +  this.css_path(e.target,true) + '"); for(var i=0;i<aA.length;i++){cat+=","+aA[i].textContent.trim();} cat.substring(1,cat.length);';
    this.output(mapping, e);
  }

  product_brand(e){
    let mapping = 'var brand=document.querySelector("'+ this.css_path(e.target) + '").textContent.replace("#","No.").trim(); brand;';
    this.output(mapping, e);
  }

  cart_value(e){
    let mapping = 'var c_amt=/[0-9.,]+/.exec(document.querySelector("'+ this.css_path(e.target) + '").textContent)[0]; c_amt;';
    this.output(mapping, e);
  }

  cart_quantity(e){
   let mapping = 'var c_quan=/[0-9.,]+/.exec(document.querySelector("'+ this.css_path(e.target) + '").textContent)[0]; c_quan;';
    this.output(mapping, e);
  }

  cart_sku(e){
    let mapping = 'var c_sku=""; var aA=document.querySelectorAll("' +  this.css_path(e.target,true) + '"); for(var i=0;i<aA.length;i++){c_sku+=","+aA[i].textContent.replace(":","").trim();} c_sku=c_sku.substring(1,c_sku.length); var sku_filter=["Sku","SKU","Model#","Model #","Model","Item #","Item#","Item No.","Item No","Item","Style #","Style No.","Style No","Style"]; for(var i=0;i<sku_filter.length;i++){var find=sku_filter[i]+" "; var regex=new RegExp(find,"g");c_sku=c_sku.replace(regex,""); find=sku_filter[i]; regex=new RegExp(find,"g"); c_sku=c_sku.replace(regex,"").trim()} c_sku;';
    this.output(mapping, e);
  }
}
if(!window.wsb_bookmarklet){
    window.wsb_bookmarklet=1;
    let wsb_overlay = new Controller();
  }
