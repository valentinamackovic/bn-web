FROM  maven:3.3-jdk-8 AS builder

WORKDIR /usr/src/
RUN mkdir report
WORKDIR /usr/src/test
COPY pom.xml .
RUN mvn dependency:resolve
WORKDIR /usr/src/test
COPY src ./src/
COPY config ./config/
COPY /extra/docker_scripts/start_hub_profile.sh .
RUN chmod +x start_hub_profile.sh
CMD ["./start_hub_profile.sh"]