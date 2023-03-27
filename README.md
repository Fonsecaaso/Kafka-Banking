## Checkpoint 1 - Grupo 13
### Uma proposta de arquitetura distribuída para processamento de requisições de serviços bancários

Descrição: o projeto consistirá na construção de uma arquitetura distribuída para
processamento e análise de requisições http de serviços bancários. Na figura 1 temos
descrita a arquitetura.

Sobre as tecnologias: scripts Python que simulam diversos usuários enviando requisições,
fila Apache Kafka, serviços de processamento de requisições em Node.js, usando biblioteca
kafkajs para processar os eventos que vem da fila, biblioteca Mongoose para nos
conectarmos ao banco de dados MongoDB, serviço de analytics implementado com Java e
Kafka Stream para análise dos eventos e persistindo dados em tópico Kafka. O uso da
plataforma Apache Kafka para processamento distribuído server para assegurar maior
resiliência dos dados, podemos ter uma fila líder (leader) e filas secundárias (follower) que
servem de backup caso o servidor da fila líder caia; podemos fazer particionamento de
tópicos em que cada serviço processa um particionamento específico, por exemplo,
particionar por tipo de serviço bancário, como representado na figura 1 por cores distintas.

Observações: esse é um estudo preliminar e talvez a entrega final não seja 100% alinhada
com tal, por exemplo, se não houver tempo hábil não iremos implementar o serviço de
analytics, priorizando os serviços de processamento de requisições.

![](https://file%2B.vscode-resource.vscode-cdn.net/home/mateus/Downloads/Diagramas-trabalho%20Kafka.drawio%284%29.png?version%3D1679937097814)