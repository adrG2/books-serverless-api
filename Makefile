.PHONY: build-RuntimeDependenciesLayer build-lambda-common
.PHONY: build-getBooksFunction build-getBookByIdFunction build-putBookFunction

build-getBooksFunction:
	$(MAKE) HANDLER=src/handlers/GetBooksHandler.ts build-lambda-common
build-getBookByIdFunction:
	$(MAKE) HANDLER=src/handlers/GetBookByIdHandler.ts build-lambda-common
build-putBookFunction:
	$(MAKE) HANDLER=src/handlers/PutBookHandler.ts build-lambda-common
build-writeBookFunction:
	$(MAKE) HANDLER=src/handlers/WriteBookHandler.ts build-lambda-common

build-lambda-common:
	npm install
	rm -rf dist
	echo "{\"extends\": \"./tsconfig.json\", \"include\": [\"${HANDLER}\"] }" > tsconfig-only-handler.json
	npm run build -- --build tsconfig-only-handler.json
	cp -r dist "$(ARTIFACTS_DIR)/"

build-RuntimeDependenciesLayer:
	mkdir -p "$(ARTIFACTS_DIR)/nodejs"
	cp package.json package-lock.json "$(ARTIFACTS_DIR)/nodejs/"
	npm install --production --prefix "$(ARTIFACTS_DIR)/nodejs/"
	rm "$(ARTIFACTS_DIR)/nodejs/package.json" # to avoid rebuilding when changes doesn't relate to dependencies
