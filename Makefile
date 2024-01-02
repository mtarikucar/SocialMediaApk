build:
	cd server && $(MAKE) build
	cd panel && $(MAKE) build

run:
	docker-compose up

stop:
	docker-compose down
