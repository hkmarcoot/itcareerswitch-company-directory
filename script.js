// ---------------------------------------------------------
// GLOBAL DECLARATIONS
// ---------------------------------------------------------

//

// ---------------------------------------------------------
// FUNCTIONS
// ---------------------------------------------------------

function getAll() {
  return $.ajax({
    url: "./libs/php/getAll.php",
    type: "GET",
    dataType: "json",
    success: function (data) {
      // console.log(JSON.stringify(data));
    },
    error: function (xhr, status, error) {
      // console.log(error);
    },
  });
}

function getAllDepartments() {
  return $.ajax({
    url: "./libs/php/getAllDepartments.php",
    type: "GET",
    dataType: "json",
    success: function (data) {
      // console.log(JSON.stringify(data));
    },
    error: function (xhr, status, error) {
      // console.log(error);
    },
  });
}

function getAllLocations() {
  return $.ajax({
    url: "./libs/php/getAllLocations.php",
    type: "GET",
    dataType: "json",
    success: function (data) {
      // console.log(JSON.stringify(data));
    },
    error: function (xhr, status, error) {
      // console.log(error);
    },
  });
}

function searchAll(item) {
  return $.ajax({
    url: "./libs/php/SearchAll.php",
    type: "GET",
    dataType: "json",
    data: {
      txt: item,
    },
    success: function (data) {
      // console.log(JSON.stringify(data));
    },
    error: function (xhr, status, error) {
      // console.log(error);
    },
  });
}

function refreshPersonnelTable() {
  var allData = getAll();
  $.when(allData).done(function () {
    var allEmployeesData = allData.responseJSON.data;
    if (
      $("#filterPersonnelDepartment :selected").text() == "" &&
      $("#filterPersonnelLocation :selected").text() == ""
    ) {
      // Do nothing
    } else if ($("#filterPersonnelDepartment :selected").text() != "All") {
      allEmployeesData = allEmployeesData.filter(function (employee) {
        return (
          employee.department ==
          $("#filterPersonnelDepartment :selected").text()
        );
      });
    } else if ($("#filterPersonnelLocation :selected").text() != "All") {
      allEmployeesData = allEmployeesData.filter(function (employee) {
        return (
          employee.location == $("#filterPersonnelLocation :selected").text()
        );
      });
    }
    displayEmployeesInRowsOnTable(allEmployeesData);
  });
}

function refreshDepartmentsTable() {
  var allDepartments = getAllDepartments();
  $.when(allDepartments).done(function () {
    var allDepartmentsData = allDepartments.responseJSON.data;
    displayDepartmentsInRowsOnTable(allDepartmentsData);
  });
}

function refreshLocationsTable() {
  var allLocations = getAllLocations();
  $.when(allLocations).done(function () {
    var allLocationsData = allLocations.responseJSON.data;
    displayLocationsInRowsOnTable(allLocationsData);
  });
}

function returnSearchResults(item) {
  var searchResults = searchAll(item);
  $.when(searchResults).done(function () {
    var searchResultsData = searchResults.responseJSON.data.found;
    if (
      $("#filterPersonnelDepartment :selected").text() == "" &&
      $("#filterPersonnelLocation :selected").text() == ""
    ) {
      // Do nothing
    } else if ($("#filterPersonnelDepartment :selected").text() != "All") {
      searchResultsData = searchResultsData.filter(function (employee) {
        return (
          employee.department ==
          $("#filterPersonnelDepartment :selected").text()
        );
      });
    } else if ($("#filterPersonnelLocation :selected").text() != "All") {
      searchResultsData = searchResultsData.filter(function (employee) {
        return (
          employee.location == $("#filterPersonnelLocation :selected").text()
        );
      });
    }
    displayEmployeesInRowsOnTable(searchResultsData);
  });
}

function returnForSearchInput() {
  if ($("#searchInp").val().length == 0) {
    refreshPersonnelTable();
  } else {
    returnSearchResults($("#searchInp").val());
  }
}

function displayEmployeesInRowsOnTable(employees) {
  $("#personnelTableBody").empty();
  var frag = document.createDocumentFragment();
  employees.forEach(function (employee) {
    var row = document.createElement("tr");
    var employeeName = document.createElement("td");
    employeeName.classList = "align-middle text-nowrap";
    var employeeNameText = document.createTextNode(
      employee.lastName + ", " + employee.firstName
    );
    employeeName.append(employeeNameText);
    row.append(employeeName);

    var employeeLocation = document.createElement("td");
    employeeLocation.classList =
      "align-middle text-nowrap d-none d-md-table-cell";
    var employeeLocationText = document.createTextNode(employee.location);
    employeeLocation.append(employeeLocationText);
    row.append(employeeLocation);

    var employeeEmail = document.createElement("td");
    employeeEmail.classList = "align-middle text-nowrap d-none d-md-table-cell";
    var employeeEmailText = document.createTextNode(employee.email);
    employeeEmail.append(employeeEmailText);
    row.append(employeeEmail);

    var employeeDepartment = document.createElement("td");
    employeeDepartment.classList =
      "align-middle text-nowrap d-none d-md-table-cell";
    var employeeDepartmentText = document.createTextNode(employee.department);
    employeeDepartment.append(employeeDepartmentText);
    row.append(employeeDepartment);

    var employeeButtonsTd = document.createElement("td");
    employeeButtonsTd.classList = "text-end text-nowrap";
    var employeeButtons = document.createElement("button");
    employeeButtons.classList = "btn btn-primary btn-sm me-1";
    employeeButtons.setAttribute("type", "button");
    employeeButtons.setAttribute("data-bs-toggle", "modal");
    employeeButtons.setAttribute("data-bs-target", "#editPersonnelModal");
    employeeButtons.setAttribute("data-id", employee.id);
    employeeButtons.innerHTML = "<i class='fa-solid fa-pencil fa-fw'></i>";
    employeeButtonsTd.append(employeeButtons);
    var employeeDeleteButton = document.createElement("button");
    employeeDeleteButton.classList = "btn btn-primary btn-sm";
    employeeDeleteButton.setAttribute("type", "button");
    employeeDeleteButton.setAttribute("data-bs-toggle", "modal");
    employeeDeleteButton.setAttribute(
      "data-bs-target",
      "#deletePersonnelModal"
    );
    employeeDeleteButton.setAttribute("data-id", employee.id);
    employeeDeleteButton.innerHTML = "<i class='fa-solid fa-trash fa-fw'></i>";
    employeeButtonsTd.append(employeeDeleteButton);
    row.append(employeeButtonsTd);
    frag.append(row);

    // *** For Reference ***

    // var addrow = "<tr>";
    // addrow +=
    //   "<td class='align-middle text-nowrap'>" +
    //   employee.lastName +
    //   ", " +
    //   employee.firstName +
    //   "</td>";
    // addrow +=
    //   "<td class='align-middle text-nowrap d-none d-md-table-cell'>" +
    //   employee.location +
    //   "</td>";
    // addrow +=
    //   "<td class='align-middle text-nowrap d-none d-md-table-cell'>" +
    //   employee.email +
    //   "</td>";
    // addrow +=
    //   "<td class='align-middle text-nowrap d-none d-md-table-cell'>" +
    //   employee.department +
    //   "</td>";
    // addrow += "<td class='text-end text-nowrap'>";
    // addrow +=
    //   "<button type='button' class='btn btn-primary btn-sm' data-bs-toggle='modal' data-bs-target='#editPersonnelModal' data-id=" +
    //   employee.id +
    //   ">";
    // addrow += "<i class='fa-solid fa-pencil fa-fw'></i>";
    // addrow += "</button>";
    // addrow +=
    //   "<button type='button' class='btn btn-primary btn-sm' data-bs-toggle='modal' data-bs-target='#deletePersonnelModal' data-id=" +
    //   employee.id +
    //   ">";
    // addrow += "<i class='fa-solid fa-trash fa-fw'></i>";
    // addrow += "</button>";
    // addrow += "</td>";
    // addrow += "</tr>";
    // $("#personnelTableBody").append(addrow);
  });
  document.getElementById("personnelTableBody").append(frag);
}

function displayDepartmentsInRowsOnTable(departments) {
  $("#departmentTableBody").empty();
  var frag = document.createDocumentFragment();
  departments.forEach(function (department) {
    var row = document.createElement("tr");
    var departmentName = document.createElement("td");
    departmentName.classList = "align-middle text-nowrap";
    var departmentNameText = document.createTextNode(department.name);
    departmentName.append(departmentNameText);
    row.append(departmentName);

    var departmentLocation = document.createElement("td");
    departmentLocation.classList =
      "align-middle text-nowrap d-none d-md-table-cell";
    var departmentLocationText = document.createTextNode(department.location);
    departmentLocation.append(departmentLocationText);
    row.append(departmentLocation);

    var departmentButtonsTd = document.createElement("td");
    departmentButtonsTd.classList = "align-middle text-end text-nowrap";

    var departmentButtons = document.createElement("button");
    departmentButtons.classList = "btn btn-primary btn-sm me-1";
    departmentButtons.setAttribute("type", "button");
    departmentButtons.setAttribute("data-bs-toggle", "modal");
    departmentButtons.setAttribute("data-bs-target", "#editDepartmentModal");
    departmentButtons.setAttribute("data-id", department.id);
    departmentButtons.innerHTML = "<i class='fa-solid fa-pencil fa-fw'></i>";
    departmentButtonsTd.append(departmentButtons);

    var departmentDeleteButton = document.createElement("button");
    departmentDeleteButton.classList = "btn btn-primary btn-sm";
    departmentDeleteButton.setAttribute("type", "button");
    departmentDeleteButton.setAttribute("data-bs-toggle", "modal");
    departmentDeleteButton.setAttribute(
      "data-bs-target",
      "#deleteDepartmentModal"
    );
    departmentDeleteButton.setAttribute("data-id", department.id);
    departmentDeleteButton.innerHTML =
      "<i class='fa-solid fa-trash fa-fw'></i>";
    departmentButtonsTd.append(departmentDeleteButton);
    row.append(departmentButtonsTd);
    frag.append(row);

    // *** For Reference ***

    // var addrow = "<tr>";
    // addrow +=
    //   "<td class='align-middle text-nowrap'>" + department.name + "</td>";
    // addrow +=
    //   "<td class='align-middle text-nowrap d-none d-md-table-cell'>" +
    //   department.location +
    //   "</td>";
    // addrow += "<td class='align-middle text-end text-nowrap'>";
    // addrow +=
    //   "<button type='button' class='btn btn-primary btn-sm' data-bs-toggle='modal' data-bs-target='#editDepartmentModal' data-id=" +
    //   department.id +
    //   ">";
    // addrow += "<i class='fa-solid fa-pencil fa-fw'></i>";
    // addrow += "</button>";
    // addrow +=
    //   "<button type='button' class='btn btn-primary btn-sm' data-bs-toggle='modal' data-bs-target='#deleteDepartmentModal' data-id=" +
    //   department.id +
    //   ">";
    // addrow += "<i class='fa-solid fa-trash fa-fw'></i>";
    // addrow += "</button>";
    // addrow += "</td>";
    // addrow += "</tr>";
    // $("#departmentTableBody").append(addrow);
  });
  document.getElementById("departmentTableBody").append(frag);
}

function displayLocationsInRowsOnTable(locations) {
  $("#locationTableBody").empty();
  var frag = document.createDocumentFragment();
  locations.forEach(function (location) {
    var row = document.createElement("tr");
    var locationName = document.createElement("td");
    locationName.classList = "align-middle text-nowrap";
    var locationNameText = document.createTextNode(location.name);
    locationName.append(locationNameText);
    row.append(locationName);

    var locationButtonsTd = document.createElement("td");
    locationButtonsTd.classList = "align-middle text-end text-nowrap";
    var locationButtons = document.createElement("button");
    locationButtons.classList = "btn btn-primary btn-sm me-1";
    locationButtons.setAttribute("type", "button");
    locationButtons.setAttribute("data-bs-toggle", "modal");
    locationButtons.setAttribute("data-bs-target", "#editLocationModal");
    locationButtons.setAttribute("data-id", location.id);
    locationButtons.innerHTML = "<i class='fa-solid fa-pencil fa-fw'></i>";
    locationButtonsTd.append(locationButtons);
    var locationDeleteButton = document.createElement("button");
    locationDeleteButton.classList = "btn btn-primary btn-sm";
    locationDeleteButton.setAttribute("type", "button");
    locationDeleteButton.setAttribute("data-bs-toggle", "modal");
    locationDeleteButton.setAttribute("data-bs-target", "#deleteLocationModal");
    locationDeleteButton.setAttribute("data-id", location.id);
    locationDeleteButton.innerHTML = "<i class='fa-solid fa-trash fa-fw'></i>";
    locationButtonsTd.append(locationDeleteButton);
    row.append(locationButtonsTd);
    frag.append(row);

    // *** For Reference ***

    // var addrow = "<tr>";
    // addrow += "<td class='align-middle text-nowrap'>" + location.name + "</td>";
    // addrow += "<td class='align-middle text-end text-nowrap'>";
    // addrow +=
    //   "<button type='button' class='btn btn-primary btn-sm' data-bs-toggle='modal' data-bs-target='#editLocationModal' data-id=" +
    //   location.id +
    //   ">";
    // addrow += "<i class='fa-solid fa-pencil fa-fw'></i>";
    // addrow += "</button>";
    // addrow +=
    //   "<button type='button' class='btn btn-primary btn-sm' data-bs-toggle='modal' data-bs-target='#deleteLocationModal' data-id=" +
    //   location.id +
    //   ">";
    // addrow += "<i class='fa-solid fa-trash fa-fw'></i>";
    // addrow += "</button>";
    // addrow += "</td>";
    // addrow += "</tr>";
    // $("#locationTableBody").append(addrow);
  });
  document.getElementById("locationTableBody").append(frag);
}

// ---------------------------------------------------------
// EVENT HANDLERS
// ---------------------------------------------------------

$("#searchInp").on("keyup", function () {
  // Refresh personnel table with search input
  returnForSearchInput();
});

$("#refreshBtn").click(function () {
  if ($("#personnelBtn").hasClass("active")) {
    // Refresh personnel table with search input
    returnForSearchInput();
  } else {
    if ($("#departmentsBtn").hasClass("active")) {
      // Refresh department table
      refreshDepartmentsTable();
    } else {
      // Refresh location table
      refreshLocationsTable();
    }
  }
});

$("#filterBtn").click(function () {
  // Open a modal of your own design that allows the user to apply a filter to the personnel table on either department or location
  if ($("#personnelBtn").hasClass("active")) {
    // Open personnel filter modal
    $("#filterPersonnelModal").modal("show");
  }
});

$("#addBtn").click(function () {
  // Replicate the logic of the refresh button click to open the add modal for the table that is currently on display
  if ($("#personnelBtn").hasClass("active")) {
    // Open personnel add modal
    $("#addPersonnelModal").modal("show");
  } else {
    if ($("#departmentsBtn").hasClass("active")) {
      // Open department add modal
      $("#addDepartmentModal").modal("show");
    } else {
      // Open location add modal
      $("#addLocationModal").modal("show");
    }
  }
});

$("#personnelBtn").click(function () {
  // Enable personnel filter
  $("#filterBtn").prop("disabled", false);

  // Refresh personnel table with search input
  returnForSearchInput();
});

$("#departmentsBtn").click(function () {
  // Disable department filter
  $("#filterBtn").prop("disabled", true);

  // Call function to refresh department table
  refreshDepartmentsTable();
});

$("#locationsBtn").click(function () {
  // Disable location filter
  $("#filterBtn").prop("disabled", true);

  // Call function to refresh location table
  refreshLocationsTable();
});

$("#editPersonnelModal").on("show.bs.modal", function (e) {
  $.ajax({
    url: "./libs/php/getPersonnelByID.php",
    type: "POST",
    dataType: "json",
    data: {
      // Retrieve the data-id attribute from the calling button
      // see https://getbootstrap.com/docs/5.0/components/modal/#varying-modal-content
      // for the non-jQuery JavaScript alternative
      id: $(e.relatedTarget).attr("data-id"),
    },
    success: function (result) {
      var resultCode = result.status.code;

      if (resultCode == 200) {
        // Update the hidden input with the employee id so that
        // it can be referenced when the form is submitted

        $("#editPersonnelEmployeeID").val(result.data.personnel[0].id);

        $("#editPersonnelFirstName").val(result.data.personnel[0].firstName);
        $("#editPersonnelLastName").val(result.data.personnel[0].lastName);
        $("#editPersonnelJobTitle").val(result.data.personnel[0].jobTitle);
        $("#editPersonnelEmailAddress").val(result.data.personnel[0].email);

        $("#editPersonnelDepartment").html("");

        $.each(result.data.department, function () {
          $("#editPersonnelDepartment").append(
            $("<option>", {
              value: this.id,
              text: this.name,
            })
          );
        });

        $("#editPersonnelDepartment").val(
          result.data.personnel[0].departmentID
        );
      } else {
        $("#editPersonnelModal .modal-title").replaceWith(
          "Error Retrieving Data"
        );
      }
    },
    error: function (jqXHR, textStatus, errorThrown) {
      $("#editPersonnelModal .modal-title").replaceWith(
        "Error Retrieving Data"
      );
    },
  });
});

// Executes when the form button with type="submit" is clicked

$("#editPersonnelForm").on("submit", function (e) {
  // Executes when the form button with type="submit" is clicked
  // stop the default browser behviour

  e.preventDefault();

  // AJAX call to save form data
  $.ajax({
    url: "./libs/php/editPersonnel.php",
    type: "POST",
    dataType: "json",
    data: {
      id: $("#editPersonnelEmployeeID").val(),
      firstName: $("#editPersonnelFirstName").val(),
      lastName: $("#editPersonnelLastName").val(),
      jobTitle: $("#editPersonnelJobTitle").val(),
      email: $("#editPersonnelEmailAddress").val(),
      departmentID: $("#editPersonnelDepartment").val(),
    },
    success: function (result) {
      var resultCode = result.status.code;

      if (resultCode == 200) {
        $("#editPersonnelModal").modal("hide");
        returnForSearchInput();
      } else {
        $("#editPersonnelModal .modal-title").replaceWith("Error Editing Data");
      }
    },
    error: function (jqXHR, textStatus, errorThrown) {
      $("#editPersonnelModal .modal-title").replaceWith("Error Editing Data");
    },
  });
});

$("#editDepartmentModal").on("show.bs.modal", function (e) {
  $.ajax({
    url: "./libs/php/getDepartmentByID.php",
    type: "POST",
    dataType: "json",
    data: {
      // Retrieve the data-id attribute from the calling button
      // see https://getbootstrap.com/docs/5.0/components/modal/#varying-modal-content
      // for the non-jQuery JavaScript alternative
      id: $(e.relatedTarget).attr("data-id"),
    },
    success: function (result) {
      var resultCode = result.status.code;

      if (resultCode == 200) {
        // Update the hidden input with the employee id so that
        // it can be referenced when the form is submitted

        $("#editDepartmentID").val(result.data.department[0].id);

        $("#editDepartmentName").val(result.data.department[0].name);

        $("#editDepartmentLocation").html("");

        $.each(result.data.location, function () {
          $("#editDepartmentLocation").append(
            $("<option>", {
              value: this.id,
              text: this.name,
            })
          );
        });

        $("#editDepartmentLocation").val(result.data.department[0].locationID);
      } else {
        $("#editDepartmentModal .modal-title").replaceWith(
          "Error Retrieving Data"
        );
      }
    },
    error: function (jqXHR, textStatus, errorThrown) {
      $("#editDepartmentModal .modal-title").replaceWith(
        "Error Retrieving Data"
      );
    },
  });
});

$("#editDepartmentForm").on("submit", function (e) {
  // Executes when the form button with type="submit" is clicked
  // stop the default browser behviour

  e.preventDefault();

  // AJAX call to save form data
  $.ajax({
    url: "./libs/php/editDepartment.php",
    type: "POST",
    dataType: "json",
    data: {
      id: $("#editDepartmentID").val(),
      name: $("#editDepartmentName").val(),
      locationID: $("#editDepartmentLocation").val(),
    },
    success: function (result) {
      var resultCode = result.status.code;

      if (resultCode == 200) {
        $("#editDepartmentModal").modal("hide");
        refreshDepartmentsTable();
      } else {
        $("#editDepartmentModal .modal-title").replaceWith(
          "Error Editing Data"
        );
      }
    },
    error: function (jqXHR, textStatus, errorThrown) {
      $("#editDepartmentModal .modal-title").replaceWith("Error Editing Data");
    },
  });
});

$("#editLocationModal").on("show.bs.modal", function (e) {
  $.ajax({
    url: "./libs/php/getLocationByID.php",
    type: "POST",
    dataType: "json",
    data: {
      // Retrieve the data-id attribute from the calling button
      // see https://getbootstrap.com/docs/5.0/components/modal/#varying-modal-content
      // for the non-jQuery JavaScript alternative
      id: $(e.relatedTarget).attr("data-id"),
    },
    success: function (result) {
      var resultCode = result.status.code;

      if (resultCode == 200) {
        // Update the hidden input with the employee id so that
        // it can be referenced when the form is submitted

        $("#editLocationID").val(result.data.location[0].id);

        $("#editLocationName").val(result.data.location[0].name);
      } else {
        $("#editLocationModal .modal-title").replaceWith(
          "Error Retrieving Data"
        );
      }
    },
    error: function (jqXHR, textStatus, errorThrown) {
      $("#editLocationModal .modal-title").replaceWith("Error Retrieving Data");
    },
  });
});

$("#editLocationForm").on("submit", function (e) {
  // Executes when the form button with type="submit" is clicked
  // stop the default browser behviour

  e.preventDefault();

  // AJAX call to save form data
  $.ajax({
    url: "./libs/php/editLocation.php",
    type: "POST",
    dataType: "json",
    data: {
      id: $("#editLocationID").val(),
      name: $("#editLocationName").val(),
    },
    success: function (result) {
      var resultCode = result.status.code;

      if (resultCode == 200) {
        $("#editLocationModal").modal("hide");
        refreshLocationsTable();
      } else {
        $("#editLocationModal .modal-title").replaceWith("Error Editing Data");
      }
    },
    error: function (jqXHR, textStatus, errorThrown) {
      $("#editLocationModal .modal-title").replaceWith("Error Editing Data");
    },
  });
});

$("#addPersonnelModal").on("show.bs.modal", function (e) {
  $.ajax({
    url: "./libs/php/getAllDepartments.php",
    type: "POST",
    dataType: "json",
    success: function (result) {
      var resultCode = result.status.code;

      if (resultCode == 200) {
        // No hidden ID is needed
        // No first name, last name, job title, email address are needed

        $("#addPersonnelDepartment").html("");

        $.each(result.data, function () {
          $("#addPersonnelDepartment").append(
            $("<option>", {
              value: this.id,
              text: this.name,
            })
          );
        });
      } else {
        $("#addPersonnelModal .modal-title").replaceWith(
          "Error Retrieving Data"
        );
      }
    },
    error: function (jqXHR, textStatus, errorThrown) {
      $("#addPersonnelModal .modal-title").replaceWith("Error Retrieving Data");
    },
  });
});

$("#addPersonnelForm").on("submit", function (e) {
  // Executes when the form button with type="submit" is clicked
  // stop the default browser behviour

  e.preventDefault();

  // AJAX call to save form data
  $.ajax({
    url: "./libs/php/insertPersonnel.php",
    type: "POST",
    dataType: "json",
    data: {
      firstName: $("#addPersonnelFirstName").val(),
      lastName: $("#addPersonnelLastName").val(),
      jobTitle: $("#addPersonnelJobTitle").val(),
      email: $("#addPersonnelEmailAddress").val(),
      departmentID: $("#addPersonnelDepartment").val(),
    },
    success: function (result) {
      var resultCode = result.status.code;

      if (resultCode == 200) {
        $("#addPersonnelFirstName").val("");
        $("#addPersonnelLastName").val("");
        $("#addPersonnelJobTitle").val("");
        $("#addPersonnelEmailAddress").val("");
        $("#addPersonnelModal").modal("hide");
        returnForSearchInput();
      } else {
        $("#addPersonnelModal .modal-title").replaceWith("Error Adding Data");
      }
    },
    error: function (jqXHR, textStatus, errorThrown) {
      $("#addPersonnelModal .modal-title").replaceWith("Error Adding Data");
    },
  });
});

$("#addDepartmentModal").on("show.bs.modal", function (e) {
  $.ajax({
    url: "./libs/php/getAllLocations.php",
    type: "POST",
    dataType: "json",
    success: function (result) {
      var resultCode = result.status.code;

      if (resultCode == 200) {
        // No hidden ID is needed
        // No department name is needed

        $("#addDepartmentLocation").html("");

        $.each(result.data, function () {
          $("#addDepartmentLocation").append(
            $("<option>", {
              value: this.id,
              text: this.name,
            })
          );
        });
      } else {
        $("#addDepartmentModal .modal-title").replaceWith(
          "Error Retrieving Data"
        );
      }
    },
    error: function (jqXHR, textStatus, errorThrown) {
      $("#editDepartmentModal .modal-title").replaceWith(
        "Error Retrieving Data"
      );
    },
  });
});

$("#addDepartmentForm").on("submit", function (e) {
  // Executes when the form button with type="submit" is clicked
  // stop the default browser behviour

  e.preventDefault();

  // AJAX call to save form data
  $.ajax({
    url: "./libs/php/insertDepartment.php",
    type: "POST",
    dataType: "json",
    data: {
      name: $("#addDepartmentName").val(),
      locationID: $("#addDepartmentLocation").val(),
    },
    success: function (result) {
      var resultCode = result.status.code;

      if (resultCode == 200) {
        $("#addDepartmentName").val("");
        $("#addDepartmentModal").modal("hide");
        refreshDepartmentsTable();
      } else {
        $("#addDepartmentModal .modal-title").replaceWith("Error Adding Data");
      }
    },
    error: function (jqXHR, textStatus, errorThrown) {
      $("#addDepartmentModal .modal-title").replaceWith("Error Adding Data");
    },
  });
});

// No addLocationModal show.bs.modal is needed

$("#addLocationForm").on("submit", function (e) {
  // Executes when the form button with type="submit" is clicked
  // stop the default browser behviour

  e.preventDefault();

  // AJAX call to save form data
  $.ajax({
    url: "./libs/php/insertLocation.php",
    type: "POST",
    dataType: "json",
    data: {
      name: $("#addLocationName").val(),
    },
    success: function (result) {
      var resultCode = result.status.code;

      if (resultCode == 200) {
        $("#addLocationName").val("");
        $("#addLocationModal").modal("hide");
        refreshLocationsTable();
      } else {
        $("#addLocationModal .modal-title").replaceWith("Error Adding Data");
      }
    },
    error: function (jqXHR, textStatus, errorThrown) {
      $("#addLocationModal .modal-title").replaceWith("Error Adding Data");
    },
  });
});

$("#deletePersonnelModal").on("show.bs.modal", function (e) {
  // Update the hidden input with the employee id so that
  // it can be referenced when the form is submitted

  $("#deletePersonnelID").val($(e.relatedTarget).attr("data-id"));

  // Call AJAX to retrieve the employee's name
  $.ajax({
    url: "./libs/php/getPersonnelByID.php",
    type: "POST",
    dataType: "json",
    data: {
      // Retrieve the data-id attribute from the calling button
      // see https://getbootstrap.com/docs/5.0/components/modal/#varying-modal-content
      // for the non-jQuery JavaScript alternative
      id: $(e.relatedTarget).attr("data-id"),
    },
    success: function (result) {
      var resultCode = result.status.code;

      if (resultCode == 200) {
        $("#deletePersonnelAlert")
          .empty()
          .append("Are you sure that you want to remove the entry for ")
          .append(
            $("<strong>").text(
              result.data.personnel[0].firstName +
                " " +
                result.data.personnel[0].lastName
            )
          )
          .append("?");
        $("#deletePersonnelModal .modal-footer button[type='submit']").prop(
          "disabled",
          false
        );
      } else {
        $("#deletePersonnelModal .modal-title").replaceWith(
          "Error Retrieving Data"
        );
      }
    },
    error: function (jqXHR, textStatus, errorThrown) {
      $("#deletePersonnelModal .modal-title").replaceWith(
        "Error Retrieving Data"
      );
    },
  });
});

$("#deletePersonnelForm").on("submit", function (e) {
  // Executes when the form button with type="submit" is clicked
  // stop the default browser behviour

  e.preventDefault();

  // AJAX call to save form data
  $.ajax({
    url: "./libs/php/deletePersonnelByID.php",
    type: "POST",
    dataType: "json",
    data: {
      id: $("#deletePersonnelID").val(),
    },
    success: function (result) {
      var resultCode = result.status.code;

      if (resultCode == 200) {
        $("#deletePersonnelModal").modal("hide");
        returnForSearchInput();
      } else {
        $("#deletePersonnelModal .modal-title").replaceWith(
          "Error Deleting Data"
        );
      }
    },
    error: function (jqXHR, textStatus, errorThrown) {
      $("#deletePersonnelModal .modal-title").replaceWith(
        "Error Deleting Data"
      );
    },
  });
});

$("#deleteDepartmentModal").on("show.bs.modal", function (e) {
  $.ajax({
    url: "./libs/php/getDepartmentDependenciesByID.php",
    type: "POST",
    dataType: "json",
    data: {
      // Retrieve the data-id attribute from the calling button
      // see https://getbootstrap.com/docs/5.0/components/modal/#varying-modal-content
      // for the non-jQuery JavaScript alternative
      id: $(e.relatedTarget).attr("data-id"),
    },
    success: function (result01) {
      var resultCode01 = result01.status.code;
      console.log(result01);

      if (resultCode01 == 200) {
        // Another AJAX call to retrieve the department's name
        $.ajax({
          url: "./libs/php/getDepartmentByID.php",
          type: "POST",
          dataType: "json",
          data: {
            // Retrieve the data-id attribute from the calling button
            // see https://getbootstrap.com/docs/5.0/components/modal/#varying-modal-content
            // for the non-jQuery JavaScript alternative
            id: $(e.relatedTarget).attr("data-id"),
          },
          success: function (result02) {
            var resultCode02 = result02.status.code;
            console.log(result02);

            if (resultCode02 == 200) {
              // Update the hidden input with the employee id so that
              // it can be referenced when the form is submitted
              $("#deleteDepartmentID").val($(e.relatedTarget).attr("data-id"));
              if (result01.data.count == 0) {
                $("#deleteDepartmentModal .modal-title").text(
                  "Remove department?"
                );
                $("#deleteDepartmentAlert")
                  .empty()
                  .append("Are you sure that you want to remove the entry for ")
                  .append($("<strong>").text(result02.data.department[0].name))
                  .append("?");
                $(
                  "#deleteDepartmentModal .modal-footer button[type='submit']"
                ).toggle(true);
                $(
                  "#deleteDepartmentModal .modal-footer button[data-bs-dismiss='modal']"
                ).text("NO");
              } else if (result01.data.count > 0) {
                $("#deleteDepartmentModal .modal-title").text(
                  "Cannot remove department ..."
                );
                $("#deleteDepartmentAlert")
                  .empty()
                  .append("You cannot remove the entry for ")
                  .append($("<strong>").text(result02.data.department[0].name))
                  .append(" because it has ")
                  .append($("<strong>").text(String(result01.data.count)))
                  .append(" employees assigned to it.");
                $(
                  "#deleteDepartmentModal .modal-footer button[type='submit']"
                ).toggle(false);
                $(
                  "#deleteDepartmentModal .modal-footer button[data-bs-dismiss='modal']"
                ).text("OK");
              }
            } else {
              $("#deleteDepartmentModal .modal-title").replaceWith(
                "Error Retrieving Data"
              );
            }
          },
          error: function (jqXHR, textStatus, errorThrown) {
            $("#deleteDepartmentModal .modal-title").replaceWith(
              "Error Retrieving Data"
            );
          },
        });
        // End of another AJAX call
      } else {
        $("#deleteDepartmentModal .modal-title").replaceWith(
          "Error Retrieving Data"
        );
      }
    },
    error: function (jqXHR, textStatus, errorThrown) {
      $("#deleteDepartmentModal .modal-title").replaceWith(
        "Error Retrieving Data"
      );
    },
  });
});

$("#deleteDepartmentForm").on("submit", function (e) {
  // Executes when the form button with type="submit" is clicked
  // stop the default browser behviour

  e.preventDefault();

  // AJAX call to save form data
  $.ajax({
    url: "./libs/php/deleteDepartmentByID.php",
    type: "POST",
    dataType: "json",
    data: {
      id: $("#deleteDepartmentID").val(),
    },
    success: function (result) {
      var resultCode = result.status.code;

      if (resultCode == 200) {
        $("#deleteDepartmentModal").modal("hide");
        refreshDepartmentsTable();
      } else {
        $("#deleteDepartmentModal .modal-title").replaceWith(
          "Error Deleting Data"
        );
      }
    },
    error: function (jqXHR, textStatus, errorThrown) {
      $("#deleteDepartmentModal .modal-title").replaceWith(
        "Error Deleting Data"
      );
    },
  });
});

$("#deleteLocationModal").on("show.bs.modal", function (e) {
  $.ajax({
    url: "./libs/php/getLocationDependenciesByID.php",
    type: "POST",
    dataType: "json",
    data: {
      // Retrieve the data-id attribute from the calling button
      // see https://getbootstrap.com/docs/5.0/components/modal/#varying-modal-content
      // for the non-jQuery JavaScript alternative
      id: $(e.relatedTarget).attr("data-id"),
    },
    success: function (result01) {
      var resultCode01 = result01.status.code;

      if (resultCode01 == 200) {
        // Another AJAX call to retrieve the location's name
        $.ajax({
          url: "./libs/php/getLocationByID.php",
          type: "POST",
          dataType: "json",
          data: {
            // Retrieve the data-id attribute from the calling button
            // see https://getbootstrap.com/docs/5.0/components/modal/#varying-modal-content
            // for the non-jQuery JavaScript alternative
            id: $(e.relatedTarget).attr("data-id"),
          },
          success: function (result02) {
            var resultCode02 = result02.status.code;

            if (resultCode02 == 200) {
              // Update the hidden input with the employee id so that
              // it can be referenced when the form is submitted
              $("#deleteLocationID").val($(e.relatedTarget).attr("data-id"));
              if (result01.data.count == 0) {
                $("#deleteLocationModal .modal-title").text("Remove location?");
                $("#deleteLocationAlert")
                  .empty()
                  .append("Are you sure that you want to remove the entry for ")
                  .append($("<strong>").text(result02.data.location[0].name))
                  .append("?");
                $(
                  "#deleteLocationModal .modal-footer button[type='submit']"
                ).toggle(true);
                $(
                  "#deleteLocationModal .modal-footer button[data-bs-dismiss='modal']"
                ).text("NO");
              } else if (result01.data.count > 0) {
                $("#deleteLocationModal .modal-title").text(
                  "Cannot remove location ..."
                );
                $("#deleteLocationAlert")
                  .empty()
                  .append("You cannot remove the entry for ")
                  .append($("<strong>").text(result02.data.location[0].name))
                  .append(" because it has ")
                  .append($("<strong>").text(String(result01.data.count)))
                  .append(" departments assigned to it.");
                $(
                  "#deleteLocationModal .modal-footer button[type='submit']"
                ).toggle(false);
                $(
                  "#deleteLocationModal .modal-footer button[data-bs-dismiss='modal']"
                ).text("OK");
              }
            } else {
              $("#deleteLocationModal .modal-title").replaceWith(
                "Error Retrieving Data"
              );
            }
          },
          error: function (jqXHR, textStatus, errorThrown) {
            $("#deleteLocationModal .modal-title").replaceWith(
              "Error Retrieving Data"
            );
          },
        });
        // End of another AJAX call
      } else {
        $("#deleteLocationModal .modal-title").replaceWith(
          "Error Retrieving Data"
        );
      }
    },
    error: function (jqXHR, textStatus, errorThrown) {
      $("#deleteLocationModal .modal-title").replaceWith(
        "Error Retrieving Data"
      );
    },
  });
});

$("#deleteLocationForm").on("submit", function (e) {
  // Executes when the form button with type="submit" is clicked
  // stop the default browser behviour

  e.preventDefault();

  // AJAX call to save form data
  $.ajax({
    url: "./libs/php/deleteLocationByID.php",
    type: "POST",
    dataType: "json",
    data: {
      id: $("#deleteLocationID").val(),
    },
    success: function (result) {
      var resultCode = result.status.code;

      if (resultCode == 200) {
        $("#deleteLocationModal").modal("hide");
        refreshLocationsTable();
      } else {
        $("#deleteLocationModal .modal-title").replaceWith(
          "Error Deleting Data"
        );
      }
    },
    error: function (jqXHR, textStatus, errorThrown) {
      $("#deleteLocationModal .modal-title").replaceWith("Error Deleting Data");
    },
  });
});

$("#filterPersonnelModal").on("show.bs.modal", function (e) {
  // Get all departments
  $.ajax({
    url: "./libs/php/getAllDepartments.php",
    type: "POST",
    dataType: "json",
    success: function (result) {
      var resultCode = result.status.code;

      if (resultCode == 200) {
        // $("#filterPersonnelDepartment").html("");

        // Add "All" option
        $("#filterPersonnelDepartment").append(
          $("<option>", {
            value: "0",
            text: "All",
          })
        );

        // Add department options
        $.each(result.data, function () {
          $("#filterPersonnelDepartment").append(
            $("<option>", {
              value: this.id,
              text: this.name,
            })
          );
        });
      } else {
        $("#filterPersonnelModal .modal-title").replaceWith(
          "Error Retrieving Data"
        );
      }
    },
    error: function (jqXHR, textStatus, errorThrown) {
      $("#filterPersonnelModal .modal-title").replaceWith(
        "Error Retrieving Data"
      );
    },
  });

  // Get all locations
  $.ajax({
    url: "./libs/php/getAllLocations.php",
    type: "POST",
    dataType: "json",
    success: function (result) {
      var resultCode = result.status.code;

      if (resultCode == 200) {
        // $("#filterPersonnelLocation").html("");

        // Add "All" option
        $("#filterPersonnelLocation").append(
          $("<option>", {
            value: "0",
            text: "All",
          })
        );

        // Add department options
        $.each(result.data, function () {
          $("#filterPersonnelLocation").append(
            $("<option>", {
              value: this.id,
              text: this.name,
            })
          );
        });
      } else {
        $("#filterPersonnelModal .modal-title").replaceWith(
          "Error Retrieving Data"
        );
      }
    },
    error: function (jqXHR, textStatus, errorThrown) {
      $("#filterPersonnelModal .modal-title").replaceWith(
        "Error Retrieving Data"
      );
    },
  });
});

$("#filterPersonnelDepartment").on("change", function () {
  // Update the hidden input with the chosen department id so that
  // it can be referenced when the form is submitted

  $("#filterPersonnelIDDepartment").val($(this).val());

  // Reset location ID
  $("#filterPersonnelIDLocation").val("0");

  // Reset location dropdown
  $("#filterPersonnelLocation").val("0");

  // Refresh table
  returnForSearchInput();
});

$("#filterPersonnelLocation").on("change", function () {
  // Update the hidden input with the chosen location id so that
  // it can be referenced when the form is submitted

  $("#filterPersonnelIDLocation").val($(this).val());

  // Reset department ID
  $("#filterPersonnelIDDepartment").val("0");

  // Reset department dropdown
  $("#filterPersonnelDepartment").val("0");

  // Refresh table
  returnForSearchInput();
});

// Initialise and add controls once DOM is ready
$(document).ready(function () {
  // Initialise tables
  refreshPersonnelTable();
  refreshDepartmentsTable();
  refreshLocationsTable();
});
