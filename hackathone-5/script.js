// document.getElementById("ResumeForm")?.addEventListener("submit", function (event: Event) {
//     event.preventDefault();
//     // Helper function to safely get an element by ID
//     const getElement = <T extends HTMLElement>(id: string): T | null => document.getElementById(id) as T | null;
//     // Fetch the input elements using the helper function
//     const nameElement = getElement<HTMLInputElement>("fullName");
//     const emailElement = getElement<HTMLInputElement>("email");
//     const phoneElement = getElement<HTMLInputElement>("phoneNumber");
//     const educationElement = getElement<HTMLTextAreaElement>("education");
//     const experienceElement = getElement<HTMLTextAreaElement>("Experience");
//     const skillsElement = getElement<HTMLTextAreaElement>("skills");
//     // Ensure all elements are found and non-null
//     if (nameElement && emailElement && phoneElement && educationElement && experienceElement && skillsElement) {
//         const name = nameElement.value;
//         const email = emailElement.value;
//         const phone = phoneElement.value;
//         const education = educationElement.value;
//         const experience = experienceElement.value;
//         const skills = skillsElement.value;
//         // Create resume output
//         const resumeOutput = `
//             <h2>Resume</h2>
//             <p><b>Name:</b> <span contenteditable="true">${name}</span></p>
//             <p><b>Email:</b> <span contenteditable="true">${email}</span></p>
//             <p><b>Phone:</b> <span contenteditable="true">${phone}</span></p>
//             <h3>Education</h3>
//             <p contenteditable="true">${education}</p>
//             <h3>Experience</h3>
//             <p contenteditable="true">${experience}</p>
//             <h3>Skills</h3>
//             <p contenteditable="true">${skills}</p>
//         `;
//         // Display the generated resume in the output div
//         const resumeOutputElement = getElement<HTMLElement>("resumeOutput");
//         if (resumeOutputElement) {
//             resumeOutputElement.innerHTML = resumeOutput;
//         } else {
//             console.log("Error: Cannot find resumeOutput element");
//         }
//     } else {
//         console.log("One or more input elements not found");
//     }
//   });
// Get references to the form and display area 
var form = document.getElementById('resume-form');
var resumeDisplayElement = document.getElementById('resume-display');
var shareableLinkContainer = document.getElementById('shareable-link-container');
var shareableLinkElement = document.getElementById('shareable-link');
var downloadPdfButton = document.getElementById('download-pdf');
// Handle form submission
form.addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent page reload
    // Collect input values
    var username = document.getElementById('username').value;
    var name = document.getElementById('name').value;
    var email = document.getElementById('email').value;
    var phone = document.getElementById('phone').value;
    var education = document.getElementById('education').value;
    var experience = document.getElementById('workexperience').value;
    var skills = document.getElementById('skills').value;
    // Save form data in localStorage with the username as the key
    var resumeData = {
        name: name,
        email: email,
        phone: phone,
        education: education,
        experience: experience,
        skills: skills
    };
    localStorage.setItem(username, JSON.stringify(resumeData)); // Saving the data locally
    // Generate the resume content dynamically
    var resumeHTML = "\n    <h2>Editable Resume</h2>\n    <h3>Personal Information</h3>\n    <p><b>Name:</b> <span contenteditable=\"true\">".concat(name, "</span></p>\n    <p><b>Email:</b> <span contenteditable=\"true\">").concat(email, "</span></p>\n    <p><b>Phone:</b> <span contenteditable=\"true\">").concat(phone, "</span></p>\n    <h3>Education</h3>\n    <p contenteditable=\"true\">").concat(education, "</p>\n    <h3>Experience</h3>\n    <p contenteditable=\"true\">").concat(experience, "</p>\n    <h3>Skills</h3>\n    <p contenteditable=\"true\">").concat(skills, "</p>\n  ");
    // Display the generated resume
    resumeDisplayElement.innerHTML = resumeHTML;
    // Generate a shareable URL with the username
    var shareableURL = "".concat(window.location.origin, "?username=").concat(encodeURIComponent(username));
    // Display the shareable link
    shareableLinkContainer.style.display = 'block';
    shareableLinkElement.href = shareableURL;
    shareableLinkElement.textContent = shareableURL;
});
// Handle PDF download
downloadPdfButton.addEventListener('click', function () {
    window.print(); // This will open the print dialog and allow the user to save as PDF
});
// Prefill the form based on the username in the URL
window.addEventListener('DOMContentLoaded', function () {
    var urlParams = new URLSearchParams(window.location.search);
    var username = urlParams.get('username');
    if (username) {
        // Autofill form if data is found in localStorage
        var savedResumeData = localStorage.getItem(username);
        if (savedResumeData) {
            var resumeData = JSON.parse(savedResumeData);
            document.getElementById('username').value = username;
            document.getElementById('name').value = resumeData.name;
            document.getElementById('email').value = resumeData.email;
            document.getElementById('phone').value = resumeData.phone;
            document.getElementById('education').value = resumeData.education;
            document.getElementById('workexperience').value = resumeData.experience;
            document.getElementById('skills').value = resumeData.skills;
        }
    }
});
