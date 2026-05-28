# 👥 STUDENT 1: Frontend & UI Developer Guide (HTML & CSS Specification)

This guide contains the exact requirements and instructions for creating the frontend interface of our **Hospital Appointment System** using simple English. 

**Instructions for Student 1**: 
1. Copy the entire contents of this file.
2. Open your AI Assistant (Claude Code) and paste this prompt.
3. Your assistant will generate `index.html`, `book.html`, `dashboard.html`, and `style.css` in the `/frontend` folder.
4. Once completed, your HTML and CSS will connect perfectly to the backend API written by Student 2!

---

## 🎨 Design Language & System (For your CSS)
We want a modern, premium, and trustworthy clinic vibe. Use the following design guidelines in your **style.css**:

- **Color Palette (CSS Variables)**:
  - `--primary`: HSL(220, 90%, 56%) (Modern Medical Blue)
  - `--primary-hover`: HSL(220, 90%, 46%) (Darker Blue)
  - `--accent`: HSL(150, 80%, 40%) (Trusting Mint Green)
  - `--bg-gradient`: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%) (Soft, professional background gradient)
  - `--text-main`: #1a202c (Premium charcoal for readability)
  - `--text-sub`: #4a5568 (Slate grey for descriptions)
  - `--glass-bg`: rgba(255, 255, 255, 0.75)
  - `--glass-border`: rgba(255, 255, 255, 0.4)
- **Glassmorphism**: Give forms, cards, and containers a glass look using:
  ```css
  background: var(--glass-bg);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid var(--glass-border);
  border-radius: 16px;
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.08);
  ```
- **Typography**: Import **Inter** from Google Fonts:
  `@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');`
- **Transitions**: Every hover action (buttons, cards, links) must have a smooth transition:
  `transition: all 0.3s ease;`

---

## 📄 HTML File Specifications & Exact DOM IDs

To make sure the frontend connects seamlessly with the backend API, please create the pages exactly as defined below. **All pages must reference `<script src="app.js"></script>` before the closing `</body>` tag.**

### 1. `index.html` (Clinic Information & Hero)
This is the homepage of the clinic. It should be warm, informative, and professional.
- **Hero Section**: 
  - An impressive title: `<h1>Care & Trust for a Healthier Life</h1>`
  - A descriptive paragraph in simple English about our medical staff.
  - A stylish CTA button linking to the booking page: `<a href="book.html" class="btn-primary">Book an Appointment Now</a>`
- **Features Grid**: A section highlighting our modern facilities, 24/7 care, and expert doctors using elegant glassmorphic cards.
- **Navigation Bar**: Include a logo, and links for **Home** (`index.html`), **Book Appointment** (`book.html`), and **My Appointments** (`dashboard.html`).

### 2. `book.html` (Appointment Booking Form)
This page allows patients to select their department, doctor, and time.
- **Navigation Bar**: Same header as `index.html`.
- **Form Component**:
  - Set form element with ID: `<form id="appointmentForm">`
  - **Inputs Required** (Use exact `id` attributes):
    - Patient Name: `<input type="text" id="patientName" required placeholder="Enter your full name">`
    - Patient Email: `<input type="email" id="patientEmail" required placeholder="name@example.com">`
    - Department Selection: 
      ```html
      <select id="departmentSelect" required>
        <option value="" disabled selected>Select a Department</option>
      </select>
      ```
    - Doctor Selection:
      ```html
      <select id="doctorSelect" required disabled>
        <option value="" disabled selected>Select a Doctor</option>
      </select>
      ```
    - Appointment Date & Time: `<input type="datetime-local" id="appointmentTime" required>`
  - Submit Button: `<button type="submit" id="submitBtn">Confirm Booking</button>`
  - Alert Message Box: A hidden element to display success or error messages to the user:
    `<div id="messageBox" class="message-box hidden"></div>`

### 3. `dashboard.html` (View & Manage Appointments)
This page displays previously booked appointments in beautiful layout cards.
- **Navigation Bar**: Same header as `index.html`.
- **Search Bar Section**: 
  - To view appointments, patients search using their email address.
  - Search Input: `<input type="email" id="searchEmail" required placeholder="Enter your email to view your appointments">`
  - Search Button: `<button id="searchBtn">View Appointments</button>`
- **Appointments Container**:
  - Container element with ID: `<div id="appointmentsContainer"></div>`
  - Inside this container, Student 2's javascript will dynamically append cards.
  - **CSS Styling for Cards**: Create a CSS class `.appointment-card` that styles these cards. Inside each card, include a Delete/Cancel button styled with class `.cancel-btn` and containing `data-id` attribute so users can cancel their appointments.

---

## 📝 Example CSS Helper Classes to Write in `style.css`

Ensure these classes are styled elegantly in your CSS file so they are ready for the dynamic data:

```css
/* Card Container */
.appointment-card {
  background: var(--glass-bg);
  border: 1px solid var(--glass-border);
  padding: 20px;
  border-radius: 16px;
  margin-bottom: 15px;
  box-shadow: 0 4px 15px rgba(0,0,0,0.05);
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: transform 0.2s ease;
}

.appointment-card:hover {
  transform: translateY(-2px);
}

/* Cancel Button styling */
.cancel-btn {
  background-color: #e53e3e; /* Warm professional red */
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 500;
  transition: background-color 0.2s;
}

.cancel-btn:hover {
  background-color: #c53030;
}

/* Success/Error message box */
.message-box {
  padding: 12px 16px;
  border-radius: 8px;
  margin-top: 15px;
  font-size: 14px;
  text-align: center;
}
.message-box.success {
  background-color: #c6f6d5;
  color: #22543d;
  border: 1px solid #9ae6b4;
}
.message-box.error {
  background-color: #fed7d7;
  color: #742a2a;
  border: 1px solid #feb2b2;
}
.hidden {
  display: none !important;
}
```
