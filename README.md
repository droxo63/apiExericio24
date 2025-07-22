#  🧪 Testes de API REST — ServeRest / Usuários


####Sobre o Projeto
###Projeto de testes da API `ServeRest`, com foco na funcionalidade **Usuários**, dividido em duas etapas:

1. **Testes manuais com Postman** — Execução e validação dos principais endpoints da funcionalidade `Usuários`.
2. **Testes automatizados com Cypress** — Automação dos mesmos cenários utilizando Cypress e documentação via Swagger.

---

## 🚀 Tecnologias Utilizadas

- ✅ [Postman](https://www.postman.com/) — Execução de testes manuais
- ✅ [Cypress](https://www.cypress.io/) — Automação de testes de API REST
- ✅ [Node.js](https://nodejs.org/) — Ambiente de execução JavaScript
- ✅ [Swagger UI](https://swagger.io/tools/swagger-ui/) — Consulta da documentação da API
- ✅ [VS Code](https://code.visualstudio.com/) — Ambiente de desenvolvimento
- ✅ [ServeRest](https://github.com/PauloGoncalvesBH/ServeRest) — Simulador de API REST local

---

## 📐 Metodologia

Este projeto foi desenvolvido em duas fases complementares para garantir cobertura total da funcionalidade `Usuários`.

### 🧪 Parte 1 — Testes Manuais com Postman

- Subida do servidor local **ServeRest**
- Criação e execução de testes com os verbos HTTP:
  - `GET` — Listagem de usuários
  - `POST` — Cadastro de novo usuário
  - `PUT` — Atualização de dados
  - `DELETE` — Remoção de usuários
- Inclusão de **cenários negativos**, como:
  - Tentativa de cadastro com e-mail duplicado
  - Alteração de usuário inexistente
- Validação de respostas com **asserções de status code, body e mensagens**
- Exportação da **collection em `.json`**, disponível neste repositório

### 🤖 Parte 2 — Testes Automatizados com Cypress

- Clonagem do projeto base: [`EBAC-QE/teste-api-ebac`](https://github.com/EBAC-QE/teste-api-ebac)
- Implementação dos testes descritos no arquivo `exercicio-api.cy.js`
- Reutilização dos aprendizados obtidos na fase manual
- Utilização da documentação Swagger para definir contratos e validar esquemas
- Organização do projeto com boas práticas:
  - Separação de cenários
  - Cobertura de fluxos positivos e negativos
  - Validação de mensagens e respostas esperadas

---

## ✅ Resultados Esperados

Este projeto cobre os principais cenários da funcionalidade `Usuários`, incluindo:

- Cadastro válido de novos usuários
- Edição e remoção com dados válidos
- Validação de campos obrigatórios
- Rejeição de dados inválidos ou duplicados
- Retorno esperado de status HTTP (200, 201, 400, 404, etc.)

Todos os testes incluem **asserções detalhadas** de resposta.

---

## ⚙️ Como Executar

### 1. Clone o Repositório

```bash
git clone https://github.com/seuusuario/testes-api-sererest.git
cd testes-api-sererest
````
###2. Suba o servidor ServeRest
É necessário ter o Node.js instalado.
```bash
npm install -g json-server
npx serverest
```
O servidor ficará disponível em http://localhost:3000.

###3. Testes Manuais (Postman)
Abra o Postman

Importe a coleção ServeRest-Usuarios.postman_collection.json contida no repositório

Execute os testes manualmente utilizando o Runner

Valide os status, retornos e mensagens

###4. Testes Automatizados (Cypress)
Instale as dependências:
```bash
npm install
```

# Abre o Test Runner do Cypress
```bash
npx cypress open
```
# Ou executa em modo headless
```bash
npx cypress run
```

📝 Licença
Este projeto está licenciado sob a MIT License. Consulte o arquivo LICENSE para mais detalhes.

🙋‍♂️ Contribuição
Contribuições são bem-vindas! Caso tenha sugestões de melhorias, novos cenários de teste ou correções, sinta-se à vontade para abrir uma issue ou pull request.



### Detalhes

[![Anurag's GitHub stats](https://github-readme-stats.vercel.app/api?username=droxo63&show_icons=true&theme=dark)](https://github.com/anuraghazra/github-readme-stats)


### Projetos

[![Readme Card](https://github-readme-stats.vercel.app/api/pin/?username=droxo63&repo=TCC-EBAC-QE.github.io&theme=dark)](https://github.com/anuraghazra/github-readme-stats)



### Linguagens utilizadas

[![Top Langs](https://github-readme-stats.vercel.app/api/top-langs/?username=droxo63&layout=compact)](https://github.com/anuraghazra/github-readme-stats)


### Contatos

[<img src='https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white' alt='Linkedin' height='30'>](https://www.linkedin.com/in/dirpereira/)





