## Deploying using Helm

To deploy the app using Helm, simply run the following:


```
git clone https://github.com/DigitalInnovation/service-whisks.git
cd service-whisks
helm upgrade location-service-webservice --install ./infra/helm/common-helm --values=./infra/helm/common-helm/values_location-service-webservice_dev.yaml --set dockerTag=1.0.181 --debug --tiller-namespace centralservices


```


If you want to see what Helm is going to deploy, before committing to actually actioning it, you can supply the `--debug` and `--dry-run` flags.  This will print the interpolated templates to the terminal.

`helm upgrade location-service-webservice  --install ./infra/helm/common-helm --dry-run --values=./infra/helm/common-helm/values_location-service-webservice_dev.yaml --set dockerTag=1.0.181 --debug  --tiller-namespace centralservices`

###### set the Kube config file and namespace
Firstly, import the kubernetes config file from vault

`node ./infra/vault/import_vault_secrets <GIT_TOKEN>`

>For Staging

`export KUBECONFIG=./infra/k8s/staging-kubeconfig.yaml;kubectl config set-context stage --namespace=centralservices-staging`

>For Dev

`export KUBECONFIG=./infra/k8s/dev-kubeconfig.yaml;kubectl config set-context dev --namespace=centralservices`

>For Prod

`export KUBECONFIG=./infra/k8s/prod-kubeconfig.yaml;kubectl config set-context prod --namespace=centralservices`



###### To run a deployment to a specific environment

`helm upgrade location-service-webservice --install ./infra/helm/common-helm --values=./infra/helm/common-helm/values_location-service-webservice_dev.yaml --set dockerTag=1.0.181 --debug --tiller-namespace centralservices`

###### To delete and purge

`helm delete location-service-webservice purge --tiller-namespace centralservices`


### To run the deploy script. 

>This will run the script from the directory above the repo directry, a folder called version , with a file number containing the docker tag
needs to be present - This is to emulate the concourse pipeline of fetching the dockerTag

    service-whisks/infra/helm/helm_common_deploy.sh -i  version/number -r location-service-webservice -c common-helm -v dev -e dev -n centralservices -f location-service-webservice -m webservice -s subChart/location-service -d values/location-service/webservice -k xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
    
#### Example for additional applications
    sh /infra/helm/helm_common_deploy.sh -i version/number -r service-whisks-mq-web-monitor -c common-helm -s 'subChart/service-whisks' -d 'values/service-whisks/mq-web-monitor' -v dev -e dev -n centralservices  -f service-whisks-mq-web-monitor -m service-whisks/mq-web-monitor -k xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx     

### To run parallel extractor 

##### Case 1. To run additional parallel extractor along with original extractor

set extractor2 as true and extractor1turnoff as false and set the javaopts ( for extractor 1) and extractor2 javaopts for extractor2 java opts

##### Case 2. To run only the additional extractor and switching off orginal extractor

set extractor2 as true and extractor1turnoff as true

##### Case 3. to disable additional extractor ( extractor 2)

set extractor2 as false and extractor1turnoff as false

If you just pass javaopts without populating extractor2,extractor2opts,extractor1turnoff then only 1 extractor will be triggered ( BAU )

Please note that extractor2 , extractor2opts , extractor1turnoff are optional. In case if you are setting extractor 2 as true,then extractor2opts must be passed

**IMPORTANT**:
When we run parallel (2nd) extractors we should point them to a dummy queue to ensure that only the live extractor processes the I022 messages. This is done by the `-Dmq.queue=dummy_queue` part of the value files.
On the other hand, if after running the parallel extractor we want to switch to it, its collection will not contain the updates (that happened during its run) on I0022 mapped product data and will not be automatically applied for the next MQ message (because bulk update based on delta compared to the previous state).
There are manual ways how to apply them:
- If Logentries shows that there were no changes for any of the I0022 types (colour, primary size, secondary size) during all the affected time (need to check for many days if parallel extractor ran for many days), no need to worry.
- Otherwise, one can re-trigger bulk update from the day prior the parallel run was started, as suggested in the `Recovery` section of
https://confluence.platform.mnscorp.net/display/EE/I0022+-+Bulk+Update

## Kube-Downscaler
Scale down Kubernetes deployments and/or statefulsets during non-work hours.
The deployment by default will be scaled down to zero replicas. This can be configured with a deployment or its namespace's annotation of downscaler/downtime-replicas

### A field .deployment.autoDownscaler is set as true in common-component-values files and metadata annotations are set to enable kube-downscaler in helm releases
### This field can be overriden in values file as false, if a specific service is to be excluded