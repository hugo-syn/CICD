.PHONY: install test lint
install:
	bun install
test:
	bun test
lint:
	bunx eslint .
