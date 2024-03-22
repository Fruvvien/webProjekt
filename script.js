const url = "https://retoolapi.dev/bwS4f0/data";
 
document.addEventListener("DOMContentLoaded", () =>{
    
    const userName = document.getElementById("username");
    const email = document.getElementById("email");
    
    const linkAddUser = document.getElementById("addPage");
    const linkListUser = document.getElementById("listPage");
    
    const formUser = document.getElementById("formUser");
    const cardUserList = document.getElementById("userList");
    

   
    const updateForm = document.getElementById("updateForm");
    
    
    readUsers();
    
    
    formUser.addEventListener("submit", (event) =>{
        event.preventDefault();
    
        allData = {
            username: userName.value,
            email: email.value,
            
    
        }
        createNewUser(allData);


    
    
    })

    async function createNewUser(allData){

        if(allData.username != "" || allData.email != "" ){
            await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({Name: allData.username, Email: allData.email})
            })
            readUsers();
            window.location.reload();
        }else{
            alert("Ne hagyja üresen az űrlapot!")
        }
        
        
    }
    
    linkListUser.addEventListener("click", () =>{
        readUsers();
        cardUserList.classList.remove("d-none");
        formUser.classList.add("d-none");
    
    
    
    })
    linkAddUser.addEventListener("click", ()=>{
    
        cardUserList.classList.add("d-none");
        formUser.classList.remove("d-none");
    })
    
    function readUsers(){
        fetch(url)
        .then((response)=> response.json())
        .then((data)=> listUsers(data))
    
    }
    function listUsers(data){
        let card = "";
        for(let index = 0; index < data.length; index++){
            const value = data[index];
            let cards =
            `
            <div class="card  shadow p-3 mb-5 bg-body rounded" style="width: 18rem;">
                <div class="card-body ">
                    <h5 class="card-title">${value.Name}</h5>
                    <p class="card-text">${value.Email}</p>
                    <p class="card-text">${value.id}</p>
                    <button class="btn btn-success" type="button" data-bs-toggle="modal" data-bs-target="#updateList" onclick="giveIdToUpdateButton(${value.id})">Módosít</button>
                    <button class="btn btn-danger" type="button" onclick="deleteButton(${value.id})">Töröl</button>
                </div>
            </div>
            `;
        
            card += cards;
        }
        document.getElementById("userList").innerHTML = card;
    }
    
  
    function giveIdToUpdateButton(id){
        
        document.getElementById("updateButton").addEventListener("click", () => {
            
            updateButton(id);
        });
        
   
    }  

    

    async function updateButton(id){
        const updateUserName = document.getElementById("inputUserName");
        const updateUserEmail = document.getElementById("inputUserEmail");
            
        await fetch(url + "/" + id, {
            method: 'PATCH',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify({Name : updateUserName.value , Email: updateUserEmail.value}),
        }).then((response) => response.json())
        window.location.reload();
           
           
        
       
    }

    async function deleteButton(id){
        await fetch(url + "/" + id, {
            method: 'DELETE',
        })
        .then(response => {
            if(response.ok){
                alert("Sikeres törlés")
                readUsers();

            }else{
                alert("Sikertelen törlés")
            }
        })
    }

    window.giveIdToUpdateButton = giveIdToUpdateButton;
    window.deleteButton = deleteButton;
 
})