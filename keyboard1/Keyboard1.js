const Keyboard = {
    elements: {
        main:null,
        keysContainer: null,
        keys: []
    },
    
    eventHandlers: {
        oninput: null,
        onclose:null
    },
    
    properties: {
        value:"",
        capsLock: false
    },
    
    init() {
    //create main elements
    
    this.elements.main = document.createElement("div");
    this.elements.keysContainer=document.createElement("div");
    
    //setup main elements
    this.elements.main.classList.add("keyboard","1keyboard--hidden");
    this.elements.keysContainer.classList.add("keyboard__keys");
    this.elements.keysContainer.appendChild(this._createKeys());
    // CAPSLOCK
    this.elements.keys = this.elements.keysContainer.querySelectorAll(".keyboard__key");
    
    //add to DOM
    this.elements.main.appendChild(this.elements.keysContainer);
    document.body.appendChild(this.elements.main);
    
    //Automatically use keyboard for elements with .use-input
    
    document.querySelectorAll(".use-input").forEach(element =>{
        element.addEventListener("focus", ()=>{
            this.open(element.value, currentValue => {
                element.value = currentValue;
        
            })
        });
    });
    
    },
    
    _createKeys(){
        const fragment = document.createDocumentFragment();
        const keyLayout = [
            "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "backspace",
            "a", "b", "c", "d", "e", "f", "g", "h", "i", "j",
            "caps", "k", "l", "m", "n", "o", "p", "q", "r", "s", "enter",
            "done", "t", "u", "v", "w", "x", "y", "z", ",", ".", "?",
            "space"
        ];
    
        //create HTML for icon
        const createIconHTML = (icon_name)=>{
            return `<i class="material-icons">${icon_name}</i>`;
        };
    
         keyLayout.forEach(key => {
             const keyElement = document.createElement("button");
             const insertLineBreak = ["backspace", "p", "enter", "?"].indexOf(key)!==-1;
    
             //Add attributes and classes
    
             keyElement.setAttribute("type","button");
             keyElement.classList.add("keyboard__key");
    
             switch(key){ 
                case "backspace":
                    keyElement.classList.add("keyboard__key--wide");
                    keyElement.innerHTML = createIconHTML("backspace");
    
                    keyElement.addEventListener("click", ()=>{
                    this.properties.value = this.properties.value.substring(0,this.properties.value.length-1);
                    this._triggerEvent("oninput");
                });
                    break;
    
    
                    case "caps":
                        keyElement.classList.add("keyboard__key--wide", "keyboard__key--activateable");
                        keyElement.innerHTML = createIconHTML("keyboard_capslock");
        
                        keyElement.addEventListener("click", ()=>{
                        this._toggleCapsLock();
                        // this._triggerEvent("oninput");
                        keyElement.classList.toggle("keyboard__key--active", this.properties.capsLock);
                    });
                        break;
    
                     case "enter":
                        keyElement.classList.add("keyboard__key--wide");
                        keyElement.innerHTML = createIconHTML("keyboard_return");
        
                        keyElement.addEventListener("click", ()=>{
                        this.properties.value += "\n";
                        this._triggerEvent("oninput");
                    });
                        break;
                        
                    case "space":
                        keyElement.classList.add("keyboard__key--extra-wide");
                        keyElement.innerHTML = createIconHTML("space_bar");
        
                        keyElement.addEventListener("click", ()=>{
                        this.properties.value += " ";
                        this._triggerEvent("oninput");
                    });
                        break;    
    
                 case "done":
                        keyElement.classList.add("keyboard__key---wide", "keyboard__key--dark");
                        keyElement.innerHTML = createIconHTML("check_circle");
        
                        keyElement.addEventListener("click", ()=>{
                        this.close();
                        this._triggerEvent("onclose");
                    });
                        break;    
    
                default:
                    keyElement.textContent = key.toLowerCase();
    
                    keyElement.addEventListener("click", ()=>{
                        this.properties.value += this.properties.capsLock ? key.toUpperCase():key.toLowerCase();
                        this._triggerEvent("oninput");
                    });
                    break;
                }    
            
            fragment.appendChild(keyElement);
    
            if (insertLineBreak){
                fragment.appendChild(document.createElement("br"));
            }
            });
        return fragment;
    },
    
     randomCharGen(len = 1){
     let charArray = "1234567890qwertzuiopasdfghjklyxcvbnmQWERTZUIOPASDFGHJKLYXCVBNM";
    
     let array = new Array();
      for (let i=0; i<2; i++){
          let arrayIndex = Math.floor(Math.random()*charArray.length());
          array.push(charArray.charAt(arrayIndex));
      }
      console.log;
    },
    
    
    _triggerEvent(handlerName){
        //console.log("Event triggered! Event Name"+handlerName);
        if(typeof this.eventHandlers[handlerName] == "function") {
            this.eventHandlers[handlerName](this.properties.value);
        }
    
    },
    
    _toggleCapsLock(){
        // console.log("Caps Lock Toggled!");
        this.properties.capsLock = !this.properties.capsLock;
        for (const key of this.elements.keys){
            if(key.childElementCount ===0){
                key.textContent = this.properties.capsLock? key.textContent.toLowerCase():key.textContent.toLowerCase();
             }
        }
    
    },
    
    open(initalValue, oninput, onclose){
        this.properties.value = initalValue || "";
        this.eventHandlers.oninput = oninput;
        this.eventHandlers.onclose = onclose;
        this.elements.main.classList.remove("keyboard--hidden");
        
    },
    
    close(){
        this.properties.value = "";
        this.eventHandlers.oninput = oninput;
        this.eventHandlers.onclose = onclose;
        this.elements.main.classList.add("keyboard--hidden");
    }
    
    
    };
    
     
    
    
    window.addEventListener("DOMContentLoaded", function (){
       
       
       
       
        Keyboard.init();
      
        /* Keyboard.open("this", function (currentValue){
            console.log("value changed: " + currentValue);
        }, function (currentValue) {
            console.log("keyboard closed! finishing value: " + currentValue);
        });  */
        
    });
    