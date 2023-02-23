import { FastifyInstance } from "fastify";
import { StreamChat } from "stream-chat";

const streamChat = StreamChat.getInstance(
	process.env.STREAM_API_KEY!,
	process.env.STREAM_API_SECRET_API
);

export const userRoutes = async (app: FastifyInstance) => {
	app.post<{ Body: { id: string; name: string; imageUrl: string } }>(
		"/signup",
		async (req, res) => {
			const { id, name, imageUrl } = req.body;

			if (id == null || id === "" || name == null || name === "") {
				return res.status(400).send();
			}

			const existingUsers = await streamChat.queryUsers({ id });

			if (existingUsers.users.length > 0) {
				return res.status(404).send("User id taken already");
			}

			await streamChat.upsertUser({ id, name, imageUrl });
		}
	);
};
