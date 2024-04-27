// digital clock
document.addEventListener('DOMContentLoaded', () => {
    let hrs = document.getElementById('hrs');
    let min = document.getElementById('min');
    let sec = document.getElementById('sec');

    setInterval(() => {
        let currentTime = new Date();
        hrs.innerHTML = (currentTime.getHours() < 10 ? "0" : "") + currentTime.getHours();
        min.innerHTML = (currentTime.getMinutes() < 10 ? "0" : "") + currentTime.getMinutes();
        sec.innerHTML = (currentTime.getSeconds() < 10 ? "0" : "") + currentTime.getSeconds();
    }, 1000);
});

//Doller

function convert(){
            
    let dollerAmount=parseFloat(document.getElementById('dollerAmount').value);
    let rupeeAmount=dollerAmount*83.61;
    document.getElementById('result').innerHTML="Indian Rupee: "+rupeeAmount;
}

//drag and drop

document.addEventListener('DOMContentLoaded', () => {
        let lists=document.getElementsByClassName('list');
        let rightBox=document.getElementById('right') ;
        let leftBox=document.getElementById('left');

        for(list of lists ){
            list.addEventListener("dragstart",function(e){
                let selected=e.target;

                rightBox.addEventListener("dragover",function(e){
                    e.preventDefault();
                });
                rightBox.addEventListener("drop",function(e)
            {
                rightBox.appendChild(selected);
                selected=null;
            });
             leftBox.addEventListener("dragover",function(e){
                    e.preventDefault();
                });
                leftBox.addEventListener("drop",function(e)
            {
                leftBox.appendChild(selected);
                selected=null;
            });
            })
        }
    });

    // rock,paper,scissor

    function playGame(playerMove){
        let moves=['Rock','Paper','Scissor'];
        let computerMoves=moves[Math.floor(Math.random()*moves.length)];
        let resultText;

        if(playerMove===computerMoves){
            resultText="It's a tie..!";
        }
        else if((playerMove==='Rock' && computerMoves==='Scissor'||
        playerMove==='Paper' && computerMoves==='Rock'||
        playerMove==='Scissor' && computerMoves==='Paper')){
            resultText="You Win..!";
        }
        else{
            resultText='Computer Wins..!';
        }

        document.getElementById('output').innerText=`Your Choose  ${playerMove} ,Computer Choose ${computerMoves}. ${resultText}`;
    }

    // QR code 
    document.addEventListener('DOMContentLoaded', () => {
        let imgBox=document.getElementById("imgBox");
        let qrimage=document.getElementById("qrimage");
        let qrtext=document.getElementById("qrtext");

        window.generateQR=function(){
            if(qrtext.value.length>0)
           {
            qrimage.src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data="+qrtext.value;
            imgBox.classList.add("show-img");
            qrtext.classList.remove('error');
           }
           else{
            qrtext.classList.add('error');
            setTimeout(()=>{
            qrtext.classList.remove('error');

            },3000);
            
           }

        }
    });

    // To-Do list
    
    document.addEventListener('DOMContentLoaded', () => {
        const inputBox = document.getElementById("input-box");
        const listContainer = document.getElementById("list-container");
        const addButton = document.getElementById("add-button");

        function addTask() {
            if (inputBox.value === "") {
                alert("You must write something..");
            } else {
                let li = document.createElement("li");
                li.innerHTML = inputBox.value;
                listContainer.appendChild(li);
                let span = document.createElement("span");
                span.innerHTML = "\u00d7";
                li.appendChild(span);
            }
            inputBox.value = "";
            saveData();
        }

        function saveData() {
            localStorage.setItem("data", listContainer.innerHTML);
        }

        function showTask() {
            listContainer.innerHTML = localStorage.getItem("data");
        }

        addButton.addEventListener("click", addTask);
        listContainer.addEventListener("click", function (e) {
            if (e.target.tagName === "LI") {
                e.target.classList.toggle("checked");
                saveData();
            } else if (e.target.tagName === "SPAN") {
                e.target.parentElement.remove();
                saveData();
            }
        }, false);

        showTask();
    });

    // speech to text

    document.addEventListener('DOMContentLoaded', () => {
        let startButton=document.getElementById('start-btn');
        let outputCont=document.getElementById('output1');
        let speechRecognition=window.speechRecognition || window.webkitSpeechRecognition;
        let recognition=new speechRecognition();

        recognition.lang="en-Us";

        recognition.onstart=()=>{
            outputCont.textContent="Listening...";
        };
        recognition.onresult=(event)=>{
            let transcript=event.results[0][0].transcript;
            outputCont.textContent=transcript;
        };
        recognition.onerror=()=>{
            outputCont.textContent="Error occured in recognition: "+event.error;
        };
        startButton.addEventListener("click",()=>{
            recognition.start();
        });
    });


// search with suggestion/

document.addEventListener('DOMContentLoaded', () => {
let availableKeywords=["Ananya", "Akash", "Asha", "Arun",
"Bhavesh", "Bhoomi", "Brijesh", "Bhavana",
"Chetan", "Chandni", "Charulata", "Chaitanya",
"Dev", "Dinesh", "Deepika", "Divya",
"Eshaan", "Ekta", "Eknath", "Eshwari",
"Farhan", "Falguni", "Firoz", "Fahad",
"Ganesh", "Gauri", "Gopal", "Gayatri",
"Hari", "Hema", "Harish", "Heena",
"Ishan", "Indira", "Isha", "Inderjit",
"Jatin", "Jaya", "Jignesh", "Janaki",
"Karan", "Kavita", "Krishna", "Kalyani",
"Lokesh", "Leela", "Laxman", "Lavanya",
"Mohan", "Meera", "Mahesh", "Minal",
"Nitin", "Nisha", "Naren", "Neha",
"Omkar", "Oviya", "Ojaswi", "Omisha",
"Prakash", "Priya", "Parth", "Poonam",
"Quamar", "Qamar", "Quasim", "Qureshi",
"Raj", "Radha", "Rahul", "Rani",
"Sunil", "Sunita", "Suresh", "Sneha",
"Tarun", "Trisha", "Tanvi", "Tejas",
"Umesh", "Usha", "Uttam", "Urmi",
"Vivek", "Vaishnavi", "Vinod", "Vinita",
"Waqar", "Waseem", "Waris", "Wafa",
"Yash", "Yamini", "Yatin", "Yasmin",
"Zaheer", "Zara", "Zubin", "Zoya","Surya","Tamil","Suryaraj",
    ];
    const resultsBox=document.querySelector('.result-box');
    const inputBox=document.getElementById('input-box1');

    inputBox.addEventListener('input',()=>{
      let result=[];
      let input = inputBox.value;
      if(input.length){
        result=availableKeywords.filter((keyword)=>{
          return keyword.toLowerCase().startsWith(input.toLowerCase());
        });
        console.log(result);
      }
    

      if(!result.length){
        displayNotFound();
      }
      else{
       displayResults(result);
      }
    
    });
    resultsBox.addEventListener('click',(event)=>{
        if(event.target.tagName==="LI"){
            inputBox.value=event.target.textContent;
        }
    });
    
    function displayResults(result){
      const content=result.map((list)=>{
        return "<li>"+list+"</li>";
      });
      resultsBox.innerHTML="<ul>"+content.join('') +"</ul>";
    }
    
    
    function displayNotFound(){
        resultsBox.innerHTML="<ul><li>Not found..!</li></ul>"
    }
    
});

// calculator

function appendToDisplay(value){
    document.getElementById('display').value += value;

}
function clearDisplay()
{
    document.getElementById('display').value="";
}
function calculate()
{
    let displayvalue=document.getElementById('display').value;
    let result=eval(displayvalue);
    document.getElementById('display').value=result;
}

// product shopping

let productImage=document.getElementById('productImage');
        let btn=document.getElementsByClassName('btn');
        
        btn[0].onclick=function(){
            productImage.src="image/shopimg1.webp";
            for(bt of btn){
                bt.classList.remove('active');
            }
            this.classList.add('active');
        }
        btn[1].onclick=function(){
            productImage.src="image/shopimg2.webp";
            for(bt of btn){
                bt.classList.remove('active');
            }
            this.classList.add('active');
        }
        btn[2].onclick=function(){
            productImage.src="image/shopimg3.webp";
            for(bt of btn){
                bt.classList.remove('active');
            }
            this.classList.add('active');
        }

        function redcol(){
            let productImage=document.getElementById('productImage');
            productImage.src="image/red1.webp";

            btn[0].onclick=function(){
            productImage.src="image/red1.webp";
            for(bt of btn){
                bt.classList.remove('active');
            }
            this.classList.add('active');
            }
            btn[1].onclick=function(){
            productImage.src="image/red2.webp";
            for(bt of btn){
                bt.classList.remove('active');
            }
            this.classList.add('active');
            }
            btn[2].onclick=function(){
            productImage.src="image/red3.webp";
            for(bt of btn){
                bt.classList.remove('active');
            }
            this.classList.add('active');
            }

        }
        function greencol(){
            let productImage=document.getElementById('productImage');
            productImage.src="image/green1.webp";

            btn[0].onclick=function(){
            productImage.src="image/green1.webp";
            for(bt of btn){
                bt.classList.remove('active');
            }
            this.classList.add('active');
            }
            btn[1].onclick=function(){
            productImage.src="image/green2.webp";
            for(bt of btn){
                bt.classList.remove('active');
            }
            this.classList.add('active');
            }
            btn[2].onclick=function(){
            productImage.src="image/green3.webp";
            for(bt of btn){
                bt.classList.remove('active');
            }
            this.classList.add('active');
            }
        }

        function bluecol(){
            let productImage=document.getElementById('productImage');
            productImage.src="image/blue1.webp";

            btn[0].onclick=function(){
            productImage.src="image/blue1.webp";
            for(bt of btn){
                bt.classList.remove('active');
            }
            this.classList.add('active');
            }
            btn[1].onclick=function(){
            productImage.src="image/blue2.webp";
            for(bt of btn){
                bt.classList.remove('active');
            }
            this.classList.add('active');
            }
            btn[2].onclick=function(){
            productImage.src="image/blue3.webp";
            for(bt of btn){
                bt.classList.remove('active');
            }
            this.classList.add('active');
            }
        }

        function yellowcol(){
            let productImage=document.getElementById('productImage');
            productImage.src="image/yellow1.webp";

            btn[0].onclick=function(){
            productImage.src="image/yellow1.webp";
            for(bt of btn){
                bt.classList.remove('active');
            }
            this.classList.add('active');
            }
            btn[1].onclick=function(){
            productImage.src="image/yellow2.webp";
            for(bt of btn){
                bt.classList.remove('active');
            }
            this.classList.add('active');
            }
            btn[2].onclick=function(){
            productImage.src="image/yellow3.webp";
            for(bt of btn){
                bt.classList.remove('active');
            }
            this.classList.add('active');
            }
        }


        function blackcol(){
            let productImage=document.getElementById('productImage');
            productImage.src="image/black1.webp";

            btn[0].onclick=function(){
            productImage.src="image/black1.webp";
            for(bt of btn){
                bt.classList.remove('active');
            }
            this.classList.add('active');
            }

            btn[1].onclick=function(){
            productImage.src="image/black2.webp";
            for(bt of btn){
                bt.classList.remove('active');
            }
            
            this.classList.add('active');
            }
            btn[2].onclick=function(){
            productImage.src="image/black3.webp";
            for(bt of btn){
                bt.classList.remove('active');
            }
            this.classList.add('active');
            }
        }
        