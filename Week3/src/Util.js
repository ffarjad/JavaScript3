//contains general functions that App use
class Util{

}

Util.fetchJSON = function(url){
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

Util.greeting = function(){
  console.log('Hello');
};

// Add options to select element
Util.addSelectElementOptions = function (arr){
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
Util.checkSelectChanging = function(arr) {
  try {
      console.log('calling checkSelectChanging');
      const selectElement = document.getElementById("repositories");
      selectElement.addEventListener("change", async function(){
      const selectValue = selectElement.value;

      const repo = arr.filter(repo => repo.id == selectValue)[0];
      Util.renderRepositoryInfo(repo);
      const repoContributersUrl = repo.contributors_url;

      const contributersList = await Util.fetchJSON(repoContributersUrl);
      Util.renderRepositoryContributers(contributersList);
    });
  }catch(err) {
    console.log(err);
  }
}

Util.renderRepositoryInfo = function(arr){
  console.log('calling renderRepositoryInfo');
  const repository = new Repository(arr);
  repository.render();
}

Util.renderRepositoryContributers = function(response){
  console.log('calling renderRepositoryContributers');
  const repoContributers = document.querySelector('#repo_contributors');

  repoContributers.innerHTML =``;
  
  response.forEach(function(item){
  const contributor = new Contributor(item);
  contributor.render();
  });
}