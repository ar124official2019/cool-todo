# cool-todo
A very simple and cool todo app for demonstration of MERN Stack

**App is still under development!**

## Development
To run the project in development mode, here is a quick recipe.

```sh
git clone https://github.com/ar124official2019/cool-todo
cd cool-todo
git checkout dev # Make sure you are in `dev`elopment branch

# Install Node Modules
cd client
npm install

cd ../server
npm install

docker-compose up # start all serves

# Once mysql container has performed installations and is stable,
#   migrate databases
#   * Use another terminal for following task, keep docker stack running
docker-compose exec -it server /bin/bash
    npx sequelize-cli db:migrate
```

Once all containers are up and running, you should be able to open app at http://localhost:4200

### Google OAuth Login
To enable Google OAuth Login, create a file named `google.env` in `server` directory - and specify Google Client ID and Google Client Secret as following template.

> Of-course this will require you to restart the `server` container as well.

`> server/google.env`

```env
GOOGLE_CLIENT_ID=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

### Know Issues
> If you are on Windows, node modules installed from host `Windows` machine may not work in containers, while development. You'll either use `WSL` or use a container to install the modules as following.
```
cd cool-todo # Make sure you're arleady in app main directory
docker run --rm -itv .:/app node:18 /bin/bash -c "cd /app/client && npm install && cd /app/server && npm install"
```
