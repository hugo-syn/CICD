FROM oven/bun:1
WORKDIR /app
COPY package.json bunfig.toml ./
RUN bun install
COPY . .
CMD ["bun", "test"]
