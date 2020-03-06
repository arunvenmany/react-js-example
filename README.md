This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

Live URL:-[http://spring-react-aks-app-ui.eastasia.cloudapp.azure.com](React-Demp-App)
## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `Build and Run in docker in local`
```  
docker login http://aksspringreacthandson.azurecr.io -u aksspringreacthandson -p <password>

docker build -t aksspringreacthandson.azurecr.io/react-app:1.0.1 .

docker run -p 5000:5000 aksspringreacthandson.azurecr.io/react-app:1.0.1

docker push aksspringreacthandson.azurecr.io/react-app:1.0.1
```
### `Deploy to Kubernetes from Local using Helm`
```
helm upgrade react-app --install ./infra/helm/ --set dockerTag=1.0.1 --values=./infra/helm/values.yaml --namespace=handson
NAME:   react-app
LAST DEPLOYED: Wed Mar  4 21:58:21 2020
NAMESPACE: handson
STATUS: DEPLOYED

RESOURCES:
==> v1/Service
NAME              TYPE          CLUSTER-IP  EXTERNAL-IP  PORT(S)       AGE
react-js-app-svc  LoadBalancer  10.0.6.165  <pending>    80:31694/TCP  1s

==> v1/Deployment
NAME          DESIRED  CURRENT  UP-TO-DATE  AVAILABLE  AGE
react-js-app  2        2        2           0          1s

==> v1/Pod(related)
NAME                          READY  STATUS             RESTARTS  AGE
react-js-app-c94df5947-vmjwm  0/1    ContainerCreating  0         0s
react-js-app-c94df5947-x84s2  0/1    Pending            0         0s

$ kubectl get pods --namespace handson
NAME                           READY   STATUS    RESTARTS   AGE
react-js-app-c94df5947-vmjwm   1/1     Running   0          76s
react-js-app-c94df5947-x84s2   1/1     Running   0          76s
```
 `