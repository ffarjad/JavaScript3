function main(){
  console.log('main!');
  const HyfReposHttps = 'https://api.github.com/orgs/HackYourFuture/repos?per_page=100';
  fetchJSON(HyfReposHttps)
    .then(data => xhrCallback(data))
    .catch(err => renderError(err));
}

function fetchJSON(url) {
  console.log('calling fetch json');
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', url);
    xhr.responseType = 'json';
    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4) {
        if (xhr.status < 400) {
          resolve(xhr.response);
        } else {
          reject(new Error(xhr.statusText));
        }
      }
    };
    xhr.send();
  });
}

function renderError(err) {
	console.error(err.message);
}


// Callback that handles response from server
function xhrCallback(data){
  console.log('calling xhrcallback');
  addSelectElementOptions(data);
  checkSelectChanging(data);
}

// Add options to select element
function addSelectElementOptions(arr){
	console.log('calling addSelectElementOptions');
  	let selectElement = document.getElementById("repositories");
  	arr.forEach(rep => {
    let option = document.createElement('option');
    option.text = rep.name;
    option.value = rep.id;
    selectElement.appendChild(option);
  });
}

//Function that works if select element change
function checkSelectChanging (arr) {
	console.log('calling checkSelectChanging');
  	let selectElement = document.getElementById("repositories");
  	selectElement.addEventListener("change", function(){
    const selectValue = selectElement.value;
    repo = arr.filter(repo => repo.id == selectValue)[0];
    renderRepositoryInfo(repo);
    const repoContributersUrl = repo.contributors_url;
    fetchJSON(repoContributersUrl)
      .then(data=> renderRepositoryContributers(data))
      .catch(err => renderError(err));
  });
}

function renderRepositoryInfo(selectedRepository){
  // let repo = arr.filter(repo => repo.id == value)[0];
  console.log('calling renderRepositoryInfo');
  const repositoriesInfoElement = document.querySelector('#repo_info');
  // while( repositoriesInfoElement.hasChildNodes()){
  //   repositoriesInfoElement.removeChild(repositoriesInfoElement.firstChild);
  // }
  repositoriesInfoElement.innerHTML =``;
  repositoriesInfoElement.innerHTML =`<div class="repoContainer"> 
                                    <strong>Repository:  </strong><span><a href=${selectedRepository.html_url}>${selectedRepository.name}</a></span><br>
                                    <strong>Description:  </strong><span>${selectedRepository.description}</span><br>
                                    <strong>Forks:  </strong><span>${selectedRepository.forks}</span><br>
                                    <strong>Updated:  </strong><span>${selectedRepository.updated_at}</span><br>
                                    </div>`;
  // const repoContainer = document.createElement('div');
  // repoContainer.setAttribute('class', 'repoContainer');

  // const repoLink = document.createElement('a');
  // repoLink.setAttribute('target', '_blank');
  // repoLink.href = selectedRepository.html_url;
  // repoLink.innerText = selectedRepository.name;

  // const repoDescription = document.createElement('h3');
  // repoDescription.innerText = "Description: " + selectedRepository.description;
  

  // const repoForks = document.createElement('h3');
  // repoForks.innerText = "Forks: " + selectedRepository.forks

  // const repoUpdate = document.createElement('h3');
  // repoUpdate.innerText = "Last Updated: " + selectedRepository.updated_at;

  // repoContainer.appendChild(repoLink);
  // repoContainer.appendChild(repoDescription);
  // repoContainer.appendChild(repoForks);
  // repoContainer.appendChild(repoUpdate);
  // repositoriesInfoElement.appendChild(repoContainer);
}

function renderRepositoryContributers(response){
	console.log('calling renderRepositoryContributers');
	 const repoContributers = document.querySelector('#repo_contributors');
  	repoContributers.innerHTML =``;
  	response.forEach(function(item){
    repoContributers.innerHTML += `<div class="contributorContainer">
                                   <div class="contributorList"><h3>${item.login}</h3></div>
                                   <div class="contributorList"><img src=${item.avatar_url}></div>
                                   <div class="contributorList"><h5>${item.contributions}</h4></div>
                                   </div>`;
  });
  // const contributorsListElement = document.querySelector('#contributorList');
  // const contributorsListElement = document.querySelector('#repo_contributors');
  // 	while( contributorsListElement.hasChildNodes()){
  //   	contributorsListElement.removeChild(contributorsListElement.firstChild);
  // 	}

  // contributers.forEach(contributor => {
  //   const contributorContainer = document.createElement('div');
  //   contributorContainer.setAttribute('class', 'contributorContainer');
  //   const listElement = document.createElement('h2');
  //   listElement.innerText = contributor.login;
  //   const imgElement = document.createElement('img');
  //   imgElement.src = contributor.avatar_url;
  //   const txtElement = document.createElement('h3');
  //   txtElement.innerText = contributor.contributions;
  //   contributorContainer.appendChild(listElement);
  //   contributorContainer.appendChild(imgElement);
  //   contributorContainer.appendChild(txtElement);
  //   contributorsListElement.appendChild(contributorContainer);
  // });
}
