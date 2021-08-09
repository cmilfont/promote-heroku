# Promote staging to production 

1.  heroku login
2.  heroku auth:token
3.  curl -H "Accept: application/vnd.heroku+json; version=3" -n \
https://api.heroku.com/pipelines/[pipeline-id]/pipeline-couplings
4.  Promote:
curl -X POST -H "Accept: application/vnd.heroku+json; version=3" -n \
-H "Authorization: Bearer a83f0215-4a8c-479b-850c-9246bdfc28e8" \
-H "Content-Type: application/json" \
-d '{"pipeline":{"id":"[pipeline-id]"},"source":{"app":{"id":"[staging-id]"}},"targets":[{"app":{"id":"[production-id]"}}]}' \
https://api.heroku.com/pipeline-promotions
