FROM node:8.11.3-alpine
ENV TZ=Asia/Shanghai

RUN  echo 'http://mirrors.ustc.edu.cn/alpine/v3.5/main' > /etc/apk/repositories \
    && echo 'http://mirrors.ustc.edu.cn/alpine/v3.5/community' >>/etc/apk/repositories \
&& apk update && apk add tzdata \
&& ln -sf /usr/share/zoneinfo/Asia/Shanghai /etc/localtime \
&& echo "Asia/Shanghai" > /etc/timezone

# Make project directory with permissions
RUN mkdir /app

# Switch to project directory
WORKDIR /app

# Copy required stuff
COPY . .

RUN npm install --registry=https://registry.npm.taobao.org --sass_binary_site=https://npm.taobao.org/mirrors/node-sass/

RUN ["chmod", "+x", "/app/docker_start.sh"]

RUN which sh
CMD /bin/sh /app/docker_start.sh

EXPOSE 8080
