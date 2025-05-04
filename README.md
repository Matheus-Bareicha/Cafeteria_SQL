# Projeto Cafeteria SQL

Este é um projeto de gerenciamento de pedidos de uma cafeteria, desenvolvido com Node.js, Express, TypeScript, Mysql2 e MySQL.

## Requisitos

- Docker
- Docker Compose

## Configuração do Ambiente

Crie um arquivo `.env` na raiz do projeto com o seguinte conteúdo:

```env
PORT_APP=3000
PORT_DB=3306
DATABASE="banco"
DATABASE_USER="root"
DATABASE_HOST="container-banco-sql"
DATABASE_PASSWORD="senha"
```

Se necessario alterar a porta da aplicação ou do banco, será necessario alterar somente na .env.

Não há necessidade de alterar as outras variaveis, já que são apenas para a configuração interna para a criação do banco. 

## Execução com Docker

1. Certifique-se de que o Docker e o Docker Compose estão instalados em sua máquina.
2. Execute o comando abaixo para iniciar os serviços:

```bash
docker-compose up --build
```

Esse comando iniciará tanto a aplicação quanto o banco.

3. O servidor estará disponível em: http://localhost:PORT_APP com a porta definida na .env.

## Endpoints

### Criar Pedido
- **URL:** `/CriarPedido`
- **Método:** `POST`
- **Corpo da Requisição:**
  ```json
  {
    "cliente": "João Silva",
    "item": "Café",
    "quantidade": 2,
    "observacao": "Sem açúcar"
  }
  ```

### Listar Pedidos
- **URL:** `/ListarPedidos`
- **Método:** `GET`

### Atualizar Status do Pedido
- **URL:** `/AtualizarStatusPedido/:id`
- **Método:** `PATCH`
- **Corpo da Requisição:**
  ```json
  {
    "status": "PRONTO"
  }
  ```

### Listar Pedidos por Status
- **URL:** `/ListarPedidosPorStatus/:status`
- **Método:** `GET`

## Observações

## Observações

- O banco de dados e a tabela `pedido` serão criados automaticamente ao iniciar o container, caso ainda não existam.
- O projeto utiliza `mysql2` para interagir diretamente com o banco de dados, sem o uso de ORMs como Prisma.