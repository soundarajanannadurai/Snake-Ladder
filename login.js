const username=document.getElementById("username");
const password=document.getElementById("password");
const login=document.getElementById("login");
const signup=document.getElementById("signup");

signup.addEventListener("click",()=>{
    window.location.href="signup.html";
});

login.addEventListener("click",()=>{
    if(username.value==""){
        alert("Must need username");
        return;
    }

    if(password.value==""){
        alert("Must need password");
        return;
    }

    validate(username.value,password.value);
})

async function validate(U_name,pass){

    try{
        const response= await fetch("https://6a7074c255c0ce38c3265137.mockapi.io/user");
        const data= await response.json();

        if(!response.ok){
            throw new Error(`${response.status}`);
        }
        
        for(let i of data){
            if(i.User_Name==U_name){
                if(i.Password==pass){
                    alert("Login successful");
                    window.location.href= "level.html";
                    return;
                }
                else{
                    alert("Invalid password");
                    return;
                }
            }
        }

        alert("Invalid username");
        return;
    }
    catch(error){
        alert(`Failed to login : ${error.message}`);
    }
    
}