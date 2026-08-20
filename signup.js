let btn=document.getElementById("signup");
const username=document.getElementById("username");
const password=document.getElementById("password");

btn.addEventListener("click",()=>{
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

async function validate(U_name,pass) {
    try{
        const response= await fetch("https://6a7074c255c0ce38c3265137.mockapi.io/user");

        const data= await response.json();

        if(!response.ok){
            throw new Error(`${response.status}`);
        }

        for(let i of data){
            if(i.User_Name==U_name){
                alert("Username already exist , choose another");
                return;
            }
        }

        const obj={
            User_Name : U_name,
            Password : pass
        };

        const res= await fetch("https://6a7074c255c0ce38c3265137.mockapi.io/user",{
            method:"POST",
            headers:{
                "Content-Type" : "application/json"
            },
            body: JSON.stringify(obj)
        });

        if(!res.ok){
            throw new Error(`${res.status}`);
        }

        alert("Sign-Up Successful");

        

        window.location.href = "Index.html";
    }
    catch(error){
        alert(`Failed to sign-up : ${error.message}`);
    }
    
}