# 📄 Project Report: Hospital Appointment System

**Course Code / Course Title**  
**Instructor Name:** [Enter Instructor Name]  
**Submission Date:** May 2026  

---

## 👥 Group Members & Task Division

### Student 1 (Frontend & UI Developer)
- **Name:** [Enter Student 1 Name]
- **Student ID:** [Enter Student 1 ID]
- **Role:** Web Interface Design & Styling (HTML, CSS)
- **Contributions:** Created index.html (landing page), book.html (booking form), dashboard.html (my appointments cards), and style.css (custom glassmorphic theme).

### Student 2 (Backend, Cloud & DevOps Developer)
- **Name:** [Enter Student 2 Name (You!)]
- **Student ID:** [Enter Student 2 ID]
- **Role:** Serverless API, Data Flow, Azure & GitHub Workflows
- **Contributions:** Programmed Azure Functions APIs (Node.js), connected frontend using JS `fetch()`, prepared GitHub Actions CI/CD workflows, and hosted resources on Microsoft Azure.

---

## 💻 1. Application Description & Functionality

The **Hospital Appointment System** is a lightweight, responsive, and modern web-based application designed to help patients book and manage their doctor appointments online with extreme ease. 

### Key Features:
1. **Clinical Introduction & Navigation (index.html)**:
   - A beautiful landing page introducing clinic departments (Cardiology, Neurology, Pediatrics, Orthopedics) and a direct Call-To-Action (CTA) button to book appointments.
2. **Dynamic Appointment Booking (book.html)**:
   - Users can fill in their name and email, choose a clinical department, and select a doctor.
   - The department list and doctor drop-downs are loaded dynamically from the Azure Function API.
   - Users select a preferred date and time, and receive an instant success/error status confirmation box.
3. **Appointment Management Dashboard (dashboard.html)**:
   - Patients can type their email address to view a clean layout of their booked appointments.
   - Each appointment card displays details (Doctor, Department, Date/Time, and Patient info).
   - Patients can cancel (delete) any of their active appointments directly with an instant confirmation refresh.

---

## ⚙️ 2. Technology Stack & Cloud Architecture

Our application is built using a modern decoupled architecture:
- **Frontend Layer**: Built using static **HTML5**, custom **Vanilla CSS3** featuring a glassmorphic color palette, and **JavaScript (ES6)** for API data retrieval.
- **Backend API Layer**: **Azure Functions** running on **Node.js (v4 Programming Model)**.
- **Data Layer**: An in-memory and file-persistent storage system running directly inside the serverless functions environment for zero-cost operation.
- **CI/CD Pipeline (DevOps)**: Automated workflows using **GitHub Actions** that build and push frontend changes to Azure App Service and backend changes to Azure Function App on every commit.

---

## 🖼️ 3. Azure & GitHub Deployments (Screen Captures)

*Please insert your actual screenshots in the placeholders below:*

### a. Web App Overview Page (Azure App Service - Frontend Host)
*This page shows the status, resource group, URL, and location of the web app hosting your HTML/CSS files.*

> 📷 **[INSERT SCREENSHOT HERE]**  
> *To capture this: Go to your Azure Portal -> Select your App Service (Web App) -> Open the "Overview" page -> Take a screenshot showing status "Running".*

---

### b. Azure Function App Overview Page (Backend API Host)
*This page shows the status, URL, and runtime stack (Node.js) of your API Functions.*

> 📷 **[INSERT SCREENSHOT HERE]**  
> *To capture this: Go to your Azure Portal -> Select your Function App -> Open the "Overview" page -> Take a screenshot showing the list of functions (`getDoctors`, `bookAppointment`, `listAppointments`).*

---

### c. GitHub Workflows / Actions Status Page
*This page shows your automated CI/CD pipeline runs and successful green checkmarks representing successful builds and deployments.*

> 📷 **[INSERT SCREENSHOT HERE]**  
> *To capture this: Go to your GitHub Repository -> Click on the "Actions" tab -> Take a screenshot of the recent workflow run history showing "Build and Deploy Frontend" / "Build and Deploy Backend" with green checkmarks.*

---

## 🔗 4. Project Links

- **GitHub Repository Link:**  
  `https://github.com/[YOUR-USERNAME]/[YOUR-REPO-NAME]`
  
- **Deployed Web Application URL:**  
  `https://[YOUR-WEB-APP-NAME].azurewebsites.net`

- **Deployed Backend API URL:**  
  `https://[YOUR-FUNCTION-APP-NAME].azurewebsites.net/api/`
