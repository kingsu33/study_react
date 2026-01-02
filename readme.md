# react study

## 도커 빌드
docker build -t react-study .

docker run --rm -it \
  -p 5173:5173 \
  -v "$PWD":/app \
  -v /app/node_modules react-vite-dev

docker run --rm -it -p 5173-5175:5173-5175 -v "$PWD":/app -v /app/node_modules react-study
