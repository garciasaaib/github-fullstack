import { getGithubCommits } from "@/actions/github-commits";
import { ButtonBlank } from "@/components/github/ButtonBlank";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

import data from '@emoji-mart/data'
import { init, SearchIndex } from 'emoji-mart'

init({ data })



export default async function Home() {
	// action fetch data 
	const { commits } = await getGithubCommits("garciasaaib", "github-fullstack");

	// search emoji function 
	async function searchEmoji(value: string): Promise<string | undefined> {
		const emojis = await SearchIndex.search(value)
		const results = emojis.map((emoji: any) => {
			return emoji.skins[0].native
		})
		return results[0]
	}

	// replace emoji codes with emojis
	async function replaceEmojiCodesWithEmojis(text: string) {
		const emojicode = text.match(/:[a-z_]+:/g)
		if (emojicode) {
			const searchText = emojicode[0].replace(/:/g, "")
			const handlerSeartext = searchText === "docs" ? "document" : emojicode[0].replace(/:/g, "")
			const emoji = await searchEmoji(handlerSeartext)
			if (emoji) {
				text = text.replace(emojicode[0], emoji)
			}
		}
		return text
	}
	return (
		<main className="flex min-h-screen flex-col items-center justify-between p-24">
			<div className="space-y-1">
				<h4 className="text-xl font-medium leading-none">Project Name: github-fullstack</h4>
				<p className=" text-muted-foreground">
					Owner: garciasaaib
				</p>
			</div>
			<Separator className="my-4" />
			{commits.map(({ author, comments_url, commit, committer, html_url }) => (
				<Card
					key={html_url}
					className="bg-gray-100 p-4 rounded-lg shadow-lg my-4"
				>
					<CardHeader>
						<CardTitle>Commit: {commit.url.split("/").at(-1)}</CardTitle>
						<CardDescription></CardDescription>
					</CardHeader>
					<CardContent>
						<div className="flex">
							<Avatar>
								<AvatarImage
									src={committer.avatar_url}
									// className="text-sm text-gray-600"
									alt="Github Avatar"
								/>
								<AvatarFallback>{committer.login}</AvatarFallback>
							</Avatar>
							<div className="flex flex-col justify-end ml-4">
								<h4 className="text-sm font-medium leading-none">
									created by:
								</h4>
								<p className="text-sm text-muted-foreground">
									{committer.login}
								</p>
							</div>
						</div>

						<div className="flex flex-col justify-end my-5">
							<h4 className="text-xl font-medium leading-none">Message:</h4>
								{commit.message.split("\n").map((line, index) => (
									<>
										<p className="my-2 text-lg" key={line}>{replaceEmojiCodesWithEmojis(line)}</p>
										{/* <p className="my-2 text-lg" key={index}>{line}</p> */}
									</>
								))}
						</div>
					</CardContent>
					<CardFooter className="flex justify-between">
						<ButtonBlank url={comments_url}>Go to comments</ButtonBlank>
						<ButtonBlank url={html_url}>More</ButtonBlank>
					</CardFooter>
				</Card>
			))}
		</main>
	);
}
