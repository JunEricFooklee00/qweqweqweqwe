//Delete Job
function deleteJob(id){
  const _id = document.querySelector(".clickable-item" + id + "").getAttribute("data-id")

  dataContainer.style.display = 'none'

  alert("You have Clicked Me! Your id is " + _id + "")

  fetch("/DeleteJob", {
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify({ id:_id })
  })
  .then(res => res.json())
  .then(data => {
      if(data.success){
        
      }
  })
  .catch(err => {
      alert(err)
  })
}

$(document).ready(function() {

  // Get the timestamp of the last fetched data
  const lastTimestamp = $('#users-container').data('last-timestamp')
  
  // Define a function to fetch the data from the server
  function fetchData() {
    $.ajax({
      url: '/jobs?timestamp=' + lastTimestamp,
      type: 'GET',
      dataType: 'json',
      success: function(jobs) {
        // Update the HTML with the fetched data
        let html = ''
        for (let i = 0; i < jobs.length; i++) {
          html += '<div class="deleteContainer">';
          html += '<button class="deleteButton" onclick="deleteJob(' + i + ')">';
          html += '<div class="material-symbols-sharp" style="color: red;">delete</div>';
          html += '</button>';
          html += '</div>';
          html += '<div class="clickable-item' + i + '" onclick="showEntry(' + i + ')" data-id="' + jobs[i]._id + '" style="overflow: hidden; margin-top: -50px; margin-bottom: 10px;">';
          html += '<div class="project_prog">';
          html += '<span class="material-symbols-sharp">analytics</span>';
          html += '<div class="middle">';
          html += '<div class="left">';
          html += '<h3 font-family: poppins, sans-serif;>Type of Work:' + jobs[i].TypeOfWork + '</h3>';
          html += '<h1 style = font-size:20px; font-family: poppins, sans-serif;>Client Name:' + jobs[i].name + '</h1>';
          html += '</div>';
          html += '</div>';
          html += '<small class="text-muted">Last 24 Hours</small>';
          html += '</div>';
          html += '<div class="additional-info" style="display: none;" id="info-' + i + '">';
          html += '<table class="table">';
          html += '<tr>';
          html += '<th style="width: auto;">Starting Date</th>';
          html += '<td>' + jobs[i].StartingDate + '</td>';
          html += '</tr>';
          html += '<tr>';
          html += '<th style="width: auto;">Expected Finish Date</th>';
          html += '<td>' + jobs[i].ExpectedFinishDate + '</td>';
          html += '</tr>';
          html += '<tr>';
          html += '<th style="width: auto;">Area</th>';
          html += '<td>' + jobs[i].Area + '</td>';
          html += '</tr>';
          html += '<tr>';
          html += '<th style="width: auto;">Unit</th>';
          html += '<td>' + jobs[i].Unit + '</td>';
          html += '</tr>';
          html += '<tr>';
          html += '<th style="width: auto;">Location</th>';
          html += '<td>' + jobs[i].Location + '</td>';
          html += '</tr>';
          html += '</table>';
          html += '</div>';
          html += '</div>';
        }
        $('#jobs-container').html(html);
      },
      error: function() {
        console.log('Error fetching data from the server')
      }
    })
  }

  // Call the fetchData function immediately
  fetchData();

  // Call the fetchData function every 1 seconds
  // setInterval(fetchData, 1000)
});

const inputArea = document.querySelector(".form-select")
const inputUnit = document.querySelector(".Unit")
const showArea = document.querySelector(".inputArea")

inputArea.addEventListener("change", () => {
  const selectedOptionValue = inputArea.value
  const selectIdValue = document.querySelector(`[value="${selectedOptionValue}"]`).getAttribute("id-data")

  switch (selectIdValue) {
    case "Site Preparation":
      showArea.innerHTML = "Value of Area should be in SI: Lot"
      inputUnit.value = "Lot"
      break;

    case "Carpentry Works":
      showArea.innerHTML = "Value of Area should be in SI: Square Meter"
      inputUnit.value = "Square Meter"
      break;

    case "Mechanical/Metal Works":
      showArea.innerHTML = "Value of Area should be in SI: Square Meter"
      inputUnit.value = "Square Meter"
      break;

    case "Plumbing Works":
      showArea.innerHTML = "Value of Area should be in SI: Linear Meter"
      inputUnit.value = "Linear Meter"
      break;

    case "Masonry & Concrete Works":
      showArea.innerHTML = "Value of Area should be in SI: Square Meter"
      inputUnit.value = "Square Meter"
      break;

    case "Electrical Works":
      showArea.innerHTML = "Value of Area should be in SI: Lot"
      inputUnit.value = "Lot"
      break;

    case "Painting Works":
      showArea.innerHTML = "Value of Area should be in SI: Square Meter"
      inputUnit.value = "Square Meter"
      break;

      default:
          break;
  }
})

// Get the clickable items and the info table
const infoTable = document.querySelector('#info-table tbody')
const infoTC= document.querySelector('.info-table-container')
const dataContainer = document.querySelector('.data-container')

// Hide the data container by default
dataContainer.style.display = 'none'

// Loop through each clickable-item div and add a click event listener
function showEntry(number){
  const info = document.querySelector(`#info-${number}`).innerHTML

  // Populate the info table with the additional info
  infoTable.innerHTML = info

  // Show the data container
  dataContainer.style.display = 'block'
}

// const RFopenModalButtons = document.querySelectorAll('[data-modal-target="#RFmodal"]')
// const RFcloseModalButtons = document.querySelectorAll('[data-close-buttonRF]')
// const RFoverlay = document.getElementById('RFoverlay')

// RFopenModalButtons.forEach(button => {
//   button.addEventListener('click', () => {
//     const modal = document.querySelector(button.dataset.modalTarget)
//     RFopenModal(modal)
//   })
// })

// RFoverlay.addEventListener('click', () => {
//   const modals = document.querySelectorAll('.RFmodal.active')
//   modals.forEach(modal => {
//     RFcloseModal(modal)
//   })
// })

// RFcloseModalButtons.forEach(button => {
//   button.addEventListener('click', () => {
//     const modal = button.closest('.RFmodal')
//     RFcloseModal(modal)
//   })
// })

// function RFopenModal(modal) {
//   if (modal == null) return
//   modal.classList.add('active')
//   RFoverlay.classList.add('active')
// }

// function RFcloseModal(modal) {
//   if (modal == null) return
//   modal.classList.remove('active')
//   RFoverlay.classList.remove('active')
// }

// Get the modal element
const modal = document.getElementById('exampleModal');

// When the user clicks outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

function submitForm(event){
  event.preventDefault()
  const form = event.target

  fetch("/JobOrder", {
      method: "POST",
      headers: {
          "Content-Type": "application/json"
      },
      body: JSON.stringify({ 
        name:form.name.value,
        TypeOfWork:form.TypeOfWork.value,
        Area:form.Area.value,
        Unit:form.Unit.value,
        Location:form.Location.value,
        StartingDate:form.StartingDate.value,
        ExpectedFinishDate:form.ExpectedFinishDate.value })
  })
  .then(res => res.json())
  .then(data => {
      if(data.success){
        alert("Job Order Submitted")
        document.getElementById("JOmodal").classList.remove('active')
        document.getElementById("JOoverlay").classList.remove('active')
        form.TypeOfWork.value = "Choose Type of Work"
        form.Area.value = ""
        form.Unit.value = ""
        form.Location.value = ""
        form.StartingDate.value = ""
        form.ExpectedFinishDate.value = ""
        showArea.innerHTML = ""
      }
  })
  .catch(err => {
      alert(err)
  })
}