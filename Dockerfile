FROM node:10.9.0-alpine
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

RUN yarn install && yarn start
