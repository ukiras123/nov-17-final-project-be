####Select which version of node you want to use at first 
### i am using version 18 slim , because it's lightweight and does the job 

FROM node:18.19.0-slim


### now we need to set a working directory in our docker 

WORKDIR /usr/fe/app



### once we select the working dir, now time to copy packages file
##  to our working dir

COPY package*.json ./ 

## after copying packages time to install it 

RUN npm install 

##after setting up packages time to copying all files to work dir 

COPY . . 

## after copying all the files time to run server 
CMD [ "npm", "start" ]




