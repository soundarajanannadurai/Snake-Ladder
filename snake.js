const table=document.getElementById("table");
const add=document.getElementById("div");
const number=document.getElementById("number");
const logout=document.getElementById("logout");

let s=localStorage.getItem("snake").split(",");
let l=localStorage.getItem("ladder").split(",");

let snake=[];
for(let i=0;i<s.length;i+=2){
    snake.push([+s[i+1],+s[i]]);
}

let ladder=[];
for(let i=0;i<l.length;i+=2){
    ladder.push([+l[i],+l[i+1]]);
}

console.log(snake,ladder)


let mapSnake=new Map();
let mapLadder=new Map();


let num=110;
let f=true;

for(let i=0;i<10;i++){
    if(i%2==0){
        f=true;
    }
    else{
        f=false;
    }
    num-=10;

    let row=document.createElement("tr");
    for(let j=0;j<10;j++){

        row.innerHTML+=`<td id="${num}"><h5>${num}</h5><p id="${"a"+num}"></p></td>`
        if(j==9){
            continue;
        }
        if(f){
            num--;
        }
        else{
            num++;
        }
    }
    table.appendChild(row);
}


for(let i of snake){
    let cell=document.getElementById(String(i[1]));
    cell.style.backgroundColor="red";

    let para=document.getElementById(("a"+i[1]));
    para.innerHTML+=`${i[0]}`;

    mapSnake.set(i[1],i[0]);
}

for(let i of ladder){
    let cell=document.getElementById(String(i[0]));
    cell.style.backgroundColor="green";

    let para=document.getElementById(("a"+i[0]));
    para.innerHTML+=`${i[1]}`;
    
    mapLadder.set(i[0],i[1]);
}

console.log(mapLadder,mapSnake)

const btn=document.createElement("button");
btn.textContent="dice";
add.appendChild(btn);

let startA=1;
let startB=1;

let t=document.getElementById("a1");
t.innerHTML+="XY"

async function play(){
    while(startA!=100 && startB!=100){
        console.log("Player 1");
        await move(startA,1);
        
        if(startA==100){
            alert("Player 1 win");
            break;
        }
        console.log("Player 2");
        await move(startB,2);
       
        if(startB==100){
            alert("Player 2 wins");
            break;
        }
    }
}

play();


async function move(start,player,flag=false){

    let roll=await getRoll();

    
    if(start+roll>100){
        return;
    }
    
    if(start==1 && !flag){
        if(roll==6){
            await move(start,player,true);
            return;
        }
        else{
            
            return;
        }
    }

    let name;

    if(player==1){
        name="X";
    }
    else{
        name="Y";
    }

    console.log(start,start+roll);

    // for(let i=start;i<start+roll;i++){
    //     console.log(i);
    //     let pre=document.getElementById(("a"+(i)));
    //     let str=pre.innerHTML;
    //     str=str.replace(name,"");
    //     pre.innerHTML=str;

    //     let curr=document.getElementById(("a"+(i+1)));
    //     let str1=curr.innerHTML;
    //     str1=str1+name;
    //     curr.innerHTML=str1;
    // }
    // start+=roll;

    let pre=document.getElementById(("a"+(start)));
    let str=pre.innerHTML;
    str=str.replace(name,"");
    pre.innerHTML=str;
    start+=roll;

    let curr=document.getElementById(("a"+(start)));
    let str1=curr.innerHTML;
    str1=str1+name;
    curr.innerHTML=str1;
    
    
    while(mapLadder.has(start) || mapSnake.has(start)){

        if(mapSnake.has(start)){
            
            let pre=document.getElementById(("a"+(start)));
            let str=pre.innerHTML;
            str=str.replace(name,"");
            pre.innerHTML=str;
            
            start=mapSnake.get(start);

            let curr=document.getElementById(("a"+(start)));
            let str1=curr.innerHTML;
            str1=str1+name;
            curr.innerHTML=str1;
        }

        if(mapLadder.has(start)){

            let pre=document.getElementById(("a"+(start)));
            let str=pre.innerHTML;
            str=str.replace(name,"");
            pre.innerHTML=str;
            
            start=mapLadder.get(start);

            let curr=document.getElementById(("a"+(start)));
            let str1=curr.innerHTML;
            str1=str1+name;
            curr.innerHTML=str1;
        }
    }

    if(player==1){
        startA=start;
    }
    else{
        startB=start;
    }

    if(roll==6){
        await move(start,player);
    }

}

function getRoll(){
    add.appendChild(btn);

    return new Promise(resolve=>{
        btn.addEventListener("click",()=>{
            number.innerHTML="";
            let roll=Math.floor(Math.random()*6)+1;
            number.innerHTML=roll;
            btn.remove();
            resolve(roll);
        })
    })
}


logout.addEventListener("click",()=>{
    localStorage.clear();
    window.location.href="Index.html";
})
