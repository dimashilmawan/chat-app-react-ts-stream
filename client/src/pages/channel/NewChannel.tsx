import { useMutation, useQuery } from "@tanstack/react-query";
import { FormEvent, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Select, { SelectInstance } from "react-select";
import Button from "../../components/UI/Button";
import Card from "../../components/UI/Card";
import Input from "../../components/UI/Input";
import Link from "../../components/UI/Link";
import { useLoggedInAuth } from "../../context/AuthContext";

const NewChannel = () => {
	const nameRef = useRef<HTMLInputElement>(null);
	const imageUrlRef = useRef<HTMLInputElement>(null);
	const memberIdsRef =
		useRef<SelectInstance<{ label: string; value: string }>>(null);

	const { user, streamChat } = useLoggedInAuth();
	const navigate = useNavigate();

	const createChannel = useMutation({
		mutationFn: ({
			name,
			imageUrl,
			memberIds,
		}: {
			name: string;
			imageUrl?: string;
			memberIds: string[];
		}) => {
			if (streamChat == null) throw new Error("Not connected");

			return streamChat
				.channel("messaging", crypto.randomUUID(), {
					name,
					image: imageUrl,
					members: [user.id, ...memberIds],
				})
				.create();
		},
		onSuccess: () => {
			navigate("/");
		},
	});

	const users = useQuery({
		queryKey: ["stream", "users"],
		queryFn: () => {
			return streamChat!.queryUsers({ id: { $ne: user.id } }, { name: 1 });
		},
		enabled: streamChat != null,
	});

	const submitHandler = (e: FormEvent) => {
		e.preventDefault();
		const nameValue = nameRef.current?.value;
		const imageUrlValue = imageUrlRef.current?.value;
		const selectOptions = memberIdsRef.current?.getValue();

		if (
			nameValue == null ||
			nameValue === "" ||
			selectOptions == null ||
			selectOptions.length === 0
		)
			return;

		createChannel.mutate({
			name: nameValue,
			imageUrl: imageUrlValue,
			memberIds: selectOptions.map(option => option.value),
		});
	};
	return (
		<div className="flex min-h-screen w-full flex-col items-center justify-center bg-gray-100">
			<Card>
				<h1 className="text-center text-3xl font-bold text-gray-800">
					New Conversation
				</h1>
				<form onSubmit={submitHandler} className="mt-6 space-y-4">
					<div className="controls">
						<label className="label" htmlFor="username">
							Name
						</label>
						<Input id="username" pattern="\S*" required ref={nameRef} />
					</div>
					<div className="controls">
						<label className="label" htmlFor="imageUrl">
							Image Url
						</label>
						<Input id="imageUrl" ref={imageUrlRef} />
					</div>
					<div className="controls">
						<label className="label" htmlFor="members">
							Members
						</label>
						<Select
							id="members"
							isMulti
							required
							ref={memberIdsRef}
							options={users.data?.users.map(user => {
								return { value: user.id, label: user.name || user.id };
							})}
						/>
					</div>
					<div className="!mt-6">
						<Button type="submit">Create</Button>
					</div>
				</form>
			</Card>
			<Link to="/" className="z-20 mt-2">
				Back
			</Link>
		</div>
	);
};
export default NewChannel;
