// utils.js - Utility functions for general use

/**
 * Return the current date string in YYYY-MM-DD format.
 */
export function getCurrentDate() {
  const now = new Date();
  return now.toISOString().slice(0, 10);
}

/**
 * Show a temporary alert message on the page.
 * @param {string} message The message to display
 * @param {'success' | 'error' | 'info'} type Type of alert (default 'success')
 */
export function showAlert(message, type = 'success') {
  const alertBox = document.createElement('div');
  alertBox.className = `alert alert-${type}`;
  alertBox.innerText = message;
  alertBox.style.position = 'fixed';
  alertBox.style.top = '20px';
  alertBox.style.right = '20px';
  alertBox.style.padding = '15px 25px';
  alertBox.style.color = 'white';
  alertBox.style.backgroundColor = (type === 'success') ? '#4caf50' : (type === 'error') ? '#f44336' : '#2196f3';
  alertBox.style.borderRadius = '5px';
  alertBox.style.zIndex = '10000';
  alertBox.style.boxShadow = '0 2px 6px rgba(0,0,0,0.2)';
  document.body.appendChild(alertBox);

  setTimeout(() => {
    alertBox.style.opacity = '0';
    setTimeout(() => alertBox.remove(), 500);
  }, 3000);
}

/**
 * Format a Date object to a readable string (e.g. Jan 1, 2025)
 * @param {Date} dateObj
 * @returns {string}
 */
export function formatDate(dateObj) {
  const options = { year: 'numeric', month: 'short', day: 'numeric' };
  return dateObj.toLocaleDateString(undefined, options);
}

