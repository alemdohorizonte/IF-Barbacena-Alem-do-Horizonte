const express = require('express');
const requester = require('request');
const projects = require('./respostas.json');
const cors = require('cors');
const app = express();
const path = require('path');

app.use(express.static(path.join(__dirname, '../../build')));
app.use(cors());

const port = process.env.PORT || 5000;

let categories = [];
let modalities = [];

/**
 * Retorna um JSON com todos os projetos do arquvio.
 */
app.get('/api/projects', (request, response)=>{
  return response.json(projects);
});

/**
 * Retorna um JSON com todos os projetos com a categoria do id especificado.
 */
app.get('/api/projects/category/:categoryid', (request, response)=>{
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
app.get('/api/project/:id', (request, response)=>{
  const { id } = request.params;
  return response.json(projects[id]);
});

/**
 * Retorna um JSON com o projeto de id especificado.
 */
app.get('/api/project/:id/pdf', (request, response)=>{
  const { id } = request.params;
  
  requester({
    uri: 'https://drive.google.com/u/0/uc?id=' +  new URL(projects[id].pdf).searchParams.get('id') + '&export=download'
  }).pipe(response);
});

/**
 * Retorna um JSON com todas as categorias do arquvio.
 */
app.get('/api/categories', (request, response)=>{
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
app.get('/api/modalities', (request, response)=>{
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
app.get('/api/projects/modality/:modalityid', (request, response)=>{
  const { modalityid } = request.params;
  if(modalityid >= modalities.length)
    return response.status(400).send("Invalid ID");

  const modality = modalities[modalityid].modality;
  const filteredProjects = projects.filter(proj=>proj.modality.includes(modality));

  return response.json(filteredProjects);
});


app.get('*', function(req, res) {
  res.sendFile(path.resolve(__dirname, '../../build', 'index.html'));
});

app.listen(port, function() {
  var port = this.address().port;

  for (i = 1; i < projects.length; i++) {
    projects[i].id = i;

    if(projects[i].category1 != null)
      projects[i].category = projects[i].category1;
    if(projects[i].category2 != null)
      projects[i].category = projects[i].category2;
    if(projects[i].category3 != null)
      projects[i].category = projects[i].category3;
  }

  console.log(`Server listening on port ${port}.`);
});