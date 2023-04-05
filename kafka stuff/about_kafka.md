## Alguns detalhes

Para rodar o kafka, de maneira simplista, precisamos seguir os seguintes passos:

1. Na pasta do Kafka rodar o comando `bin/zookeeper-server-start.sh config/zookeeper.properties` para iniciar o zookeeper

2.  Em outro terminal mas ainda na pasta do Kafka rodar o comando `bin/kafka-server-start.sh config/server.properties` para iniciar o Kafka

3.  Caso deseje iniciar um tópico novo basta rodar o comando `bin/kafka-topics.sh --create --topic nome_do_topico --bootstrap-server localhost:9092`

Demais informações para um quick start entre no link: https://kafka.apache.org/quickstart