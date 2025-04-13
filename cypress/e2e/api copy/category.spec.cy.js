/// <reference types="cypress" />

import productData from "../../fixtures/productData.json";  // Importando os dados da fixture

describe('API Tests - Categorias', () => {
  let token;  // Para armazenar o token 

  beforeEach(() => {
    cy.emailAleatorio().then((emailAleatorio) => {
        cy.senhaAleatoria().then((senhaAleatoria) => {
            cy.login(emailAleatorio, "14999887766", senhaAleatoria, "1").then((authToken) => {
      token = authToken;  // Armazena o token 
            })
        })
    })
})

     // Teste de Adicionar Categoria
     it('Deve adicionar uma categoria com sucesso', () => {
        cy.request({
          method: 'POST',
          url: '/api/addCategory',  
          headers: {
            'Authorization': `Bearer ${token}`,  
          },
          body: {
            authorization: `Bearer ${token}`,  
            name: 'Categoria Teste',  
            photo: 'https://samsungbrshop.vtexassets.com/arquivos/ids/230984-600-auto?v=638465404494130000&width=600&height=auto&aspect=true',  
          },
        }).then((response) => {
          console.log('Resposta da requisição de adicionar categoria:', response); 
          expect(response.status).to.eq(200);  
          console.log('Resposta:', response.body);
         
        });
      });
    
      // Teste de Editar Categoria
      it('Deve editar uma categoria com sucesso', () => {
        const categoryId = 1;  // ID da categoria 
        cy.request({
          method: 'PUT',
          url: `/api/editCategory/${categoryId}`,  
          headers: {
            'Authorization': `Bearer ${token}`,  
          },
          body: {
            authorization: `Bearer ${token}`,  
            name: 'Categoria Teste Editada',  
            photo: 'https://samsungbrshop.vtexassets.com/arquivos/ids/230984-600-auto?v=638465404494130000&width=600&height=auto&aspect=true',  
          },
        }).then((response) => {
          console.log('Resposta da requisição de editar categoria:', response);  
          expect(response.status).to.eq(200); 
          console.log('Resposta:', response.body);
         
        });
      });
    
      // Teste de Deletar Categoria
      it('Deve deletar uma categoria com sucesso', () => {
        const categoryId = 1  // ID da categoria 
        cy.request({
          method: 'DELETE',
          url: `/api/deleteCategory/${categoryId}`,  
          headers: {
            'Authorization': `Bearer ${token}`,  
          },
          body: {
            authorization: `Bearer ${token}`,  
          },
        }).then((response) => {
          console.log('Resposta da requisição de deletar categoria:', response);  
          expect(response.status).to.eq(200);  
          console.log('Resposta:', response.body);
        });
      });
    });

