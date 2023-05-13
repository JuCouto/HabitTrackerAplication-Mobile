 <h1 align="center">Projeto Tracker de hábitos.</h1>

<p align="center">Tracker de Hábitos é uma aplicação full stack web e mobile.</p>
<p align="center"> Nessa aplicação é possível acompanhar os hábitos diários de um usuário, cadastrando hábitos, marcar um hábito como concluído e demarca-lo caso queira, escolher os dias da semana em que o hábito será cadastrado.</p>
<p align="center">As imagens de logo e de splash foram fornecidas pelo Rocketseat, porém alterei as cores. As imagens estão em svg.</p>

___________________________________________________________
### Tecnologias utilizadas. 

|   Backend     | Frontend     | Mobile       | Banco de Dados |
| :-----------: | :----------: |:----------:  |:----------:    |
| Node.Js       | React        | React Native | SQLite         |
| TypeScript    | TypeScript   | Expo         |
| Fastify       | HTML / CSS   | Nativewind   |                |
| Prisma        | Tailwind     |              |                |
| Zod           | Radix-UI     |              |                |


__________________________________________________________________________________________________________ 

<details>
<summary>Bibliotecas utilizadas React</summary>
 
- npm install -D tailwindcss postcss autoprefixer    (Bibliotecas de estilização)
  - Tailwindcss -> é um bootstrap.
  - Postcss-> automatiza tarefas dentro do CSS.
  - Autoprefixer -> adiciona prefixo do browser.
 
- npm i phosphor-react
  - Phosphor -> pacote de ícones

- npm i dayjs
  - Dayjs -> tratamento e manipulação de data.

- Radix-UI
  - npm install @radix-ui/react-dialog
  - npm install @radix-ui/react-popover
  - npm install @radix-ui/react-checkbox
  - Radix-ui -> auxilia na acessibilidade, por exemplo: no leitor de tela ele informa que um modal foi aberto.Os componentes são instalados separadamente. 

</details>

<details>
<summary>Bibliotecas utilizadas React Native</summary>

- npx expo install expo-font @expo-google-fonts/inter
  - instalar fontes.

- npm i nativewind
  - com o Nativewind instalado é possível utilizar o tailwind, é um bootstrap.

- npm i tailwindcss --save--dev
  - npx taiwindcss init
  - configurar o arquivo tailwind.config.js
  - configurar arquivo babel.config.js
    - É preciso typar o className para utilizar tailwind
    - seguir as recomendações do nativewind para configurações em typescript.
    
- npx expo install react-native-svg
  - Biblioteca para ler arquivo svg.

- npm i react-native-svg-transformer --save-dev
  - bilioteca para rendereizar o svg como componente
  - criar arquivo metro.config.js
  - criar arquivo svg.d.ts e colocar a configuração dentro dele.
 
- npm install dayjs
  - Biblioteca para tratar datas. Para configurar :
  - criar pasta lib, arquivo dayjs.ts e adicionar importação no app.tsx
   
 </details>

<details>
<summary>Dicas para correções de erros</summary>

- Se der erro ao rodar o npx prisma studio:
 
 ![image](https://github.com/JuCouto/HabitTrackerAplication-Mobile/assets/100319483/59ac91f7-b12d-4938-964f-c25e1152fd95)
 
  - Verificar se a pasta dev está no arquivo e Trocar a url no `schema.prisma` para o modelo abaixo:
 ```
datasource db {
  provider = "sqlite"
  url      = "file:dev.db"
}
 ```
