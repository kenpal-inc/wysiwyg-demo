import { FileHandler } from "@tiptap/extension-file-handler";
import { Image } from "@tiptap/extension-image";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useState } from "react";

const initialContent = `
Tiptap Editor demo
<blockquote>
あのイーハトーヴォのすきとおった風、<br>
夏でも底に冷たさをもつ青いそら、<br>
うつくしい森で飾られたモリーオ市、<br>
郊外のぎらぎらひかる草の波。
</blockquote>
<a href="https://www.aozora.gr.jp/cards/000081/files/1935_19925.html">ポラーノの広場 - 宮沢賢治</a>
`;

export default function Tiptap() {
	const [html, setHtml] = useState("");
	const [json, setJson] = useState("{}");

	const editor = useEditor({
		// https://tiptap.dev/docs/editor/extensions
		extensions: [
			StarterKit,
			Image.configure({ inline: true }),
			FileHandler.configure({
				onPaste: (editor, files, htmlContent) => {
					if (htmlContent) {
						// allow default handling of pasting HTML content
						return false;
					}
					files.forEach((file) => {
						const url = URL.createObjectURL(file);
						editor
							.chain()
							.insertContentAt(editor.state.selection.anchor, {
								type: "image",
								attrs: { src: url },
							})
							.focus()
							.run();
					});
				},
				onDrop: (editor, files, pos) => {
					files.forEach((file) => {
						const url = URL.createObjectURL(file);
						editor
							.chain()
							.insertContentAt(pos, { type: "image", attrs: { src: url } })
							.focus()
							.run();
					});
				},
			}),
		],
		content: initialContent,
		onCreate: ({ editor }) => {
			setHtml(editor.getHTML());
			setJson(JSON.stringify(editor.getJSON(), null, 2));
		},
		onUpdate: ({ editor }) => {
			setHtml(editor.getHTML());
			setJson(JSON.stringify(editor.getJSON(), null, 2));
		},
	});

	return (
		<div className="flex gap-4 w-full items-stretch flex-1 min-h-0">
			<span className="text-sm font-bold text-left w-14 shrink-0">Tiptap</span>
			<div className="flex-1 flex flex-col gap-1">
				<div className="flex items-center h-6">
					<span className="text-sm font-bold text-left">HTML</span>
				</div>
				<pre className="flex-1 border border-gray-500 rounded-lg p-4 overflow-auto bg-white/10 text-left text-sm whitespace-pre-wrap break-all">
					<code>{html}</code>
				</pre>
			</div>
			<div className="flex-1 flex flex-col gap-1">
				<div className="flex items-center h-6">
					<span className="text-sm font-bold text-left">JSON</span>
				</div>
				<pre className="flex-1 border border-gray-500 rounded-lg p-4 overflow-auto bg-white/10 text-left text-sm whitespace-pre-wrap break-all">
					<code>{json}</code>
				</pre>
			</div>
			<div className="flex-1 flex flex-col gap-1">
				<div className="flex items-center justify-between gap-2 h-6">
					<span className="text-sm font-bold text-left">Editor</span>
					<div>
						<button
							type="button"
							className="text-xs px-2 py-0.5 rounded hover:bg-white/20 active:scale-90 active:bg-white/30 transition-transform cursor-pointer"
							onClick={() => editor.commands.setContent(initialContent)}
						>
							Reset
						</button>
						<button
							type="button"
							className="text-xs px-2 py-0.5 rounded hover:bg-white/20 active:scale-90 active:bg-white/30 transition-transform cursor-pointer"
							onClick={() => editor.commands.clearContent()}
						>
							Clear
						</button>
					</div>
				</div>
				<EditorContent className="flex-1 min-h-0" editor={editor} />
			</div>
		</div>
	);
}
