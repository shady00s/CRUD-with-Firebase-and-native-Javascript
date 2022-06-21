// get data from Firebase and set data to be updated by sending data inside table row to form input 
import { deleteDataInDatabase } from "./deleteUsers.js";
import { formBody } from "./main.js";

export function getDataFromFireBase() {
    try {
        let httpReq = new XMLHttpRequest()
        let tableBody = document.getElementById("tableBody")
        httpReq.open("GET", "https://employeesdb-4ba8e-default-rtdb.firebaseio.com/EmployeesData.json")
        httpReq.send()
        httpReq.addEventListener("readystatechange", () => {
            if (httpReq.readyState == 4) {
                if (httpReq.status == 200) {

                    let data = JSON.parse(httpReq.response)
                    // check if there is no data comming from firebase
                    if(data != null){

                        tableBody.innerHTML = ""
                        for (let employee in data) {
                            tableBody.innerHTML += `
                            <tr class="dataInfo"><td>${employee}</td>
                            <td>${data[employee].Name}</td>
                            <td>${data[employee].Email}</td>
                            <td>${data[employee].Age}</td>
                            <td>${data[employee].Salary}</td>
                            <td>${data[employee].Department}</td>
    
                            <td>
                            <button id="UpBtn" class="btn btn-warning" >Update</button>
                            <button id="DelBtn" class="btn btn-danger">Delete</button>
                            </td>
    
                            <tr>
                        `
                        }
                    }

                    else{
                        tableBody.innerHTML = `
                        
                            <div style="height:20vh; width:100%">
                                
                                <h4 style=" color: grey;position: absolute; right:40%; top:40%;"> 
                                There is no data In database</h4>
                        `
                    }


                    // update data 

                    let updateBtns = document.querySelectorAll("#UpBtn")
                    let infroFromCommingData = document.querySelectorAll(".dataInfo")
                    updateBtns.forEach((elements, index) => {
                        elements.addEventListener("click", (e) => {

                            // insert data into input text to be updated
                            formBody[0].value = infroFromCommingData[index].children[0].innerText
                            formBody[1].value = infroFromCommingData[index].children[1].innerText
                            formBody[2].value = infroFromCommingData[index].children[2].innerText
                            formBody[3].value = infroFromCommingData[index].children[3].innerText
                            formBody[4].value = infroFromCommingData[index].children[4].innerText
                            formBody[5].value = infroFromCommingData[index].children[5].innerText


                        })
                    })


                    // delete data from database

                    let deleteBtns = document.querySelectorAll("#DelBtn")
                    deleteBtns.forEach((element, index)=>{
                        element.addEventListener("click", () => {
                            let conf = confirm("Do you want to delete user ?")
                            if (conf) {

                                deleteDataInDatabase(infroFromCommingData[index].children[0].innerText,getDataFromFireBase
                                )
                            }
                        })
                    })

                }
            }
        })


    }
    catch (err) {
        console.error(err)
    }

}