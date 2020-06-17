const express = require('express');
const parser = require('papaparse');
const path = require('path');
const fs = require('fs').promises;
const project = require('./project');

const app = express();

let projects = [];
let categories = [];

/**
 * Middleware usado para coletar informações do arquivo .csv e
 * armazenar na variável 'projects'
 */
async function loadData(request, response, next){
  if(projects.length == 0){
    let id = 0
    const data = await fs.readFile(path.join(__dirname, 'respostas.csv'), 'UTF-8');
    parser.parse(data, {
      complete: function (results) {
        results.data.splice(0,1);
        results.data.map(proj => projects.push(new project(id++, ...proj)));
        next();
      }
    });
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
app.get('/projects/:categoryid', loadData, (request, response)=>{
  const { categoryid } = request.params;
  if(categoryid >= categories.length)
    return response.status(400).send("Invalid ID");


  const category = categories[categoryid].category;
  const filteredProjects = [];
  projects.map(proj=>  {
    if(proj.category.includes(category)) filteredProjects.push(proj);
  });    


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


app.listen(3333);
