/// <reference types="cypress" />

describe('API Tests', () => {
    let token;
  
    beforeEach(() => {
      // Realiza o login para obter o token
      cy.request({
        method: 'POST',
        url: '/public/authUser', 
        body: {
          "email": "cliente@ebac.com.br",  
          "phone": "14999887766",  
          "password": "admin123",  
          "userId": "01"  
        },
      
      }).then((response) => {
        expect(response.status).to.eq(200);  
        token = response.body.token;  // Armazena o token retornado
      });
    });
  
    it('Deve adicionar o produto Samsung Galaxy M55 com sucesso', () => {
      cy.request({
        method: 'POST',
        url: '/api/addProduct', 
        headers: {
          'Authorization': `Bearer ${token}`  
        },
        body: {
          "name": "Samsung Galaxy M55", 
          "price": 1999.99,  
          "quantity": 10,  
          "categories": ["Smartphones"],  
          "description": "Samsung Galaxy M55 - O melhor smartphone da sua categoria",  
          "photos": ["https://samsungbrshop.vtexassets.com/arquivos/ids/230984-600-auto?v=638465404494130000&width=600&height=auto&aspect=true"],  // URL da imagem
          "popular": true,  
          "visible": true,  
          "location": "Brasil",  
          "additionalDetails": "Detalhes adicionais sobre o produto",  
          "specialPrice": 1799.99  
        },
      }).then((response) => {
        expect(response.status).to.eq(200);  
      });
    });

    it('Deve editar uma categoria com sucesso', () => {
        const categoryId = 1;  // ID da categoria que você quer editar (exemplo, pode ser dinâmico dependendo do seu caso)
        it('Deve editar uma categoria com sucesso', () => {
            const categoryId = 1;  // ID da categoria que você quer editar (exemplo, pode ser dinâmico dependendo do seu caso)
        
            cy.request({
              method: 'PUT',
              url: `/api/editCategory/${categoryId}`,  // Endpoint para editar categoria
              headers: {
                'Authorization': `Bearer ${token}`  // Usando o token gerado
              },
              body: {
                "authorization": `Bearer ${token}`,  // Pode ser qualquer valor ou deixado como 'any'
                "name": "Smartphones e Acessórios",  // Novo nome da categoria
                "price": 1.700,  // Preço de qualquer valor ou deixado como 'any'
                "quantity": 50,  // Quantidade de qualquer valor ou deixado como 'any'
                "categories": "Smartphones",  // Categorias podem ser definidas aqui
                "description": "Smartphone Samsung Galaxy M55",  // Descrição atualizada
                "photos": false,  // Fotos, se necessário, pode ser qualquer valor ou 'any'
                "popular": true,  // Popularidade, qualquer valor ou 'any'
                "visible": true,  // Se a categoria está visível ou não
                "location": "BRA",  // Localização, se relevante, ou 'any'
                "additionalDetails": "Produto show de bola",  // Detalhes adicionais, ou 'any'
                "specialPrice": 1.400  // Preço especial, se necessário, ou 'any'
              },
              failOnStatusCode: false  // Não falha automaticamente para status de erro
            }).then((response) => {
              expect(response.status).to.eq(200);  // Verifica se a categoria foi editada com sucesso
              expect(response.body.success).to.eq(true);  // Verifica se o sucesso é verdadeiro
            })
        })
      });

      it('Deve deletar um produto com sucesso', () => {
        const productId = 1;  // ID do produto que você quer deletar (exemplo, pode ser dinâmico dependendo do seu caso)
    
        cy.request({
          method: 'DELETE',
          url: `/api/deleteProduct/${productId}`,  // Endpoint para deletar o produto
          headers: {
            'Authorization': `Bearer ${token}`  // Usando o token gerado
          },
          body: {
            "authorization": `Bearer ${token}`  // O campo de autorização pode ser 'any' conforme a documentação
          },
          failOnStatusCode: false  // Não falha automaticamente para status de erro
        }).then((response) => {
          expect(response.status).to.eq(200);  // Verifica se o produto foi deletado com sucesso
        
        });
      });
    });
