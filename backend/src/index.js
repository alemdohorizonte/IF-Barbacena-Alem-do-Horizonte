const express = require('express');
const requester = require('request');
const projects = require('./respostas.json');
const cors = require('cors');

const app = express();

app.use(cors());

let alreadyLoad =  false;
let categories = [];
let modalities = [];

/**
 * Middleware usado para coletar informações do arquivo .csv e
 * armazenar na variável 'projects'
 */
async function loadData(request, response, next){
  if(!alreadyLoad){
    for (i = 1; i < projects.length; i++) {
      projects[i].id = i;

      if(projects[i].category1 != null)
        projects[i].category = projects[i].category1;
      if(projects[i].category2 != null)
        projects[i].category = projects[i].category2;
      if(projects[i].category3 != null)
        projects[i].category = projects[i].category3;
    }

    alreadyLoad = true;
  }else next();
}

/**
 * Retorna um JSON com todos os projetos do arquvio.
 */
app.get('/projects', loadData, (request, response)=>{
  return response.json(projects);
});

/**
 * Retorna um JSON com todos os projetos com a categoria do id especificado.
 */
app.get('/projects/category/:categoryid', loadData, (request, response)=>{
  const { categoryid } = request.params;
  if(categoryid >= categories.length)
    return response.status(400).send("Invalid ID");

  const category = categories[categoryid].category;
  const filteredProjects = projects.filter(proj=> proj.category.includes(category));

  return response.json(filteredProjects);
});

/**
 * Retorna um JSON com o projeto de id especificado.
 */
app.get('/project/:id', loadData, (request, response)=>{
  const { id } = request.params;
  return response.json(projects[id]);
});

/**
 * Retorna um JSON com o projeto de id especificado.
 */
app.get('/project/:id/pdf', loadData, (request, response)=>{
  const { id } = request.params;
  
  requester({
    uri: 'https://drive.google.com/u/0/uc?id=' +  new URL(projects[id].pdf).searchParams.get('id') + '&export=download'
  }).pipe(response);
});

/**
 * Retorna um JSON com todas as categorias do arquvio.
 */
app.get('/categories', loadData, (request, response)=>{
  let i = 0;
  projects.map(proj => {
    if(categories.findIndex(cat => cat.category === proj.category) < 0)
      categories.push({"id": i++, "category": proj.category});
  });
  return response.json(categories);
});

/**
 * Retorna um JSON com todas as modalidades do arquvio.
 */
app.get('/modalities', loadData, (request, response)=>{
  let i = 0;
  projects.map(proj => {
    if(modalities.findIndex(mod => mod.modality === proj.modality) < 0)
      modalities.push({"id": i++, "modality": proj.modality});
  });
  return response.json(modalities);
});

/**
 * Retorna um JSON com todos os projetos com a modalidade do id especificado.
 */
app.get('/projects/modality/:modalityid', loadData, (request, response)=>{
  const { modalityid } = request.params;
  if(modalityid >= modalities.length)
    return response.status(400).send("Invalid ID");

  const modality = modalities[modalityid].modality;
  const filteredProjects = projects.filter(proj=>proj.modality.includes(modality));

  return response.json(filteredProjects);
});

app.listen(3333, function() {
  var port = this.address().port;
  console.log(`Server listening on port ${port}.`);
});