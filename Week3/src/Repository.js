'use strict';

/* global Util */

// eslint-disable-next-line no-unused-vars

class Repository {
  constructor(data){
    this._data = data;
  }
  /**
   * Render the repository info to the DOM.
   * @param {HTMLElement} parent The parent element in which to render the repository.
   */
  render(){
    const repositoriesInfoElement = document.querySelector('#repo_info');
    repositoriesInfoElement.innerHTML =``;
    repositoriesInfoElement.innerHTML =`<div class="repoContainer"> 
                                    <strong>Repository:  </strong><span><a href=${this._data.html_url}>${this._data.name}</a></span><br>
                                    <strong>Description:  </strong><span>${this._data.description}</span><br>
                                    <strong>Forks:  </strong><span>${this._data.forks}</span><br>
                                    <strong>Updated:  </strong><span>${this._data.updated_at}</span><br>
                                    </div>`;
  }
}
