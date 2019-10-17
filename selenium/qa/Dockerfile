FROM  maven:3.3-jdk-8 AS builder

WORKDIR /usr/src/test

COPY pom.xml .

RUN mvn verify clean --fail-never

COPY config ./config/
COPY src ./src/

RUN mvn verify --fail-never


CMD mvn verify -Dbrowser=hub -Dhuburl=http://$HUB_HOST:$HUB_PORT/wd/hub -Dconfig=suite.conf.json -Dbaseurl=$BASE_URL -Denvironment=chrome
