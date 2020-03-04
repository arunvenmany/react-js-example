{{/*
Common helper templates/"functions" for use in the other files in this directory.
/*}}

{{/*
Built full docker image name, including sha reference or tag
*/}}
{{- define "docker-image" -}}
{{- if hasKey .Values "dockerTag" -}}
  {{- printf "%s:%s" .Values.dockerImage (.Values.dockerTag) | quote -}}
{{- else -}}
  {{- printf "%s:%s" .Values.dockerImage (default .Values.dockerTag "latest") | quote -}}
{{- end -}}
{{- end -}}



