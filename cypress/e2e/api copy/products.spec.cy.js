/// <reference types="cypress" />

import productData from "../../fixtures/productData.json";  // Importando os dados da fixture

describe('API Tests - Produtos', () => {
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

  it('Deve adicionar o produto com sucesso', () => {
    cy.request({
      method: 'POST',
      url: '/api/addProduct', 
      headers: {
        'Authorization': `Bearer ${token}`  
      },
      body: productData,  
    }).then((response) => {
      expect(response.status).to.eq(200);  

    });
  });

  it('Deve editar um produto com sucesso', () => {
    const productId = 1;  // ID do produto a ser editado
    
    cy.request({
      method: 'PUT',
      url: `/api/editProduct/${productId}`,  
      headers: {
        'Authorization': `Bearer ${token}`  
      },
      body: productData,  
    }).then((response) => {
      expect(response.status).to.eq(200);  
      
    });
  });

  it('Deve deletar o produto com sucesso', () => {
    const productId = 1;  // ID do produto
    cy.request({
      method: 'DELETE',
      url: `/api/deleteProduct/${productId}`,  
      headers: {
        'Authorization': `Bearer ${token}`  
      },
      body: {
        "authorization": token  
      },
    }).then((response) => {
      expect(response.status).to.eq(200);  
      
    });
  });

});