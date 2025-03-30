const { reporter, flow, mock, handler } = require('pactum');
const pf = require('pactum-flow-plugin');
const { BASE_URL, MOCK_URL } = require('../../test/contract/config')


function addFlowReporter() {
  pf.config.url = 'http://localhost:8081'; // pactum flow server url
  pf.config.projectId = 'loja-ebac-front';
  pf.config.projectName = 'Loja EBAC Front';
  pf.config.version = '1.0.0    ';
  pf.config.username = 'scanner';
  pf.config.password = 'scanner';
  reporter.add(pf.reporter);
}

// global before
before(async () => {
  addFlowReporter();
  await mock.start(4000);
});

// global after
after(async () => {
  await mock.stop();
  await reporter.end();
});

handler.addInteractionHandler('Authorization', () => {
  return {
    provider: 'loja-ebac-api', // same as provider project
    flow: 'Auth User', // same as provider flow name
    request: {
      method: 'POST',
      path: 'http://localhost:8081/public/authUser',
      body: {
        "email": "cliente@ebac.com.br",  
        "phone": "14999887766",  
        "password": "admin123",  
        "userId": "01"
      }
    },
    response: {
      status: 200,
      body: { token: like ("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjY3ZTAzMTMwYWQwYTI4ZDE4NGZiMDVkNCIsImVtYWlsIjoiY2xpZW50ZUBlYmFjMS5jb20uYnIiLCJwaG9uZSI6IjE0OTk5ODg3NzY2Iiwicm9sZSI6InVzZXIifSwiaWF0IjoxNzQyNzQ1OTA0LCJleHAiOjE3NDI4MzIzMDR9.-LVcN6ypuXxv-JQmlIm1QbCU9SFyuO37xDJkZ6xG43o" )}
      /*body: {
        "success": true
      } */
    }
  }    
})


beforeEach(async () => {
    // Realiza o login para obter o token
    const response = await flow('Auth User')
    .useInteraction("Authorization")
      .post('http://localhost:4000/public/authUser')
      .withJson({
        "email": "cliente@ebac.com.br",  
        "phone": "14999887766",  
        "password": "admin123",  
        "userId": "01"
      })
      .expectStatus(200)
      //.expectJson("success", true);
    
    token = response.body.token;  // Armazena o token
  });
  
  handler.addInteractionHandler('Add Product Response', () => {
    return {
      provider: 'loja-ebac-api', // same as provider project
      flow: 'Add Product', // same as provider flow name
      request: {
        method: 'POST',
        path: 'http://localhost:8081/api/addProduct',
        body: {
        "name": "Samsung Galaxy M55", 
        "price": 1999.99,  
        "quantity": 10,  
        "categories": ["Smartphones"],  
        "description": "Samsung Galaxy M55 - O melhor smartphone da sua categoria",  
        "photos": ["https://samsungbrshop.vtexassets.com/arquivos/ids/230984-600-auto?v=638465404494130000&width=600&height=auto&aspect=true"],
        "popular": true,  
        "visible": true,  
        "location": "Brasil",  
        "additionalDetails": "Detalhes adicionais sobre o produto",  
        "specialPrice": 1799.99
        }
      },
      response: {
        status: 200,
       /* body: {
          "success": true
        } */
      }
    }    
  })

  it('Front - Deve adicionar o produto com sucesso com dados fixos', async () => {
    await flow('Add Product')
    .useInteraction("Add Product Response")
      .post('http://localhost:4040/api/addProduct')
      .withHeaders({
        'Authorization': `Bearer ${token}`  // Passa o token para a autenticação
      })
      .withJson({
        "name": "Samsung Galaxy M55", 
        "price": 1999.99,  
        "quantity": 10,  
        "categories": ["Smartphones"],  
        "description": "Samsung Galaxy M55 - O melhor smartphone da sua categoria",  
        "photos": ["https://samsungbrshop.vtexassets.com/arquivos/ids/230984-600-auto?v=638465404494130000&width=600&height=auto&aspect=true"],
        "popular": true,  
        "visible": true,  
        "location": "Brasil",  
        "additionalDetails": "Detalhes adicionais sobre o produto",  
        "specialPrice": 1799.99
      })
      .expectStatus(200)
      //.expectJson("success", true);
  });
  
