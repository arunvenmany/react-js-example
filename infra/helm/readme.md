## Deploying using Helm

To deploy the app using Helm, simply run the following:


```
helm upgrade --install helm upgrade react-app ./infra/helm/ --install --set dockerTag=1.0.17 --values infra/helm/values.yaml --namespace handson


```
