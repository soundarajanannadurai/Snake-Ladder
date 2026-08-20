const btn=document.getElementById("btn");
const difficulty=document.getElementById("level");

let levels = {
    easy: {
        snake: [[17, 7],[36, 18],[54, 34],[76, 58],[95, 72]],
        ladder: [[3, 22],[8, 30],[15, 44],[28, 50],[42, 67],[55, 78],[70, 91],[82, 99]]
    },

    medium: {
        snake: [[16, 6],[31, 14],[47, 26],[62, 38],[74, 52],[88, 67],[97, 79]],
        ladder: [[4, 21],[10, 35],[19, 42],[27, 56],[39, 63],[51, 73],[65, 87]]
    },

    hard: {
        snake: [[14, 4],[24, 8],[33, 12],[43, 19],[52, 27],[61, 35],[69, 41],[78, 48],[86, 55],[93, 63],[99, 71]],
        ladder: [[5, 17],[13, 29],[23, 40],[37, 58],[46, 66]]
    }
};

btn.addEventListener("click",()=>{
    if(difficulty.value=="none"){
        alert("Choose levels");
        return;
    }
    let choose=difficulty.value;

    localStorage.setItem("snake",levels[choose].snake);
    localStorage.setItem("ladder",levels[choose].ladder);
    
    window.location.href="Snake.html";
})