FROM node:latest
ENV NODE_ENV=production
WORKDIR /
COPY package*.json ./
RUN npm install typescript -g
RUN npm install --production
# RUN npm ci --only=production
# Copy our project into our working container and initiate build
COPY . .
EXPOSE 8085
RUN tsc
CMD [ "node", "dist/app.js" ]
