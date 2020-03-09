### Applicação mobile

#### Iniciando a aplicação

Após ter iniciado o `backend` da aplicação, acessa a raiz da pasta `mobile` em seu terminal e insira o comando:

```bash
yarn
```
ou
```bash
npm install
```

#### Rodando a aplicação

Após ter instalado as dependências da aplicação, ainda na raiz da pasta `mobile`, inicie seu emulador de preferência, sendo ele Android ou iOS, ou utilize um aparelho físico (preferência para o aparelho físico por causa da performance).

Com o emulador já aberto, rode o comando em seu terminal:

iOS
```bash
yarn ios
```
ou
```bash
npm run ios
```

Android
```bash
yarn android
```
ou
```bash
npm run android
```

Aguarde o termino da `compilação` dos arquivos e sua aplicação
#### Dark-mode

Esta aplicação tem um modo darkmode, porém, o mesmo é passivo, ou seja; depende de seu sistema operacional. Caso seu sistema esteja com `dark-mode` ativo ele será repassado para o aplicativo, caso contrário a aplicação utilizará o tema `light`.

