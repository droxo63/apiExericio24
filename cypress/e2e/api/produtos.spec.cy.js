/// <reference types="cypress" />

describe('API Tests', () => {
    let token;
  
    beforeEach(() => {
      // Realiza o login para obter o token
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
        expect(response.status).to.eq(200);  
        token = response.body.token;  // Armazena o token
      });
    });
  
    it('Deve adicionar o produto  com sucesso com dados fixos', () => {
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

    it('Deve editar um produto com sucesso', () => {

        it('Deve editar o produto com sucesso com dados fixos', () => {
            const productId = 1;  // ID do produto 
        
            cy.request({
              method: 'PUT',
              url: `/api/editProduct/${productId}`,  // Endpoint 
              headers: {
                'Authorization': `Bearer ${token}`  // token gerado
              },
              body: {
                "authorization": token,  
                "name": "Smartphones e Acessórios",  
                "price": 1.700,  
                "quantity": 50,  
                "categories": "Smartphones",  
                "description": "Smartphone Samsung Galaxy M55",  
                "photos": false,  
                "popular": true,  
                "visible": true,  
                "location": "BRA",  
                "additionalDetails": "Produto show de bola",  
                "specialPrice": 1.400  
              },
            
            }).then((response) => {
              expect(response.status).to.eq(200); 
              expect(response.body.success).to.eq(true);
              expect(response.body.message).to.eq('Product updated successfully');  
            })
        })
      });

      it('Deve deletar o produto com sucesso com dados fixos', () => {
        const productId = 1;  
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
