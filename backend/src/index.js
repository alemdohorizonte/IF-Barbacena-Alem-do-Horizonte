const express = require('express');
const requester = require('request');
const projects = require('./respostas.json');
const categories = require('./categories.json');
const modalities = require('./modalities.json');
const fs = require('fs');
const cors = require('cors');
const app = express();
const path = require('path');
const { ReadStream } = require('tty');

app.use(express.static(path.join(__dirname, '../../build')));
app.use(cors());

const port = process.env.PORT || 5000;

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
  
  if (!fs.existsSync('./pdf/')){
    fs.mkdirSync('./pdf');
  }

  let googleDriveId = new URL(projects[id].pdf).searchParams.get('id');
  let fileName = './pdf/' + googleDriveId + ".pdf";
  
  if (!fs.existsSync(fileName)) {
    let file = fs.createWriteStream(fileName);

    let resp = requester('https://drive.google.com/u/0/uc?id=' + googleDriveId + '&export=download');
    resp.pipe(file);
    resp.pipe(response);
    fs.writeFileSync(fileName, file); 
  }
  else
    fs.createReadStream(fileName).pipe(response);
});

/**
 * Retorna um JSON com todas as categorias do arquvio.
 */
app.get('/api/categories', (request, response)=>{
  return response.json(categories);
});

/**
 * Retorna um JSON com todas as modalidades do arquvio.
 */
app.get('/api/modalities', (request, response)=>{
  return response.json(modalities);
});

/**
 * Retorna um JSON com todos os projetos com a modalidade do id especificado.
 */
app.get('/api/projects/modality/:modalityid', (request, response)=>{
  const { modalityid } = request.params;
  if(modalityid > modalities.length)
    return response.status(400).send("Invalid ID");

  const filteredProjects = projects.filter(proj=>proj.modality.id === parseInt(modalityid));

  return response.json(filteredProjects);
});

app.get('*', function(req, res) {
  res.sendFile(path.resolve(__dirname, '../../build', 'index.html'));
});

app.listen(port, function() {
  var port = this.address().port;

  console.log(`Server listening on port ${port}.`);
});