'use strict';

/* global Util */

class Contributor {
  constructor(data){
    this._data = data;
  }

  render(){
    console.log('calling renderRepositoryContributers');
    const repoContributers = document.querySelector('#repo_contributors');
    repoContributers.innerHTML +=`<div class="contributorContainer">
                                     <div class="contributorList"><h3>${this._data.login}</h3></div>
                                     <div class="contributorList"><img src=${this._data.avatar_url}></div>
                                     <div class="contributorList"><h5>${this._data.contributions}</h5></div>
                                  </div>`;
  }                               
}