/// <reference types="cypress" />


describe('API Tests - Categorias', () => {
    let token;  // Variável para armazenar o token 
    
    
    // Antes de cada teste, gera o token 
    beforeEach(() => {
      cy.request({
        method: 'POST',
        url: '/public/authUser',  
        body: {
            "email": "admin@admin.com",  
            "phone": "14999887766",  
            "password": "admin123",  
            "userId": "01"  
        },
      }).then((response) => {
        console.log('Resposta de autenticação:', response);  
        token = response.body.token;  
        console.log('Token obtido:', token);  
        

      });
    });
  
    // Teste de Adicionar Categoria
    it('Deve adicionar uma categoria com sucesso', () => {
      cy.request({
        method: 'POST',
        url: 'api/addCategory',  
        headers: {
          'Authorization': `Bearer ${token}`,  
        },
        body: {
          'authorization': `Bearer ${token}`,  
          'name': 'Categoria Teste',  
          'photo': 'https://samsungbrshop.vtexassets.com/arquivos/ids/230984-600-auto?v=638465404494130000&width=600&height=auto&aspect=true',  
        },
      }).then((response) => {
        console.log('Resposta da requisição de adicionar categoria:', response); 
        expect(response.status).to.eq(200);  
       
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
          'authorization': `Bearer ${token}`,  
          'name': 'Categoria Teste Editada',  
          'photo': 'https://samsungbrshop.vtexassets.com/arquivos/ids/230984-600-auto?v=638465404494130000&width=600&height=auto&aspect=true',  // Nova URL da foto da categoria
        },
      }).then((response) => {
        console.log('Resposta da requisição de editar categoria:', response);  
        expect(response.status).to.eq(200); 
        
       
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
          'authorization': `Bearer ${token}`,  
        },
      }).then((response) => {
        console.log('Resposta da requisição de deletar categoria:', response);  
        expect(response.status).to.eq(200);  

      });
    });
  });