## Documenting Kubernetes Cluster and Helm Setup

* Create Kube Cluster in AKS using AZ Cli or Portal
* Configure Kubectl and Helm in local
* Get KubeConfig by below command
```$xslt
az aks get-credentials --name <cluster_name> --resource-group <cluster_resource_group>
```
* Create Kubernetes Namespace
```$xslt
kubectl create -f namespace-handson.json
``` 
* Enable RBAC for Helm Tiller
```$xslt
kubectl create serviceaccount tiller --namespace kube-system

kubectl create -f tiller-clusterrolebinding.yaml
helm init --service-account tiller --upgrade
```

* Create Image Pull Secret for pulling docker image from private repo
```$xslt
kubectl create secret docker-registry regcred --docker-server=http://aksspringreacthandson.azurecr.io --docker-username=aksspringreacthandson  --docker-password=<docker-password> --docker-email=arunvenmany@outlook.com
```