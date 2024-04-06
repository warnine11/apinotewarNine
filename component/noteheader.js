class NoteHeader extends HTMLElement {
    connectedCallback() {
      this.innerHTML = `
        <h1>${this.getAttribute('title')}</h1>
      `;
    }
  }
  
  customElements.define('note-header', NoteHeader);
  