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
        capsLock: false,
        experimentActive: false
    },
    
    
    
    init() {
    //create keyboard
    
    this.elements.main = document.createElement("div");
    this.elements.keysContainer=document.createElement("div");
    
    //setup keyboard elements
    this.elements.main.classList.add("keyboard");
    this.elements.keysContainer.classList.add("keyboard__keys");
    this.elements.keysContainer.appendChild(this._createKeys());
    this.elements.keys = this.elements.keysContainer.querySelectorAll(".keyboard__key");
    
    //add to DOM
    this.elements.main.appendChild(this.elements.keysContainer);
    document.body.appendChild(this.elements.main);
    
    //Automatically use keyboard for elements with .use-input
    timestamp = Date.now();
    
    document.querySelectorAll(".use-input").forEach(element =>{
        element.addEventListener("focus", ()=>{
            this.open(element.value, currentValue => {
                element.value = currentValue;
                deltaTime = (Date.now()-timestamp);
                times.push(deltaTime);
                this.printReactionTime();
            })
        });
    });
    
    },
    
    randomCharGen(characters_length){
        var characters = "1234567890qwertzuiopasdfghjklyxcvbnmQWERTZUIOPASDFGHJKLYXCVBNM. ,";
       var random_char ='';
        
         for (let i=0; i<characters_length; i++){
             random_char += characters.charAt(Math.floor(Math.random()*characters.length))
            
         }
         console.log(random_char);
         return random_char;
       },
    
    printReactionTime(){
            
           var reactionTime = ((deltaTime))/times.length;  
           for(let i=0; i<times.length;i++){
            console.log(reactionTime);
            }
           timeElement.innerHTML="Reaction time: "+ reactionTime + " ms.";
        },
        
        
    
    _createKeys(){
        const fragment = document.createDocumentFragment();
        const keyLayout = [
            "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "backspace",
                "q", "w", "e", "r", "t", "z", "u", "i", "o", "p",
                 "a", "s", "d", "f", "g", "h", "j", "k", "l", "enter",
                  "y", "x", "c", "v", "b", "n", "m","space", ",", ".", "?","space",
                
        ];
    
        //create HTML for icon
        var createIconHTML = (icon_name)=>{
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
                        keyElement.classList.add("keyboard__key--wide");
                        keyElement.innerHTML = createIconHTML("space_bar");
        
                        keyElement.addEventListener("click", ()=>{
                        this.properties.value += " ";
                        this._triggerEvent("oninput");
                        //this.getDistance()
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
            experimentActive=true;
        
        
    });
    