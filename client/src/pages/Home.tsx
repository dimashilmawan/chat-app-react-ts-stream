import {
	LoadingIndicator,
	Chat,
	ChannelList,
	Channel,
	Window,
	MessageInput,
	MessageList,
	ChannelHeader,
} from "stream-chat-react";
import { useLoggedInAuth } from "../context/AuthContext";
import { ChannelListMessengerProps } from "stream-chat-react/dist/components";
import { useChatContext } from "stream-chat-react/dist/context";
import { useNavigate } from "react-router-dom";
import Button from "../components/UI/Button";

const Home = () => {
	const { user, streamChat } = useLoggedInAuth();

	if (streamChat == null) return <LoadingIndicator />;

	return (
		<Chat client={streamChat}>
			<ChannelList
				filters={{ members: { $in: [user.id] } }}
				List={Channels}
				sendChannelsToList
			/>
			<Channel>
				<Window>
					<ChannelHeader />
					<MessageList />
					<MessageInput />
				</Window>
			</Channel>
		</Chat>
	);
};
export default Home;

function Channels({ loadedChannels }: ChannelListMessengerProps) {
	const { setActiveChannel, channel: activeChannel } = useChatContext();
	const { logout } = useLoggedInAuth();
	const navigate = useNavigate();

	return (
		<div className="flex h-full w-60 flex-col gap-3  p-3">
			<Button onClick={() => navigate("/channel/new")}>New Conversation</Button>
			<hr className="mx-auto h-[2px] w-[98%] bg-gray-400" />
			{loadedChannels != null && loadedChannels.length > 0
				? loadedChannels.map(channel => {
						const isActive = channel === activeChannel;
						const extraClasses = isActive
							? "bg-blue-500 text-white"
							: "bg-gray-500 hover:bg-blue-400 text-gray-100";

						return (
							<button
								onClick={() => setActiveChannel(channel)}
								key={channel.id}
								className={`flex gap-2 ${extraClasses} rounded-md p-2`}
								disabled={isActive}
							>
								{channel.data?.image && (
									<img
										className="h-4 w-4 rounded-full object-cover object-center"
										src={channel.data.image}
									/>
								)}
								<div className="overflow-hidden text-ellipsis whitespace-nowrap">
									{channel.data?.name || channel.id}
								</div>
							</button>
						);
				  })
				: "No Conversation yet"}
			<hr className="mx-auto mt-auto h-[2px] w-[98%] bg-gray-400" />
			<Button onClick={() => logout.mutate()} disabled={logout.isLoading}>
				Logout
			</Button>
		</div>
	);
}
