// delete data from database by ID

export function deleteDataInDatabase(IDVal,callback) {
    let httpReq = new XMLHttpRequest()
    httpReq.open("DELETE", `https://employeesdb-4ba8e-default-rtdb.firebaseio.com/EmployeesData/${IDVal}.json`)

    httpReq.onreadystatechange = function () {
        if (httpReq.readyState == 4) {
            if (httpReq.status == 200) {
                alert("Deleted user")

                callback()

            } else {
                console.log("Unsuccessfully error, Please try again");
            }
        }
    }
    httpReq.send();
}

/// delete entire collection


export function deleteAllDataInDatabase(callback) {
    let httpReq = new XMLHttpRequest()
    httpReq.open("DELETE", `https://employeesdb-4ba8e-default-rtdb.firebaseio.com/EmployeesData.json`)

    httpReq.onreadystatechange = function () {
        if (httpReq.readyState == 4) {
            if (httpReq.status == 200) {
                alert("Deleted user")

                callback()

            } else {
                console.log("Unsuccessfully error, Please try again");
            }
        }
    }
    httpReq.send();
}
