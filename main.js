let userData = {}
let formBody = document.querySelectorAll("#formContent")


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
            updateDataToDatabase(userData.ID)
        }

    }
    catch (err) {
        console.error(err)
    }
})



// get data from Firebase and set data to be updated by sending data inside table row to form input 

function getDataFromFireBase() {

    try {
        let httpReq = new XMLHttpRequest()
        let tableBody = document.getElementById("tableBody")
        httpReq.open("GET", "https://employeesdb-4ba8e-default-rtdb.firebaseio.com/EmployeesData.json")
        httpReq.send()
        httpReq.addEventListener("readystatechange", () => {
            if (httpReq.readyState == 4) {
                if (httpReq.status == 200) {

                    let data = JSON.parse(httpReq.response)

                    console.log(data)
                    tableBody.innerHTML = ""
                    for (employee in data) {
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

                                deleteDataInDatabase(infroFromCommingData[index].children[0].innerText)
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


// update data function

function updateDataToDatabase(IDVal) {
    let httpReq = new XMLHttpRequest()
    httpReq.open("PATCH", `https://employeesdb-4ba8e-default-rtdb.firebaseio.com/EmployeesData/${IDVal}.json`)
    httpReq.setRequestHeader("Content-Type", "application/json")

    console.log(userData)

    httpReq.onreadystatechange = function () {
        if (httpReq.readyState == 4) {
            if (httpReq.status == 200) {
                alert("Updated user")
                getDataFromFireBase()

            } else {
                console.log("Unsuccessfully error, Please try again");
            }
        }
    }
    httpReq.send(JSON.stringify(userData));
}

function deleteDataInDatabase(IDVal) {
    let httpReq = new XMLHttpRequest()
    httpReq.open("DELETE", `https://employeesdb-4ba8e-default-rtdb.firebaseio.com/EmployeesData/${IDVal}.json`)

    httpReq.onreadystatechange = function () {
        if (httpReq.readyState == 4) {
            if (httpReq.status == 200) {
                alert("Deleted user")
                getDataFromFireBase()

            } else {
                console.log("Unsuccessfully error, Please try again");
            }
        }
    }
    httpReq.send();
}
getDataFromFireBase()


