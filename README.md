## Checkpoint 1 - Grupo 13
### Uma proposta de arquitetura distribuída para processamento de requisições de serviços bancários

#### Descrição
O projeto consistirá na construção de uma arquitetura distribuída para
processamento e análise de requisições http de serviços bancários. Na figura 1 temos
descrita a arquitetura.

#### Sobre as tecnologias
Scripts Python que simulam diversos usuários enviando requisições,
fila Apache Kafka, serviços de processamento de requisições em Node.js, usando biblioteca
kafkajs para processar os eventos que vem da fila, biblioteca Mongoose para nos
conectarmos ao banco de dados MongoDB, serviço de analytics implementado com Java e
Kafka Stream para análise dos eventos e persistindo dados em tópico Kafka. O uso da
plataforma Apache Kafka para processamento distribuído server para assegurar maior
resiliência dos dados, podemos ter uma fila líder (leader) e filas secundárias (follower) que
servem de backup caso o servidor da fila líder caia; podemos fazer particionamento de
tópicos em que cada serviço processa um particionamento específico, por exemplo,
particionar por tipo de serviço bancário, como representado na figura 1 por cores distintas.

#### Observações 
Esse é um estudo preliminar e talvez a entrega final não seja 100% alinhada
com tal, por exemplo, se não houver tempo hábil não iremos implementar o serviço de
analytics, priorizando os serviços de processamento de requisições.

#### Rodar o projeto

* Inicializar o Apache Kafka
* Inicializar publisher: `node publisher.js`
* Inicializar worker: `node worker.js`
* Transferir: transfer [valor] [nome 1] [nome 2]
* Depositar: deposit [valor] [nome]

![Diagramas-trabalho Kafka drawio(4)](https://user-images.githubusercontent.com/26654992/228016119-16947482-0e91-47ac-a62a-0f04c1596891.png)
