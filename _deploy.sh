gcloud functions deploy nodejs-http-function \
--gen2 \
--runtime=nodejs18 \
--region=REGION \
--source=. \
--region=us-east1-c \
--entry-point=term \
--trigger-http \
--allow-unauthenticated