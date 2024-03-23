# Specify the parent image (runtime environment and the linux distrobution to run on)
FROM node:alpine3.10

# Specify the working directory
WORKDIR /app

# Copy over all the files in the project over to the image
COPY . .

# Now that the package.json has been transfered over, run npm install to get the dependencies
RUN npm install

# As I am running a node app, we need to expose a port to recieve requests from the computer
EXPOSE 3000

# Finally, after the build is complete, we can start the application
CMD ["node", "index.js"]