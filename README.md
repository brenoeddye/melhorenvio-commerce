# Melhor Envio Commerce

![js](https://img.shields.io/badge/JS-Vue-50BB7A?style=for-the-badge)
![JS](https://img.shields.io/badge/JS-Vite-747bff?style=for-the-badge)
![css](https://img.shields.io/badge/Sass-Styles-bf4080?style=for-the-badge)

<img src="/public/github/principal.png">

Organização e código:

As pastas do projeto estão separadas das seguintes formas:

🎨 assets: Todos os estilos Sass e icones usados no projeto estão aqui, devido ao fato de utilizar o Unimport e o Uncomponent do Vue, deixei apenas os arquivos mixins.scss, reset.scss, themes.scss, variables.scss.

⚙️ components: Aqui estão os componentes do projeto. Como eu gosto de organizar bem essa área, eu utilizo uma regra que eu criei: na pasta Base contém os componentes básicos (até ai tudo bem), na pasta layout contam os componentes que atendem 1 dos requisitos a seguir: São complexos ou utiliza mais de um componente por arquivo.

💚 core: Todos os dados tratos pelo componente estão nessa pasta, nessa região irão visualizar todos os types e dados que passam pelos componentes. Assim como a conexão com a API da FakeStoreAPI utilizada para fazer o teste.

🌐 router stores e view: pastas padrões do Vue.

# Features

<img src="/public/github/features.png">

Features presentes:

💎 Pesquisa de produtos da propria api.
    opções: Mens, Womans, eletronics ...

💎 Menu funcional com as categorias Camiseta, Camisa e Eletrônicos funcionais

💎 Página 404 quando digita um endereço errado

💎 Modal para adicionar mais de um produto quando clicar no Adicionar Mais

💎 Dark and Light mode

💎 Carrinho funcional para adicionar e remover o produto, aumentar ou diminuir sua quantidade e somando os itens e o total do pedido.

💎 Possibilidade de alterar entre os endereços pré definidos no dropdown ao clicar em "Olá, Dwight"

💎 Select com opções de categorias funcionais

Preview: [https://melhorenvio-commerce.vercel.app/](https://melhorenvio-commerce.vercel.app/)
