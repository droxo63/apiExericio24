/// <reference types="cypress" />


describe('API Tests - Categorias', () => {
    let token;  // Variável para armazenar o token de autenticação
    
    // Antes de cada teste, obtemos o token de autenticação
    beforeEach(() => {
      cy.request({
        method: 'POST',
        url: 'http://lojaebac.ebaconline.art.br/api/public/authUser',  // Endpoint de autenticação
        body: {
            "email": "admin@admin.com",  
            "phone": "14999887766",  
            "password": "admin123",  
            "userId": "01"  
        },
      }).then((response) => {
        console.log('Resposta de autenticação:', authResponse);  // Imprime a resposta da autenticação
        token = response.body.token;  // Armazena o token da resposta
        console.log('Token obtido:', token);  // Imprime o token para depuração
        
        // Validação para verificar se o token é válido
        if (!token) {
          throw new Error('Token não foi retornado da autenticação');
        }
      });
    });
  
    // Teste de Adicionar Categoria
    it('Deve adicionar uma categoria com sucesso', () => {
      cy.request({
        method: 'POST',
        url: 'api/addCategory',  // Endpoint para adicionar categoria
        headers: {
          'Authorization': `Bearer ${token}`,  // Passa o token no cabeçalho
        },
        body: {
          authorization: `Bearer ${token}`,  // Passa o token de autorização novamente no corpo
          name: 'Categoria Teste',  // Nome da categoria
          photo: 'https://samsungbrshop.vtexassets.com/arquivos/ids/230984-600-auto?v=638465404494130000&width=600&height=auto&aspect=true',  // URL da foto da categoria
        },
      }).then((response) => {
        console.log('Resposta da requisição de adicionar categoria:', response);  // Imprime a resposta
        expect(response.status).to.eq(200);  // Verifica o status da resposta
        expect(response.body.success).to.eq(true);  // Verifica o sucesso da operação
        expect(response.body.message).to.eq('Category added successfully');  // Verifica a mensagem de sucesso
      });
    });
  
    // Teste de Editar Categoria
    it('Deve editar uma categoria com sucesso', () => {
      const categoryId = 1;  // ID da categoria que será editada
      cy.request({
        method: 'PUT',
        url: `/api/editCategory/${categoryId}`,  // Endpoint para editar categoria
        headers: {
          'Authorization': `Bearer ${token}`,  // Passa o token no cabeçalho
        },
        body: {
          authorization: `Bearer ${token}`,  // Passa o token de autorização novamente no corpo
          name: 'Categoria Teste Editada',  // Novo nome para a categoria
          photo: 'https://samsungbrshop.vtexassets.com/arquivos/ids/230984-600-auto?v=638465404494130000&width=600&height=auto&aspect=true',  // Nova URL da foto da categoria
        },
      }).then((response) => {
        console.log('Resposta da requisição de editar categoria:', response);  // Imprime a resposta
        expect(response.status).to.eq(200);  // Verifica o status da resposta
        expect(response.body.success).to.eq(true);  // Verifica o sucesso da operação
        expect(response.body.message).to.eq('Category updated successfully');  // Verifica a mensagem de sucesso
      });
    });
  
    // Teste de Deletar Categoria
    it('Deve deletar uma categoria com sucesso', () => {
      const categoryId = 1  // ID da categoria que será deletada
      cy.request({
        method: 'DELETE',
        url: `/api/deleteCategory/${categoryId}`,  // Endpoint para deletar categoria
        headers: {
          'Authorization': `Bearer ${token}`,  // Passa o token no cabeçalho
        },
        body: {
          authorization: `Bearer ${token}`,  // Passa o token de autorização no corpo
        },
      }).then((response) => {
        console.log('Resposta da requisição de deletar categoria:', response);  // Imprime a resposta
        expect(response.status).to.eq(200);  // Verifica o status da resposta
        expect(response.body.success).to.eq(true);  // Verifica o sucesso da operação
        expect(response.body.message).to.eq('Category deleted successfully');  // Verifica a mensagem de sucesso
      });
    });
  });