initialize_vite:
	@echo "Installing vite"
 	npm create vite@latest

initialize_redux-toolkit:
	@echo "initializing redux-toolkit"
	npm install @reduxjs/toolkit react-redux

initialize_tailwind:
	@echo "initializing tailwind"
	npm install -D tailwindcss postcss autoprefixer &&
	npx tailwindcss init
