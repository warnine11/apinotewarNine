import "../component/seacrhbar.js";
import "../component/footbar.js";
import "../component/noteheader.js";
import './style/style.css';

// Data catatan dari API
let notesData = [];

const BASE_URL = 'https://notes-api.dicoding.dev/v2';
const noteForm = document.getElementById('note-form');
const notesList = document.getElementById('notes-list');
const loadingIndicator = document.getElementById('loading-indicator');

// Function to show loading indicator
function showLoading() {
  loadingIndicator.classList.remove('hidden');
}

// Function to hide loading indicator
function hideLoading() {
  loadingIndicator.classList.add('hidden');
}

// Function to handle HTTP errors
function handleHTTPError(error) {
  console.error('HTTP Error:', error.message);
  hideLoading();
  alert('Oops! Something went wrong. Please try again later.');
}

// Function to fetch and display notes
async function fetchAndDisplayNotes() {
  try {
    showLoading();
    const response = await fetch(`${BASE_URL}/notes`);
    const data = await response.json();
    notesList.innerHTML = ''; // Clear existing notes
    data.data.forEach(note => {
      const noteElement = document.createElement('div');
      noteElement.classList.add('note');
      const createdAt = new Date(note.createdAt).toLocaleString(); // Konversi createdAt ke format tanggal yang lebih mudah dibaca
      noteElement.innerHTML = `
        <h2>${note.title}</h2>
        <p>${note.body}</p>
        <p>Created at: ${createdAt}</p> <!-- Tampilkan tanggal pembuatan catatan -->
        <button onclick="deleteNote('${note.id}')">Delete</button>
      `;
      notesList.appendChild(noteElement);
    });
    hideLoading();
  } catch (error) {
    handleHTTPError(error);
  }
}

// Function to create a new note
async function createNote(title, body) {
  try {
    showLoading();
    const response = await fetch(`${BASE_URL}/notes`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ title, body })
    });
    const data = await response.json();
    console.log(data.message); // Optionally log success message
    fetchAndDisplayNotes(); // Refresh notes list after adding a new note
  } catch (error) {
    handleHTTPError(error);
  }
}

async function deleteNote(noteId) {
  try {
    showLoading();
    const response = await fetch(`${BASE_URL}/notes/${noteId}`, {
      method: 'DELETE'
    });
    const data = await response.json();
    console.log(data.message); // Optionally log success message
    fetchAndDisplayNotes(); // Refresh notes list after deleting a note
  } catch (error) {
    handleHTTPError(error);
  }
}

// Event listener for form submission
noteForm.addEventListener('submit', function(event) {
  event.preventDefault();
  
  // Mendapatkan nilai dari input judul dan isi catatan
  const titleInput = document.getElementById('note-title');
  const bodyInput = document.getElementById('note-title');
  
  // Memastikan elemen 'note-title' dan 'note-body' tidak null
  if (titleInput && bodyInput && titleInput.value && bodyInput.value) {
    const title = titleInput.value;
    const body = bodyInput.value;
    
    createNote(title, body);
    noteForm.reset(); // Membersihkan kolom input setelah pengiriman
  } else {
    alert('Silakan masukkan judul dan isi catatan.');
  }
});



// Fetch and display notes when the page loads
window.addEventListener('load', fetchAndDisplayNotes);
