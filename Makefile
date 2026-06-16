.PHONY: install dev build preview test lint format typecheck clean

install:
	npm install

dev:
	npm run dev

build:
	npm run build

preview:
	npm run preview

test:
	npm test

lint:
	npm run lint

format:
	npm run format

typecheck:
	npm run typecheck

clean:
	powershell -NoProfile -Command "Remove-Item -Recurse -Force dist,coverage,playwright-report,test-results -ErrorAction SilentlyContinue"
