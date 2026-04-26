'use strict';

const STORAGE_KEY = 'feedback-form-state';

let formData = { email: '', message: '' };

const form = document.querySelector('.feedback-form');
const emailInput = form.elements.email;
const messageInput = form.elements.message;

// Перевірка сховища
populateForm();

form.addEventListener('input', event => {
  const key = event.target.name;

  const value = event.target.value.trim();

  formData[key] = value;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
});

form.addEventListener('submit', event => {
  event.preventDefault();

  const currentEmail = emailInput.value.trim();
  const currentMessage = messageInput.value.trim();

  if (currentEmail === '' || currentMessage === '') {
    alert('Fill all the fields');
    return;
  }

  formData.email = currentEmail;
  formData.message = currentMessage;

  console.log('Submitted Data:', formData);

  // Очищення
  localStorage.removeItem(STORAGE_KEY);
  formData = { email: '', message: '' };
  form.reset();
});

function populateForm() {
  const savedData = localStorage.getItem(STORAGE_KEY);

  if (savedData) {
    try {
      const parsedData = JSON.parse(savedData);

      formData.email = parsedData.email || '';
      formData.message = parsedData.message || '';

      emailInput.value = formData.email;
      messageInput.value = formData.message;
    } catch (error) {
      console.error('Error parsing data from localStorage:', error);
    }
  }
}
