# 🏦 Sollunah Coin 📚 Web 3.0

<table align="center">
  <tr>
    <td align="center" width="500px">
      <img src="https://media.giphy.com/media/FPpTEGx7OlNbxRgpKd/giphy.gif" alt="Happy Lets Go GIF By NBC"
	   width="360" height="360"/> <br>
      <h1 align="center">VENDING MACHINE!!</h1>
    </td>
    <td align="center" width="500px">
	<h2><a href="https://github.com/Hiramek1/sollunah-cryptodev#equipe">Equipe</a><br>
	<a href="https://github.com/Hiramek1/sollunah-cryptodev#objetivo-">Objetivo</a><br>
	<a href="https://github.com/Hiramek1/sollunah-cryptodev#funcionalidades-">Funcionalidades</a><br>
	<a href="https://github.com/Hiramek1/sollunah-cryptodev#instru%C3%A7%C3%B5es-de-instala%C3%A7%C3%A3o-e-utiliza%C3%A7%C3%A3o-">
		Instruções de Instalação e Utilização</a><br>
	<a href="https://github.com/Hiramek1/sollunah-cryptodev#t%C3%A9cnicas-e-tecnologias-utilizadas-">
		Técnicas e Tecnologias Utilizadas</a><br>
	<a href="https://github.com/Hiramek1/sollunah-cryptodev#crit%C3%A9rios-de-aceite-">Critérios de aceite</a><br></h2>
    </td>
  </tr>
</table>

## Equipe
[Annita Gabriella Souza Da Silva](https://github.com/AnnitaGabriella)<br>
[Luis Henrique Santana De Sousa](https://github.com/Henrikess)<br>
[Hugo Vinícius Valentim Damasceno](https://github.com/Hiramek1)<br>
[Lorrana Filemes De Castro](https://github.com/Lofilemes)<br>

## Objetivo [^](https://github.com/Hiramek1/sollunah-cryptodev#-sollunah-coin--web-30)
Construir um `Smart Contract` de uma máquina de vendas, utilizando `Solidity` e todas as bibliotecas e tecnologias que aprendemos durante o curso.


## Funcionalidades [^](https://github.com/Hiramek1/sollunah-cryptodev#-sollunah-coin--web-30)
<a href="https://ruby-root-490.notion.site/Sollunah-9a146cc9a47748bc939746726d46bb5d">
   <p align="center"> Confira o detalhamento completo de nossas funcionalidades no Notion! </p>
   <img src="https://i.imgur.com/ZxTLtpc.png"/>
</a>

## Instruções de Instalação e Utilização [^](https://github.com/Hiramek1/sollunah-cryptodev#-sollunah-coin--web-30)

###### Ambientes

- O contrato de Tokens e o contrato da Máquina de Vendas poderão ser testados através da plataforma [Remix IDE](https://remix.ethereum.org/#optimize=false&runs=200&evmVersion=null)
- Será possível importar os arquivos de [Token](https://github.com/Hiramek1/sollunah-cryptodev/blob/main/contracts/Sollunah.sol) e [ExhangeMachine](https://github.com/Hiramek1/sollunah-cryptodev/blob/main/contracts/ExchangeMachine.sol) através de seus links no botão "GitHub".
- No menu à esquerda, procure pelo botão Deploy & run transactions. Primeiro selecione o contrato da Sollunah para fazer Deploy e copie seu endereço de Deployed Contracts, logo abaixo. Em seguida, abra o arquivo ExchangeMachine.sol e ele irá aparecer nos contratos disponíveis para Deploy. Cole o endereço do contrato da Sollunah e faça Deploy deste também.
- Utilize nossa documentação de [funcionalidades](https://ruby-root-490.notion.site/Sollunah-9a146cc9a47748bc939746726d46bb5d) para entender como você pode navegar. Divirta-se!

###### Testes
- A execução dos testes deve ser feita num compilador como [VS Code](https://code.visualstudio.com)
- Tenha em sua máquina a versão recomendada do [Node](https://nodejs.org/en/)
- Através do prompt de comando, execute os comandos a seguir no diretório do projeto:
```shell
npm install
npx hardhat compile
npx hardhat test
```
- Caso você já tenha yarn global na máquina, modifique apenas o npm
```shell
yarn install
npx hardhat compile
npx hardhat test
```
## Técnicas e Tecnologias Utilizadas [^](https://github.com/Hiramek1/sollunah-cryptodev#-sollunah-coin--web-30)

<table>
  <tr>
    <th>
      <a href="https://docs.soliditylang.org/en/v0.8.15/">
        <img alt="Solidity v0.8.15 homepage" src="https://avantrio.xyz/blog/wp-content/uploads/2020/02/solidity-nedir.png"
             width="200" height="82"/>
      </a>
    </th>
    <th>Nossos smart contracts estão desenvolvidos em Solidity </th>
  </tr>
  <tr>
    <th>
      <a href="https://www.binance.com/pt-BR/blog/all/o-que-são-tokens-erc20-421499824684902563">
        <img alt="O Que São Tokens ERC20 - Binance" src="https://investorshub.advfn.com/uimage/uploads/2018/3/21/qpusdcointelegraph2.png"
             width="200" height="82"/>
      </a>
    </th>
    <th>Seguimos o modelo ERC20 para nossos Tokens</th>
  </tr>
  <tr>
    <th>
      <a href="https://replit.com/@replit/Solidity-starter-beta?v=1">
        <img alt="Replit Solidity starter template beta" src="https://members-csforall.imgix.net/members/logos/replit-logo.jpeg"
             width="200" height="100"/>
      </a>
    </th>
    <th>Durante o desenvolvimento utilizamos a plataforma Replit<br>
        para editar o código simultaneamente</th>
  </tr>
  <tr>
    <th>
      <a href="https://remix.ethereum.org/#optimize=false&runs=200&evmVersion=null">
        <img alt="Remix - Ethereum IDE" src="https://i.imgur.com/Nq1ImZp.jpg"
             width="200" height="80"/>
      </a>
    </th>
    <th>Realizamos todos os testes de execução na plataforma Remix IDE </th>
  </tr>
  <tr>
    <th>
      <a href="https://github.com">
        <img alt="GitHub" src="https://sempreupdate.com.br/wp-content/uploads/2021/08/genexus.jpg"
             width="200" height="106"/>
      </a>
    </th>
    <th>O código fonte do projeto e versionamento, bem como <br>
	esta documentação estão armazenados no GitHub</th>
  </tr>
  <tr>
    <th>
      <a href="https://hardhat.org">
        <img alt="Hardhat - Ethereum development environment for professionals" src="https://hardhat.org/card.jpg"
             width="200" height="106"/>
      </a>
    </th>
    <th>Utilizamos o ambiente de desenvolvimento Hardhat<br>
	para realização dos testes unitários</th>
  </tr>
  <tr>
    <th>
      <a href="https://code.visualstudio.com">
        <img alt="Visual Studio Code - Code Editing. Redefined" src="https://www.freecodecamp.org/news/content/images/size/w2000/2021/08/vscode.png"
             width="200" height="100"/>
      </a>
    </th>
    <th>Precisamos do compilador Visual Studio Code para<br>
	nosso ambiente de testes</th>
  </tr>
  <tr>
    <th>
      <a href="https://trello.com">
        <img alt="Trello Official Website" src="https://blog.saninternet.com/wp-content/uploads/2017/11/como-ser-mais-produtivo-trello-SECNET-868x488-1.jpg"
             width="200" height="106"/>
      </a>
    </th>
    <th>Organizamos nossas tarefas através da plataforma Trello</th>
  </tr>
  <tr>
    <th>
      <a href="https://www.notion.so/">
        <img alt="Notion – One workspace. Every team." src="https://l3software.com.br/wp-content/uploads/2020/11/notion-labs-inc-logo-vector.png"
             width="200" height="106"/>
      </a>
    </th>
    <th>Temos nossas funcionalidades descritas através do Notion</th>
  </tr>
</table>

## Critérios de aceite [^](https://github.com/Hiramek1/sollunah-cryptodev#-sollunah-coin--web-30)
1. ~~Criou o próprio Contrato Inteligente de Token.~~
2. ~~Criou o próprio Contrato Ingeligente de Maquina de Venda do Token.~~
3. ~~O Comprador deve ser possivel comprar tokens com ethers.~~
4. ~~O Vendedor deve ser possivel vender tokens por ethers.~~
5. ~~O administrador deve ser capaz de reabastecer a maquina com tokens e ethers.~~
6. ~~O adminsitrador deve ser capaz de sacar o saldo em ethers~~
7. ~~O administrador deve ser capaz de redefinir o valor dos tokens para compra.~~
8. ~~O administrador deve ser capaz de redefinir o valor dos tokens para venda.~~
9. ~~Não deve ser possivel comprar tokens com valor zero.~~
10. ~~Não deve ser possivel vender tokens com valor zero.~~
11. ~~Não deve ser possivel reabastecer a maquina com tokens com valor zero.~~
12. ~~Não deve ser possivel reabastecer a maquina com ethers com valor zero.~~
