const { reporter, flow, mock, handler } = require('pactum');
const pf = require('pactum-flow-plugin');


function addFlowReporter() {
  pf.config.url = 'http://localhost:8081'; // pactum flow server url
  pf.config.projectId = 'loja-ebac-api';
  pf.config.projectName = 'Loja EBAC API';
  pf.config.version = '1.0.0    ';
  pf.config.username = 'scanner';
  pf.config.password = 'scanner';
  reporter.add(pf.reporter);
}

// global before
before(async () => {
  addFlowReporter();
 
});

// global after
after(async () => {
  
  await reporter.end();
});



beforeEach(async () => {
    // Realiza o login para obter o token
    const response = await flow('Login User')
      .post('http://localhost:8081/public/authUser')
      .withJson({
        "email": "cliente@ebac.com.br",  
        "phone": "14999887766",  
        "password": "1234516",  
        "userId": "01"
      })
      .expectStatus(200)
      
    
    token = response.body.token;  // Armazena o token
  });

 
  it(' Deve adicionar a categoria com sucesso ', async () => {
    await flow('Add Category')
      .post('http://localhost:8081/api/addCategory')
      .withHeaders({
        'Authorization': `Bearer ${token}`  // Passa o token para a autenticação
      })
      .withJson({
        'authorization': `Bearer ${token}`,  
          'name': 'Categoria Teste',  
          'photo': 'https://samsungbrshop.vtexassets.com/arquivos/ids/230984-600-auto?v=638465404494130000&width=600&height=auto&aspect=true',  
      })
      .expectStatus(200)
      
  });

  
  it('Deve editar a categoria com sucesso', async () => {
    const categoryId = 1;
    await flow ('Edit Category')
    .put(`http://localhost:8081/api/editCategory/${categoryId}`)
    .withHeaders({
      'Authorization': `Bearer ${token}`
    })

      .withJson({
        'authorization': `Bearer ${token}`,  
        'name': 'Categoria Teste Editada',  
        'photo': 'https://samsungbrshop.vtexassets.com/arquivos/ids/230984-600-auto?v=638465404494130000&width=600&height=auto&aspect=true',
      })
      .expectStatus(200)
    });
  

    it('Deve deletar a categoria com sucesso',  async () => {
      const categoryId = 1;  
      await flow ('Delete Category')
    .delete(`http://localhost:8081/api/editCategory/${categoryId}`)
    .withHeaders({
      'Authorization': `Bearer ${token}`
    })
        .withJson ({
          "authorization": token  
        })
        .expectStatus(200)
        })

       
      
   

  
  

  
