### Back-end da aplicação

#### Iniciando a aplicação

Copie o arquivo `.env.example`, cole e o renomeie para `.env`.

Configure o arquivo `.env` com os dados requeridos pelo sistema.

Após a configuração, com a aplicação `docker` iniciada, sem qualquer outro comando prévio, abra o terminal na pasta `backend` e utilize o comando:

```bash
yarn app:init
```
ou
```bash
npm run app:init
```

Este comando irá subir os `containers docker` necessários para a aplicação funcionar, instalar todas as dependências da aplicação (`node_modules`) e rodar todas as `migrations` para uma inicialização com alguns dados.

Caso queira efetuar os comando separadamente fique a vontade.

#### Rodando a aplicação

Basta abrir a raiz da pasta `backend` em seu terminal e inserir o comando:

```bash
  yarn dev
```
ou
```bash
  npm run dev
```

E, também, é necessário abrir uma segunda aba/janela do terminal e, no mesmo local, rodar mais um comando para "subir" a fila de `jobs` para envio de e-mails.

```bash
  yarn queue
```
ou
```bash
  npm run queue
```
