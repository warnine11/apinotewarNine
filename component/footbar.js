class NoteFooter extends HTMLElement {
    connectedCallback() {
      this.innerHTML = `
        <footer>
          <p>&copy; 2024 Notes App</p>
        </footer>
      `;
    }
  }
  
  customElements.define('note-footer', NoteFooter);
  