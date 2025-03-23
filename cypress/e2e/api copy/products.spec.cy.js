/// <reference types="cypress" />

import productData from "../../fixtures/productData.json";  // Importando os dados da fixture

describe('API Tests - Produtos', () => {
  let token;  // Para armazenar o token de autenticação

  beforeEach(() => {
    // Realiza o login para obter o token
    cy.login('cliente@ebac.com.br', "14999887766", 'admin123', "1").then((authToken) => {
      token = authToken;  // Armazena o token retornado
    });
  });

  it.only('Deve adicionar o produto com sucesso', () => {
    cy.request({
      method: 'POST',
      url: '/api/addProduct', 
      headers: {
        'Authorization': `Bearer ${token}`  // Usando o token para autenticação
      },
      body: productData,  // Usando os dados do produto da fixture
    }).then((response) => {
      expect(response.status).to.eq(200);  // Verifica se o status é 200
      expect(response.body).to.have.property('success');
      expect(response.body).to.have.property('message');
    });
  });

  it('Deve editar um produto com sucesso', () => {
    const productId = 1;  // ID do produto a ser editado
    
    cy.request({
      method: 'PUT',
      url: `/api/editProduct/${productId}`,  // Endpoint para editar o produto
      headers: {
        'Authorization': `Bearer ${token}`  // Usando o token para autenticação
      },
      body: productData,  // Usando os dados do produto da fixture
    }).then((response) => {
      expect(response.status).to.eq(200);  // Verifica se o status é 200
      
    });
  });

  it('Deve deletar o produto com sucesso', () => {
    const productId = 1;  // ID do produto a ser deletado

    cy.request({
      method: 'DELETE',
      url: `/api/deleteProduct/${productId}`,  // Endpoint para deletar o produto
      headers: {
        'Authorization': `Bearer ${token}`  // Usando o token para autenticação
      },
      body: {
        "authorization": token  // Envia o token no corpo da requisição
      },
    }).then((response) => {
      expect(response.status).to.eq(200);  // Verifica se o status é 200
      
    });
  });

});