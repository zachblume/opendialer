dev:
	echo "Starting the application for development..."
	npm install
	cd app && npm install
	npx supabase start --exclude 'edge-runtime,vector,imgproxy'
	cd app && npm i && npm run dev