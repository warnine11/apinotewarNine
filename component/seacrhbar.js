class SearchBar extends HTMLElement {
    connectedCallback() {
      this.innerHTML = `
        <input type="text" placeholder="Search...">
        <button>Search</button>
      `;
    }
  }
  
  customElements.define('search-bar', SearchBar);
  