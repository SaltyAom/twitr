import type { FastifyInstance } from "fastify"

export default async (app: FastifyInstance) => {
    app.get("/", async () => "Working")

    return app
}
