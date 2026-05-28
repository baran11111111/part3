/**
 * Hospital Appointment System - Frontend Logic (app.js)
 * 
 * Connecting HTML files to our Azure Function API.
 * Student 2: Backend, Cloud & DevOps Developer
 */

// --- 🌐 API CONFIGURATION ---
// Automatically detect if we are running under the local Express server (port 3000),
// if we are in a deployed production environment (e.g. Azure App Service),
// or if we are using the local Azure Functions Core Tools (port 7071).
const API_BASE_URL = (window.location.port === "3000" || (window.location.hostname !== "localhost" && window.location.hostname !== "127.0.0.1" && !window.location.port))
  ? "/api"
  : "http://localhost:7071/api";

// Helper object to store loaded departments and doctors
let localDepartmentsData = {};

// Wait for the page content to load completely
document.addEventListener("DOMContentLoaded", () => {
  console.log("Hospital App initialized!");

  // Detect which HTML page the user is currently visiting
  const bookingForm = document.getElementById("appointmentForm");
  const dashboardSearchBtn = document.getElementById("searchBtn");

  if (bookingForm) {
    // We are on book.html (Booking Page)
    initializeBookingPage();
  }

  if (dashboardSearchBtn) {
    // We are on dashboard.html (My Appointments Page)
    initializeDashboardPage();
  }
});

// ==========================================
// ðŸ“… BOOKING PAGE FUNCTIONALITY (book.html)
// ==========================================

function initializeBookingPage() {
  const deptSelect = document.getElementById("departmentSelect");
  const docSelect = document.getElementById("doctorSelect");
  const bookingForm = document.getElementById("appointmentForm");
  const msgBox = document.getElementById("messageBox");

  // 1. Fetch departments and doctors from Azure Function API
  fetch(`${API_BASE_URL}/getDoctors`)
    .then(response => {
      if (!response.ok) throw new Error("Failed to fetch doctors from API.");
      return response.json();
    })
    .then(data => {
      localDepartmentsData = data;
      // Populate Department Dropdown
      deptSelect.innerHTML = '<option value="" disabled selected>Select a Department</option>';
      Object.keys(data).forEach(dept => {
        const option = document.createElement("option");
        option.value = dept;
        option.textContent = dept;
        deptSelect.appendChild(option);
      });
    })
    .catch(error => {
      console.error("Error loading doctors list:", error);
      showAlert("Error loading doctors. Make sure your local API is running!", "error");
    });

  // 2. When a department is selected, update and enable doctor list
  deptSelect.addEventListener("change", (e) => {
    const selectedDept = e.target.value;
    const doctors = localDepartmentsData[selectedDept] || [];

    docSelect.innerHTML = '<option value="" disabled selected>Select a Doctor</option>';
    doctors.forEach(doc => {
      const option = document.createElement("option");
      option.value = doc.name;
      option.textContent = `${doc.name} (${doc.title})`;
      docSelect.appendChild(option);
    });

    docSelect.disabled = false;
  });

  // 3. Handle appointment booking submission
  bookingForm.addEventListener("submit", (e) => {
    e.preventDefault(); // Prevent standard page reload

    const patientName = document.getElementById("patientName").value;
    const patientEmail = document.getElementById("patientEmail").value;
    const department = deptSelect.value;
    const doctor = docSelect.value;
    const appointmentTime = document.getElementById("appointmentTime").value;

    const bookingPayload = {
      patientName,
      patientEmail,
      department,
      doctor,
      appointmentTime
    };

    // Show booking loading feedback
    const submitBtn = document.getElementById("submitBtn");
    submitBtn.textContent = "Booking in progress...";
    submitBtn.disabled = true;

    // POST the appointment details to Azure Function
    fetch(`${API_BASE_URL}/bookAppointment`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(bookingPayload)
    })
      .then(response => {
        if (!response.ok) {
          return response.json().then(errData => {
            throw new Error(errData.error || "Failed to book appointment.");
          });
        }
        return response.json();
      })
      .then(result => {
        showAlert("Success! Your appointment has been booked.", "success");
        bookingForm.reset();
        docSelect.disabled = true;
      })
      .catch(error => {
        console.error("Booking error:", error);
        showAlert(`Booking failed: ${error.message}`, "error");
      })
      .finally(() => {
        submitBtn.textContent = "Confirm Booking";
        submitBtn.disabled = false;
      });
  });

  // Helper to show success/error boxes
  function showAlert(message, type) {
    msgBox.textContent = message;
    msgBox.className = `message-box ${type}`;
    msgBox.classList.remove("hidden");
  }
}

// ==========================================
// ðŸ“Š DASHBOARD PAGE FUNCTIONALITY (dashboard.html)
// ==========================================

function initializeDashboardPage() {
  const searchEmailInput = document.getElementById("searchEmail");
  const searchBtn = document.getElementById("searchBtn");
  const container = document.getElementById("appointmentsContainer");

  // Fetch appointments when the search button is clicked
  searchBtn.addEventListener("click", () => {
    const email = searchEmailInput.value.trim();

    if (!email) {
      alert("Please enter your email to search!");
      return;
    }

    fetchAppointments(email);
  });

  // Helper function to fetch and display appointments
  function fetchAppointments(email) {
    container.innerHTML = "<p style='text-align: center;'>Loading appointments...</p>";

    fetch(`${API_BASE_URL}/listAppointments?email=${encodeURIComponent(email)}`)
      .then(response => {
        if (!response.ok) throw new Error("Could not fetch appointments.");
        return response.json();
      })
      .then(appointments => {
        container.innerHTML = ""; // Clear loader

        if (appointments.length === 0) {
          container.innerHTML = `
            <div style="text-align: center; padding: 20px; color: var(--text-sub);">
              No active appointments found for <strong>${email}</strong>.
            </div>
          `;
          return;
        }

        // Render card for each appointment
        appointments.forEach(apt => {
          // Format date for better readability
          const dateObj = new Date(apt.appointmentTime);
          const formattedDate = dateObj.toLocaleDateString("en-US", {
            weekday: 'short', year: 'numeric', month: 'short', day: 'numeric',
            hour: '2-digit', minute: '2-digit'
          });

          const card = document.createElement("div");
          card.className = "appointment-card";
          card.innerHTML = `
            <div>
              <h3 style="margin: 0 0 5px 0; color: var(--primary);">${apt.doctor}</h3>
              <p style="margin: 0 0 5px 0; font-size: 14px; font-weight: 500;">
                Department: <span style="color: var(--text-main);">${apt.department}</span>
              </p>
              <p style="margin: 0 0 5px 0; font-size: 14px; color: var(--text-sub);">
                ðŸ“… ${formattedDate}
              </p>
              <p style="margin: 0; font-size: 12px; color: var(--text-sub);">
                Patient: ${apt.patientName} (${apt.patientEmail})
              </p>
            </div>
            <div>
              <button class="cancel-btn" data-id="${apt.id}">Cancel</button>
            </div>
          `;

          container.appendChild(card);
        });

        // Add event listeners to all cancel buttons
        const cancelButtons = container.querySelectorAll(".cancel-btn");
        cancelButtons.forEach(btn => {
          btn.addEventListener("click", (e) => {
            const appointmentId = e.target.getAttribute("data-id");
            if (confirm("Are you sure you want to cancel this appointment?")) {
              cancelAppointment(appointmentId, email);
            }
          });
        });
      })
      .catch(error => {
        console.error("Dashboard error:", error);
        container.innerHTML = `<p style="color: #e53e3e; text-align: center;">Error loading dashboard: ${error.message}</p>`;
      });
  }

  // Helper function to cancel an appointment
  function cancelAppointment(id, email) {
    fetch(`${API_BASE_URL}/listAppointments?id=${encodeURIComponent(id)}`, {
      method: "DELETE"
    })
      .then(response => {
        if (!response.ok) throw new Error("Could not cancel appointment.");
        return response.json();
      })
      .then(data => {
        alert(data.message || "Appointment cancelled successfully!");
        fetchAppointments(email); // Refresh dashboard
      })
      .catch(error => {
        console.error("Cancel error:", error);
        alert(`Failed to cancel: ${error.message}`);
      });
  }
}
