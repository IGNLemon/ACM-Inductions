let applicants = [];
let selectedApplicant = null;

function nextStep(step) {
  document.querySelectorAll('.panel').forEach(panel => panel.classList.add('hidden'));

  if (step === 2) {
    const name = document.getElementById('applicant-name').value;
    const email = document.getElementById('applicant-email').value;
    const idNo = document.getElementById('applicant-id').value;

    if (name && email && idNo) {
      selectedApplicant = { idNo, name, email, status: 'Applied', interviewDate: '', panel: '' };
      document.getElementById('applicant-name-display').innerText = name;
      document.getElementById('panel-schedule').classList.remove('hidden');
    } else {
      alert('Please fill in all the details (Name, Email, and ID No)!');
      document.getElementById('panel-details').classList.remove('hidden');
    }
  } else if (step === 3) {
    const interviewDate = document.getElementById('interview-date').value;

    if (interviewDate) {
      selectedApplicant.interviewDate = interviewDate;
      selectedApplicant.status = `Interview Scheduled (${interviewDate})`;
      document.getElementById('panel-applicant-name').innerText = selectedApplicant.name;
      document.getElementById('panel-assign').classList.remove('hidden');
    } else {
      alert('Please select an interview date!');
      document.getElementById('panel-schedule').classList.remove('hidden');
    }
  }
}

function completeProcess() {
  const panelName = document.getElementById('panel-name').value;

  if (panelName) {
    selectedApplicant.panel = panelName;
    selectedApplicant.status = `Panel Assigned (${panelName})`;
    applicants.push(selectedApplicant);
    displayApplicants();
    resetForm();
  } else {
    alert('Please enter the panel member\'s name!');
    document.getElementById('panel-assign').classList.remove('hidden');
  }
}

function displayApplicants() {
  const applicantsBody = document.getElementById('applicants-body');
  applicantsBody.innerHTML = '';

  applicants.forEach(applicant => {
    const row = document.createElement('tr');

    row.innerHTML = `
      <td>${applicant.idNo}</td> <!-- Display ID_No -->
      <td>${applicant.name}</td>
      <td>${applicant.email}</td>
      <td>${applicant.status}</td>
      <td>${applicant.interviewDate || 'Not Scheduled'}</td>
      <td>${applicant.panel || 'Not Assigned'}</td>
    `;

    applicantsBody.appendChild(row);
  });
}

function resetForm() {
  document.getElementById('applicant-name').value = '';
  document.getElementById('applicant-email').value = '';
  document.getElementById('applicant-id').value = ''; // Reset ID_No
  document.getElementById('interview-date').value = '';
  document.getElementById('panel-name').value = '';
  
  nextStep(1); // Go back to Step 1
}
