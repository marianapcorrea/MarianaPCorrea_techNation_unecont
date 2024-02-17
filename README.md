# DASHBOARD FINANCEIRO


Teste Técnico de criação de dashboard, proposto pela empresa TechNation - UneCount, desenvolvido em HTML, CSS e JavaScript Vanilla.

## ✒️ Autora

* **Mariana P. Corrêa** - *Aluna do **Curso de Desenvolvimento Web** oferecido pela Trybe, onde também atuou como Monitora Summer de Instrução de Front End. Atua também como desenvolvedora front-end voluntária na ONG Palavras de Paz.* 
  [Github](https://github.com/marianapcorrea) ||
  [Linkedin](https://github.com/marianapcorrea)


## 🚀 Começando

  ### Dependências🔧

  - **vite** (^5.1.0): Build tool para aplicações web modernas.
  - **chart.js** (^4.4.1): Biblioteca para criar gráficos interativos.

    ### Scripts📋

  - `dev`: Inicia o servidor de desenvolvimento.
  - `build`: Compila o projeto para produção.
  - `preview`: Visualiza o build de produção localmente.

    #### Instalação:

    1. Clone o repositório.
    2. Execute `npm install` para instalar as dependências.
      
    #### Desenvolvimento:

    3. Execute `npm run dev` para iniciar o servidor de desenvolvimento.
    4. Acesse o projeto em `http://localhost:5173` no navegador.

    #### Construção
    5. Execute o comando `npm run build` para construir uma versão otimizada do projeto para produção.
    6. O código buildado estará na pasta `dist`.

    #### Pré-visualização
    7. Execute o comando `npm run preview` para iniciar um servidor de pré-visualização com a versão buildada do projeto.
    8. Acesse o projeto em seu navegador em `http://localhost:5174/`.


 ## 📦 Funcionalidades

 A interface desenvolvida permite a visualização dos dados financeiros da empresa.
 O *dashboard* está dividido em duas abas: a aba **INDICADORES** e a aba **NOTAS EMITIDAS**

  ###  ABA INDICADORES
  Exibe a soma de valores total de notas emitidas, total de notas emitidas sem cobrança, total de inadiplencia, total de notas a vencer e total de notas pagas.
  Permite a filtragem desse valor por trimestre, mês ou ano (opção 'Tudo')

  Também exibe os gráficos (gerados pela biblioteca Chart.js):
  * Evolução da inadimplência (mês a mês)
  * Evolução da receita (mês a mês)

  ###  ABA NOTAS EMITIDAS
  Renderiza cards com as notas cadastradas segundo as opções de filtro. Os filtros disponíveis são 
  * Todos os dados
  * Mês de Emissão
  * Mês de Cobrança
  * Mês de Pagamento
  * Status da Nota

  ## Proximos Passos 
  1. Ajustes de estilização (ajustes, ícones, transições);
  2. Estilização Responsiva;
  3. Lógica de filtro para ano vigente;
  4. Implementação de opções de visualização de diferentes tipos de gráficos;
  

 ## 🛠️ Construído com

Mencione as ferramentas que você usou para criar seu projeto

* [HTML 5](https://developer.mozilla.org/pt-BR/docs/Web/HTML) - Linguagem de Marcação de HiperTexto
* [CSS 3](https://developer.mozilla.org/pt-BR/docs/Web/CSS) - Linguagem de Estilo de Cascata
* [JavaScript](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript) - Linguagem de Programação interpretada. baseada em protótipos, multi-paradigma e dinâmica, suportando estilos de orientação a objetos, imperativos e declarativos (como por exemplo a programação funcional)
* [Vite](https://vitejs.dev/) - Ferramenta de construção de projetos de frontend 
* [Chart.js](https://www.chartjs.org/) - Biblioteca JavaScript Open Source de geração de gráficos
* [ChatGPT3](https://chat.openai.com/) e [Gemni](https://gemini.google.com/app) - IA's usadas na geração de mock de dados


## 📄 Licença

Este projeto é privado e não possui uma licença explícita. Não deve ser usado para além do fim já declarado.


---
> Template de referência para este documento
> oferecido [aqui](https://gist.github.com/lohhans/f8da0b147550df3f96914d3797e9fb89).