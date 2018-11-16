function main(){
  console.log('main!');
  const HyfReposHttps = 'https://api.github.com/orgs/HackYourFuture/repos';
  getApiResponse(HyfReposHttps, xhrCallback);
  console.log(HyfReposHttps);
}


// Function that makes an server request (API call)
function getApiResponse(theUrl, callback)
{
  var xmlHttp = new XMLHttpRequest();
  xmlHttp.onreadystatechange = function() { 
    if (xmlHttp.readyState == 4 && xmlHttp.status == 200){
      showLoading(false);
      // console.log(xmlHttp.responseText);
      callback(xmlHttp.responseText);
    }
  }
  xmlHttp.open("GET", theUrl, true); // true for asynchronous 
  showLoading(true);
  xmlHttp.send(null);
}


// Callback that handles response from server
function xhrCallback(data){
  dataInJson = JSON.parse(data);
  addSelectElementOptions(dataInJson);
  checkSelectChanging(dataInJson);
}

// Add options to select element
function addSelectElementOptions(arr){
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
  let selectElement = document.getElementById("repositories");
  selectElement.addEventListener("change", function(){
    const selectValue = selectElement.value;
    repo = arr.filter(repo => repo.id == selectValue)[0];
    renderRepositoryInfo(repo);
    const repoContributersUrl = repo.contributors_url;
    getApiResponse(repoContributersUrl, renderRepositoryContributers);
  });
}

function renderRepositoryInfo(selectedRepository){
  // let repo = arr.filter(repo => repo.id == value)[0];
  const repositoriesInfoElement = document.querySelector('#repo_info');
  while( repositoriesInfoElement.hasChildNodes()){
    repositoriesInfoElement.removeChild(repositoriesInfoElement.firstChild);
  }
  const repoContainer = document.createElement('div');
  repoContainer.setAttribute('class', 'repoContainer');

  const repoLink = document.createElement('a');
  repoLink.setAttribute('target', '_blank');
  repoLink.href = selectedRepository.html_url;
  repoLink.innerText = selectedRepository.name;

  const repoDescription = document.createElement('h3');
  repoDescription.innerText = "Description: " + selectedRepository.description;
  

  const repoForks = document.createElement('h3');
  repoForks.innerText = "Forks: " + selectedRepository.forks

  const repoUpdate = document.createElement('h3');
  repoUpdate.innerText = "Last Updated: " + selectedRepository.updated_at;

  repoContainer.appendChild(repoLink);
  repoContainer.appendChild(repoDescription);
  repoContainer.appendChild(repoForks);
  repoContainer.appendChild(repoUpdate);
  repositoriesInfoElement.appendChild(repoContainer);
}

function renderRepositoryContributers(response){
  const contributers = JSON.parse(response);
  const contributorsListElement = document.querySelector('#contributorList');
  while( contributorsListElement.hasChildNodes()){
    contributorsListElement.removeChild(contributorsListElement.firstChild);
  }
  contributers.forEach(contributor => {
    const contributorContainer = document.createElement('div');
    contributorContainer.setAttribute('class', 'contributorContainer');
    const listElement = document.createElement('h2');
    listElement.innerText = contributor.login;
    const imgElement = document.createElement('img');
    imgElement.src = contributor.avatar_url;
    const txtElement = document.createElement('h3');
    txtElement.innerText = contributor.contributions;
    contributorContainer.appendChild(listElement);
    contributorContainer.appendChild(imgElement);
    contributorContainer.appendChild(txtElement);
    contributorsListElement.appendChild(contributorContainer);
  })
}

function showLoading(option) {
  const loadingIcon = document.querySelector('#loading-icon');
  if (option) {
    loadingIcon.innerHTML = `<h1>Loading</h1>`;
  }else {
    loadingIcon.innerHTML = ``;
  }
  
}

/* {
  function fetchJSON(url, cb) {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', url);
    xhr.responseType = 'json';
    xhr.onload = () => {
      if (xhr.status < 400) {
        cb(null, xhr.response);
      } else {
        cb(new Error(`Network error: ${xhr.status} - ${xhr.statusText}`));
      }
    };
    xhr.onerror = () => cb(new Error('Network request failed'));
    xhr.send();
  }
  function createAndAppend(name, parent, options = {}) {
    const elem = document.createElement(name);
    parent.appendChild(elem);
    Object.keys(options).forEach((key) => {
      const value = options[key];
      if (key === 'text') {
        elem.innerText = value;
      } else {
        elem.setAttribute(key, value);
      }
    });
    return elem;
  }
  function main(url) {
    fetchJSON(url, (err, data) => {
      const root = document.getElementById('root');
      if (err) {
        createAndAppend('div', root, { text: err.message, class: 'alert-error' });
      } else {
        console.log(data);
        createAndAppend('pre', root, { text: JSON.stringify(data, null, 2) });
      }
    });
  }
  const HYF_REPOS_URL = 'https://api.github.com/orgs/HackYourFuture/repos?per_page=100';
  window.onload = () => main(HYF_REPOS_URL);
} */