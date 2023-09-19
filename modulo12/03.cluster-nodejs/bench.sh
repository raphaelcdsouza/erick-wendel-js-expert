URL=localhost:3000
npx autocannon $URL -m POST \
  --warmup [-c 1 -d 3] \
  --connection 500 \
  --pipeline 10 \
  --renderStatusCodes

# cat log.txt | grep 67272 | wc -l

# cat log.txt | grep 67274 | wc -l
# cat log.txt | grep 67276 | wc -l
# cat log.txt | grep 67275 | wc -l
# cat log.txt | grep 67273 | wc -l
# cat log.txt | grep 67277 | wc -l
# cat log.txt | grep 67278 | wc -l