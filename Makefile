run:
	yarn start

test:
	yarn test:watch

build:
	yarn build

qa: 
	yarn test
	yarn lint

fix:
	yarn lint:fix