# make default command make start
dev:
	echo "Starting the application for development"
	docker-compose up -d
	npm i && npx prisma migrate deploy
	cd app && npm i && npm run dev