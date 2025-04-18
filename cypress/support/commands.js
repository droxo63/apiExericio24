// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
import productData from "../fixtures/productData.json";
//fixture.productData = productData

Cypress.Commands.add('login', (email, phone, password, userId) => {
    cy.request({
      method: 'POST',
      url: '/public/authUser',
      body: {
       "email": email,  
          "phone": phone,  
          "password": password,  
          "userId": userId  
      },

    }).then((response) => {
      expect(response.status).to.eq(200);
      //return response.body.token;
    });
  });

   // Função para gerar um email aleatório
   Cypress.Commands.add("emailAleatorio", ()=>{
    const pre = 'user';
    const num = Math.floor(Math.random() * 100); 
    return `${pre}${num}@teste.com`;
   }) 
    
  

  // Função para gerar uma senha aleatória
  Cypress.Commands.add("senhaAleatoria", ()=>{
    return Math.random().toString(36).slice(-10);
    
  })
   
  