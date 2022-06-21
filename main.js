export let userData = {}

import{getDataFromFireBase} from "./dataShower.js"
import{updateDataToDatabase} from "./updateUsers.js"
import { deleteAllDataInDatabase } from "./deleteUsers.js"
 export let formBody = document.querySelectorAll("#formContent")

 // save button event listener
document.getElementById("subBtn").addEventListener("click", () => {

    // setting userData object with values from form 
        userData.ID = formBody[0].value
        userData.Name = formBody[1].value,
        userData.Email = formBody[2].value,
        userData.Age = formBody[3].value,
        userData.Salary = formBody[4].value,
        userData.Department = formBody[5].value
    try {
        //check if the ID form field is empty then post data else update data 
        if (formBody[0].value === "") {
            let httpReq = new XMLHttpRequest()
            httpReq.open("POST", "https://employeesdb-4ba8e-default-rtdb.firebaseio.com/EmployeesData.json")
            httpReq.setRequestHeader("Content-Type", "application/json");

            httpReq.addEventListener("readystatechange", () => {
                if (httpReq.readyState == 4) {
                    if (httpReq.status == 200) {
                        alert("Saved to database")
                        getDataFromFireBase()
                    }

                }
            })
            httpReq.send(JSON.stringify(userData))
        }

        else {
            updateDataToDatabase(userData.ID,getDataFromFireBase)
        }

    }
    catch (err) {
        console.error(err)
    }
})



document.getElementById("delBtn").addEventListener("click",()=>{
    confirm("Do u want to delete Entire Data?")
    if (confirm) {
        deleteAllDataInDatabase(getDataFromFireBase)
    }
})




getDataFromFireBase()


